document.addEventListener('DOMContentLoaded', () => {

  // --- Efeito do Header ao rolar a página ---
  const header = document.querySelector('.header');
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Executa ao carregar para garantir consistência


  // --- Menu Mobile Alternar (Toggle) ---
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const navList = document.querySelector('.nav-list');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuToggle && navList) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navList.classList.toggle('active');
      
      // Mudar ícone do menu burguer (simples alternância de texto)
      if (navList.classList.contains('active')) {
        menuToggle.innerHTML = '&#10005;'; // Ícone X
      } else {
        menuToggle.innerHTML = '&#9776;'; // Ícone Hamburguer
      }
    });

    // Fechar menu ao clicar fora dele
    document.addEventListener('click', (e) => {
      if (!navList.contains(e.target) && !menuToggle.contains(e.target)) {
        navList.classList.remove('active');
        menuToggle.innerHTML = '&#9776;';
      }
    });

    // Fechar menu ao clicar em qualquer link de navegação
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navList.classList.remove('active');
        menuToggle.innerHTML = '&#9776;';
      });
    });
  }


  // --- Accordion para FAQ (Perguntas Frequentes) ---
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');

    if (trigger && content) {
      trigger.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Fechar todos os itens abertos (efeito sanfona)
        faqItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.classList.contains('active')) {
            otherItem.classList.remove('active');
            otherItem.querySelector('.faq-content').style.maxHeight = null;
          }
        });

        // Alternar o item atual
        if (isActive) {
          item.classList.remove('active');
          content.style.maxHeight = null;
        } else {
          item.classList.add('active');
          // Define a altura máxima como o scrollHeight para animação suave
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      });
    }
  });

  // Ajusta a altura do FAQ ativo se a janela for redimensionada
  window.addEventListener('resize', () => {
    const activeFaq = document.querySelector('.faq-item.active');
    if (activeFaq) {
      const content = activeFaq.querySelector('.faq-content');
      content.style.maxHeight = content.scrollHeight + 'px';
    }
  });


  // --- Efeito Scroll-Reveal (Revelação Suave) ---
  const revealElements = document.querySelectorAll('.reveal');

  const revealOnScroll = () => {
    const triggerBottom = (window.innerHeight / 5) * 4;

    revealElements.forEach(el => {
      const elTop = el.getBoundingClientRect().top;

      if (elTop < triggerBottom) {
        el.classList.add('active');
      }
    });
  };

  // Suporte a IntersectionObserver se disponível (moderno e performático)
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // Deixa de observar após animar
        }
      });
    }, observerOptions);

    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback para navegadores antigos
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Executa no carregamento
  }


  // --- Navegação com Scroll Suave Dinâmico (Fallback) ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        
        // Posição com compensação da altura do header
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

});
