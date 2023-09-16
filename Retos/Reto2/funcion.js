function calcularPromedio() {
    const nota1 = parseFloat(prompt("Ingrese la nota 1 (1.0 al 7.0):"));
    const nota2 = parseFloat(prompt("Ingrese la nota 2 (1.0 al 7.0):"));
    const nota3 = parseFloat(prompt("Ingrese la nota 3 (1.0 al 7.0):"));
  
    if (isNaN(nota1) || isNaN(nota2) || isNaN(nota3) ||
        nota1 < 1.0 || nota1 > 7.0 ||
        nota2 < 1.0 || nota2 > 7.0 ||
        nota3 < 1.0 || nota3 > 7.0) {
      alert("Ingrese notas válidas (1.0 a 7.0 )");
      return;
    }
  

    const promedio = (nota1 * 0.4 + nota2 * 0.3 + nota3 * 0.3).toFixed(1);
  
    if (promedio < 3.95) {
      alert(`Promedio ponderado: ${promedio}\nEl estudiante ha reprobado`);
    } else if (promedio >= 3.95 && promedio <= 4.94) {
      alert(`Promedio ponderado: ${promedio}\nEl estudiante rinde examen.`);
    } else {
      alert(`Promedio ponderado: ${promedio}\nEximido de la asignatura.`);
    }
  }
  
  calcularPromedio();
  
  
  
  
  
  