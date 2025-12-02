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

  // -------- Menu mobile --------
  if (menuToggleBtn && navMobile) {
    menuToggleBtn.addEventListener("click", function () {
      const isOpen = navMobile.classList.contains("open");

      if (isOpen) {
        navMobile.classList.remove("open");
        body.classList.remove("menu-open");
        menuToggleBtn.setAttribute("aria-label", "Abrir menu de navegação");
      } else {
        navMobile.classList.add("open");
        body.classList.add("menu-open");
        menuToggleBtn.setAttribute("aria-label", "Fechar menu de navegação");
      }
    });

    // Fechar menu mobile ao clicar em qualquer link
    navMobile.addEventListener("click", function (event) {
      if (event.target.tagName.toLowerCase() === "a") {
        navMobile.classList.remove("open");
        body.classList.remove("menu-open");
        menuToggleBtn.setAttribute("aria-label", "Abrir menu de navegação");
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

  // -------- Envio do formulário com fetch + limpar dados --------
  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      // validação nativa HTML5
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

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

          // exibe modal de sucesso
          openModal();
        } else {
          alert(
            "Ocorreu um problema ao enviar a mensagem. Tente novamente em alguns instantes."
          );
        }
      } catch (error) {
        console.error("Erro ao enviar formulário:", error);
        alert(
          "Não foi possível enviar a mensagem agora. Verifique sua conexão e tente novamente."
        );
      }
    });
  }
});
