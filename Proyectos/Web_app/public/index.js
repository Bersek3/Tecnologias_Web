document.addEventListener("DOMContentLoaded", function () {
  const openModalButton = document.getElementById("abrirModal");
  const modal = document.getElementById("modal");
  const modalContent = document.querySelector(".modal-contenido");
  const navbar = document.getElementById("navbar"); // Reemplaza "navbar" con el ID real de tu navbar

  let prevScrollPos = window.pageYOffset;

  window.onscroll = function () {
    const currentScrollPos = window.pageYOffset;
    if (prevScrollPos > currentScrollPos) {
// Desplazandose hacia arriba, muestra la barra de navegación
      navbar.classList.remove("hidden");
    } else {
// Desplazándonos hacia abajo, ocultamos la barra de navegación
      navbar.classList.add("hidden");
    }
    prevScrollPos = currentScrollPos;
  };

  openModalButton.addEventListener("click", function () {
    // Abre el modal de inicio de sesión
    openLoginModal();
  });

  function openLoginModal() {
    // Abre el modal
    modal.style.display = "block";

    // Agrega la clase para ocultar el navbar
    navbar.classList.add("hidden-navbar");

    // Realiza la solicitud AJAX para cargar login.ejs
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "/login", true);

    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        // Si la solicitud se completó con éxito, inserta el contenido en el modal
        modalContent.innerHTML = xhr.responseText;
        // Agrega un botón "X" en la esquina superior derecha
        const closeButton = document.createElement("span");
        closeButton.innerHTML = "X";
        closeButton.className = "close-button";
        closeButton.addEventListener("click", function () {
          closeModal();
        });
        modalContent.appendChild(closeButton);

        // Agregar el evento para abrir el modal de registro
        const registroButton = document.getElementById("registro");
        registroButton.addEventListener("click", function () {
          openRegistroModal();
        });
      } else {
        // Manejo de errores si es necesario
        console.error("Error al cargar login.ejs");
      }
    };

    xhr.send();
  }

  function openRegistroModal() {
    // Realiza la solicitud AJAX para cargar registro.ejs
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "/registro", true);

    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        // Si la solicitud se completó con éxito, inserta el contenido en el modal
        modalContent.innerHTML = xhr.responseText;
      } else {
        // Manejo de errores si es necesario
        console.error("Error al cargar registro.ejs");
      }
    };

    xhr.send();
  }

  function closeModal() {
    // Cierra el modal
    modal.style.display = "none";

    // Elimina la clase que oculta el navbar
    navbar.classList.remove("hidden-navbar");

    // Limpia el contenido del modal
    modalContent.innerHTML = "";
  }

  // Agrega un evento de clic al fondo oscuro para cerrar el modal
  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("DOMContentLoaded", function () {
    // Función para mostrar el cuadro de diálogo
    function mostrarCuadroDialogo() {
      const cuadroDialogo = document.getElementById("cuadro-dialogo");
      cuadroDialogo.classList.remove("oculto");
    }

    // Llama a la función para mostrar el cuadro de diálogo
    mostrarCuadroDialogo();
    
    // Agrega un evento al botón "Cerrar"
    const cerrarCuadroButton = document.getElementById("cerrar-cuadro");
    cerrarCuadroButton.addEventListener("click", function () {
      // Cierra la ventana emergente
      const cuadroDialogo = document.getElementById("cuadro-dialogo");
      cuadroDialogo.classList.add("oculto");
    });
  });
});
