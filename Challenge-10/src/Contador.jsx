import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment, incrementBy } from './store/slices/counterSlice';

export const Contador = () => {
  const { count } = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  const [valorIncremento, setValorIncremento] = useState(2);

  return (
    <div>
      <h2>Contador</h2>
      <p>Valor: {count}</p>
      
      <button onClick={() => dispatch(increment())}>
        Incrementar
      </button>
      
      <button onClick={() => dispatch(decrement())}>
        Decrementar
      </button>

      <div>
        <input 
          type="number" 
          value={valorIncremento} 
          onChange={(e) => setValorIncremento(Number(e.target.value))} 
        />
        <button onClick={() => dispatch(incrementBy(valorIncremento))}>
          Incrementar por valor
        </button>
      </div>
    </div>
  );
};