// arreglos de ejemplo 
let animales = ['perro', 'gato', 'elefante', 'jirafa', 'tigre'];
console.log("Arreglo 'animales' inicial:", animales);

let numeros = [1, 2, 3, 4, 5];
console.log("Arreglo 'numeros':", numeros);

let numerosMixtos = [10, 5, 8, 1, 7, 2, 6];
console.log("Arreglo 'numerosMixtos':", numerosMixtos);

let arrayAnidado = [1, 2, [3, 4, [5, 6]]];
console.log("Arreglo 'arrayAnidado':", arrayAnidado);


animales.push('león', 'cebra');
console.log("Después de push():", animales);

animales.pop();
console.log("Después de pop():", animales);

animales.unshift('raton');
console.log("Después de unshift():", animales);

animales.shift();
console.log("Después de shift():", animales);

animales.splice(2, 1);
console.log("Después de splice() para eliminar:", animales);
animales.splice(1, 0, 'pato');
console.log("Después de splice() para agregar:", animales);

animales.reverse();
console.log("Después de reverse():", animales);

animales.sort();
console.log("Después de sort() en strings:", animales);
numerosMixtos.sort((a, b) => a - b);
console.log("Después de sort() en números:", numerosMixtos);

let arrayParaRellenar = new Array(5);
arrayParaRellenar.fill('hola');
console.log("Después de fill():", arrayParaRellenar);

let letras = ['a', 'b', 'c', 'd', 'e'];
letras.copyWithin(0, 3);
console.log("Después de copyWithin():", letras);

let masAnimales = ['oso', 'aguila'];
let todosLosAnimales = animales.concat(masAnimales);
console.log("Resultado de concat():", todosLosAnimales);

let algunosAnimales = todosLosAnimales.slice(1, 4);
console.log("Resultado de slice():", algunosAnimales);

let numerosDobles = numeros.map(numero => numero * 2);
console.log("Resultado de map():", numerosDobles);

let numerosPares = numerosMixtos.filter(numero => numero % 2 === 0);
console.log("Resultado de filter():", numerosPares);

let arrayAplanado = arrayAnidado.flat(2);
console.log("Resultado de flat():", arrayAplanado);

let frases = ["hola mundo", "javascript es genial"];
let palabras = frases.flatMap(frase => frase.split(' '));
console.log("Resultado de flatMap():", palabras);



let animalEncontrado = todosLosAnimales.find(animal => animal.length > 5);
console.log("Resultado de find():", animalEncontrado);


let indiceEncontrado = todosLosAnimales.findIndex(animal => animal.length > 5);
console.log("Resultado de findIndex():", indiceEncontrado);


let ultimoAnimal = todosLosAnimales.findLast(animal => animal.startsWith('p'));
console.log("Resultado de findLast():", ultimoAnimal);


let ultimoIndice = todosLosAnimales.findLastIndex(animal => animal.startsWith('p'));
console.log("Resultado de findLastIndex():", ultimoIndice);


let suma = numeros.reduce((acumulador, actual) => acumulador + actual, 0);
console.log("Resultado de reduce():", suma);

let cadenaInvertida = letras.reduceRight((acc, letra) => acc + letra, '');
console.log("Resultado de reduceRight():", cadenaInvertida);

let todosPositivos = numeros.every(num => num > 0);
console.log("Resultado de every():", todosPositivos);

let algunPar = numerosMixtos.some(num => num % 2 === 0);
console.log("Resultado de some():", algunPar);

let tieneElefante = animales.includes('elefante');
console.log("Resultado de includes():", tieneElefante);

let indiceGato = animales.indexOf('gato');
console.log("Resultado de indexOf():", indiceGato);

let ultimoIndiceA = ['a', 'b', 'c', 'a'].lastIndexOf('a');
console.log("Resultado de lastIndexOf():", ultimoIndiceA);

let animalesEnCadena = animales.join(' - ');
console.log("Resultado de join():", animalesEnCadena);

console.log("Resultado de toString():", numeros.toString());

let numerosGrandes = [123456.789];
console.log("Resultado de toLocaleString():", numerosGrandes.toLocaleString('de-DE'));

console.log("Elemento con at(1):", animales.at(1));
console.log("Elemento con at(-1):", animales.at(-1));

console.log("Recorriendo con forEach:");
animales.forEach(animal => console.log(`- ${animal}`));

console.log("Iterando con entries():");
for (const [indice, valor] of animales.entries()) {
    console.log(`Índice ${indice}: ${valor}`);
}

console.log("Iterando con keys():");
for (const indice of animales.keys()) {
    console.log(indice);
}

console.log("Iterando con values():");
for (const valor of animales.values()) {
    console.log(valor);
}
