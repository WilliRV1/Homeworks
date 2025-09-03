import React, { createContext, useContext, useState } from 'react';

const USUARIOS_FICTICIOS = [
  { id: 1, nombreUsuario: 'admin', key: 'admin123', rol: 'admin' },
  { id: 2, nombreUsuario: 'user', key: 'user123', rol: 'user' },
  { id: 3, nombreUsuario: 'demo', key: 'demo123', rol: 'demo' }
];

const ContextoAutenticacion = createContext();

const autenticador = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [Cargando, setCargando] = useState(false);

  const iniciarSesion = async (nombreUsuario, key) => {
    setCargando(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const usuarioEncontrado = USUARIOS_FICTICIOS.find(
      u => u.nombreUsuario === nombreUsuario && u.key === key
    );
    
    if (usuarioEncontrado) {
      const { key: _, ...usuarioSinkey } = usuarioEncontrado;
      setUsuario(usuarioSinkey);
      setCargando(false);
      return { exito: true };
    } else {
      setCargando(false);
      return { exito: false, error: 'Credenciales inválidas' };
    }
  };

  const cerrarSesion = () => {
    setUsuario(null);
  };

  return (
    <ContextoAutenticacion.Provider value={{ usuario, iniciarSesion, cerrarSesion, Cargando }}>
      {children}
    </ContextoAutenticacion.Provider>
  );
};

const usarAutenticacion = () => {
  return useContext(ContextoAutenticacion);
};

const InicioSesion = ({ Navegar }) => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [key, setkey] = useState('');
  const [error, setError] = useState('');
  const { iniciarSesion, Cargando } = usarAutenticacion();

  const iniciosesion = async () => {
    setError('');
    const resultado = await iniciarSesion(nombreUsuario, key);
    
    if (resultado.exito) {
      Navegar('panel');
    } else {
      setError(resultado.error);
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <input
        type="text"
        value={nombreUsuario}
        onChange={(e) => setNombreUsuario(e.target.value)}
        placeholder="Nombre de Usuario"
        disabled={Cargando}
      />
      <input
        type="password"
        value={key}
        onChange={(e) => setkey(e.target.value)}
        placeholder="Contraseña"
        disabled={Cargando}
      />
      {error && <p>{error}</p>}
      <button onClick={iniciosesion} disabled={Cargando}>
        {Cargando ? 'Iniciando...' : 'Entrar'}
      </button>
    </div>
  );
};

const RutaProtegida = ({ children }) => {
  const { usuario } = usarAutenticacion();
  if (!usuario) {
    return <p>Acceso denegado. Debes iniciar sesión.</p>;
  }
  return children;
};

const Panel = ({ Navegar }) => {
  const { usuario, cerrarSesion } = usarAutenticacion();

  const manejarCierreSesion = () => {
    cerrarSesion();
    Navegar('inicio');
  };

  return (
    <RutaProtegida>
      <div>
        <h1>Panel de Control</h1>
        <p>¡Bienvenido, {usuario?.nombreUsuario}!</p>
        <button onClick={() => Navegar('perfil')}>Ir al Perfil</button>
        <button onClick={manejarCierreSesion}>Cerrar Sesión</button>
      </div>
    </RutaProtegida>
  );
};

const Perfil = ({ Navegar }) => {
  const { usuario } = usarAutenticacion();
  return (
    <RutaProtegida>
       <div>
        <h1>Perfil del Usuario</h1>
        <p>Nombre: {usuario?.nombreUsuario}</p>
        <p>Rol: {usuario?.rol}</p>
        <button onClick={() => Navegar('panel')}>Volver al Panel</button>
       </div>
    </RutaProtegida>
  );
};

const AppDeAutenticacion = () => {
  const [rutaActual, setRutaActual] = useState('inicio');

  const navegar = (ruta) => {
    setRutaActual(ruta);
  };

  const renderizarRuta = () => {
    switch (rutaActual) {
      case 'inicio':
        return <InicioSesion Navegar={navegar} />;
      case 'panel':
        return <Panel Navegar={navegar} />;
      case 'perfil':
        return <Perfil Navegar={navegar} />;
      default:
        return <InicioSesion Navegar={navegar} />;
    }
  };

  return (
    <autenticador>
      {renderizarRuta()}
    </autenticador>
  );
};

export default AppDeAutenticacion;
