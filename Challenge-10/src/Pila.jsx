import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { push, pop } from './store/slices/stackSlice';

export const Pila = () => {
  const { items } = useSelector((state) => state.stack);
  const dispatch = useDispatch();
  const [nuevoValor, setNuevoValor] = useState('');

  const agregarElemento = () => {
    if (!nuevoValor) return;
    dispatch(push(nuevoValor));
    setNuevoValor('');
  };

  return (
    <div>
      <h2>Pila (Stack)</h2>
      <div>
        <input 
          type="text"
          placeholder="Nuevo elemento"
          value={nuevoValor}
          onChange={(e) => setNuevoValor(e.target.value)}
        />
        <button onClick={agregarElemento}>
          Push (Agregar)
        </button>
        <button onClick={() => dispatch(pop())}>
          Pop (Quitar)
        </button>
      </div>

      <ul>
        {items.map((item, indice) => (
          <li key={indice}>{item}</li>
        ))}
      </ul>
    </div>
  );
};