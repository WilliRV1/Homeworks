import React, { useState } from 'react';

const FormularioZonaVerde = ({ cities, onAddZone }) => {
  const [nombreCiudad, setNombreCiudad] = useState('');
  const [nombreZona, setNombreZona] = useState('');
  const [nombrePadre, setNombrePadre] = useState('');

  const HandleEnvio = (e) => {
    e.preventDefault();
    if (!nombreCiudad || !nombreZona.trim()) return;
    onAddZone(nombreCiudad, nombreZona.trim(), nombrePadre.trim() || null);
    setNombreZona('');
    setNombrePadre('');
  };

  return (
    <div>
      <h3>agregar Zona Verde</h3>
      <form onSubmit={HandleEnvio}>
        <select value={nombreCiudad} onChange={(e) => setNombreCiudad(e.target.value)} required>
          <option value="">seleccionar Ciudad</option>
          {cities.map(ciudad => (
            <option key={ciudad.nombre} value={ciudad.nombre}>{ciudad.nombre}</option>
          ))}
        </select>
        <input
          type="text"
          value={nombreZona}
          onChange={(e) => setNombreZona(e.target.value)}
          placeholder="Nombre de la zona"
          required
        />
        <input
          type="text"
          value={nombrePadre}
          onChange={(e) => setNombrePadre(e.target.value)}
          placeholder="Nombre de la zona padre"
        />
        <button type="submit">Agregar Zona</button>
      </form>
    </div>
  );
};

export default FormularioZonaVerde;