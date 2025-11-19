import { useState } from 'react';
import { Red } from './models';
import CityForm from './components/CityForm';
import FormularioZonaVerde from './components/GreenZoneForm';
import VisualizacionRed from './components/NetworkDisplay';
import './App.css';

function App() {
  const [red] = useState(new Red());
  const [dummy, setActualizar] = useState(0);

  const HandleAgregarCiudad = (nombre) => {
    try {
      red.agregarCiudad(nombre);
      setActualizar(prev => prev + 1);
    } catch (error) {
      alert(error.message);
    }
  };

  const HandleEliminarCiudad = (nombre) => {
    try {
      red.eliminarCiudad(nombre);
      setActualizar(prev => prev + 1);
    } catch (error) {
      alert(error.message);
    }
  };

  const HandleAgregarZona = (nombreCiudad, nombreZona, nombrePadre) => {
    try {
      red.agregarZonaVerde(nombreCiudad, nombreZona, nombrePadre);
      setActualizar(prev => prev + 1);
    } catch (error) {
      alert(error.message);
    }
  };

  const HandleSeleccionarCiudad = (ciudad) => {
  
    console.log('Ciudad seleccionada:', ciudad.nombre);
  };

  const HandleconnectCiudades = (nombre1, nombre2) => {
    try {
      red.connectCiudades(nombre1, nombre2);
      setActualizar(prev => prev + 1);
    } catch (error) {
      alert(error.message);
    }
  };

  const ciudades = Array.from(red.ciudades.values());

  const ZoneItem = ({ zone }) => (
    <li>
      {zone.nombre}
      {zone.subzonas.length > 0 && (
        <ul>
          {zone.subzonas.map(sub => (
            <ZoneItem key={sub.nombre} zone={sub} />
          ))}
        </ul>
      )}
    </li>
  );

  return (
    <div className="App">
      <h1>Ciudades con Zonas Verdes</h1>
      <CityForm onAddCity={HandleAgregarCiudad} />
      <FormularioZonaVerde
        cities={ciudades}
        onAddZone={HandleAgregarZona}
      />
      <VisualizacionRed
        network={red}
        onSelectCity={HandleSeleccionarCiudad}
        onDeleteCity={HandleEliminarCiudad}
        onConnectCities={HandleconnectCiudades}
      />
      <h2>Ciudades</h2>
      <ul>
        {ciudades.map(ciudad => (
          <li key={ciudad.nombre}>
            <h3>{ciudad.nombre}</h3>
            <button onClick={() => HandleEliminarCiudad(ciudad.nombre)}>Eliminar Ciudad</button>
            <h4>Zonas Verdes</h4>
            <ul className="zone-tree">
              {ciudad.zonasVerdes.map(zona => (
                <ZoneItem key={zona.nombre} zone={zona} />
              ))}
            </ul>
            <p>Altura Máxima: {red.getAlturaMaxima(ciudad.nombre)}</p>
            <p>Total de Zonas: {red.getTotalZonas(ciudad.nombre)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
