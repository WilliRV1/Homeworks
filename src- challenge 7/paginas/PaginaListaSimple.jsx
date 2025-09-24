import React, { useState, useMemo } from 'react';
import { ListaSimple } from '../estructuras/ListaSimple';

const cancionesMock = [
    { nombre: 'Bohemian Rhapsody', artista: 'Queen' },
    { nombre: 'Hotel California', artista: 'Eagles' },
    { nombre: 'Stairway to Heaven', artista: 'Led Zeppelin' },
];

export const PaginaListaSimple = () => {
    const listaDeCanciones = useMemo(() => {
        const lista = new ListaSimple();
        cancionesMock.forEach(cancion => lista.agregar(cancion));
        return lista;
    }, []);

    const [nodoActual, setNodoActual] = useState(listaDeCanciones.cabeza);

    const irSiguiente = () => {
        if (nodoActual && nodoActual.siguiente) {
            setNodoActual(nodoActual.siguiente);
        } else {
            alert('Fin de la lista de reproducción');
        }
    };

    return (
        <div>
            <h1>Challenge 7: Lista Simple (Reproductor de Música)</h1>
            {nodoActual ? (
                <div>
                    <h2>Reproduciendo ahora:</h2>
                    <p><strong>Canción:</strong> {nodoActual.valor.nombre}</p>
                    <p><strong>Artista:</strong> {nodoActual.valor.artista}</p>
                </div>
            ) : (
                <p>No hay ninguna canción para mostrar.</p>
            )}
            <button onClick={irSiguiente}>Siguiente Canción</button>
        </div>
    );
};