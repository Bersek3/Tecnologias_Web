document.getElementById('miFormulario').addEventListener('submit', function (e) {

    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirm-password').value;
    var passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;

    if (!password || !confirmPassword  === "") {
        alert('Por favor, complete todos los campos.');
        e.preventDefault();
    } else if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden.');
        e.preventDefault();
    } else if (!password.match(passwordRegex)) {
        alert('La contraseña debe contener al menos una letra mayúscula, un símbolo y tener un mínimo de 8 caracteres.');
        e.preventDefault();
    } else {
        alert('Formulario enviado exitosamente.');
    }
});
