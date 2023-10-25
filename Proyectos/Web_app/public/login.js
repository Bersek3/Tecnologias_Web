document.addEventListener("DOMContentLoaded", function() {
    // Obtén referencias a los elementos del formulario y otros elementos necesarios
    var loginForm = document.querySelector("form");
    var emailInput = document.getElementById("email");
    var passwordInput = document.getElementById("password");

    // Agrega un manejador de eventos para enviar el formulario
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Evita el envío del formulario predeterminado

        // Aquí puedes agregar lógica para enviar los datos del formulario a tu servidor
        var email = emailInput.value;
        var password = passwordInput.value;

        // Realiza una solicitud AJAX o envía los datos del formulario a tu servidor

        // Lógica adicional, como la validación de credenciales y el manejo de respuestas del servidor, podría ir aquí
    });



});