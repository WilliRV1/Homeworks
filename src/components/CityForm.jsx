import React, { useState } from 'react';

const CityForm = ({ onAddCity }) => {
  const [nombreCiudad, setNombreCiudad] = useState('');

  const HandleEnvio = (e) => {
    e.preventDefault();
    if (nombreCiudad.trim()) {
      onAddCity(nombreCiudad.trim());
      setNombreCiudad('');
    }
  };

  return (
    <div>
      <h3>Agregar Ciudad</h3>
      <form onSubmit={HandleEnvio}>
        <input
          type="text"
          value={nombreCiudad}
          onChange={(e) => setNombreCiudad(e.target.value)}
          placeholder="Nombre de la ciudad"
          required
        />
        <button type="submit">Agregar Ciudad</button>
      </form>
    </div>
  );
};

export default CityForm;