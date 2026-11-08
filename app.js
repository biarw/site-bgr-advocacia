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

  // 3. Filtros e Busca Rápida na Seção de Notícias
  const filterBtns = document.querySelectorAll('.news-filter-btn');
  const searchInput = document.getElementById('news-search');
  const newsCards = document.querySelectorAll('.news-card');

  let activeCategory = 'Todas';
  let searchTerm = '';

  function applyNewsFilters() {
    newsCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      const cardKeywords = (card.getAttribute('data-keywords') || '').toLowerCase();
      const cardText = card.innerText.toLowerCase();

      const matchesCat = (activeCategory === 'Todas') || (cardCategory === activeCategory);
      const matchesSearch = !searchTerm || cardKeywords.includes(searchTerm) || cardText.includes(searchTerm);

      if (matchesCat && matchesSearch) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => {
          b.classList.remove('bg-[#8C7355]', 'text-white', 'font-medium', 'shadow-xs');
          b.classList.add('bg-white', 'border', 'border-[#E6E1D6]', 'text-[#52525B]');
        });

        btn.classList.remove('bg-white', 'border', 'border-[#E6E1D6]', 'text-[#52525B]');
        btn.classList.add('bg-[#8C7355]', 'text-white', 'font-medium', 'shadow-xs');

        activeCategory = btn.getAttribute('data-cat');
        applyNewsFilters();
      });
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value.trim().toLowerCase();
      applyNewsFilters();
    });
  }

  // 4. Máscara de Telefone / WhatsApp: (DD) 00000-0000
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

  // 5. Envio do Formulário Estruturado para o WhatsApp
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nome = document.getElementById('nome')?.value.trim();
      const telefone = document.getElementById('telefone')?.value.trim();
      const email = document.getElementById('email')?.value.trim();
      const area = document.getElementById('area')?.value;
      const relato = document.getElementById('relato')?.value.trim();

      if (!nome || !telefone) {
        alert('Por favor, preencha ao menos seu nome e telefone/WhatsApp.');
        return;
      }

      const whatsappBaseUrl = "https://wa.me/5514997118732";
      let text = `*SOLICITAÇÃO DE ORIENTAÇÃO JURÍDICA*\n`;
      text += `*Beatriz Rocha Sociedade Individual de Advocacia*\n\n`;
      text += `• *Nome:* ${nome}\n`;
      text += `• *Telefone/WhatsApp:* ${telefone}\n`;
      if (email) text += `• *E-mail:* ${email}\n`;
      if (area) text += `• *Área:* ${area}\n`;
      if (relato) text += `• *Resumo:* ${relato}\n\n`;
      text += `_Mensagem enviada através do site oficial do escritório._`;

      const targetUrl = `${whatsappBaseUrl}?text=${encodeURIComponent(text)}`;
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    });
  }
});
