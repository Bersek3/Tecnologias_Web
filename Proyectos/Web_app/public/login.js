document.addEventListener("DOMContentLoaded", function () {
  const openModalButton = document.getElementById("abrirModal");
  const modal = document.getElementById("modal");
  const modalContent = document.querySelector(".modal-content");
  const navbar = document.getElementById("navbar");

  openModalButton.addEventListener("click", function () {
    // Abre el modal
    modal.style.display = "block";
    navbar.classList.add("hidden-navbar");

    // Realiza la solicitud AJAX para cargar login.ejs
    loadLoginModal();

    // Agregar el evento para abrir el modal de registro
    const registroButton = document.getElementById("registro");
    registroButton.addEventListener("click", function () {
      loadRegistroModal();
    });
  });

  function loadLoginModal() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "/login", true);

    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        // Si la solicitud se completó con éxito, inserta el contenido en el modal
        modalContent.innerHTML = xhr.responseText;

        modalContent.appendChild(closeButton);
      } else {
        // Manejo de errores si es necesario
        console.error("Error al cargar login.ejs");
      }
    };

    xhr.send();
  }

  function loadRegistroModal() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "/registro", true);

    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        // Si la solicitud se completó con éxito, inserta el contenido en el modal
        modalContent.innerHTML = xhr.responseText;

        modalContent.appendChild(closeButton);
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
});
