function calcularIMC() {
    const nombre = document.getElementById("nombre").value;
    const peso = parseFloat(document.getElementById("peso").value);
    const altura = parseFloat(document.getElementById("altura").value);
    const edad = parseInt(document.getElementById("edad").value);
    const genero = document.getElementById("genero").value;
    const actividad = document.getElementById("actividad").value;
    
    const imc = peso / (altura * altura);
    
    let clasificacion = "";
    if (imc < 18.5) {
        clasificacion = "Bajo peso";
    } else if (imc < 24.9) {
        clasificacion = "Peso normal";
    } else if (imc < 29.9) {
        clasificacion = "Sobrepeso";
    } else {
        clasificacion = "Obesidad";
    }
    
    let factorActividad = 1.2;
    if (actividad === "moderado") {
        factorActividad = 1.55;
    } else if (actividad === "activo") {
        factorActividad = 1.9;
    }
    
    const ged = factorActividad * peso;
    
    let estadoNutricional = "";
    if (clasificacion === "Peso normal" && edad >= 18) {
        estadoNutricional = "Estado nutricional adecuado";
    } else {
        estadoNutricional = "Necesita atención especializada";
    }
    
    const resultados = `
        Resultados para ${nombre}:
        IMC: ${imc.toFixed(2)}
        Clasificación del IMC: ${clasificacion}
        Gasto Energético Diario (GED): ${ged.toFixed(2)}
        Estado Nutricional: ${estadoNutricional}
    `;

    window.alert(resultados);
}