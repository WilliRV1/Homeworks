import { useState } from 'react';

function FormularioImagen({ onAgregarImagen }) {
  const [titulo, setTitulo] = useState('');
  const [idImagen, setIdImagen] = useState('');

  const handleSubmit = (e) => {
   


    
    onAgregarImagen(titulo, parseInt(idImagen));
    
     
    setTitulo('');
    setIdImagen('');
  };

  return (
    <form onSubmit={handleSubmit} >
      <h3>Añadir Nueva Imagen</h3>
      <input
        type="text"
        placeholder="Titulo"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Nuevo ID"
        value={idImagen}
        onChange={(e) => setIdImagen(e.target.value)}
        required
      />
      <button type="submit">Añadir</button>
    </form>
  );
}

export default FormularioImagen;