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

  // 9. Stepper Interativo de Medidas de Urgência & Checklist Dinâmico
  const urgencyStepsData = [
    {
      stepNumber: "01",
      shortTitle: "Triagem Documental",
      fullTitle: "Análise Técnica e Imediata do Laudo e da Negativa",
      phaseBadge: "Fase 01 • Análise Preliminar",
      timeEstimate: "Até 2h úteis",
      timeBadge: "Tempo estimado: Análise preliminar em até 2h úteis",
      description: "Avaliamos minuciosamente o relatório do médico assistente e a justificativa da recusa pelo plano de saúde. Em demandas de neurodesenvolvimento (TEA) ou risco iminente de descontinuidade clínica, a indicação médica fundamentada prevalece juridicamente sobre restrições administrativas da operadora.",
      legalThesis: "Lei Federal nº 14.454/2022 (Superação do rol taxativo da ANS), Súmula 102 do TJSP e dever de assistência integral à saúde.",
      deliverable: "Diagnóstico inicial de viabilidade jurídica para ingresso imediato com o pedido de tutela provisória de urgência.",
      isChecklistStep: true
    },
    {
      stepNumber: "02",
      shortTitle: "Estratégia e Protocolo",
      fullTitle: "Petição Inicial com Pedido de Tutela Provisória de Urgência",
      phaseBadge: "Fase 02 • Ajuizamento Eletrônico",
      timeEstimate: "4h a 12h",
      timeBadge: "Tempo estimado: Distribuição em 4h a 12h após conferência",
      description: "Redação artesanal e ajuizamento eletrônico do pedido liminar inaudita altera parte, demonstrando a probabilidade do direito (fumus boni iuris) e o perigo de dano irreparável ao neurodesenvolvimento ou à integridade do paciente (periculum in mora).",
      legalThesis: "Artigo 300 do Código de Processo Civil (CPC), Princípio da Dignidade da Pessoa Humana e Artigo 196 da CF/88.",
      deliverable: "Comprovante formal de distribuição no tribunal competente com número de protocolo CNJ e chave de acesso aos autos.",
      isChecklistStep: false
    },
    {
      stepNumber: "03",
      shortTitle: "Acompanhamento da Liminar",
      fullTitle: "Despacho Direto com o Magistrado e Monitoramento Ostensivo",
      phaseBadge: "Fase 03 • Decisão Judicial",
      timeEstimate: "24h a 72h",
      timeBadge: "Tempo estimado: Decisão judicial costumeira em 24h a 72h (ou regime de plantão)",
      description: "Interlocução direta e despacho com o magistrado da causa ou no plantão judiciário de saúde. Monitoramento ostensivo do processo para assegurar que a prescrição médica seja apreciada com a máxima celeridade, antes de qualquer prejuízo clínico.",
      legalThesis: "Tema 1.295 do Superior Tribunal de Justiça (STJ - cobertura ilimitada no TEA) e Resoluções do CNJ sobre plantão em saúde.",
      deliverable: "Cópia da decisão interlocutória concessiva da tutela de urgência contendo a ordem judicial de custeio/fornecimento.",
      isChecklistStep: false
    },
    {
      stepNumber: "04",
      shortTitle: "Efetivação do Direito",
      fullTitle: "Intimação Obrigatória e Início do Atendimento",
      phaseBadge: "Fase 04 • Cumprimento Imediato",
      timeEstimate: "Até 24h",
      timeBadge: "Tempo estimado: Intimação urgente em até 24h sob pena de multa diária",
      description: "Intimação imediata da operadora para emissão das guias de autorização ou custeio em clínica especializada (com reembolso integral em caso de falha de rede credenciada), fixando-se multa cominatória diária (astreintes) em caso de mora ou recusa de cumprimento.",
      legalThesis: "Artigos 536 e 537 do CPC (Medidas Indutivas e Coercitivas), Tema 1.082 do STJ e RN 566/2022 da ANS.",
      deliverable: "Comprovante de autorização emitido pela operadora, início das terapias e assessoria contínua durante todo o processo.",
      isChecklistStep: false
    }
  ];

  let currentUrgencyStep = 0;
  const urgencyTabs = document.querySelectorAll('.urgency-tab');
  const urgencyCard = document.getElementById('urgency-step-card');
  const phaseBadge = document.getElementById('urgency-phase-badge');
  const stepCounter = document.getElementById('urgency-step-counter');
  const timeBadge = document.getElementById('urgency-time-badge');
  const stepTitle = document.getElementById('urgency-step-title');
  const stepDesc = document.getElementById('urgency-step-desc');
  const legalThesis = document.getElementById('urgency-legal-thesis');
  const deliverable = document.getElementById('urgency-deliverable');
  const checklistWrapper = document.getElementById('urgency-checklist-wrapper');
  const prevBtn = document.getElementById('urgency-prev-btn');
  const nextBtn = document.getElementById('urgency-next-btn');
  const finalCta = document.getElementById('urgency-final-cta');
  const startNote = document.getElementById('urgency-start-note');
  const stepDots = document.querySelectorAll('#urgency-step-dots button');

  // Elementos do Checklist
  const chkNegativa = document.getElementById('chk-negativa');
  const chkLaudo = document.getElementById('chk-laudo');
  const chkComprovantes = document.getElementById('chk-comprovantes');
  const checklistBox = document.getElementById('checklist-whatsapp-box');
  const checklistPlaceholder = document.getElementById('checklist-placeholder');
  const checklistBtn = document.getElementById('checklist-whatsapp-btn');

  function updateChecklistState() {
    if (!chkNegativa || !chkLaudo || !chkComprovantes) return;
    const hasAny = chkNegativa.checked || chkLaudo.checked || chkComprovantes.checked;

    // Atualiza classes visuais dos itens
    document.querySelectorAll('.checklist-item').forEach(item => {
      const input = item.querySelector('input[type="checkbox"]');
      if (input && input.checked) {
        item.classList.add('bg-[#FAF7F2]', 'border-[#8C7355]', 'shadow-2xs');
        item.classList.remove('bg-white', 'border-[#E6E1D6]');
      } else {
        item.classList.remove('bg-[#FAF7F2]', 'border-[#8C7355]', 'shadow-2xs');
        item.classList.add('bg-white', 'border-[#E6E1D6]');
      }
    });

    if (hasAny) {
      if (checklistBox) {
        checklistBox.classList.remove('hidden');
        checklistBox.classList.add('flex');
      }
      if (checklistPlaceholder) {
        checklistPlaceholder.classList.add('hidden');
      }

      // Prepara mensagem de WhatsApp
      const selectedLabels = [];
      if (chkNegativa.checked) selectedLabels.push("• Negativa formal do plano de saúde por escrito (ou protocolo de recusa)");
      if (chkLaudo.checked) selectedLabels.push("• Relatório médico circunstanciado com a CID e indicação terapêutica detalhada");
      if (chkComprovantes.checked) selectedLabels.push("• Carteirinha do plano de saúde e comprovantes de quitação recentes");

      const message = [
        "*SOLICITAÇÃO DE TRIAGEM DOCUMENTAL DE URGÊNCIA*",
        "*Beatriz Rocha Sociedade Individual de Advocacia*",
        "",
        "Olá, Dra. Beatriz Rocha. Preenchi o checklist de triagem no site e já possuo em mãos os seguintes documentos:",
        "",
        ...selectedLabels,
        "",
        "Gostaria de orientações sobre a análise preliminar e os próximos passos para a medida liminar."
      ].join("\n");

      if (checklistBtn) {
        checklistBtn.href = `https://wa.me/5514997118732?text=${encodeURIComponent(message)}`;
      }
    } else {
      if (checklistBox) {
        checklistBox.classList.add('hidden');
        checklistBox.classList.remove('flex');
      }
      if (checklistPlaceholder) {
        checklistPlaceholder.classList.remove('hidden');
      }
    }
  }

  [chkNegativa, chkLaudo, chkComprovantes].forEach(chk => {
    if (chk) {
      chk.addEventListener('change', updateChecklistState);
    }
  });

  function renderUrgencyStep(stepIdx) {
    if (stepIdx < 0 || stepIdx >= urgencyStepsData.length) return;
    currentUrgencyStep = stepIdx;
    const data = urgencyStepsData[stepIdx];

    // Atualiza tabs
    urgencyTabs.forEach((tab, idx) => {
      const isAct = idx === stepIdx;
      tab.setAttribute('aria-selected', isAct ? 'true' : 'false');
      const numSpan = tab.querySelector('.urgency-tab-num');
      const timeSpan = tab.querySelector('.urgency-tab-time');
      const titleH4 = tab.querySelector('.urgency-tab-title');
      const barSpan = tab.querySelector('.urgency-tab-bar');

      if (isAct) {
        tab.className = 'urgency-tab relative p-3 sm:p-4 text-left rounded-[3px] transition-all duration-200 cursor-pointer flex flex-col justify-between bg-white border border-[#D2B48C] shadow-xs';
        if (numSpan) numSpan.className = 'urgency-tab-num w-7 h-7 rounded-full text-xs font-semibold flex items-center justify-center transition-colors bg-[#8C7355] text-white shadow-xs';
        if (timeSpan) timeSpan.className = 'urgency-tab-time text-[10px] uppercase tracking-wider font-medium text-[#8C7355]';
        if (titleH4) titleH4.className = 'urgency-tab-title text-xs sm:text-sm font-serif font-medium leading-tight text-[#18181B]';
        if (barSpan) barSpan.classList.remove('hidden');
      } else {
        tab.className = 'urgency-tab relative p-3 sm:p-4 text-left rounded-[3px] transition-all duration-200 cursor-pointer flex flex-col justify-between bg-transparent border border-transparent hover:bg-white/60 hover:border-[#E6E1D6]';
        if (numSpan) numSpan.className = 'urgency-tab-num w-7 h-7 rounded-full text-xs font-semibold flex items-center justify-center transition-colors bg-[#EAE5DC] text-[#71717A]';
        if (timeSpan) timeSpan.className = 'urgency-tab-time text-[10px] uppercase tracking-wider font-medium text-[#A1A1AA]';
        if (titleH4) titleH4.className = 'urgency-tab-title text-xs sm:text-sm font-serif font-medium leading-tight text-[#52525B]';
        if (barSpan) barSpan.classList.add('hidden');
      }
    });

    // Atualiza Dots
    stepDots.forEach((dot, idx) => {
      if (idx === stepIdx) {
        dot.className = 'h-2.5 rounded-full transition-all cursor-pointer w-6 bg-[#8C7355]';
      } else {
        dot.className = 'h-2.5 rounded-full transition-all cursor-pointer w-2.5 bg-[#D4CEB2] hover:bg-[#8C7355]/60';
      }
    });

    // Atualiza Conteúdo
    if (phaseBadge) phaseBadge.textContent = data.phaseBadge;
    if (stepCounter) stepCounter.textContent = `Etapa ${stepIdx + 1} de ${urgencyStepsData.length}`;
    if (timeBadge) timeBadge.textContent = data.timeBadge;
    if (stepTitle) stepTitle.textContent = data.fullTitle;
    if (stepDesc) stepDesc.textContent = data.description;
    if (legalThesis) legalThesis.textContent = data.legalThesis;
    if (deliverable) deliverable.textContent = data.deliverable;

    // Toggle checklist
    if (checklistWrapper) {
      if (data.isChecklistStep) {
        checklistWrapper.classList.remove('hidden');
      } else {
        checklistWrapper.classList.add('hidden');
      }
    }

    // Botão Anterior
    if (stepIdx > 0) {
      if (prevBtn) {
        prevBtn.classList.remove('hidden');
        prevBtn.textContent = `← Etapa Anterior: ${urgencyStepsData[stepIdx - 1].shortTitle}`;
      }
      if (startNote) startNote.classList.add('hidden');
    } else {
      if (prevBtn) prevBtn.classList.add('hidden');
      if (startNote) startNote.classList.remove('hidden');
    }

    // Botão Próximo / Final CTA
    if (stepIdx < urgencyStepsData.length - 1) {
      if (nextBtn) {
        nextBtn.classList.remove('hidden');
        nextBtn.textContent = `Próxima Etapa: ${urgencyStepsData[stepIdx + 1].shortTitle} →`;
      }
      if (finalCta) finalCta.classList.add('hidden');
    } else {
      if (nextBtn) nextBtn.classList.add('hidden');
      if (finalCta) finalCta.classList.remove('hidden');
    }

    // Transição Suave (Fade In)
    if (urgencyCard) {
      urgencyCard.classList.remove('animate-fadeIn');
      void urgencyCard.offsetWidth; // Trigger reflow
      urgencyCard.classList.add('animate-fadeIn');
    }
  }

  // Listeners de Tabs
  urgencyTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const idx = parseInt(tab.getAttribute('data-step-index') || '0', 10);
      renderUrgencyStep(idx);
    });
  });

  // Listeners de Dots
  stepDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-dot-index') || '0', 10);
      renderUrgencyStep(idx);
    });
  });

  // Listeners de Prev e Next
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentUrgencyStep > 0) {
        renderUrgencyStep(currentUrgencyStep - 1);
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentUrgencyStep < urgencyStepsData.length - 1) {
        renderUrgencyStep(currentUrgencyStep + 1);
      }
    });
  }

});
