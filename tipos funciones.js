const persona = {
  nombre: "David",
    
  decirNombreRegular: function() {
    setTimeout(function() {
      // 'this' aquí no es 'persona'. Se pierde el contexto.
      console.log(`[Regular] Mi nombre es: ${this.nombre}`);
    });
  },

 
  decirNombreFlecha: function() {
    setTimeout(() => {
      // La función de flecha hereda el 'this' y funciona.
      console.log(`[Flecha]  Mi nombre es: ${this.nombre}`);
    }, 1000);
  }
};

console.log("Probando la diferencia de 'this':");
persona.decirNombreRegular(); 
persona.decirNombreFlecha(); 

//al ejecutar el temporizador en la funcion ya no sabe que "this" era "persona". Para ella, "this" ahora es el propio temporizador y por ello arroja undefined