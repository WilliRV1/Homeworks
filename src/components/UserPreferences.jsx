import React, { useState } from 'react';
import { 
  Moon, 
  Sun, 
  Type, 
  Trash2, 
  History, 
  Database,
  X 
} from 'lucide-react';
import {
  saveTheme,
  saveFontSize,
  clearAppStorage,
  clearNavigationHistory,
  getNavigationHistory,
  getStorageInfo
} from '../utils/localStorage';

const UserPreferences = ({ 
  theme, 
  onThemeChange, 
  fontSize, 
  onFontSizeChange,
  onNavigate 
}) => {
  const [showHistory, setShowHistory] = useState(false);
  const [showStorageInfo, setShowStorageInfo] = useState(false);
  const [history, setHistory] = useState(getNavigationHistory());
  const [storageInfo, setStorageInfo] = useState(null);

  const handleThemeChange = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    saveTheme(newTheme);
    onThemeChange(newTheme);
  };

  const handleFontSizeChange = (e) => {
    const newSize = e.target.value;
    saveFontSize(newSize);
    onFontSizeChange(newSize);
  };

  const handleClearAll = () => {
    if (window.confirm('¿Estás seguro de que quieres limpiar todos los datos guardados?')) {
      clearAppStorage();
      // Recargar para aplicar los cambios
      window.location.reload();
    }
  };

  const handleClearHistory = () => {
    clearNavigationHistory();
    setHistory([]);
    alert('Historial limpiado');
  };

  const handleShowHistory = () => {
    setHistory(getNavigationHistory());
    setShowHistory(true);
  };

  const handleShowStorageInfo = () => {
    const info = getStorageInfo();
    setStorageInfo(info);
    setShowStorageInfo(true);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="user-preferences">
      <div className="preferences-section">
        <h3>⚙️ Preferencias</h3>
        
        {/* Theme Toggle */}
        <div className="preference-item">
          <label>
            {theme === 'light' ? <Sun size={18} /> : <Moon size={18} />}
            <span>Tema</span>
          </label>
          <button 
            className={`theme-toggle ${theme}`}
            onClick={handleThemeChange}
            title={`Cambiar a tema ${theme === 'light' ? 'oscuro' : 'claro'}`}
          >
            {theme === 'light' ? 'Claro' : 'Oscuro'}
          </button>
        </div>

        {/* Font Size */}
        <div className="preference-item">
          <label>
            <Type size={18} />
            <span>Tamaño de Fuente</span>
          </label>
          <select 
            value={fontSize} 
            onChange={handleFontSizeChange}
            className="font-size-select"
          >
            <option value="small">Pequeño</option>
            <option value="medium">Mediano</option>
            <option value="large">Grande</option>
          </select>
        </div>
      </div>

      {/* Actions */}
      <div className="preferences-actions">
        <button 
          className="action-button history-button"
          onClick={handleShowHistory}
        >
          <History size={16} />
          Ver Historial
        </button>
        
        <button 
          className="action-button info-button"
          onClick={handleShowStorageInfo}
        >
          <Database size={16} />
          Info Storage
        </button>
        
        <button 
          className="action-button clear-button"
          onClick={handleClearAll}
        >
          <Trash2 size={16} />
          Limpiar Todo
        </button>
      </div>

      {/* History Modal */}
      {showHistory && (
        <div className="modal-overlay" onClick={() => setShowHistory(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>📜 Historial de Navegación</h3>
              <button 
                className="modal-close"
                onClick={() => setShowHistory(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              {history.length === 0 ? (
                <p className="empty-message">No hay historial aún</p>
              ) : (
                <>
                  <div className="history-list">
                    {history.map((entry, index) => (
                      <div 
                        key={index} 
                        className="history-entry"
                        onClick={() => {
                          onNavigate(entry.link);
                          setShowHistory(false);
                        }}
                      >
                        <div className="history-title">{entry.titulo}</div>
                        <div className="history-link">{entry.link}</div>
                        <div className="history-time">{formatDate(entry.timestamp)}</div>
                      </div>
                    ))}
                  </div>
                  <button 
                    className="clear-history-button"
                    onClick={handleClearHistory}
                  >
                    <Trash2 size={14} />
                    Limpiar Historial
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Storage Info Modal */}
      {showStorageInfo && storageInfo && (
        <div className="modal-overlay" onClick={() => setShowStorageInfo(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>💾 Información de Storage</h3>
              <button 
                className="modal-close"
                onClick={() => setShowStorageInfo(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div className="storage-summary">
                <div className="storage-stat">
                  <strong>Tamaño Total:</strong> {storageInfo.totalSize}
                </div>
                <div className="storage-stat">
                  <strong>Límite:</strong> {storageInfo.maxSize}
                </div>
              </div>
              
              <h4>Items Guardados:</h4>
              <div className="storage-items">
                {Object.entries(storageInfo.items).map(([key, value]) => (
                  <div key={key} className="storage-item">
                    <div className="storage-key">{key}</div>
                    <div className="storage-size">{value.size}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPreferences;