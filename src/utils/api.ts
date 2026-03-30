/**
 * Optimized API utility for fetching data.
 * Uses async/await and robust error handling.
 */
export async function fetchData<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    if (error instanceof Error) {
      console.error('API Fetch Error:', error.message);
    } else {
      console.error('API Fetch Error: An unknown error occurred');
    }
    return null;
  }
}
