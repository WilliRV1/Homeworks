import React, { useState } from 'react';

const TreeControls = ({ arbol, onActualizar }) => {
  const [valorInsertar, setValorInsertar] = useState('');
  const [valorBuscar, setValorBuscar] = useState('');
  const [mensaje, setMensaje] = useState('');

  const manejarInsertar = () => {
    const valor = parseInt(valorInsertar);
    
    if (isNaN(valor)) {
      setMensaje('  ingresa un número válido');
      return;
    }

    arbol.insertar(valor);
    setMensaje(` Valor ${valor} insertado correctamente`);
    setValorInsertar('');
    onActualizar();
    
    setTimeout(() => setMensaje(''), 3000);
  };


  const mostrarPreOrden = () => {
    if (arbol.estaVacio()) {
      setMensaje(' El árbol está vacío');
      return;
    }

    const resultado = arbol.preOrden();
    console.log(' PreOrden (Raíz → Izq → Der):', resultado);
    setMensaje(` PreOrden: [${resultado.join(', ')}]`);
    
    setTimeout(() => setMensaje(''), 5000);
  };

  const mostrarInOrden = () => {
    if (arbol.estaVacio()) {
      setMensaje(' El árbol está vacío');
      return;
    }

    const resultado = arbol.inOrden();
    console.log(' InOrden (Izq → Raíz → Der):', resultado);
    setMensaje(` InOrden: [${resultado.join(', ')}]`);
    
    setTimeout(() => setMensaje(''), 5000);
  };

  const mostrarPostOrden = () => {
    if (arbol.estaVacio()) {
      setMensaje('⚠️ El árbol está vacío');
      return;
    }

    const resultado = arbol.postOrden();
    console.log(' PostOrden (Izq → Der → Raíz):', resultado);
    setMensaje(` PostOrden: [${resultado.join(', ')}]`);
    
    setTimeout(() => setMensaje(''), 5000);
  };

  const insertarEjemplo = () => {
    const valores = [25, 15, 50, 10, 22, 35, 70];
    valores.forEach(val => arbol.insertar(val));
    setMensaje(` Árbol de ejemplo creado con valores: ${valores.join(', ')}`);
    onActualizar();
    
    setTimeout(() => setMensaje(''), 3000);
  };

  return (
    <div className="tree-controls">
      <div className="control-section">
        <h3>📥 Insertar Valor</h3>
        <div className="control-group">
          <input
            type="number"
            value={valorInsertar}
            onChange={(e) => setValorInsertar(e.target.value)}
            placeholder="Ingresa un número"
            onKeyPress={(e) => e.key === 'Enter' && manejarInsertar()}
          />
          <button onClick={manejarInsertar} className="btn-primary">
            Insertar
          </button>
        </div>
      </div>

      

      <div className="control-section">
        <h3> Recorridos</h3>
        <div className="button-group">
          <button onClick={mostrarPreOrden} className="btn-traversal">
            PreOrden
          </button>
          <button onClick={mostrarInOrden} className="btn-traversal">
            InOrden
          </button>
          <button onClick={mostrarPostOrden} className="btn-traversal">
            PostOrden
          </button>
        </div>
      </div>

      <div className="control-section">
        <button onClick={insertarEjemplo} className="btn-example">
          📋 Insertar Árbol de Ejemplo
        </button>
      </div>

      {mensaje && (
        <div className={`mensaje ${mensaje.includes('❌') ? 'error' : 'success'}`}>
          {mensaje}
        </div>
      )}
    </div>
  );
};

export default TreeControls;