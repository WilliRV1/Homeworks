// Clase Nodo
class Node {
  constructor(valor) {
    this.valor = valor;
    this.izquierda = null;
    this.derecha = null;
  }
}

// Clase Árbol Binario
class BinaryTree {
  constructor() {
    this.raiz = null;
  }

  // Insertar valor en el árbol
  insertar(valor) {
    const nuevoNodo = new Node(valor);
    
    if (this.raiz === null) {
      this.raiz = nuevoNodo;
      return;
    }

    this._insertarRecursivo(this.raiz, nuevoNodo);
  }

  _insertarRecursivo(nodoActual, nuevoNodo) {
    if (nuevoNodo.valor < nodoActual.valor) {
      // Insertar a la izquierda
      if (nodoActual.izquierda === null) {
        nodoActual.izquierda = nuevoNodo;
      } else {
        this._insertarRecursivo(nodoActual.izquierda, nuevoNodo);
      }
    } else {
      // Insertar a la derecha
      if (nodoActual.derecha === null) {
        nodoActual.derecha = nuevoNodo;
      } else {
        this._insertarRecursivo(nodoActual.derecha, nuevoNodo);
      }
    }
  }

  // Buscar valor en el árbol
  buscar(valor) {
    return this._buscarRecursivo(this.raiz, valor);
  }

  _buscarRecursivo(nodo, valor) {
    if (nodo === null) {
      return false;
    }

    if (valor === nodo.valor) {
      return true;
    }

    if (valor < nodo.valor) {
      return this._buscarRecursivo(nodo.izquierda, valor);
    } else {
      return this._buscarRecursivo(nodo.derecha, valor);
    }
  }

  // Recorrido PreOrden (Raíz -> Izquierda -> Derecha)
  preOrden() {
    const resultado = [];
    this._preOrdenRecursivo(this.raiz, resultado);
    return resultado;
  }

  _preOrdenRecursivo(nodo, resultado) {
    if (nodo !== null) {
      resultado.push(nodo.valor);
      this._preOrdenRecursivo(nodo.izquierda, resultado);
      this._preOrdenRecursivo(nodo.derecha, resultado);
    }
  }

  // Recorrido InOrden (Izquierda -> Raíz -> Derecha)
  inOrden() {
    const resultado = [];
    this._inOrdenRecursivo(this.raiz, resultado);
    return resultado;
  }

  _inOrdenRecursivo(nodo, resultado) {
    if (nodo !== null) {
      this._inOrdenRecursivo(nodo.izquierda, resultado);
      resultado.push(nodo.valor);
      this._inOrdenRecursivo(nodo.derecha, resultado);
    }
  }

  // Recorrido PostOrden (Izquierda -> Derecha -> Raíz)
  postOrden() {
    const resultado = [];
    this._postOrdenRecursivo(this.raiz, resultado);
    return resultado;
  }

  _postOrdenRecursivo(nodo, resultado) {
    if (nodo !== null) {
      this._postOrdenRecursivo(nodo.izquierda, resultado);
      this._postOrdenRecursivo(nodo.derecha, resultado);
      resultado.push(nodo.valor);
    }
  }

  // Obtener la raíz del árbol
  obtenerRaiz() {
    return this.raiz;
  }

  // Verificar si el árbol está vacío
  estaVacio() {
    return this.raiz === null;
  }
}

// Función para convertir el árbol binario al formato de react-d3-tree
export const convertirAFormatoD3 = (nodo) => {
  if (nodo === null) {
    return null;
  }

  const nodoD3 = {
    name: nodo.valor.toString(),
    attributes: {
      valor: nodo.valor
    }
  };

  const hijos = [];
  
  if (nodo.izquierda !== null) {
    hijos.push(convertirAFormatoD3(nodo.izquierda));
  }
  
  if (nodo.derecha !== null) {
    hijos.push(convertirAFormatoD3(nodo.derecha));
  }

  if (hijos.length > 0) {
    nodoD3.children = hijos;
  }

  return nodoD3;
};

export { BinaryTree, Node };