import React, { useState } from 'react';
import { Graph } from 'react-d3-graph';
import { Users, MapPin, UserCircle } from 'lucide-react';

const GraphVisualization = ({ graph, onNodeClick }) => {
  const [hoveredNode, setHoveredNode] = useState(null);

  // Configuración del grafo para react-d3-graph
  const graphConfig = {
    automaticRearrangeAfterDropNode: false,
    collapsible: false,
    directed: false,
    focusAnimationDuration: 0.75,
    focusZoom: 1,
    freezeAllDragEvents: false,
    height: 600,
    highlightDegree: 1,
    highlightOpacity: 0.2,
    linkHighlightBehavior: true,
    maxZoom: 3,
    minZoom: 0.3,
    nodeHighlightBehavior: true,
    panAndZoom: false,
    staticGraph: false,
    staticGraphWithDragAndDrop: false,
    width: 1000,
    d3: {
      alphaTarget: 0.05,
      gravity: -250,
      linkLength: 150,
      linkStrength: 1,
      disableLinkForce: false
    },
    node: {
      color: '#10b981',
      fontColor: '#000000',
      fontSize: 12,
      fontWeight: 'bold',
      highlightColor: '#ef4444',
      highlightFontSize: 14,
      highlightFontWeight: 'bold',
      highlightStrokeColor: '#ef4444',
      highlightStrokeWidth: 2,
      labelProperty: 'name',
      mouseCursor: 'pointer',
      opacity: 1,
      renderLabel: true,
      size: 400,
      strokeColor: '#ffffff',
      strokeWidth: 2,
      svg: '',
      symbolType: 'circle'
    },
    link: {
      color: '#94a3b8',
      fontColor: '#64748b',
      fontSize: 10,
      fontWeight: 'normal',
      highlightColor: '#3b82f6',
      highlightFontSize: 10,
      highlightFontWeight: 'normal',
      labelProperty: 'label',
      mouseCursor: 'pointer',
      opacity: 1,
      renderLabel: false,
      semanticStrokeWidth: false,
      strokeWidth: 2,
      markerHeight: 6,
      markerWidth: 6,
      strokeDasharray: 0,
      strokeDashoffset: 0,
      strokeLinecap: 'butt'
    }
  };

  // Convertir el grafo a formato D3
  const d3Data = graph.toD3Format();

  const handleNodeClick = (nodeId) => {
    const node = graph.searchNode(nodeId);
    if (onNodeClick && node) {
      onNodeClick(node);
    }
  };

  const handleMouseOverNode = (nodeId) => {
    const node = graph.searchNode(nodeId);
    setHoveredNode(node);
  };

  const handleMouseOutNode = () => {
    setHoveredNode(null);
  };

  // Calcular estadísticas
  const cities = graph.getNodesByType('city');
  const people = graph.getNodesByType('person');
  const totalConnections = Object.values(graph.adjacency).reduce((sum, list) => sum + list.length, 0) / 2;

  return (
    <div className="graph-visualization">
      <div className="graph-header">
        <h2>Grafo de Amigos y Ciudades</h2>
        <div className="graph-stats">
          <div className="stat-item">
            <MapPin size={20} />
            <span>{cities.length} Ciudades</span>
          </div>
          <div className="stat-item">
            <Users size={20} />
            <span>{people.length} Personas</span>
          </div>
          <div className="stat-item">
            <UserCircle size={20} />
            <span>{totalConnections} Conexiones</span>
          </div>
        </div>
      </div>

      <div className="graph-legend">
        <div className="legend-item">
          <div className="legend-circle" style={{ backgroundColor: '#3b82f6' }}></div>
          <span>Ciudades (Cuadrados)</span>
        </div>
        <div className="legend-item">
          <div className="legend-circle" style={{ backgroundColor: '#10b981' }}></div>
          <span>Personas (Círculos)</span>
        </div>
      </div>

      <div className="graph-container">
        <Graph
          id="friends-cities-graph"
          data={d3Data}
          config={graphConfig}
          onClickNode={handleNodeClick}
          onMouseOverNode={handleMouseOverNode}
          onMouseOutNode={handleMouseOutNode}
        />
      </div>

      {hoveredNode && (
        <div className="node-tooltip">
          <h4>{hoveredNode.name}</h4>
          {hoveredNode.type === 'person' && (
            <>
              <p>Edad: {hoveredNode.age} años</p>
              <p>Ciudad: {graph.getPersonCity(hoveredNode.id)?.name}</p>
              <p>Amigos: {graph.getFriends(hoveredNode.id).length}</p>
            </>
          )}
          {hoveredNode.type === 'city' && (
            <>
              <p>Tipo: Ciudad</p>
              <p>Habitantes: {graph.getPeopleInCity(hoveredNode.id).length}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default GraphVisualization;