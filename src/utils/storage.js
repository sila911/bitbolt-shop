/**
 * Safe LocalStorage helpers with automatic JSON serialization
 */

export function getStorage(key, defaultValue = null) {
  try {
    const saved = localStorage.getItem(key);
    return saved !== null ? JSON.parse(saved) : defaultValue;
  } catch (err) {
    console.error(`[storage] Error reading key "${key}":`, err);
    return defaultValue;
  }
}

export function setStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`[storage] Error saving key "${key}":`, err);
  }
}

export function removeStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.error(`[storage] Error removing key "${key}":`, err);
  }
}
