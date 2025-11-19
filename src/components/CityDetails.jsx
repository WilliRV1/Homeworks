import React from 'react';
import ArbolZona from './ZoneTree';
import verCalculos from './CalculationsDisplay';

const DetallesCiudad = ({ city, network, onEditZone }) => {
  if (!city) return <div>selecciona una ciudad para ver detalles</div>;

  return (
    <div>
      <h3>Detalles para {city.nombre}</h3>
      <h4>Zonas Verdes</h4>
      <ul className="zone-tree">
        {city.zonasVerdes.map(zona => (
          <ArbolZona key={zona.nombre} zone={zona} onEditZone={onEditZone} />
        ))}
      </ul>
      <verCalculos city={city} network={network} />
    </div>
  );
};

export default DetallesCiudad;