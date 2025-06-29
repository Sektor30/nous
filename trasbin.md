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


--------------------------------------------------------------------------

    // Efecto de desvanecimiento progresivo para las cards
    document.addEventListener('DOMContentLoaded', function() {
      const cards = document.querySelectorAll('.card-mooc');
      
      // Configurar Intersection Observer
      const observerOptions = {
        threshold: 0.1, // Se activa cuando 10% de la card es visible
        rootMargin: '0px 0px -50px 0px' // Se activa 50px antes de que la card entre completamente
      };
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            // Agregar delay progresivo para cada card
            setTimeout(() => {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
            }, index * 200); // 200ms de delay entre cada card
            
            // Dejar de observar una vez que se ha mostrado
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);
      
      // Configurar estado inicial de las cards
      cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        card.style.transitionDelay = `${index * 0.1}s`; // Delay progresivo
      });
      
      // Comenzar a observar las cards
      cards.forEach(card => {
        observer.observe(card);
      });
    });