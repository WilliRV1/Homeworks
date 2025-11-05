import React from 'react';

const MainContent = ({ currentNode }) => {
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;