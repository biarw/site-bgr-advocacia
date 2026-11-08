// ==========================================================================
// Beatriz Rocha Sociedade Individual de Advocacia
// Scripts de Interatividade, Filtros de Notícias, Menu Mobile e WhatsApp
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Atualizar Ano no Rodapé
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Menu Mobile Drawer & Accordion de Áreas
  const mobileBtn = document.getElementById('mobile-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileAreasToggle = document.getElementById('mobile-areas-toggle');
  const mobileAreasSubmenu = document.getElementById('mobile-areas-submenu');
  const mobileAreasIcon = document.getElementById('mobile-areas-icon');

  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.contains('hidden');
      if (isHidden) {
        mobileMenu.classList.remove('hidden');
        mobileBtn.textContent = '✕';
      } else {
        mobileMenu.classList.add('hidden');
        mobileBtn.textContent = '☰';
      }
    });

    mobileMenu.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileBtn.textContent = '☰';
      });
    });
  }

  if (mobileAreasToggle && mobileAreasSubmenu) {
    mobileAreasToggle.addEventListener('click', () => {
      const isHidden = mobileAreasSubmenu.classList.contains('hidden');
      if (isHidden) {
        mobileAreasSubmenu.classList.remove('hidden');
        if (mobileAreasIcon) mobileAreasIcon.textContent = '▴';
      } else {
        mobileAreasSubmenu.classList.add('hidden');
        if (mobileAreasIcon) mobileAreasIcon.textContent = '▾';
      }
    });
  }

  // 3. FAQ em Acordeão Interativo
  const faqQuestions = document.querySelectorAll('.faq-question');
  if (faqQuestions.length > 0) {
    faqQuestions.forEach(btn => {
      btn.addEventListener('click', () => {
        const answer = btn.nextElementSibling;
        const icon = btn.querySelector('.faq-icon');
        const isCurrentlyOpen = answer && !answer.classList.contains('hidden');

        // Fecha todos os itens
        document.querySelectorAll('.faq-answer').forEach(a => a.classList.add('hidden'));
        document.querySelectorAll('.faq-icon').forEach(ic => {
          ic.classList.remove('rotate-45', 'bg-[#8C7355]', 'text-white', 'border-[#8C7355]');
          ic.classList.add('bg-[#FAF7F2]', 'text-[#8C7355]');
        });

        // Se não estava aberto, abre o clicado
        if (!isCurrentlyOpen && answer && icon) {
          answer.classList.remove('hidden');
          icon.classList.add('rotate-45', 'bg-[#8C7355]', 'text-white', 'border-[#8C7355]');
          icon.classList.remove('bg-[#FAF7F2]', 'text-[#8C7355]');
        }
      });
    });
  }

  // 4. Carrossel Horizontal de Notícias (Drag & Scroll + Setas de Navegação)
  const newsCarousel = document.getElementById('news-carousel');
  const newsPrev = document.getElementById('news-prev');
  const newsNext = document.getElementById('news-next');

  if (newsCarousel) {
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    newsCarousel.addEventListener('mousedown', (e) => {
      isDown = true;
      newsCarousel.classList.add('cursor-grabbing');
      newsCarousel.classList.remove('cursor-grab');
      startX = e.pageX - newsCarousel.offsetLeft;
      scrollLeft = newsCarousel.scrollLeft;
    });

    newsCarousel.addEventListener('mouseleave', () => {
      isDown = false;
      newsCarousel.classList.remove('cursor-grabbing');
      newsCarousel.classList.add('cursor-grab');
    });

    newsCarousel.addEventListener('mouseup', () => {
      isDown = false;
      newsCarousel.classList.remove('cursor-grabbing');
      newsCarousel.classList.add('cursor-grab');
    });

    newsCarousel.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - newsCarousel.offsetLeft;
      const walk = (x - startX) * 1.5;
      newsCarousel.scrollLeft = scrollLeft - walk;
    });

    if (newsPrev) {
      newsPrev.addEventListener('click', () => {
        newsCarousel.scrollBy({ left: -390, behavior: 'smooth' });
      });
    }

    if (newsNext) {
      newsNext.addEventListener('click', () => {
        newsCarousel.scrollBy({ left: 390, behavior: 'smooth' });
      });
    }
  }

  // 5. Máscara de Telefone / WhatsApp: (DD) 00000-0000
  const phoneInput = document.getElementById('telefone');
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 11) value = value.slice(0, 11);

      if (value.length > 10) {
        value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
      } else if (value.length > 6) {
        value = value.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
      } else if (value.length > 2) {
        value = value.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
      } else if (value.length > 0) {
        value = value.replace(/^(\d{0,2})$/, '($1');
      }

      e.target.value = value;
    });
  }

  // 6. Higienização e Envio do Formulário Estruturado para o WhatsApp
  const sanitize = (str) => {
    if (!str) return '';
    return str.replace(/[<>]/g, '').trim();
  };

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const rawNome = document.getElementById('nome')?.value || '';
      const rawTelefone = document.getElementById('telefone')?.value || '';
      const rawEmail = document.getElementById('email')?.value || '';
      const rawArea = document.getElementById('area')?.value || '';
      const rawRelato = document.getElementById('relato')?.value || '';

      const nome = sanitize(rawNome);
      const telefone = sanitize(rawTelefone);
      const email = sanitize(rawEmail);
      const area = sanitize(rawArea);
      const relato = sanitize(rawRelato);

      const digitsOnly = telefone.replace(/\D/g, '');

      if (!nome || digitsOnly.length < 10) {
        alert('Por favor, informe seu nome completo e um número válido de telefone/WhatsApp com DDD (mínimo 10 dígitos).');
        return;
      }

      const whatsappBaseUrl = "https://wa.me/5514997118732";
      let text = `*SOLICITAÇÃO DE ORIENTAÇÃO JURÍDICA CONFIDENCIAL*\n`;
      text += `*Beatriz Rocha Sociedade Individual de Advocacia*\n\n`;
      text += `• *Nome:* ${nome}\n`;
      text += `• *WhatsApp/Telefone:* ${telefone}\n`;
      if (email) text += `• *E-mail:* ${email}\n`;
      if (area) text += `• *Matéria da Demanda:* ${area}\n`;
      if (relato) text += `• *Resumo da Situação:* ${relato}\n\n`;
      text += `_Mensagem submetida espontaneamente pelo formulário do site com consentimento prévio nos termos da LGPD._`;

      const targetUrl = `${whatsappBaseUrl}?text=${encodeURIComponent(text)}`;
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    });
  }

  // 7. Modais Institucionais (LGPD e Termos de Uso)
  const privacyModal = document.getElementById('privacy-modal');
  const termsModal = document.getElementById('terms-modal');

  const openModal = (modal) => {
    if (!modal) return;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = (modal) => {
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    if (
      (!privacyModal || privacyModal.classList.contains('hidden')) &&
      (!termsModal || termsModal.classList.contains('hidden'))
    ) {
      document.body.style.overflow = '';
    }
  };

  // Triggers de abertura
  document.querySelectorAll('[data-open-modal="privacy"]').forEach(btn => {
    btn.addEventListener('click', () => openModal(privacyModal));
  });

  document.querySelectorAll('[data-open-modal="terms"]').forEach(btn => {
    btn.addEventListener('click', () => openModal(termsModal));
  });

  // Triggers de fechamento
  document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      closeModal(privacyModal);
      closeModal(termsModal);
    });
  });

  // Fechar ao clicar no backdrop escuro
  [privacyModal, termsModal].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (!e.target.closest('.modal-container')) {
          closeModal(modal);
        }
      });
    }
  });

  // Fechar com a tecla ESC
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal(privacyModal);
      closeModal(termsModal);
    }
  });

  // 8. Banner Flutuante de Consentimento LGPD
  const lgpdBanner = document.getElementById('lgpd-banner');
  const lgpdAcceptBtn = document.getElementById('lgpd-accept-btn');

  if (lgpdBanner) {
    try {
      const hasConsent = localStorage.getItem('bgr_lgpd_consent') === 'true';
      if (!hasConsent) {
        lgpdBanner.classList.remove('hidden');
      }
    } catch {
      lgpdBanner.classList.remove('hidden');
    }

    if (lgpdAcceptBtn) {
      lgpdAcceptBtn.addEventListener('click', () => {
        try {
          localStorage.setItem('bgr_lgpd_consent', 'true');
        } catch {}
        lgpdBanner.classList.add('hidden');
      });
    }
  }
});
