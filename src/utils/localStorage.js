/**
 * Utilidades para manejar Local Storage de forma segura
 * Challenge 16 - Local Storage Implementation
 */

const STORAGE_KEYS = {
  EXPANDED_NODES: 'menuApp_expandedNodes',
  ACTIVE_LINK: 'menuApp_activeLink',
  THEME: 'menuApp_theme',
  FONT_SIZE: 'menuApp_fontSize',
  NAVIGATION_HISTORY: 'menuApp_navigationHistory',
};

/**
 * Guarda datos en localStorage de forma segura
 * @param {string} key - Clave para guardar
 * @param {any} value - Valor a guardar (será convertido a JSON)
 * @returns {boolean} - true si se guardó exitosamente
 */
export const setLocalStorage = (key, value) => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
    return true;
  } catch (error) {
    console.error(`Error saving to localStorage (${key}):`, error);
    return false;
  }
};

/**
 * Obtiene datos del localStorage
 * @param {string} key - Clave a obtener
 * @param {any} defaultValue - Valor por defecto si no existe
 * @returns {any} - Valor parseado o defaultValue
 */
export const getLocalStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage (${key}):`, error);
    return defaultValue;
  }
};

/**
 * Elimina un item del localStorage
 * @param {string} key - Clave a eliminar
 */
export const removeLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing from localStorage (${key}):`, error);
  }
};

/**
 * Limpia todo el localStorage de la aplicación
 */
export const clearAppStorage = () => {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    console.log('✅ Application storage cleared');
  } catch (error) {
    console.error('Error clearing application storage:', error);
  }
};

// ========================================
// Funciones específicas de la aplicación
// ========================================

/**
 * Guarda los nodos expandidos del menú
 * @param {Set} expandedNodes - Set de links expandidos
 */
export const saveExpandedNodes = (expandedNodes) => {
  const nodesArray = Array.from(expandedNodes);
  setLocalStorage(STORAGE_KEYS.EXPANDED_NODES, nodesArray);
};

/**
 * Obtiene los nodos expandidos guardados
 * @returns {Set} - Set de links expandidos
 */
export const getExpandedNodes = () => {
  const nodesArray = getLocalStorage(STORAGE_KEYS.EXPANDED_NODES, ['/']);
  return new Set(nodesArray);
};

/**
 * Guarda el link activo actual
 * @param {string} activeLink - Link activo
 */
export const saveActiveLink = (activeLink) => {
  setLocalStorage(STORAGE_KEYS.ACTIVE_LINK, activeLink);
};

/**
 * Obtiene el link activo guardado
 * @returns {string} - Link activo o '/' por defecto
 */
export const getActiveLink = () => {
  return getLocalStorage(STORAGE_KEYS.ACTIVE_LINK, '/');
};

/**
 * Guarda el tema de la aplicación
 * @param {string} theme - 'light' o 'dark'
 */
export const saveTheme = (theme) => {
  setLocalStorage(STORAGE_KEYS.THEME, theme);
};

/**
 * Obtiene el tema guardado
 * @returns {string} - 'light' o 'dark'
 */
export const getTheme = () => {
  return getLocalStorage(STORAGE_KEYS.THEME, 'light');
};

/**
 * Guarda el tamaño de fuente
 * @param {string} fontSize - 'small', 'medium', 'large'
 */
export const saveFontSize = (fontSize) => {
  setLocalStorage(STORAGE_KEYS.FONT_SIZE, fontSize);
};

/**
 * Obtiene el tamaño de fuente guardado
 * @returns {string} - Tamaño de fuente
 */
export const getFontSize = () => {
  return getLocalStorage(STORAGE_KEYS.FONT_SIZE, 'medium');
};

/**
 * Añade una entrada al historial de navegación
 * @param {Object} node - Nodo visitado
 */
export const addToNavigationHistory = (node) => {
  const history = getLocalStorage(STORAGE_KEYS.NAVIGATION_HISTORY, []);
  
  const newEntry = {
    titulo: node.titulo,
    link: node.link,
    timestamp: new Date().toISOString(),
  };
  
  // Evitar duplicados consecutivos
  if (history.length > 0 && history[0].link === node.link) {
    return;
  }
  
  // Añadir al principio y limitar a 10 entradas
  const updatedHistory = [newEntry, ...history].slice(0, 10);
  setLocalStorage(STORAGE_KEYS.NAVIGATION_HISTORY, updatedHistory);
};

/**
 * Obtiene el historial de navegación
 * @returns {Array} - Array de entradas del historial
 */
export const getNavigationHistory = () => {
  return getLocalStorage(STORAGE_KEYS.NAVIGATION_HISTORY, []);
};

/**
 * Limpia el historial de navegación
 */
export const clearNavigationHistory = () => {
  setLocalStorage(STORAGE_KEYS.NAVIGATION_HISTORY, []);
};

/**
 * Obtiene información sobre el uso del localStorage
 * @returns {Object} - Información sobre el storage
 */
export const getStorageInfo = () => {
  try {
    const keys = Object.values(STORAGE_KEYS);
    const items = {};
    let totalSize = 0;
    
    keys.forEach(key => {
      const value = localStorage.getItem(key);
      if (value) {
        const size = new Blob([value]).size;
        items[key] = {
          size: `${(size / 1024).toFixed(2)} KB`,
          preview: value.substring(0, 50) + '...'
        };
        totalSize += size;
      }
    });
    
    return {
      items,
      totalSize: `${(totalSize / 1024).toFixed(2)} KB`,
      maxSize: '~5 MB per domain'
    };
  } catch (error) {
    console.error('Error getting storage info:', error);
    return null;
  }
};

// Log inicial
console.log('🔑 LocalStorage utilities loaded');
console.log('📦 Storage Keys:', STORAGE_KEYS);

export default {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
  clearAppStorage,
  saveExpandedNodes,
  getExpandedNodes,
  saveActiveLink,
  getActiveLink,
  saveTheme,
  getTheme,
  saveFontSize,
  getFontSize,
  addToNavigationHistory,
  getNavigationHistory,
  clearNavigationHistory,
  getStorageInfo,
};