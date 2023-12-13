const num = parseInt(prompt("Ingrese un número entero positivo: "));


if (isNaN(num) || num < 1) {
  alert("El número ingresado no es válido.");
} else {
  let sum = 0;

  for (let i = 2; i <= num; i += 2) {
    sum += i;
  }

  document.write(`La suma de todos los números pares desde 1 hasta ${num} es: ${sum}`);
}