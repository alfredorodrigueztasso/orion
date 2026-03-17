/**
 * useLocalStorage Hook
 *
 * Syncs state with localStorage for persistence across sessions.
 *
 * @example
 * ```tsx
 * const [theme, setTheme] = useLocalStorage('theme', 'light');
 * const [user, setUser] = useLocalStorage<User | null>('user', null);
 *
 * // Value persists across page refreshes
 * setTheme('dark');
 * ```
 */

import { useState, useEffect, useCallback } from "react";

/**
 * Options for useLocalStorage hook
 */
export interface UseLocalStorageOptions<T> {
  /**
   * Custom serializer function
   * @default JSON.stringify
   */
  serializer?: (value: T) => string;

  /**
   * Custom deserializer function
   * @default JSON.parse
   */
  deserializer?: (value: string) => T;

  /**
   * Whether to sync across tabs
   * @default true
   */
  syncAcrossTabs?: boolean;
}

/**
 * Hook to sync state with localStorage
 *
 * @param key - localStorage key
 * @param initialValue - Initial value if key doesn't exist
 * @param options - Additional options
 * @returns [value, setValue, removeValue]
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options: UseLocalStorageOptions<T> = {},
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  const {
    serializer = JSON.stringify,
    deserializer = JSON.parse,
    syncAcrossTabs = true,
  } = options;

  // Get initial value from localStorage or use initialValue
  const readValue = useCallback((): T => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? deserializer(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  }, [key, initialValue, deserializer]);

  const [storedValue, setStoredValue] = useState<T>(readValue);

  // Save to localStorage
  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      if (typeof window === "undefined") {
        console.warn("localStorage is not available");
        return;
      }

      try {
        // Allow value to be a function (like setState)
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;

        // Save to state
        setStoredValue(valueToStore);

        // Save to localStorage
        window.localStorage.setItem(key, serializer(valueToStore));

        // Dispatch custom event for cross-tab sync
        window.dispatchEvent(
          new StorageEvent("storage", {
            key,
            newValue: serializer(valueToStore),
          }),
        );
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, serializer, storedValue],
  );

  // Remove from localStorage
  const removeValue = useCallback(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);

      // Dispatch custom event for cross-tab sync
      window.dispatchEvent(
        new StorageEvent("storage", {
          key,
          newValue: null,
        }),
      );
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  // Sync across tabs
  useEffect(() => {
    if (!syncAcrossTabs || typeof window === "undefined") {
      return;
    }

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key !== key) {
        return;
      }

      try {
        const newValue = event.newValue
          ? deserializer(event.newValue)
          : initialValue;
        setStoredValue(newValue);
      } catch (error) {
        console.warn(`Error syncing localStorage key "${key}":`, error);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key, initialValue, deserializer, syncAcrossTabs]);

  // Re-read value on mount (handles SSR hydration)
  useEffect(() => {
    setStoredValue(readValue());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount for SSR hydration

  return [storedValue, setValue, removeValue];
}

/**
 * Hook to sync state with sessionStorage (similar to useLocalStorage)
 */
export function useSessionStorage<T>(
  key: string,
  initialValue: T,
  options: Omit<UseLocalStorageOptions<T>, "syncAcrossTabs"> = {},
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  const { serializer = JSON.stringify, deserializer = JSON.parse } = options;

  const readValue = useCallback((): T => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.sessionStorage.getItem(key);
      return item ? deserializer(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading sessionStorage key "${key}":`, error);
      return initialValue;
    }
  }, [key, initialValue, deserializer]);

  const [storedValue, setStoredValue] = useState<T>(readValue);

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      if (typeof window === "undefined") {
        return;
      }

      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.sessionStorage.setItem(key, serializer(valueToStore));
      } catch (error) {
        console.warn(`Error setting sessionStorage key "${key}":`, error);
      }
    },
    [key, serializer, storedValue],
  );

  const removeValue = useCallback(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      window.sessionStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.warn(`Error removing sessionStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  useEffect(() => {
    setStoredValue(readValue());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount for SSR hydration

  return [storedValue, setValue, removeValue];
}
