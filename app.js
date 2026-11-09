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

  // 9. Interatividade por Hover e Toque (Passo 01: Triagem Documental)
  const urgencyCardStep1 = document.getElementById('urgency-card-step1');
  const urgencyStep1Normal = document.getElementById('urgency-step1-normal');
  const urgencyStep1Hover = document.getElementById('urgency-step1-hover');

  if (urgencyCardStep1 && urgencyStep1Normal && urgencyStep1Hover) {
    let step1Active = false;
    urgencyCardStep1.addEventListener('click', () => {
      // Suporte para alternância por toque em smartphones e tablets
      step1Active = !step1Active;
      if (step1Active) {
        urgencyStep1Normal.classList.add('opacity-0', 'pointer-events-none');
        urgencyStep1Hover.classList.remove('opacity-0', 'pointer-events-none');
        urgencyStep1Hover.classList.add('opacity-100', 'pointer-events-auto');
        urgencyCardStep1.classList.add('border-[#8C7355]', 'bg-[#FAF7F2]');
      } else {
        urgencyStep1Normal.classList.remove('opacity-0', 'pointer-events-none');
        urgencyStep1Hover.classList.remove('opacity-100', 'pointer-events-auto');
        urgencyStep1Hover.classList.add('opacity-0', 'pointer-events-none');
        urgencyCardStep1.classList.remove('border-[#8C7355]', 'bg-[#FAF7F2]');
      }
    });
  }

  // ============================================================================
  // 10. CENTRAL DE FERRAMENTAS JURÍDICAS (UTILIDADE PÚBLICA • CLIENT-SIDE)
  // ============================================================================

  // Navegação de Abas da Central
  const toolTabBtns = document.querySelectorAll('.tool-tab-btn');
  const toolPanels = document.querySelectorAll('.tool-panel');
  const toolToast = document.getElementById('tool-copied-toast');

  function switchTool(toolId) {
    // Atualiza botões
    toolTabBtns.forEach(btn => {
      const isTarget = btn.getAttribute('data-tool') === toolId;
      if (isTarget) {
        if (toolId === 'emergencia-pix') {
          btn.className = 'tool-tab-btn active px-3.5 py-2.5 rounded-[4px] text-xs font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 shrink-0 bg-rose-900 text-white shadow-xs';
        } else if (toolId === 'triage') {
          btn.className = 'tool-tab-btn active px-3.5 py-2.5 rounded-[4px] text-xs font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 shrink-0 bg-[#18181B] text-white shadow-xs';
        } else {
          btn.className = 'tool-tab-btn active px-3.5 py-2.5 rounded-[4px] text-xs font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 shrink-0 bg-[#8C7355] text-white shadow-xs';
        }
      } else {
        if (btn.getAttribute('data-tool') === 'emergencia-pix') {
          btn.className = 'tool-tab-btn px-3.5 py-2.5 rounded-[4px] text-xs font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 shrink-0 text-rose-900 bg-rose-50/70 border border-rose-200/60 hover:bg-rose-100/70';
        } else {
          btn.className = 'tool-tab-btn px-3.5 py-2.5 rounded-[4px] text-xs font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 shrink-0 text-[#52525B] hover:text-[#18181B] hover:bg-[#FAF7F2]';
        }
      }
    });

    // Atualiza painéis
    toolPanels.forEach(panel => {
      if (panel.id === `tool-panel-${toolId}`) {
        panel.classList.remove('hidden');
        panel.classList.add('animate-fadeIn');
      } else {
        panel.classList.add('hidden');
        panel.classList.remove('animate-fadeIn');
      }
    });
  }

  toolTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const toolId = btn.getAttribute('data-tool');
      if (toolId) switchTool(toolId);
    });
  });

  // Botões de navegação rápida (Wizard e Pontes contextuais)
  document.querySelectorAll('[data-nav-tool]').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTool = btn.getAttribute('data-nav-tool');
      if (targetTool) {
        switchTool(targetTool);
        const section = document.getElementById('ferramentas');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // Função utilitária de cópia com Toast
  function copyTextWithToast(text) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        if (toolToast) {
          toolToast.classList.remove('hidden');
          toolToast.classList.add('flex');
          setTimeout(() => {
            toolToast.classList.add('hidden');
            toolToast.classList.remove('flex');
          }, 2500);
        }
      });
    }
  }

    // ============================================================================
  // GERENCIAMENTO DE MODAIS DA CENTRAL DE FERRAMENTAS (FLUXO DIRETO EM 1 CLIQUE)
  // ============================================================================
  const legalModals = document.querySelectorAll('.legal-modal');

  function openLegalModal(modalId) {
    const targetModal = document.getElementById(modalId);
    if (targetModal) {
      targetModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeAllLegalModals() {
    legalModals.forEach(m => m.classList.add('hidden'));
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-open-modal]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const modalId = trigger.getAttribute('data-open-modal');
      if (modalId) openLegalModal(modalId);
    });
  });

  document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeAllLegalModals();
    });
  });

  legalModals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeAllLegalModals();
      }
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllLegalModals();
    }
  });

  // --- FERRAMENTA 1: SIMULADOR DE RENDA BPC/LOAS ---
  const bpcMembers = document.getElementById('bpc-members');
  const bpcIncome = document.getElementById('bpc-income');
  const bpcExpenses = document.getElementById('bpc-expenses');

  function updateBpcCalc() {
    if (!bpcMembers || !bpcIncome || !bpcExpenses) return;
    const members = Math.max(1, parseInt(bpcMembers.value, 10) || 1);
    const income = Math.max(0, parseFloat(bpcIncome.value) || 0);
    const expenses = Math.max(0, parseFloat(bpcExpenses.value) || 0);

    const netIncome = Math.max(0, income - expenses);
    const rawPerCapita = income / members;
    const deductionPerCapita = expenses / members;
    const netPerCapita = netIncome / members;

    const elRaw = document.getElementById('bpc-out-raw');
    const elDed = document.getElementById('bpc-out-ded');
    const elNet = document.getElementById('bpc-out-net');
    const elAnalysis = document.getElementById('bpc-out-analysis');

    if (elRaw) elRaw.textContent = `R$ ${rawPerCapita.toFixed(2).replace('.', ',')}`;
    if (elDed) elDed.textContent = `- R$ ${deductionPerCapita.toFixed(2).replace('.', ',')}`;
    if (elNet) elNet.textContent = `R$ ${netPerCapita.toFixed(2).replace('.', ',')}`;

    if (elAnalysis) {
      if (netPerCapita <= 353.00) {
        elAnalysis.innerHTML = `<span class="text-emerald-900 font-medium">✓ A renda líquida de R$ ${netPerCapita.toFixed(2).replace('.', ',')} está <strong>dentro do limite objetivo estrito de 1/4 do salário mínimo (R$ 353,00)</strong>. Atende formalmente aos critérios administrativos diretos de concessão do INSS.</span>`;
      } else if (netPerCapita <= 706.00) {
        elAnalysis.innerHTML = `<span class="text-amber-900 font-medium">⚖️ A renda líquida de R$ ${netPerCapita.toFixed(2).replace('.', ',')} está entre 1/4 e 1/2 salário mínimo (R$ 706,00). O INSS costuma negar administrativamente, mas a <strong>jurisprudência consolidada do STF (RE 567.985)</strong> autoriza a concessão mediante comprovação das despesas contínuas de saúde.</span>`;
      } else {
        elAnalysis.innerHTML = `<span class="text-[#52525B]">ℹ️ A renda líquida apurada de R$ ${netPerCapita.toFixed(2).replace('.', ',')} supera 1/2 salário mínimo. A concessão exige demonstração probatória aprofundada de vulnerabilidade socioeconômica.</span>`;
      }
    }
  }

  [bpcMembers, bpcIncome, bpcExpenses].forEach(inp => {
    if (inp) {
      inp.addEventListener('input', updateBpcCalc);
      inp.addEventListener('change', updateBpcCalc);
    }
  });

  const btnCopyBpc = document.getElementById('btn-copy-bpc');
  if (btnCopyBpc) {
    btnCopyBpc.addEventListener('click', () => {
      const members = bpcMembers ? bpcMembers.value : 3;
      const gross = bpcIncome ? bpcIncome.value : 1412;
      const expenses = bpcExpenses ? bpcExpenses.value : 350;
      const netPerCap = bpcMembers && bpcIncome && bpcExpenses ? Math.max(0, (bpcIncome.value - bpcExpenses.value) / bpcMembers.value).toFixed(2) : '354.00';
      const text = `[SIMULAÇÃO BPC/LOAS]\nEscritório: Beatriz Rocha Advocacia (OAB/SP 463.673)\n\n• Pessoas na família: ${members}\n• Renda Bruta: R$ ${gross}\n• Despesas Médicas: R$ ${expenses}\n• Renda Líquida per Capita: R$ ${netPerCap}\n• Enquadramento: Conforme Lei 8.742/93 e Precedentes STF (RE 567.985)`;
      copyTextWithToast(text);
    });
  }

  // --- FERRAMENTA 2: CALCULADORA DE COPARTICIPAÇÃO ---
  const copayMonthly = document.getElementById('copay-monthly');
  const copaySessions = document.getElementById('copay-sessions');
  const copaySessionVal = document.getElementById('copay-session-val');

  function updateCopayCalc() {
    if (!copayMonthly || !copaySessions || !copaySessionVal) return;
    const monthly = Math.max(1, parseFloat(copayMonthly.value) || 1);
    const sessions = Math.max(0, parseInt(copaySessions.value, 10) || 0);
    const sessionVal = Math.max(0, parseFloat(copaySessionVal.value) || 0);

    const totalCopay = sessions * sessionVal;
    const copayPct = (totalCopay / monthly) * 100;

    const elTotal = document.getElementById('copay-out-total');
    const elPct = document.getElementById('copay-out-pct');
    const elAnalysis = document.getElementById('copay-out-analysis');

    if (elTotal) elTotal.textContent = `R$ ${totalCopay.toFixed(2).replace('.', ',')}`;
    if (elPct) elPct.textContent = `${copayPct.toFixed(1)}% do plano`;

    if (elAnalysis) {
      if (copayPct > 50) {
        elAnalysis.innerHTML = `<span class="text-rose-900 font-medium">⚠️ <strong>Cobrança com Fortes Indícios de Abusividade:</strong> A coparticipação equivale a ${copayPct.toFixed(1)}% da mensalidade, violando o teto orientativo da ANS (máximo de 30% a 50%) e inviabilizando o tratamento. Para pacientes com TEA, o STJ (Tema 1.295) veda restrições financeiras que comprometam as horas prescritas.</span>`;
      } else {
        elAnalysis.innerHTML = `<span class="text-emerald-900 font-medium">✓ A coparticipação calculada (${copayPct.toFixed(1)}%) encontra-se dentro dos limites percentuais gerais. Contudo, em casos de TEA ou tratamentos graves e contínuos, limites de sessões e cobranças cumulativas não podem impedir a continuidade terapêutica prescrita.</span>`;
      }
    }
  }

  [copayMonthly, copaySessions, copaySessionVal].forEach(inp => {
    if (inp) {
      inp.addEventListener('input', updateCopayCalc);
      inp.addEventListener('change', updateCopayCalc);
    }
  });

  const btnCopyCopay = document.getElementById('btn-copy-copay');
  if (btnCopyCopay) {
    btnCopyCopay.addEventListener('click', () => {
      const monthly = copayMonthly ? copayMonthly.value : 850;
      const sessions = copaySessions ? copaySessions.value : 16;
      const val = copaySessionVal ? copaySessionVal.value : 95;
      const total = (sessions * val).toFixed(2);
      const pct = ((total / (monthly || 1)) * 100).toFixed(1);
      const text = `[ANÁLISE DE COPARTICIPAÇÃO]\nEscritório: Beatriz Rocha Advocacia (OAB/SP 463.673)\n\n• Mensalidade: R$ ${monthly}\n• Sessões: ${sessions}x de R$ ${val}\n• Total Coparticipação: R$ ${total} (${pct}% da mensalidade)\n• Parecer: ${pct > 50 ? 'Custo desproporcional / Indício de Abusividade (Tema 1.295 STJ)' : 'Dentro dos limites gerais da ANS'}`;
      copyTextWithToast(text);
    });
  }

  // --- FERRAMENTA 3: EMERGÊNCIA PIX & GOLPES ---
  const btnCopyPix = document.getElementById('btn-copy-pix');
  if (btnCopyPix) {
    btnCopyPix.addEventListener('click', () => {
      const timeframeEl = document.getElementById('pix-timeframe');
      const typeEl = document.getElementById('pix-type');
      const text = `[ROTEIRO DE EMERGÊNCIA PIX / MED]\nEscritório: Beatriz Rocha Advocacia (OAB/SP 463.673)\n\n1. ACIONAR MED NO APP:\n- Entrar no comprovante do Pix e clicar em 'Contestar/Reportar Fraude' (Resolução BCB nº 103/2021).\n\n2. BOLETIM DE OCORRÊNCIA:\n- Lavrar B.O. com o código End-to-End Id de 32 caracteres.\n\n3. BASE JURÍDICA:\n- Súmula 479 do STJ (Responsabilidade objetiva das instituições financeiras por fortuito interno).`;
      copyTextWithToast(text);
    });
  }

  // Inicialização dos cálculos na carga
  updateBpcCalc();
  updateCopayCalc();

// 11. Scroll Reveal Global (Fade-in Suave com Elevação de 15px)
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (!('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -30px 0px'
    });
    revealElements.forEach(el => observer.observe(el));
  }

});