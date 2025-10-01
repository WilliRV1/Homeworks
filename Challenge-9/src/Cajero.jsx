import React, { useState } from 'react';

export const Cajero = () => {
  const datosIniciales = [
    { nombre: 'Juan', monto: 50 },
    { nombre: 'Maria', monto: 100 },
  ];

  const [fila, setFila] = useState(datosIniciales);
  const [nombre, setNombre] = useState('');
  const [monto, setMonto] = useState('');

  const agregarPersona = (evento) => {
    evento.preventDefault();
    if (!nombre || !monto) return;

    const nuevaPersona = {
      nombre: nombre,
      monto: Number(monto),
    };

    setFila([...fila, nuevaPersona]);
    setNombre('');
    setMonto('');
  };

  return (
    <div>
      <h2>Personas en la Fila</h2>
      <form onSubmit={agregarPersona}>
        <input
          type="text"
          placeholder="Nombre de la persona"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="number"
          placeholder="Monto a retirar"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
        />
        <button type="submit">Agregar a la Fila</button>
      </form>

      <ul>
        {fila.map((persona, indice) => (
          <li key={indice}>
            {persona.nombre} - Retiro: ${persona.monto}
          </li>
        ))}
      </ul>
    </div>
  );
};