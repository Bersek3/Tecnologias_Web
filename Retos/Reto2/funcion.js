var nota1 = parseInt(prompt("Ingresa la nota 1"));
var nota2 = parseInt(prompt("Ingresa la nota 2"));
var nota3 = parseInt(prompt("Ingresa la nota 3"));

var promedio = (nota1 * 0.4 + nota2 * 0.3 + nota3 * 0.3);

if (promedio < 3.95){
    alert("a reprobado la asignatura");
} else if (promedio >= 3.95 && promedio <= 4.94){
    alert("a aprobado la asignatira");
} else {
    alert("el alumno se exime del examen");
}