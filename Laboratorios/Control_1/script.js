
const frase = prompt("Ingrese una frase:"); 
const letra = prompt("Ingrese una letra:"); 

let contador = 0;
for (let i = 0; i < frase.length; i++) { 
  if (frase[i] === letra) { 
    contador++; 
  }
}

alert(`La letra "${letra}" aparece ${contador} veces en la frase "${frase}".`); 

///////////////////////////////////////////////////////////////////////////////////////////

const nickname = prompt("Ingrese su nickname:");
const nicknamePattern = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;

if (!nickname.match(nicknamePattern)) {
  alert("El nickname debe tener al menos 6 caracteres y contener al menos una letra mayúscula y un número.");
} else {
  alert("El nickname es válido.");
}

///////////////////////////////////////////////////////////////////////////////////////////


const precioSinIVA = prompt("Ingrese el precio del producto sin IVA:"); 
const iva = prompt("Ingrese la tasa de IVA en decimal (por ejemplo, 0.19 para el 19%):"); 
const precioProducto = parseFloat(precioSinIVA);
const montoIVA = precioProducto * parseFloat(iva);
const precioTotal = precioProducto + montoIVA; 

alert(`El precio total con impuestos incluidos es: ${precioTotal}`); 


//////////////////////////////////////////////////////////////////////////////////////////////
