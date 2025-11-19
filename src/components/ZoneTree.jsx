import React from 'react';

const ArbolZona = ({ zone, onEditZone }) => {
  return (
    <li className="tree-node">
      <span onClick={() => onEditZone(zone)} style={{ cursor: 'pointer' }}>{zone.nombre}</span>
      {zone.subzonas.length > 0 && (
        <ul className="arbol">
          {zone.subzonas.map(sub => (
            <ArbolZona key={sub.nombre} zone={sub} onEditZone={onEditZone} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default ArbolZona;