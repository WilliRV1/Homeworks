import React, { useState, useMemo } from 'react';
import { ListaDoble } from '../estructuras/ListaDoble';

const paginasMock = [
    { titulo: 'Página de Inicio', url: '/inicio' },
    { titulo: 'Página de Productos', url: '/productos' },
    { titulo: 'Página de Contacto', url: '/contacto' },
];

export const PaginaListaDoble = () => {
    const historialNavegacion = useMemo(() => {
        const lista = new ListaDoble();
        paginasMock.forEach(pagina => lista.agregar(pagina));
        return lista;
    }, []);

    const [nodoActual, setNodoActual] = useState(historialNavegacion.cabeza);

    const irSiguiente = () => {
        if (nodoActual && nodoActual.siguiente) {
            setNodoActual(nodoActual.siguiente);
        }
    };

    const irAnterior = () => {
        if (nodoActual && nodoActual.anterior) {
            setNodoActual(nodoActual.anterior);
        }
    };

    return (
        <div>
            <h1>Challenge 7: Lista Doble (Historial de Navegación)</h1>
            {nodoActual ? (
                <div>
                    <h2>Página Actual:</h2>
                    <p><strong>Título:</strong> {nodoActual.valor.titulo}</p>
                    <p><strong>URL:</strong> {nodoActual.valor.url}</p>
                </div>
            ) : (
                <p>No hay historial para mostrar.</p>
            )}
            <button onClick={irAnterior}>Anterior</button>
            <button onClick={irSiguiente}>Siguiente</button>
        </div>
    );
};