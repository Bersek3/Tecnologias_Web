document.addEventListener('DOMContentLoaded', function () {
  const btnLogin = document.getElementById('btn-login');
  const loginModal = document.getElementById('login-modal');
  const closeModal = document.getElementById('close-modal');

  btnLogin.addEventListener('click', function () {
    loginModal.style.display = 'block';
  });

  closeModal.addEventListener('click', function () {
    loginModal.style.display = 'none';
  });

  // Cierra el modal si se hace clic fuera del contenido
  window.addEventListener('click', function (event) {
    if (event.target === loginModal) {
      loginModal.style.display = 'none';
    }
  });
});
