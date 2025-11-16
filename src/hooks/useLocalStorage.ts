import { useState, useEffect } from 'react';

/**
 * Check if localStorage is available
 */
function isLocalStorageAvailable(): boolean {
  try {
    const testKey = '__localStorage_test__';
    window.localStorage.setItem(testKey, 'test');
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

/**
 * Custom hook that syncs state with browser local storage
 * @param key - The key to store the value under in local storage
 * @param initialValue - The initial value if no stored value exists
 * @returns A tuple of [storedValue, setValue, storageAvailable] similar to useState
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void, boolean] {
  const [storageAvailable] = useState<boolean>(isLocalStorageAvailable());
  
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (!storageAvailable) {
      console.warn('localStorage is not available. Using in-memory storage.');
      return initialValue;
    }

    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      
      if (!item) {
        return initialValue;
      }

      // Try to parse stored json
      const parsed = JSON.parse(item);
      
      // Validate the parsed data structure (basic validation)
      if (parsed === null || parsed === undefined) {
        console.warn(`Invalid data in localStorage for key "${key}". Using initial value.`);
        return initialValue;
      }

      return parsed;
    } catch (error) {
      // If error reading or parsing from storage, log and return initialValue
      console.error(`Error reading localStorage key "${key}":`, error);
      console.warn('Corrupted data detected. Clearing and using initial value.');
      
      // Try to clear the corrupted data
      try {
        window.localStorage.removeItem(key);
      } catch {
        // Silently fail if we can't clear
      }
      
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists to localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Save state
      setStoredValue(valueToStore);
      
      // Save to local storage if available
      if (storageAvailable) {
        try {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (storageError) {
          // Handle storage errors (quota exceeded, etc.)
          console.error(`Error setting localStorage key "${key}":`, storageError);
          
          // Check if it's a quota exceeded error
          if (storageError instanceof DOMException && 
              (storageError.name === 'QuotaExceededError' || 
               storageError.name === 'NS_ERROR_DOM_QUOTA_REACHED')) {
            console.warn('localStorage quota exceeded. Data will only persist in memory for this session.');
          }
        }
      }
    } catch (error) {
      console.error(`Error in setValue for key "${key}":`, error);
    }
  };

  // Listen for changes to this key in other tabs/windows
  useEffect(() => {
    if (!storageAvailable) {
      return;
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          setStoredValue(parsed);
        } catch (error) {
          console.error(`Error parsing storage event for key "${key}":`, error);
          // If corrupted data comes from another tab, ignore it
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, storageAvailable]);

  return [storedValue, setValue, storageAvailable];
}
