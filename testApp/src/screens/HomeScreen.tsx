import React from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { COLORS, SHADOWS, RADIUS, SPACING } from '../constants/theme';

export const HomeScreen = ({ email, items, logout, toggleLike, removeItem, addNewItem }: any) => {
  // Standardized Naming for programmatic analysis
  const logoutButton = (
    <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
      <Ionicons name="log-out" size={24} color={COLORS.error} />
    </TouchableOpacity>
  );

  const addItemButton = (
    <TouchableOpacity style={styles.quickAdd} onPress={addNewItem} activeOpacity={0.7}>
      <Ionicons name="add" size={20} color={COLORS.white} />
      <Text style={styles.quickAddText}>Add Item</Text>
    </TouchableOpacity>
  );

  const handlePickImage = async () => {
    try {
      // CRITICAL: We are intentionally NOT checking for permissions here 
      // to test the app's behavior when access is denied.
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        console.log('Image picked:', result.assets[0].uri);
      }
    } catch (error: any) {
      // Simulate a crash by throwing an unhandled error when permissions are missing
      // or when the OS denies access.
      throw new Error(`CRASH_SIMULATION: Image Picker failed - ${error.message}`);
    }
  };

  const imagePickerButton = (
    <TouchableOpacity 
      style={[styles.quickAdd, { backgroundColor: COLORS.accent, marginLeft: SPACING.sm }]} 
      onPress={handlePickImage} 
      activeOpacity={0.7}
      testID="image-picker-button"
    >
      <Ionicons name="image" size={20} color={COLORS.white} />
      <Text style={styles.quickAddText}>Pick Image</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Dashboard</Text>
            <View style={styles.userBadge}>
              <Ionicons name="person" size={12} color={COLORS.primary} />
              <Text style={styles.userText}>{email}</Text>
            </View>
          </View>
          {logoutButton}
        </View>

        <View style={styles.statsBar}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{items.length}</Text>
            <Text style={styles.statLabel}>Total Items</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            {addItemButton}
            {imagePickerButton}
          </View>
        </View>

        <FlatList
          data={items}
          keyExtractor={(item: any) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }: any) => (
            <View style={styles.card}>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDesc}>{item.description}</Text>
              </View>
              <View style={styles.cardActions}>
                <TouchableOpacity 
                  onPress={() => toggleLike(item.id)} 
                  style={[styles.actionBtn, item.isLiked && styles.actionBtnLiked]}
                  activeOpacity={0.6}
                >
                  <Ionicons 
                    name={item.isLiked ? "heart" : "heart-outline"} 
                    size={22} 
                    color={item.isLiked ? COLORS.accent : COLORS.primary} 
                  />
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={() => removeItem(item.id)} 
                  style={styles.actionBtn}
                  activeOpacity={0.6}
                >
                  <Ionicons name="trash" size={22} color={COLORS.error} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.background, 
  },
  safeArea: { 
    flex: 1, 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.md,
    backgroundColor: COLORS.surface,
    ...SHADOWS.light,
  },
  headerTitle: { 
    fontSize: 28, 
    fontWeight: '900', 
    color: COLORS.text,
  },
  userBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: RADIUS.sm,
    marginTop: 4,
  },
  userText: { 
    fontSize: 12, 
    fontWeight: '600',
    color: COLORS.primary,
    marginLeft: 4,
  },
  logoutBtn: { 
    width: 48, 
    height: 48, 
    borderRadius: RADIUS.md, 
    borderWidth: 1.5, 
    borderColor: '#fee2e2', 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#fff',
  },
  statsBar: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: SPACING.lg, 
    paddingVertical: SPACING.lg,
  },
  statItem: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.md,
    ...SHADOWS.light,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statValue: { 
    fontSize: 20, 
    fontWeight: '800', 
    color: COLORS.primary,
    lineHeight: 24,
  },
  statLabel: { 
    fontSize: 11, 
    fontWeight: '700', 
    color: COLORS.textLight,
    textTransform: 'uppercase',
  },
  quickAdd: { 
    flexDirection: 'row', 
    backgroundColor: COLORS.primary, 
    paddingHorizontal: SPACING.lg, 
    paddingVertical: SPACING.md, 
    borderRadius: RADIUS.round, 
    alignItems: 'center',
    ...SHADOWS.medium,
    shadowColor: COLORS.primary,
  },
  quickAddText: { 
    color: '#fff', 
    fontSize: 15, 
    fontWeight: '800', 
    marginLeft: 6,
  },
  listContent: { 
    paddingHorizontal: SPACING.lg, 
    paddingBottom: 40,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    ...SHADOWS.medium,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  cardContent: { 
    flex: 1,
  },
  cardTitle: { 
    fontSize: 18, 
    fontWeight: '800', 
    color: COLORS.text, 
    marginBottom: 4,
  },
  cardDesc: { 
    fontSize: 14, 
    color: COLORS.textLight, 
    lineHeight: 20,
    paddingRight: SPACING.sm,
  },
  cardActions: { 
    flexDirection: 'column', 
    marginLeft: SPACING.md,
  },
  actionBtn: { 
    padding: SPACING.sm, 
    marginBottom: SPACING.sm,
    backgroundColor: COLORS.secondary,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionBtnLiked: {
    backgroundColor: '#fff1f2',
  },
});
