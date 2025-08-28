import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Get an item from AsyncStorage
 * @param key - The key to retrieve
 * @returns Promise<string | null> - The stored value or null if not found
 */
export const getItem = async (key: string): Promise<string | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    console.error(`Error getting item with key "${key}":`, error);
    return null;
  }
};

/**
 * Get a JSON object from AsyncStorage
 * @param key - The key to retrieve
 * @returns Promise<T | null> - The parsed object or null if not found/invalid
 */
export const getObjectItem = async <T>(key: string): Promise<T | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error(`Error getting object item with key "${key}":`, error);
    return null;
  }
};

/**
 * Set an item in AsyncStorage
 * @param key - The key to store the value under
 * @param value - The value to store
 * @returns Promise<boolean> - True if successful, false otherwise
 */
export const setItem = async (key: string, value: string): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.error(`Error setting item with key "${key}":`, error);
    return false;
  }
};

/**
 * Set a JSON object in AsyncStorage
 * @param key - The key to store the value under
 * @param value - The object to store
 * @returns Promise<boolean> - True if successful, false otherwise
 */
export const setObjectItem = async <T>(key: string, value: T): Promise<boolean> => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    return true;
  } catch (error) {
    console.error(`Error setting object item with key "${key}":`, error);
    return false;
  }
};

/**
 * Remove an item from AsyncStorage
 * @param key - The key to remove
 * @returns Promise<boolean> - True if successful, false otherwise
 */
export const removeItem = async (key: string): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing item with key "${key}":`, error);
    return false;
  }
};

/**
 * Clear all items from AsyncStorage
 * @returns Promise<boolean> - True if successful, false otherwise
 */
export const clearAll = async (): Promise<boolean> => {
  try {
    await AsyncStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing all items:', error);
    return false;
  }
};

/**
 * Get all keys from AsyncStorage
 * @returns Promise<string[]> - Array of all keys or empty array if error
 */
export const getAllKeys = async (): Promise<string[]> => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    return keys as any;
  } catch (error) {
    console.error('Error getting all keys:', error);
    return [];
  }
};

/**
 * Check if a key exists in AsyncStorage
 * @param key - The key to check
 * @returns Promise<boolean> - True if key exists, false otherwise
 */
export const hasKey = async (key: string): Promise<boolean> => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    return keys.includes(key);
  } catch (error) {
    console.error(`Error checking if key "${key}" exists:`, error);
    return false;
  }
};