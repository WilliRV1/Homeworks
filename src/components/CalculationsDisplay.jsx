import React from 'react';

const verCalculos = ({ city, network }) => {
  if (!city) return null;

  const alturaMaxima = network.getAlturaMaxima(city.nombre);
  const totalZonas = network.getTotalZonas(city.nombre);

  return (
    <div>
      <h4>Cálculos para {city.nombre}</h4>
      <p>Altura Máxima: {alturaMaxima}</p>
      <p>Total de Zonas: {totalZonas}</p>
    </div>
  );
};

export default verCalculos;