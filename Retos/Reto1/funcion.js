
var numero = parseInt(prompt("Ingrese un numero"));

if(!isNaN(numero)){
    var entrada = parseInt(numero);

    if (numero % 2 === 0){
        alert("El numero es par");

    } else{
        alert("El numero es impar");
    }

 } else{
        alert("Ingrese un numero valido");
}
