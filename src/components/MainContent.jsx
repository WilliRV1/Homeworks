import React from 'react';
import { Database, Clock, Save } from 'lucide-react';

const MainContent = ({ currentNode, theme }) => {
  return (
    <div className="main-content">
      <div className="content-header">
        <h1>{currentNode.titulo}</h1>
        <p className="breadcrumb">{currentNode.link}</p>
      </div>
      
      <div className="content-body">
        <div className="content-card">
          <h2>Component: {currentNode.componente}</h2>
          <p>This is the content area for <strong>{currentNode.titulo}</strong></p>
          
          <div className="info-grid">
            <div className="info-item">
              <strong>Route:</strong> {currentNode.link}
            </div>
            <div className="info-item">
              <strong>Component:</strong> {currentNode.componente}
            </div>
            <div className="info-item">
              <strong>Children:</strong> {currentNode.hijos?.length || 0} items
            </div>
            <div className="info-item">
              <strong>Theme:</strong> {theme}
            </div>
          </div>
        </div>

        {/* Challenge 16 Info Card */}
        <div className="content-card challenge-info">
          <h2>📦 Challenge 16 - Local Storage Features</h2>
          <p>Esta aplicación ahora persiste su estado usando Local Storage:</p>
          
          <div className="features-list">
            <div className="feature-item">
              <Save className="feature-icon" size={24} />
              <div>
                <h3>Estado del Menú</h3>
                <p>Los nodos expandidos se guardan automáticamente</p>
              </div>
            </div>
            
            <div className="feature-item">
              <Clock className="feature-icon" size={24} />
              <div>
                <h3>Última Página</h3>
                <p>Al recargar, vuelves a donde estabas</p>
              </div>
            </div>
            
            <div className="feature-item">
              <Database className="feature-icon" size={24} />
              <div>
                <h3>Preferencias</h3>
                <p>Tema y tamaño de fuente persistentes</p>
              </div>
            </div>
          </div>

          <div className="instructions">
            <h3>🧪 Pruébalo:</h3>
            <ol>
              <li>Navega por el menú y expande algunos nodos</li>
              <li>Cambia el tema y el tamaño de fuente</li>
              <li>Recarga la página (F5)</li>
              <li>¡Todo se mantiene como lo dejaste! 🎉</li>
            </ol>
          </div>

          <div className="tech-details">
            <h3>🔧 Tecnología Usada:</h3>
            <div className="tech-grid">
              <div className="tech-item">
                <code>localStorage.setItem()</code>
                <span>Para guardar datos</span>
              </div>
              <div className="tech-item">
                <code>localStorage.getItem()</code>
                <span>Para recuperar datos</span>
              </div>
              <div className="tech-item">
                <code>JSON.stringify()</code>
                <span>Para serializar objetos</span>
              </div>
              <div className="tech-item">
                <code>JSON.parse()</code>
                <span>Para deserializar</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;