import React, { useState } from 'react';
import BinaryTree from './components/BinaryTree';
import TreeControls from './components/TreeControls';
import { BinaryTree as ArbolBinario } from './utils/binaryTree';
import './styles/Tree.css';

function App() {
  const [arbol] = useState(() => new ArbolBinario());
  const [actualizar, setActualizar] = useState(0);

  const forzarActualizacion = () => {
    setActualizar(prev => prev + 1);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1> Challenge 14 - Árbol Binario</h1>
        <p className="subtitle">
          Implementación de árbol binario con inserción, búsqueda y recorridos
        </p>
      </header>

      <div className="app-container">
        <div className="controls-panel">
          <TreeControls 
            arbol={arbol} 
            onActualizar={forzarActualizacion} 
          />
        </div>

        <div className="visualization-panel">
          <BinaryTree arbol={arbol} key={actualizar} />
        </div>
      </div>

      <footer className="app-footer">
        <div className="instructions">
          <h3>💡 Instrucciones:</h3>
          <ul>
            <li>Inserta números para construir tu árbol binario</li>
            <li>Usa los botones de recorrido para ver los resultados en consola</li>
            <li>Busca valores para verificar su existencia</li>
            <li>Los valores menores van a la izquierda, los mayores a la derecha</li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default App;