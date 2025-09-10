import { useState } from 'react';
import ListaImagenes from './ListaImagenes';
import FormularioImagen from './Formulario';
import Filtro from './Filtro';
import './App.css';


const IMAGENES_INICIALES = [
  { id: 10, title: 'FOTO 1', url: 'https://picsum.photos/id/10/200/300' },
  { id: 25, title: 'FOTO 2', url: 'https://picsum.photos/id/25/200/300' },
  { id: 30, title: 'FOTO 3', url: 'https://picsum.photos/id/30/200/300' },
  { id: 914, title: 'FOTO 4', url: 'https://picsum.photos/id/914/200/300' },
  { id: 1000, title: 'FOTO 5', url: 'https://picsum.photos/id/1000/200/300' },
  { id: 500, title: 'FOTO 6', url: 'https://picsum.photos/id/500/200/300' },
  { id: 320, title: 'FOTO 7', url: 'https://picsum.photos/id/320/200/300' },
  
];

function App() {

  const [imagenes, setImagenes] = useState(IMAGENES_INICIALES);
  const [textoFiltro, setTextoFiltro] = useState('');

 
  const agregarImagen = (titulo, id) => {
 
    
    const nuevaImagen = {
      id: id,
      title: titulo,
      url: `https://picsum.photos/id/${id}/200/300`,
    };
    
    setImagenes([imagenes, nuevaImagen]);
  };

  
  const imagenesFiltradas = imagenes.filter(imagen =>
    imagen.title.includes(textoFiltro)
  );

  return (
    <div >
      <p>
        <h1>Parcial 1 - William Reyes Valencia / 2215337</h1>
      </p>
      <main>
        <div className="controles">
          <FormularioImagen onAgregarImagen={agregarImagen} />
          <Filtro setTextoFiltro={setTextoFiltro} />
        </div>
        <ListaImagenes imagenes={imagenesFiltradas} />
      </main>
    </div>
  );
}

export default App;