// Inicializar AOS correctamente cuando el DOM esté listo
/* if (typeof AOS !== 'undefined') {
  AOS.init();
} */

// flechas de navegacion en loop de los modales
document.addEventListener('DOMContentLoaded', function() {
    // Variables para controlar el scroll
    let scrollPosition = 0;
    
    // Event listeners para teclas de navegación
    document.addEventListener('keydown', function(e) {
      if (document.body.classList.contains('modal-open')) {
        const openModal = document.querySelector('.modal.show');
        if (openModal) {
          if (e.key === 'ArrowLeft') {
            e.preventDefault();
            const prevBtn = openModal.querySelector('.btn-link[data-bs-target]');
            if (prevBtn) {
              prevBtn.click();
            }
          } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            const nextBtn = openModal.querySelector('.btn-link[data-bs-target]:last-of-type');
            if (nextBtn) {
              nextBtn.click();
            }
          } else if (e.key === 'Escape') {
            // Cerrar todos los modales
            const modalInstance = bootstrap.Modal.getInstance(openModal);
            modalInstance.hide();
          }
        }
      }
    });
    
    // Controlar el scroll al abrir modales
    const modals = ['levitinModal', 'lookModal', 'fortisModal', 'soulmiaModal', 'aidenModal', 'kanjiModal'];
    
    modals.forEach(modalId => {
      const modal = document.getElementById(modalId);
      
      // Cuando se abre un modal
      modal.addEventListener('show.bs.modal', function() {
        // Guardar la posición actual del scroll
        scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        
        // Prevenir scroll del body
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollPosition}px`;
        document.body.style.width = '100%';
      });
      
      // Cuando se cierra un modal
      modal.addEventListener('hidden.bs.modal', function() {
        // Restaurar el scroll
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        
        // Restaurar la posición del scroll
        window.scrollTo(0, scrollPosition);
      });
    });
    
    // Funcionalidad para cerrar el menú hamburguesa al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarToggler = document.querySelector('.navbar-toggler');
    
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        // Cerrar el menú si está abierto en dispositivos móviles
        if (window.innerWidth < 994) {
          const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
            hide: true
          });
        }
      });
    });

    // Cerrar menú al hacer clic fuera de él
    document.addEventListener('click', function(e) {
      if (!navbarCollapse.contains(e.target) && !navbarToggler.contains(e.target)) {
        if (navbarCollapse.classList.contains('show')) {
          const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
            hide: true
          });
        }
      }
    });

    // Cambiar icono cuando el menú se abre/cierra
    navbarCollapse.addEventListener('show.bs.collapse', function() {
      const icon = navbarToggler.querySelector('i');
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    });

    navbarCollapse.addEventListener('hide.bs.collapse', function() {
      const icon = navbarToggler.querySelector('i');
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    });
  });