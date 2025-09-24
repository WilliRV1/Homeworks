export class Pila {
    constructor() {
        this.items = [];
    }

    agregar(elemento) {
        this.items.push(elemento);
    }

    sacar() {
        if (this.estaVacia()) {
            return null;
        }
        return this.items.pop();
    }

    verUltimo() {
        if (this.estaVacia()) {
            return null;
        }
        return this.items[this.items.length - 1];
    }

    estaVacia() {
        return this.items.length === 0;
    }

    obtenerItems() {
        return [...this.items];
    }
}