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

    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
          window.scrollTo({
            behavior: 'smooth',
            top: section.offsetTop,
          });
        }
      }
    
      // Función para cambiar la palabra seleccionada y aplicar estilos
      function selectNavItem(selectedId) {
        const navItems = document.querySelectorAll('.navlink');
        navItems.forEach((item) => {
          item.classList.remove('selectedlink'); // Desselecciona todas las palabras
        });
    
        const selectedNavItem = document.getElementById(selectedId);
        if (selectedNavItem) {
          selectedNavItem.classList.add('selectedlink'); // Selecciona la palabra actual
        }
      }
    
      // Agrega event listeners a las palabras del menú
      const inicioButton = document.getElementById('btn-inicio');
      const cursosButton = document.getElementById('btn-cursos');
      const proximoButton = document.getElementById('btn-proximo');
    
      if (inicioButton && cursosButton && proximoButton) {
        inicioButton.addEventListener('click', () => {
          // Desplaza suavemente a la sección "Inicio"
          scrollToSection('inicio');
          // Cambia la palabra seleccionada y aplica estilos
          selectNavItem('btn-inicio');
        });
    
        cursosButton.addEventListener('click', () => {
          // Desplaza suavemente a la sección "Cursos"
          scrollToSection('cursos');
          // Cambia la palabra seleccionada y aplica estilos
          selectNavItem('btn-cursos');
        });
    
        proximoButton.addEventListener('click', () => {
          // Desplaza suavemente a la sección "Proximamente"
          scrollToSection('proximamente');
          // Cambia la palabra seleccionada y aplica estilos
          selectNavItem('btn-proximo');
        });
      }

      var openLoginButton = document.getElementById("openLoginModal");
      var modalContainer = document.getElementById("modalContainer");
      var closeModalButton = document.getElementById("closeModal");

         
  
      openLoginButton.addEventListener("click", function() {
          // Realiza una petición AJAX para cargar el contenido del login.ejs
          document.body.classList.add("modal-open"); // Agrega la clase para desenfocar el fondo
          var xhr = new XMLHttpRequest();
          xhr.open("GET", "/login", true);
  
          xhr.onload = function() {
              if (xhr.status >= 200 && xhr.status < 300) {
                  // Cuando se reciba una respuesta exitosa, coloca el contenido en el modalContainer
                  modalContainer.innerHTML = xhr.responseText;
                  modalContainer.style.display = "block"; // Muestra el modal
              }
          };
  
          xhr.send();
      });
  
      closeModalButton.addEventListener("click", function() {
        document.body.classList.remove("modal-open");
          // Cierra el modal al hacer clic en el botón de cierre
          modalContainer.style.display = "none";
          
          modalContainer.innerHTML = ""; // Limpia el contenido del modal
      });
    
});