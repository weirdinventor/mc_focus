/* eslint-disable @typescript-eslint/no-explicit-any */
import { KEYS } from './Keys';
import { PersistenceService } from './type';

/**
 * A web-only persistence service that uses localStorage with a fallback to sessionStorage.
 * This class provides a consistent API for storing, retrieving, and removing data.
 * It automatically handles JSON serialization and deserialization.
 */
class Storage implements PersistenceService {
  // The 'store' object now directly implements the web storage logic.
  private store: {
    set: (key: string, value: string) => void;
    getString: (key: string) => string | null;
    delete: (key: string) => void;
    clearAll: () => void;
  };

  constructor() {
    // Initialize the store with web-specific storage APIs (localStorage/sessionStorage).
    this.store = {
      set: (key: string, value: string) => {
        try {
          // Prefer localStorage for persistent storage.
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem(key, value);
          }
        } catch (error) {
          console.warn('Failed to set localStorage item, falling back to sessionStorage:', error);
          // Fallback to sessionStorage if localStorage is unavailable (e.g., private mode).
          if (typeof sessionStorage !== 'undefined') {
            sessionStorage.setItem(key, value);
          }
        }
      },
      getString: (key: string) => {
        try {
          // Try to retrieve from localStorage first, then sessionStorage.
          return (
            (typeof localStorage !== 'undefined' ? localStorage.getItem(key) : null) ||
            (typeof sessionStorage !== 'undefined' ? sessionStorage.getItem(key) : null)
          );
        } catch (error) {
          console.warn('Failed to get item from storage:', error);
          return null;
        }
      },
      delete: (key: string) => {
        try {
          if (typeof localStorage !== 'undefined') {
            localStorage.removeItem(key);
          }
          if (typeof sessionStorage !== 'undefined') {
            sessionStorage.removeItem(key);
          }
        } catch (error) {
          console.warn('Failed to remove item from storage:', error);
        }
      },
      clearAll: () => {
        try {
          if (typeof localStorage !== 'undefined') {
            localStorage.clear();
          }
          if (typeof sessionStorage !== 'undefined') {
            sessionStorage.clear();
          }
        } catch (error) {
          console.warn('Failed to clear storage:', error);
        }
      },
    };
  }

  /**
   * Stores an item after converting it to a JSON string.
   * @param key The key to store the item under.
   * @param value The value to store (can be any type).
   */
  setItem(key: KEYS | string, value: unknown): void {
    this.store.set(key, JSON.stringify(value));
  }

  /**
   * Retrieves an item and parses it from a JSON string.
   * @param key The key of the item to retrieve.
   * @returns The parsed value, or null if not found.
   */
  getItem(key: KEYS | string): any | null {
    const res = this.store.getString(key);
    if (!res) return null;

    try {
      // Attempt to parse the value as JSON.
      return JSON.parse(res);
    } catch (error) {
      // If parsing fails, it's likely a raw string that was stored.
      // Return the raw value to prevent crashes.
      console.warn(`Failed to parse stored value for key "${key}", returning raw string.`, error);
      return res;
    }
  }

  /**
   * Removes a single item from storage.
   * @param key The key of the item to remove.
   */
  removeItem(key: KEYS | string): void {
    this.store.delete(key);
  }

  /**
   * Clears all items from storage.
   */
  clearAll(): void {
    this.store.clearAll();
  }
}

// Export a single, ready-to-use instance of the Storage class.
export const PersistenceStorage = new Storage();