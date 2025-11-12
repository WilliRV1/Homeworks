import React, { useState } from 'react';
import GraphVisualization from './components/GraphVisualization';
import CityPeopleList from './components/CityPeopleList';
import NodeDetails from './components/NodeDetails';
import { friendsCitiesGraph } from './Data/graphData';
import './styles/App.css';

function App() {
  const [selectedNode, setSelectedNode] = useState(null);
  const [activeView, setActiveView] = useState('graph');

  const handleNodeClick = (node) => {
    setSelectedNode(node);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Challenge 16 - Grafos</h1>
        <p>Grafo de Amigos y Ciudades</p>
      </header>

      <div className="view-tabs">
        <button 
          className={`tab ${activeView === 'graph' ? 'active' : ''}`}
          onClick={() => setActiveView('graph')}
        >
          📊 Visualización del Grafo
        </button>
        <button 
          className={`tab ${activeView === 'list' ? 'active' : ''}`}
          onClick={() => setActiveView('list')}
        >
          📋 Lista por Ciudad
        </button>
      </div>

      <div className="main-content">
        {activeView === 'graph' ? (
          <div className="graph-view">
            <GraphVisualization 
              graph={friendsCitiesGraph} 
              onNodeClick={handleNodeClick}
            />
            <NodeDetails 
              node={selectedNode} 
              graph={friendsCitiesGraph}
            />
          </div>
        ) : (
          <div className="list-view">
            <CityPeopleList graph={friendsCitiesGraph} />
          </div>
        )}
      </div>

      <footer className="app-footer">
        <p>Estructura de Datos II - Universidad Autónoma de Occidente</p>
      </footer>
    </div>
  );
}

export default App;