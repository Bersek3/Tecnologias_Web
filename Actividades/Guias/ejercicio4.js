const input = prompt("Ingrese palabras separadas con coma (,): ");
if (!input.includes(".") && input.includes(",")) {
  const palabras = input.split(",");
  let palabraLarga = palabras[0];

  for (let i = 1; i < palabras.length; i++) {
    if (palabras[i].length > palabraLarga.length) {
      palabraLarga = palabras[i];
    }
  }

  document.write(`La palabra mas larga es: ${palabraLarga}`);
} else {
  document.write("Entrada inválida. Por favor ingrese palabras separadas por comas (,).");
}