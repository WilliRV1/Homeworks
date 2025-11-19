//William Reyes Valencia
class ZonaVerde {
  constructor(nombre, padre = null) {
    this.nombre = nombre;
    this.padre = padre;
    this.subzonas = [];
  }
}

class Ciudad {
  constructor(nombre) {
    this.nombre = nombre;
    this.zonasVerdes = [];
    this.conexiones = [];
  }
}

class Red {
  constructor() {
    this.ciudades = new Map();

    this.agregarCiudad('Bogota');
    this.agregarCiudad('Medellin');
    this.agregarCiudad('Cali');
    this.agregarCiudad('Barranquilla');

    this.conectarCiudades('Bogota', 'Medellin');
    this.conectarCiudades('Medellin', 'Cali');
    this.conectarCiudades('Cali', 'Barranquilla');
    this.conectarCiudades('Bogota', 'Barranquilla');

    this.agregarZonaVerde('Bogota', 'Parque Nacional');
    this.agregarZonaVerde('Bogota', 'Zona A', 'Parque Nacional');
    this.agregarZonaVerde('Bogota', 'Zona B', 'Parque Nacional');
    this.agregarZonaVerde('Bogota', 'Subzona A1', 'Zona A');
    this.agregarZonaVerde('Bogota', 'Subzona A2', 'Zona A');

    this.agregarZonaVerde('Medellin', 'Parque Lleras');
    this.agregarZonaVerde('Medellin', 'Sector Norte', 'Parque Lleras');
    this.agregarZonaVerde('Medellin', 'Sector Sur', 'Parque Lleras');

    this.agregarZonaVerde('Cali', 'Parque del Amor');
    this.agregarZonaVerde('Cali', 'Area Verde 1', 'Parque del Amor');

    this.agregarZonaVerde('Barranquilla', 'Parque Washington');
    this.agregarZonaVerde('Barranquilla', 'Zona Costera', 'Parque Washington');
    this.agregarZonaVerde('Barranquilla', 'Subzona C1', 'Zona Costera');
  }

  agregarCiudad(nombre) {
    if (this.ciudades.has(nombre)) {
      throw new Error(`La ciudad ${nombre} ya existe`);
    }
    const ciudad = new Ciudad(nombre);
    this.ciudades.set(nombre, ciudad);
    return ciudad;
  }

  eliminarCiudad(nombre) {
    if (!this.ciudades.has(nombre)) {
      throw new Error(`La ciudad ${nombre} no existe`);
    }
    const ciudad = this.ciudades.get(nombre);
    ciudad.conexiones.forEach(conexion => {
      conexion.conexiones = conexion.conexiones.filter(c => c !== ciudad);
    });
    this.ciudades.delete(nombre);
  }

  conectarCiudades(nombre1, nombre2) {
    if (nombre1 === nombre2) {
      throw new Error('No se puede conectar una ciudad consigo misma');
    }
    const ciudad1 = this.ciudades.get(nombre1);
    const ciudad2 = this.ciudades.get(nombre2);
    if (!ciudad1 || !ciudad2) {
      throw new Error('Una de las ciudades no existe');
    }
    if (!ciudad1.conexiones.includes(ciudad2)) {
      ciudad1.conexiones.push(ciudad2);
      ciudad2.conexiones.push(ciudad1);
    }
  }


  agregarZonaVerde(nombreCiudad, nombreZona, nombrePadre = null) {
    const ciudad = this.ciudades.get(nombreCiudad);
    if (!ciudad) {
      throw new Error(`La ciudad ${nombreCiudad} no existe`);
    }
    if (this._zonaExiste(ciudad, nombreZona)) {
      throw new Error(`La zona verde ${nombreZona} ya existe en la ciudad ${nombreCiudad}`);
    }
    const zona = new ZonaVerde(nombreZona);
    if (nombrePadre === null) {
      ciudad.zonasVerdes.push(zona);
    } else {
      const padre = this._encontrarZona(ciudad, nombrePadre);
      if (!padre) {
        throw new Error(`La zona padre ${nombrePadre} no existe en la ciudad ${nombreCiudad}`);
      }
      padre.subzonas.push(zona);
      zona.padre = padre;
    }
    return zona;
  }

  editarZonaVerde(nombreCiudad, nombreZona, nuevoNombre, nuevoNombrePadre = null) {
    const ciudad = this.ciudades.get(nombreCiudad);
    if (!ciudad) {
      throw new Error(`La ciudad ${nombreCiudad} no existe`);
    }
    const zona = this._encontrarZona(ciudad, nombreZona);
    if (!zona) {
      throw new Error(`La zona verde ${nombreZona} no existe en la ciudad ${nombreCiudad}`);
    }
    if (nuevoNombre !== nombreZona && this._zonaExiste(ciudad, nuevoNombre)) {
      throw new Error(`La zona verde ${nuevoNombre} ya existe en la ciudad ${nombreCiudad}`);
    }
    zona.nombre = nuevoNombre;
    if (nuevoNombrePadre !== null) {
     
      if (zona.padre) {
        zona.padre.subzonas = zona.padre.subzonas.filter(z => z !== zona);
      } else {
        ciudad.zonasVerdes = ciudad.zonasVerdes.filter(z => z !== zona);
      }
     
      const nuevoPadre = this._encontrarZona(ciudad, nuevoNombrePadre);
      if (!nuevoPadre) {
        throw new Error(`La nueva zona padre ${nuevoNombrePadre} no existe en la ciudad ${nombreCiudad}`);
      }
      nuevoPadre.subzonas.push(zona);
      zona.padre = nuevoPadre;
    }
  }

  _encontrarZona(ciudad, nombreZona) {
    const pila = [...ciudad.zonasVerdes];
    while (pila.length > 0) {
      const zona = pila.pop();
      if (zona.nombre === nombreZona) return zona;
      pila.push(...zona.subzonas);
    }
    return null;
  }

  _zonaExiste(ciudad, nombreZona) {
    return this._encontrarZona(ciudad, nombreZona) !== null;
  }

  getAlturaMaxima(nombreCiudad) {
    const ciudad = this.ciudades.get(nombreCiudad);
    if (!ciudad) {
      throw new Error(`La ciudad ${nombreCiudad} no existe`);
    }
    let alturaMaxima = 0;
    for (const raiz of ciudad.zonasVerdes) {
      const altura = this._getAltura(raiz);
      if (altura > alturaMaxima) alturaMaxima = altura;
    }
    return alturaMaxima;
  }

  _getAltura(zona) {
    if (zona.subzonas.length === 0) return 1;
    let maxSub = 0;
    for (const sub of zona.subzonas) {
      const alturaSub = this._getAltura(sub);
      if (alturaSub > maxSub) maxSub = alturaSub;
    }
    return 1 + maxSub;
  }

  getTotalZonas(nombreCiudad) {
    const ciudad = this.ciudades.get(nombreCiudad);
    if (!ciudad) {
      throw new Error(`La ciudad ${nombreCiudad} no existe`);
    }
    let total = 0;
    for (const raiz of ciudad.zonasVerdes) {
      total += this._contarZonas(raiz);
    }
    return total;
  }

  _contarZonas(zona) {
    let count = 1;
    for (const sub of zona.subzonas) {
      count += this._contarZonas(sub);
    }
    return count;
  }
}

export { ZonaVerde, Ciudad, Red };