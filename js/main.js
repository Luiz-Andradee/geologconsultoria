// ---------------- Google Analytics ----------------
// Substituir GA_MEASUREMENT_ID pelo ID real
window.dataLayer = window.dataLayer || [];
function gtag() {
  window.dataLayer.push(arguments);
}
gtag("js", new Date());
gtag("config", "GA_MEASUREMENT_ID");

// ---------------- Scripts de Interação ----------------
document.addEventListener("DOMContentLoaded", function () {
  const body = document.body;
  const navMobile = document.getElementById("nav-mobile");
  const menuToggleBtn = document.querySelector(".menu-toggle");
  const heroFadeItems = document.querySelectorAll(".fade-in-up");
  const yearSpan = document.getElementById("current-year");
  const tipoContato = document.getElementById("tipo-contato");
  const blocoOrcamento = document.querySelector(".orcamento-extra");
  const form = document.getElementById("contato-form");
  const modal = document.getElementById("success-modal");
  const closeModalButton = document.getElementById("close-modal");

  // -------- Smooth Scroll com offset para header fixo --------
  const headerHeight = document.querySelector('header')?.offsetHeight || 80;
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      
      // Ignora links vazios ou apenas "#"
      if (!href || href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // -------- Indicador de seção ativa no menu --------
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveSection() {
    const scrollPosition = window.pageYOffset + headerHeight + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveSection);
  updateActiveSection(); // Executa ao carregar

  // -------- Botão Voltar ao Topo --------
  const backToTopBtn = document.createElement('button');
  backToTopBtn.className = 'back-to-top';
  backToTopBtn.setAttribute('aria-label', 'Voltar ao topo');
  backToTopBtn.innerHTML = '↑';
  document.body.appendChild(backToTopBtn);

  function toggleBackToTop() {
    if (window.pageYOffset > 500) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', toggleBackToTop);
  toggleBackToTop();

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // -------- Menu mobile com animação melhorada --------
  if (menuToggleBtn && navMobile) {
    menuToggleBtn.addEventListener("click", function () {
      const isOpen = navMobile.classList.contains("open");

      if (isOpen) {
        navMobile.classList.remove("open");
        body.classList.remove("menu-open");
        menuToggleBtn.classList.remove("active");
        menuToggleBtn.setAttribute("aria-label", "Abrir menu de navegação");
        menuToggleBtn.setAttribute("aria-expanded", "false");
      } else {
        navMobile.classList.add("open");
        body.classList.add("menu-open");
        menuToggleBtn.classList.add("active");
        menuToggleBtn.setAttribute("aria-label", "Fechar menu de navegação");
        menuToggleBtn.setAttribute("aria-expanded", "true");
      }
    });

    // Fechar menu mobile ao clicar em qualquer link
    navMobile.addEventListener("click", function (event) {
      if (event.target.tagName.toLowerCase() === "a") {
        navMobile.classList.remove("open");
        body.classList.remove("menu-open");
        menuToggleBtn.classList.remove("active");
        menuToggleBtn.setAttribute("aria-label", "Abrir menu de navegação");
        menuToggleBtn.setAttribute("aria-expanded", "false");
      }
    });

    // Fechar ao clicar fora
    document.addEventListener('click', function(event) {
      if (navMobile.classList.contains('open') && 
          !navMobile.contains(event.target) && 
          !menuToggleBtn.contains(event.target)) {
        navMobile.classList.remove("open");
        body.classList.remove("menu-open");
        menuToggleBtn.classList.remove("active");
        menuToggleBtn.setAttribute("aria-label", "Abrir menu de navegação");
        menuToggleBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  // -------- Animação de scroll (IntersectionObserver) --------
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    heroFadeItems.forEach((el) => observer.observe(el));
  } else {
    // Fallback: torna todos visíveis
    heroFadeItems.forEach((el) => el.classList.add("is-visible"));
  }

  // -------- Ano atual no rodapé --------
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // -------- Bloco de orçamento (campos extras) --------
  if (tipoContato && blocoOrcamento) {
    const toggleBlocoOrcamento = () => {
      if (tipoContato.value === "orcamento") {
        blocoOrcamento.classList.add("is-visible");
        blocoOrcamento.setAttribute("aria-hidden", "false");
      } else {
        blocoOrcamento.classList.remove("is-visible");
        blocoOrcamento.setAttribute("aria-hidden", "true");

        // limpa os campos desse bloco quando não é orçamento
        blocoOrcamento.querySelectorAll("input, textarea, select").forEach((el) => {
          if (el.tagName === "SELECT") {
            el.selectedIndex = 0;
          } else {
            el.value = "";
          }
        });
      }
    };

    // estado inicial
    toggleBlocoOrcamento();

    tipoContato.addEventListener("change", toggleBlocoOrcamento);
  }

  // -------- Modal de sucesso --------
  const openModal = () => {
    if (!modal) return;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
  };

  if (closeModalButton) {
    closeModalButton.addEventListener("click", closeModal);
  }

  if (modal) {
    // clique no backdrop
    modal.addEventListener("click", (event) => {
      if (event.target.dataset.closeModal === "true") {
        closeModal();
      }
    });

    // ESC fecha o modal
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && modal.classList.contains("is-open")) {
        closeModal();
      }
    });
  }

  // -------- Validação personalizada do formulário --------
  const formErrors = {};
  
  function showError(input, message) {
    const field = input.closest('.field');
    if (!field) return;
    
    // Remove erro anterior se existir
    const existingError = field.querySelector('.field-error');
    if (existingError) existingError.remove();
    
    // Adiciona classe de erro
    input.classList.add('has-error');
    
    // Cria e adiciona mensagem de erro
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.setAttribute('role', 'alert');
    field.appendChild(errorDiv);
  }
  
  function clearError(input) {
    const field = input.closest('.field');
    if (!field) return;
    
    input.classList.remove('has-error');
    const errorDiv = field.querySelector('.field-error');
    if (errorDiv) errorDiv.remove();
  }
  
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  
  function validatePhone(phone) {
    // Remove caracteres não numéricos
    const cleaned = phone.replace(/\D/g, '');
    // Aceita telefones com 10 ou 11 dígitos (com ou sem DDD)
    return cleaned.length >= 10 && cleaned.length <= 11;
  }
  
  function validateForm() {
    let isValid = true;
    
    // Validar tipo de contato
    const tipoContatoInput = document.getElementById('tipo-contato');
    if (tipoContatoInput && !tipoContatoInput.value) {
      showError(tipoContatoInput, 'Por favor, selecione o tipo de mensagem');
      isValid = false;
    } else if (tipoContatoInput) {
      clearError(tipoContatoInput);
    }
    
    // Validar nome
    const nomeInput = document.getElementById('contato-nome');
    if (nomeInput && nomeInput.value.trim().length < 3) {
      showError(nomeInput, 'Por favor, digite seu nome completo');
      isValid = false;
    } else if (nomeInput) {
      clearError(nomeInput);
    }
    
    // Validar e-mail
    const emailInput = document.getElementById('contato-email');
    if (emailInput && !validateEmail(emailInput.value)) {
      showError(emailInput, 'Por favor, digite um e-mail válido');
      isValid = false;
    } else if (emailInput) {
      clearError(emailInput);
    }
    
    // Validar telefone (se preenchido)
    const telefoneInput = document.getElementById('contato-telefone');
    if (telefoneInput && telefoneInput.value && !validatePhone(telefoneInput.value)) {
      showError(telefoneInput, 'Por favor, digite um telefone válido (ex: 47999999999)');
      isValid = false;
    } else if (telefoneInput && telefoneInput.value) {
      clearError(telefoneInput);
    }
    
    return isValid;
  }
  
  // Adicionar validação em tempo real
  if (form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    inputs.forEach(input => {
      input.addEventListener('blur', function() {
        if (this.value) {
          // Validações específicas
          if (this.type === 'email' && !validateEmail(this.value)) {
            showError(this, 'Por favor, digite um e-mail válido');
          } else if (this.id === 'contato-telefone' && !validatePhone(this.value)) {
            showError(this, 'Por favor, digite um telefone válido');
          } else {
            clearError(this);
          }
        }
      });
      
      input.addEventListener('input', function() {
        if (this.classList.contains('has-error')) {
          clearError(this);
        }
      });
    });
  }

  // -------- Envio do formulário com fetch + loading + validação --------
  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      // Validação personalizada
      if (!validateForm()) {
        return;
      }

      // validação nativa HTML5
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      // Criar e mostrar loading spinner
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.classList.add('loading');
      submitBtn.innerHTML = '<span class="spinner"></span> Enviando...';

      const formData = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          // limpa formulário
          form.reset();

          // garante que o bloco de orçamento volte ao estado fechado
          if (blocoOrcamento) {
            blocoOrcamento.classList.remove("is-visible");
            blocoOrcamento.setAttribute("aria-hidden", "true");
          }

          // Remove loading
          submitBtn.disabled = false;
          submitBtn.classList.remove('loading');
          submitBtn.textContent = originalBtnText;

          // exibe modal de sucesso
          openModal();
        } else {
          submitBtn.disabled = false;
          submitBtn.classList.remove('loading');
          submitBtn.textContent = originalBtnText;
          
          alert(
            "Ocorreu um problema ao enviar a mensagem. Tente novamente em alguns instantes."
          );
        }
      } catch (error) {
        console.error("Erro ao enviar formulário:", error);
        
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
        submitBtn.textContent = originalBtnText;
        
        alert(
          "Não foi possível enviar a mensagem agora. Verifique sua conexão e tente novamente."
        );
      }
    });
  }
});
