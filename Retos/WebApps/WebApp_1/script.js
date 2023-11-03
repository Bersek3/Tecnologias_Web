function generarContrasena() {
    var longitud = document.getElementById('longitud').value;
    var incluirMayusculas = document.getElementById('mayusculas').checked;
    var incluirMinusculas = document.getElementById('minusculas').checked;
    var incluirNumeros = document.getElementById('numeros').checked;
    var incluirEspeciales = document.getElementById('especiales').checked;

    var caracteres = '';
    var contrasena = '';

    if (incluirMayusculas) {
        caracteres += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }
    if (incluirMinusculas) {
        caracteres += 'abcdefghijklmnopqrstuvwxyz';
    }
    if (incluirNumeros) {
        caracteres += '0123456789';
    }
    if (incluirEspeciales) {
        caracteres += '!@#$%^&*()_+~`|}{[]\:;?><,./-=';
    }

    if (longitud < 8 || longitud > 20) {
        alert('La longitud de la contraseña debe estar entre 8 y 20 caracteres');
        return;
    }

    if (caracteres.length == 0) {
        alert('Debes seleccionar al menos una opcion');
        return;
    }

    for (var i = 0; i < longitud; i++) {
        contrasena += caracteres[Math.floor(Math.random() * caracteres.length)];
    }

    document.getElementById('contrasena').innerText = contrasena;
}