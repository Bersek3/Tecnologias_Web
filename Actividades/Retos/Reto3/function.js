document.addEventListener("DOMContentLoaded", function () {
    const calcularButton = document.getElementById("calcular");
    calcularButton.addEventListener("click", calcularPropina);
});

function calcularPropina() {
    const totalCLP = parseFloat(document.getElementById("total").value);
    const porcentaje = parseFloat(document.getElementById("porcentaje").value);
    const propinaCLP = Math.round((totalCLP * porcentaje) / 100);
    const resultadoCLP = totalCLP + propinaCLP;

    const propinaSpan = document.getElementById("propina");
    const totalAPagarSpan = document.getElementById("totalAPagar");

    propinaSpan.textContent = propinaCLP.toLocaleString(); 
    totalAPagarSpan.textContent = resultadoCLP.toLocaleString();
}