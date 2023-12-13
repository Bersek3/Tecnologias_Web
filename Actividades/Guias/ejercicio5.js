var imc
var peso
var estatura

peso=prompt("¿cual es tu peso? (EJ: 70)");
peso = parseInt(peso);
estatura=prompt("¿cual es tu estatura? (EJ: 1.70)");
var mult= (estatura*estatura);
imc= peso / mult;

alert("Tu indice de masa corporal es:" + imc );

 var valor 
 valor= imc;

 if(valor<18.50) 
 {
 	alert("Estas Bajo peso");
 }
 else if(valor<=18.50 || valor<=24.90)
 {
 	alert("Estas con peso normal");
 }
 else if (valor>=24.90)
 {
 	alert("Estas con sobrepeso");
 }
   else 
  {
  	alert("No existe clasificacion");
  }
 