import React from 'react';
import Tree from 'react-d3-tree';
import { convertirAFormatoD3 } from '../utils/binaryTree';

const BinaryTree = ({ arbol }) => {
  const raiz = arbol.obtenerRaiz();

  if (raiz === null) {
    return (
      <div className="tree-empty">
        <div className="empty-message">
          <h2>🌳 Árbol Vacío</h2>
          <p>Comienza insertando valores para visualizar el árbol binario</p>
        </div>
      </div>
    );
  }

  const datosArbol = convertirAFormatoD3(raiz);

  // Configuración personalizada para los nodos
  const nodeSize = { x: 200, y: 100 };
  const separation = { siblings: 1, nonSiblings: 1.5 };

  // Estilos personalizados para los nodos
  const renderCustomNode = ({ nodeDatum }) => (
    <g>
      <circle r="25" fill="#4A90E2" stroke="#2E5C8A" strokeWidth="2" />
      <text
        fill="white"
        strokeWidth="0"
        x="0"
        y="5"
        textAnchor="middle"
        style={{ fontSize: '16px', fontWeight: 'bold' }}
      >
        {nodeDatum.name}
      </text>
    </g>
  );

  return (
    <div className="tree-visualization">
      <div className="tree-header">
        <h2>🌳 Visualización del Árbol Binario</h2>
        <p className="tree-info">
          Recuerda: Valores menores a la izquierda, mayores a la derecha
        </p>
      </div>
      <div className="tree-container">
        <Tree
          data={datosArbol}
          orientation="vertical"
          pathFunc="step"
          nodeSize={nodeSize}
          separation={separation}
          translate={{ x: 400, y: 80 }}
          renderCustomNodeElement={renderCustomNode}
          collapsible={false}
          zoom={0.8}
          scaleExtent={{ min: 0.1, max: 2 }}
          enableLegacyTransitions
        />
      </div>
    </div>
  );
};

export default BinaryTree;