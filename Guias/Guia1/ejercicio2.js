const oracion = prompt("Ingrese una oración: ");
const palabras = oracion.split(" ");
const contador = palabras.length;

document.write(`oración ingresada: ${oracion}<br>`);
document.write(`número de palabras: ${contador}`);