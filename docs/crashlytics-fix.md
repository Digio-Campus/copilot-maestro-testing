# Guía y Solución al Build de Android con Firebase Crashlytics

Este documento explica por qué la compilación de Android fallaba inicialmente al incluir **Firebase Crashlytics** y detalla los pasos exactos que se tomaron para solucionarlo y permitir que el build en **Expo Application Services (EAS)** fuera exitoso.

##  El Problema Original
Al intentar integrar Firebase Crashlytics en un proyecto React Native / Expo, suelen presentarse problemas de construcción en Android debido a múltiples factores en la cadena de Gradle:

1. **Falta de sincronización nativa (NPM vs Gradle)**: Es necesario disponer simultáneamente de las dependencias nativas en los archivos `.gradle` y los wrappers de React Native como dependencias de nodo en `package.json`. No tener ambos provoca fallos de compilación donde RN no encuentra los módulos empaquetados.
2. **Conflictos con la versión de Firebase**: Declarar explícitamente las versiones de core, analytics y crashlytics de manera separada causaba colisiones.
3. **Omisiones del Plugin Crashlytics**: Usualmente, cuando se añade el servicio `google-services`, a menudo se olvida añadir a nivel global (`buildscript`) el classpath exclusivo para el empaquetador de Crashlytics.

Por seguridad y para descartar que el resto de la aplicación estuviera rota, se optó temporalmente por **retirar la integración** de Crashlytics y comprobar que un build "limpio" compilase bien. Una vez confirmado que el problema era exclusivamente de Crashlytics, se procedió a re-integrarlo de la manera correcta.

---

## La Solución Implementada
Para lograr la generación exitosa del APK mediante el comando `eas build -p android --profile preview`, aplicamos las siguientes correcciones sobre los archivos nativos de Android y las librerías del proyecto.

### 1. Reinstalación de Librerías Base (NPM)
Se ejecutó la instalación mediante Expo:
```bash
npx expo install @react-native-firebase/app @react-native-firebase/crashlytics
```
*(Es crucial que estén presentes en el `package.json` para que los interceptores Javascript de React Native funcionen junto con las extensiones nativas al ser pre-construidas por EAS).*

### 2. Configuración a nivel de Root (`android/build.gradle`)
Añadimos correctamente las dos pasarelas de compilación requeridas para los servicios de Google y Crashlytics en la sección de `buildscript -> dependencies`:

```gradle
buildscript {
  dependencies {
    // Ya existía
    classpath('com.google.gms:google-services:4.4.4')
    
    // Añadido: El plugin inyector específico para Crashlytics
    classpath('com.google.firebase:firebase-crashlytics-gradle:3.0.2')
  }
}
```

### 3. Configuración a nivel de Aplicación (`android/app/build.gradle`)
En el documento final es donde se aplican esos plugins y se importan las SDK.

**A) Al principio del archivo, inicializar el plugin:**
```gradle
apply plugin: "com.google.gms.google-services"
// Añadido: Inicializador de Crashlytics
apply plugin: "com.google.firebase.crashlytics"
```

**B) Al final del archivo, en el bloque de dependencias:**
Hicimos uso del patrón **BoM (Bill of Materials)** recomendado por Google, el cual estabiliza las versiones para evitar conflictos entre las distintas ramas de Firebase (core, analytics y crashlytics).

```gradle
dependencies {
    // Import the Firebase BoM (ya estabiliza todas las versiones)
    implementation platform('com.google.firebase:firebase-bom:34.11.0')

    // Al usar BoM, ya no se indica versión específica para los componentes
    implementation 'com.google.firebase:firebase-analytics'
    
    // Añadido: El core SDK de Crashlytics
    implementation 'com.google.firebase:firebase-crashlytics'
}
```

---

## Por qué ahora sí funciona en EAS
Al configurar explícitamente las versiones con el **Firebase BoM** de Android y tener todos los módulos React Native Firebase instalados en la raíz (`package.json`), EAS puede preconstruir correctamente en su máquina virtual resolviendo de arriba hacia abajo:
1. `npm install` clona y alinea correctamente `@react-native-firebase/crashlytics`.
2. Las tareas build de Gradle ejecutan `com.google.firebase.crashlytics` que inyecta código de mapeo en base a lo anterior.
3. Tras enlazar la librería React-Native con la nativa, se lanza el empaquetado del final en un `.apk`.

El resultado es un build estable, predecible y que no colisiona con el build propio de React Native ni genera errores de "clases duplicadas" o "símbolos no resueltos".
