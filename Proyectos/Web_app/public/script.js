document.addEventListener('DOMContentLoaded', function () {


    var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  

    if ($navbarBurgers.length > 0) {

      $navbarBurgers.forEach(function ($el) {
        $el.addEventListener('click', function () {
  
          var target = $el.dataset.target;
          var $target = document.getElementById(target);
  
 
          $el.classList.toggle('is-active');
          $target.classList.toggle('is-active');
  
        });
      });
// Obtén una referencia al navbar
const navbar = document.querySelector('.navbar');
let prevScrollPos = window.pageYOffset;

// Registra un evento de desplazamiento en el documento
window.addEventListener('scroll', () => {
  const currentScrollPos = window.pageYOffset;
  if (prevScrollPos > currentScrollPos) {
    // El usuario está desplazándose hacia arriba, muestra el navbar
    navbar.style.transform = 'translateY(0)';
  } else {
    // El usuario está desplazándose hacia abajo, oculta el navbar
    navbar.style.transform = 'translateY(-100%)';
  }
  prevScrollPos = currentScrollPos;
});
    }});


  