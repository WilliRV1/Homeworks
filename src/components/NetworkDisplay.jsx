import React, { useState } from 'react';

const VisualizacionRed = ({ network, onSelectCity, onDeleteCity, onConnectCities }) => {
  const [ciudad1, setCiudad1] = useState('');
  const [ciudad2, setCiudad2] = useState('');

  const ciudades = Array.from(network.ciudades.values());

  const aristas = [];
  ciudades.forEach((ciudad, indice) => {
    ciudad.conexiones.forEach(conexion => {
      const indiceConexion = ciudades.findIndex(c => c === conexion);
      if (indice < indiceConexion) { 
        aristas.push({ from: indice, to: indiceConexion });
      }
    });
  });

  const Handleconnect = (e) => {
    e.preventDefault();
    if (ciudad1 && ciudad2 && ciudad1 !== ciudad2) {
      onConnectCities(ciudad1, ciudad2);
      setCiudad1('');
      setCiudad2('');
    }
  };

  return (
    <div>
      <h3>Red de Ciudades</h3>
      <div className="network-graph" style={{ position: 'relative', width: '400px', height: '400px', border: '1px solid #ccc', margin: '20px 0' }}>
        {ciudades.map((ciudad, index) => {
          const angle = (2 * Math.PI * index) / ciudades.length;
          const x = 200 + 150 * Math.cos(angle);
          const y = 200 + 150 * Math.sin(angle);
          return (
            <div key={ciudad.nombre} className="graph-node" style={{ position: 'absolute', left: x - 15, top: y - 15 }} onClick={() => onSelectCity(ciudad)} title={ciudad.nombre}>
              {ciudad.nombre[0]}
            </div>
          );
        })}
        {aristas.map((arista, idx) => {
          const fromAngle = (2 * Math.PI * arista.from) / ciudades.length;
          const toAngle = (2 * Math.PI * arista.to) / ciudades.length;
          const fromX = 200 + 150 * Math.cos(fromAngle);
          const fromY = 200 + 150 * Math.sin(fromAngle);
          const toX = 200 + 150 * Math.cos(toAngle);
          const toY = 200 + 150 * Math.sin(toAngle);
          const dx = toX - fromX;
          const dy = toY - fromY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const angle = Math.atan2(dy, dx) * 180 / Math.PI;
        
          const offsetX = (dx / distance) * 15;
          const offsetY = (dy / distance) * 15;
          const startX = fromX + offsetX;
          const startY = fromY + offsetY;
          const endX = toX - offsetX;
          const endY = toY - offsetY;
          const edgeDistance = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
          return (
            <div key={idx} className="graph-edge" style={{ position: 'absolute', left: startX, top: startY - 1, width: edgeDistance, height: 2, transform: `rotate(${angle}deg)`, transformOrigin: '0 50%' }}></div>
          );
        })}
      </div>
      <h4>con Ciudades</h4>
      <form onSubmit={Handleconnect}>
        <select value={ciudad1} onChange={(e) => setCiudad1(e.target.value)} required>
          <option value="">Seleccionar Ciudad 1</option>
          {ciudades.map(ciudad => (
            <option key={ciudad.nombre} value={ciudad.nombre}>{ciudad.nombre}</option>
          ))}
        </select>
        <select value={ciudad2} onChange={(e) => setCiudad2(e.target.value)} required>
          <option value="">Seleccionar Ciudad 2</option>
          {ciudades.map(ciudad => (
            <option key={ciudad.nombre} value={ciudad.nombre}>{ciudad.nombre}</option>
          ))}
        </select>
        <button type="submit">conectar</button>
      </form>
      <ul>
        {ciudades.map(ciudad => (
          <li key={ciudad.nombre}>
            <button onClick={() => onSelectCity(ciudad)}>{ciudad.nombre}</button>
            <button onClick={() => onDeleteCity(ciudad.nombre)}>Eliminar</button>
            <span> Conexiones: {ciudad.conexiones.map(c => c.nombre).join(', ')}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VisualizacionRed;