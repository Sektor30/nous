// Inicializar AOS correctamente cuando el DOM esté listo
/* if (typeof AOS !== 'undefined') {
  AOS.init();
} */

// Swiper para sección Sobre Nosotros
const sobreNosotrosSwiper = new Swiper('.sobre-nosotros-swiper', {
  effect: 'fade',
  fadeEffect: { crossFade: true },
  loop: true,
  autoplay: {
    delay: 6000,
    disableOnInteraction: false,
  },
  allowTouchMove: false,
});

   // Filtros MOOC
   document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.btn-filter');
    const cardsRow = document.querySelector('.mooc-cards-row');
    const cards = Array.from(document.querySelectorAll('.mooc-card'));

    filterButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        // Quitar clase activa
        filterButtons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const filter = this.getAttribute('data-filter');

        if (filter === 'todos') {
          cards.forEach(card => card.style.display = '');
          // Restaurar orden original
          cards.forEach(card => cardsRow.appendChild(card));
        } else {
          // Mostrar solo los de la categoría
          cards.forEach(card => {
            if (card.classList.contains(filter)) {
              card.style.display = '';
            } else {
              card.style.display = 'none';
            }
          });
          // Reordenar según data-order
          const filtered = cards.filter(card => card.classList.contains(filter));
          filtered.sort((a, b) => {
            const orderA = parseInt(a.getAttribute('data-order-' + filter)) || 99;
            const orderB = parseInt(b.getAttribute('data-order-' + filter)) || 99;
            return orderA - orderB;
          });
          filtered.forEach(card => cardsRow.appendChild(card));
        }
      });
    });
  });


// flechas de navegacion en loop de los modales
document.addEventListener('DOMContentLoaded', function() {
    // Variables para controlar el scroll
    let scrollPosition = 0;
    
    // Event listeners para teclas de navegación
    document.addEventListener('keydown', function(e) {
      if (document.body.classList.contains('modal-open')) {
        const openModal = document.querySelector('.modal.show');
        if (openModal) {
          const currentModalId = openModal.id;
          const currentIndex = modals.indexOf(currentModalId);
          
          if (e.key === 'ArrowLeft') {
            e.preventDefault();
            const prevIndex = currentIndex === 0 ? modals.length - 1 : currentIndex - 1;
            const prevModalId = modals[prevIndex];
            const prevBtn = openModal.querySelector(`[data-bs-target="#${prevModalId}"]`);
            if (prevBtn) {
              prevBtn.click();
            }
          } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            const nextIndex = currentIndex === modals.length - 1 ? 0 : currentIndex + 1;
            const nextModalId = modals[nextIndex];
            const nextBtn = openModal.querySelector(`[data-bs-target="#${nextModalId}"]`);
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
    const modals = ['levitinModal', 'lookModal', 'aidenModal', 'fortisModal', 'soulmiaModal', 'kanjiModal'];
    
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

// --- Dots de navegación en modales MOOC ---
const modalOrder = [
  'levitinModal',
  'lookModal',
  'aidenModal',
  'fortisModal',
  'soulmiaModal',
  'kanjiModal'
];

function setActiveDot(modalId) {
  document.querySelectorAll('.modal-dots').forEach(dots => {
    dots.querySelectorAll('.modal-dot').forEach(dot => {
      if (dot.dataset.modal === modalId) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  });
}

function openModalById(modalId) {
  // Cierra cualquier modal abierto
  const opened = document.querySelector('.modal.show');
  if (opened) {
    const modalInstance = bootstrap.Modal.getInstance(opened);
    if (modalInstance) modalInstance.hide();
  }
  // Abre el nuevo modal
  const modalEl = document.getElementById(modalId);
  if (modalEl) {
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
  }
}

// Manejar clic en dots
function setupModalDots() {
  document.querySelectorAll('.modal-dot').forEach(dot => {
    dot.addEventListener('click', function(e) {
      const modalId = this.dataset.modal;
      openModalById(modalId);
    });
  });
}

// Actualizar dot activo al abrir modal
modalOrder.forEach(modalId => {
  const modalEl = document.getElementById(modalId);
  if (modalEl) {
    modalEl.addEventListener('show.bs.modal', function() {
      setActiveDot(modalId);
    });
  }
});

document.addEventListener('DOMContentLoaded', function() {
  setupModalDots();
});

// --- Swipe para navegación en móvil ---
function setupModalSwipe() {
  let startX = null;
  modalOrder.forEach(modalId => {
    const modalEl = document.getElementById(modalId);
    if (!modalEl) return;
    modalEl.addEventListener('touchstart', function(e) {
      if (e.touches.length === 1) {
        startX = e.touches[0].clientX;
      }
    });
    modalEl.addEventListener('touchend', function(e) {
      if (startX === null) return;
      const endX = e.changedTouches[0].clientX;
      const diff = endX - startX;
      if (Math.abs(diff) > 50) { // Umbral de swipe
        const idx = modalOrder.indexOf(modalId);
        if (diff < 0 && idx < modalOrder.length - 1) {
          // Swipe izquierda: siguiente
          openModalById(modalOrder[idx + 1]);
        } else if (diff > 0 && idx > 0) {
          // Swipe derecha: anterior
          openModalById(modalOrder[idx - 1]);
        }
      }
      startX = null;
    });
  });
}

document.addEventListener('DOMContentLoaded', function() {
  setupModalSwipe();
});