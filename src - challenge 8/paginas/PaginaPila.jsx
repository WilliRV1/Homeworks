import React, { useState } from 'react';
import { Pila } from '../estructuras/Pila';

const pilaInicial = new Pila();
pilaInicial.agregar({
    nombre: 'Cien Años de Soledad',
    isbn: '978-0307474728',
    autor: 'Gabriel García Márquez',
    editorial: 'Sudamericana',
});

export const PaginaPila = () => {
    const [pilaLibros, setPilaLibros] = useState(pilaInicial);
    const [nuevoLibro, setNuevoLibro] = useState({
        nombre: '',
        isbn: '',
        autor: '',
        editorial: '',
    });
    const [libros, setLibros] = useState(pilaLibros.obtenerItems());

    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setNuevoLibro({ ...nuevoLibro, [name]: value });
    };

    const agregarLibro = (e) => {
        e.preventDefault();
        pilaLibros.agregar(nuevoLibro);
        setLibros(pilaLibros.obtenerItems());
        setNuevoLibro({ nombre: '', isbn: '', autor: '', editorial: '' });
    };

    return (
        <div>
            <h1>Challenge 8: Pila de Libros</h1>
            <form onSubmit={agregarLibro}>
                <input name="nombre" value={nuevoLibro.nombre} onChange={manejarCambio} placeholder="Nombre del Libro" required />
                <input name="isbn" value={nuevoLibro.isbn} onChange={manejarCambio} placeholder="ISBN" required />
                <input name="autor" value={nuevoLibro.autor} onChange={manejarCambio} placeholder="Autor" required />
                <input name="editorial" value={nuevoLibro.editorial} onChange={manejarCambio} placeholder="Editorial" required />
                <button type="submit">Agregar Libro a la Pila</button>
            </form>

            <h2>Libros en la Pila</h2>
            <div>
                {libros.slice(0).reverse().map((libro, index) => (
                    <div key={index} style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
                        <p><strong>Nombre:</strong> {libro.nombre}</p>
                        <p><strong>Autor:</strong> {libro.autor}</p>
                        <p><strong>ISBN:</strong> {libro.isbn}</p>
                        <p><strong>Editorial:</strong> {libro.editorial}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};