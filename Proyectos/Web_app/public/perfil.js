document.addEventListener("DOMContentLoaded", function() {
    var navLinks = document.querySelectorAll(".navlink");
    
    navLinks.forEach(function(link) {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            var targetId = this.getAttribute("data-scroll-to");
            var targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Ajusta la duración de la animación (en milisegundos) aquí
                var duration = 1000; // 1 segundo
                
                targetSection.scrollIntoView({ behavior: "smooth", block: "start", inline: "start" });
            }
        });
    });

    var prevScrollPos = window.pageYOffset; // Guarda la posición de desplazamiento anterior

    var prevScrollPos = window.pageYOffset; // Guarda la posición de desplazamiento anterior
    var navbar = document.querySelector(".navbar");
    
    window.onscroll = function() {
        var currentScrollPos = window.pageYOffset; // Obtiene la posición de desplazamiento actual
        
        // Comprueba si el usuario está desplazándose hacia arriba o hacia abajo
        if (prevScrollPos > currentScrollPos) {
            // El usuario se está desplazando hacia arriba
            navbar.style.top = "0";
        } else {
            // El usuario se está desplazando hacia abajo
            navbar.style.top = "-100px"; // Cambia esto para ajustar cuánto quieres que se oculte
        }
        
        prevScrollPos = currentScrollPos; // Actualiza la posición de desplazamiento anterior
    };
});
