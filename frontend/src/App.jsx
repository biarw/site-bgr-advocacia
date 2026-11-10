import React, { useState, useRef, useEffect } from 'react';
import CentralFerramentas from './components/CentralFerramentas/CentralFerramentas';

export default function BeatrizRochaAdvocacia() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [areasDropdownOpen, setAreasDropdownOpen] = useState(false);
  const [mobileAreasOpen, setMobileAreasOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  // Estado para interação por toque/click no Passo 01 (Medidas de Urgência) em dispositivos móveis
  const [step1Active, setStep1Active] = useState(false);

  // Estados dos Modais Institucionais e LGPD
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const [cookieConsentAccepted, setCookieConsentAccepted] = useState(() => {
    try {
      return typeof window !== 'undefined' && localStorage.getItem('bgr_lgpd_consent') === 'true';
    } catch {
      return false;
    }
  });

  const handleAcceptCookies = () => {
    try {
      localStorage.setItem('bgr_lgpd_consent', 'true');
    } catch {
      // Ignora restrições locais de cookies caso o navegador bloqueie
    }
    setCookieConsentAccepted(true);
  };

  // Trava o scroll da página e escuta a tecla ESC para acessibilidade dos modais
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setPrivacyModalOpen(false);
        setTermsModalOpen(false);
      }
    };
    if (privacyModalOpen || termsModalOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [privacyModalOpen, termsModalOpen]);

  // Scroll Reveal Global (Fade-in Suave com Elevação de 15px)
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    if (!('IntersectionObserver' in window)) {
      revealElements.forEach(el => el.classList.add('is-visible'));
      return;
    }

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

    return () => observer.disconnect();
  }, []);

  // Estados e controle do Carrossel de Notícias (Drag & Scroll)
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const scrollNews = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 390;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email: '',
    area: '',
    relato: ''
  });

  const whatsappBaseUrl = "https://wa.me/5514997118732";
  const whatsappUrl = `${whatsappBaseUrl}?text=Ol%C3%A1.%20Gostaria%20de%20solicitar%20uma%20orienta%C3%A7%C3%A3o%20jur%C3%ADdica%20ao%20escrit%C3%B3rio%20Beatriz%20Rocha%20Advocacia.`;
  const whatsappUrgenciaUrl = `${whatsappBaseUrl}?text=Ol%C3%A1.%20Preciso%20de%20uma%20an%C3%A1lise%20de%20urg%C3%AAncia%20junto%20ao%20escrit%C3%B3rio%20Beatriz%20Rocha%20Advocacia%20para%20uma%20negativa%20de%20sa%C3%BAde%20%2F%20terapias%20TEA.`;


  // Base de FAQ (Perguntas Frequentes Interativas)
  const faqDatabase = [
    {
      id: 1,
      question: "Quanto tempo demora para sair uma liminar contra o plano de saúde?",
      answer: "Por se tratar de pedido de tutela provisória de urgência fundamentado no art. 300 do CPC (com comprovação do perigo de dano irreparável à saúde ou interrupção do neurodesenvolvimento no autismo), a análise pelo magistrado costuma ocorrer entre 24 a 72 horas após a distribuição. Em casos gravíssimos ou que envolvam risco de morte, a apreciação pode ocorrer em poucas horas através do plantão judiciário."
    },
    {
      id: 2,
      question: "Quais documentos são necessários para exigir terapias ABA ou medicamentos negados?",
      answer: "Os documentos essenciais incluem: (1) Relatório médico circunstanciado emitido pelo médico assistente, indicando o diagnóstico (com CID), a metodologia prescrita (ex: Método ABA) e a carga horária semanal; (2) Negativa formal por escrito da operadora ou número de protocolo com prazo extrapolado; (3) Cópia da carteirinha do plano e comprovante de quitação; e (4) Documentos pessoais do paciente e de seus responsáveis."
    },
    {
      id: 3,
      question: "O plano de saúde pode cancelar o contrato ou retaliar se eu entrar com ação judicial?",
      answer: "Não. O cancelamento unilateral ou qualquer tipo de represália pelo ajuizamento de ação judicial é terminantemente proibido pela lei e pela jurisprudência pacificada do Superior Tribunal de Justiça (Tema 1082 do STJ). A continuidade do vínculo contratual é resguardada por ordem judicial sob cominação de pesadas multas diárias e responsabilização por danos morais."
    },
    {
      id: 4,
      question: "Como funciona o atendimento telepresencial para clientes fora de Marília/SP?",
      answer: "Toda a tramitação processual no Brasil ocorre por meio de processos 100% eletrônicos (PJe, e-SAJ, Projudi). Realizamos o atendimento inicial por videoconferência com total privacidade, a análise de documentos é feita por canal seguro e as procurações são assinadas digitalmente via Gov.br ou plataformas certificadas (ICP-Brasil), assegurando a mesma proximidade e agilidade do atendimento presencial."
    }
  ];

  // Base de Notícias Reais e Verificadas (Redação Editorial de Alto Impacto)
  const newsDatabase = [
    {
      id: 1,
      badge: "MIGALHAS",
      scope: "Direito à Saúde",
      date: "Jurisprudência Atual",
      readTime: "1 min",
      title: "Plano de saúde é proibido de recusar criança com autismo alegando \"falta de interesse comercial\"",
      summary: "O que diz a decisão: o plano de saúde não pode alegar interesse comercial genérico após o diagnóstico. A recusa configura seleção de risco ilícita e gera dever de aceitação imediata da família.",
      impact: "Garantia de adesão e manutenção no plano sem exclusões discriminatórias.",
      officialUrl: "https://www.migalhas.com.br/quentes/466978/plano-de-saude-deve-aceitar-crianca-autista-apos-recusar-adesao",
      partnerUrl: "https://www.tjsp.jus.br",
      partnerLabel: "TJSP ↗",
      verified: true
    },
    {
      id: 2,
      badge: "STJ & TJSP",
      scope: "Autismo & Terapias ABA",
      date: "Tema 1.295 STJ",
      readTime: "1 min",
      title: "Justiça determina custeio total de terapia multidisciplinar (Método ABA) fora da rede credenciada",
      summary: "O que diz a decisão: diante da inaptidão ou ausência de profissionais certificados na rede da operadora, o plano é obrigado a custear a clínica indicada ou ressarcir 100% dos valores particulares.",
      impact: "Custeio integral e ininterrupto do tratamento prescrito pelo médico assistente.",
      officialUrl: "https://www.migalhas.com.br/quentes/430648/plano-indenizara-crianca-com-tea-apos-negar-tratamento-fora-da-rede",
      partnerUrl: "https://www.gov.br/ans",
      partnerLabel: "Portal ANS ↗",
      verified: true
    },
    {
      id: 3,
      badge: "STF & STJ",
      scope: "Rol da ANS",
      date: "ADIn 7.265 / Extra-Rol",
      readTime: "2 min",
      title: "STF e STJ firmam critérios para fornecimento de medicamentos e procedimentos fora do rol da ANS",
      summary: "O que diz a decisão: havendo recomendação médica fundamentada e comprovação científica, a ausência no rol da ANS não impede a concessão de liminar para fármacos e terapias de alto custo.",
      impact: "Acesso viabilizado a tratamentos médicos essenciais mesmo fora da lista básica da ANS.",
      officialUrl: "https://www.migalhas.com.br/quentes/461400/toffoli-manda-stj-reanalisar-cobertura-de-remedio-fora-do-rol-da-ans",
      partnerUrl: "https://portal.stf.jus.br",
      partnerLabel: "Portal STF ↗",
      verified: true
    },
    {
      id: 4,
      badge: "CNJ",
      scope: "Família e Sucessões",
      date: "Resolução 571/2024",
      readTime: "1 min",
      title: "Resolução CNJ nº 571/2024 autoriza inventário e partilha em cartório mesmo havendo herdeiros menores",
      summary: "O que diz a decisão: o CNJ dispensou a via judicial quando há consenso e quinhão legal preservado com oitiva do Ministério Público, agilizando transmissões sucessórias.",
      impact: "Transmissão da herança em semanas perante cartório de notas, poupando anos de litígio.",
      officialUrl: "https://www.cnj.jus.br",
      partnerUrl: "https://www.conjur.com.br",
      partnerLabel: "ConJur ↗",
      verified: true
    },
    {
      id: 5,
      badge: "TJSP",
      scope: "Direito Tributário",
      date: "Jurisprudência Consolidada",
      readTime: "1 min",
      title: "TJSP consolida direito à isenção de IPVA e restituição dos últimos anos para pessoas com TEA e PCD",
      summary: "O que diz a decisão: o Tribunal de Justiça afasta critérios discriminatórios impostos pelo Estado e garante a imunidade do IPVA, além da devolução corrigida dos valores pagos indevidamente.",
      impact: "Cancelamento do imposto veicular e restituição financeira dos recolhimentos passados.",
      officialUrl: "https://www.tjsp.jus.br",
      partnerUrl: "https://www.conjur.com.br",
      partnerLabel: "ConJur ↗",
      verified: true
    }
  ];

  const handlePhoneChange = (e) => {
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

    setFormData(prev => ({ ...prev, telefone: value }));
  };

  // Higienização de strings para proteção contra injeção e XSS
  const sanitizeInput = (str) => {
    if (!str) return '';
    return str.replace(/[<>]/g, '').trim();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanNome = sanitizeInput(formData.nome);
    const cleanTelefone = sanitizeInput(formData.telefone);
    const digitsOnly = cleanTelefone.replace(/\D/g, '');

    if (!cleanNome || digitsOnly.length < 10) {
      alert('Por favor, informe seu nome completo e um número válido de telefone/WhatsApp com DDD (mínimo 10 dígitos).');
      return;
    }

    const cleanEmail = sanitizeInput(formData.email);
    const cleanArea = sanitizeInput(formData.area);
    const cleanRelato = sanitizeInput(formData.relato);

    const lines = [
      `*SOLICITAÇÃO DE ORIENTAÇÃO JURÍDICA CONFIDENCIAL*`,
      `*Beatriz Rocha Sociedade Individual de Advocacia*`,
      ``,
      `• *Nome:* ${cleanNome}`,
      `• *WhatsApp/Telefone:* ${cleanTelefone}`,
      cleanEmail ? `• *E-mail:* ${cleanEmail}` : null,
      cleanArea ? `• *Matéria da Demanda:* ${cleanArea}` : null,
      cleanRelato ? `• *Resumo da Situação:* ${cleanRelato}` : null,
      ``,
      `_Mensagem submetida espontaneamente pelo formulário do site com consentimento prévio nos termos da LGPD._`
    ].filter(Boolean);

    const message = lines.join('\n');
    window.open(`${whatsappBaseUrl}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#18181B] font-sans antialiased selection:bg-[#8C7355]/20">

      {/* Topbar Editorial Minimalista (Elementos Mantidos & Proporcionais) */}
      <aside
        className="topbar-editorial border-b border-[#E6E1D6] bg-[#F4EFE6]/60 text-[10.5px] sm:text-[11px] tracking-[0.04em] text-[#52525B] uppercase"
        aria-label="Informações Institucionais"
      >
        <div
          className="topbar-container max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 py-1 sm:py-1.5 flex justify-between items-center w-full"
          style={{ maxWidth: '1280px', margin: '0 auto', padding: '4px 5vw', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}
        >
          <span className="font-normal whitespace-nowrap text-[10.5px] sm:text-[11px]">
            EDIFÍCIO TORRE NOVA YORK • MARÍLIA/SP | OAB/SP 463.673
          </span>
          <div className="flex items-center gap-3 sm:gap-4 whitespace-nowrap text-[10.5px] sm:text-[11px]">
            <span>Seg. a Sex. 08h30 às 18h00</span>
            <span className="text-[#D6CFC2]">•</span>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#18181B] font-medium hover:text-[#8C7355] transition-colors tracking-normal inline-flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block"></span>
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </aside>

      {/* Header com Alinhamento Flexbox Rigoroso, Proporção Otimizada & CTA */}
      <header
        className="sticky top-0 z-50 header-glass border-b border-[#E5E0DA]"
        style={{ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', backgroundColor: 'rgba(255, 255, 255, 0.92)' }}
      >
        <div
          className="header-container max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 flex items-center justify-between w-full"
          style={{ maxWidth: '1280px', margin: '0 auto', padding: '10px 5vw', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', minHeight: '52px' }}
        >

          {/* Monograma BR + Identidade Proporcional (Subtítulo Preservado e Ajustado) */}
          <a href="#inicio" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
            <div className="w-8 h-8 sm:w-8.5 sm:h-8.5 border border-[#8C7355]/40 flex items-center justify-center bg-white shadow-2xs group-hover:border-[#8C7355] transition-colors shrink-0">
              <span className="font-serif text-[14px] sm:text-[15px] tracking-tight text-[#18181B]">BR</span>
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-serif text-[15px] sm:text-[16px] tracking-[0.1em] text-[#18181B] uppercase leading-none font-normal whitespace-nowrap">
                Beatriz Rocha
              </span>
              <span className="brand-subtitle text-[7.5px] sm:text-[8.5px] tracking-[0.05em] text-[#8C7355] uppercase font-sans font-medium mt-1 leading-none whitespace-nowrap">
                Sociedade Individual de Advocacia
              </span>
            </div>
          </a>

          {/* Navegação Desktop Fluida & Botão Agendar Consulta */}
          <div className="hidden lg:flex items-center">
            <nav
              className="flex items-center text-[11px] xl:text-[12px] font-medium tracking-[0.06em] uppercase text-[#52525B] gap-2.5 xl:gap-4 2xl:gap-5 shrink-0"
            >
              <a href="#institucional" className="py-2 hover:text-[#18181B] transition-colors whitespace-nowrap" style={{ whiteSpace: 'nowrap' }}>
                O Escritório
              </a>

              {/* Dropdown Agrupado de Áreas de Atuação */}
              <div
                className="relative py-2 whitespace-nowrap"
                style={{ whiteSpace: 'nowrap' }}
                onMouseEnter={() => setAreasDropdownOpen(true)}
                onMouseLeave={() => setAreasDropdownOpen(false)}
              >
                <a
                  href="#areas-atuacao"
                  className="flex items-center gap-1.5 hover:text-[#18181B] transition-colors whitespace-nowrap"
                  style={{ whiteSpace: 'nowrap' }}
                >
                  <span>Áreas de Atuação</span>
                  <span className="text-[10px] text-[#8C7355] font-serif">▾</span>
                </a>

                {/* Submenu Dropdown Elegante com todas as práticas exclusivas */}
                {areasDropdownOpen && (
                  <div className="absolute left-0 top-full w-72 bg-white border border-[#E6E1D6] shadow-lg py-2 z-50 animate-fadeIn normal-case">
                    <a
                      href="#saude-tea"
                      onClick={() => setAreasDropdownOpen(false)}
                      className="block px-5 py-3 hover:bg-[#FAF7F2] border-b border-[#F0ECE1] group/item"
                    >
                      <span className="text-xs font-semibold text-[#8C7355] block group-hover/item:text-[#18181B]">
                        Direito à Saúde & Autismo (TEA)
                      </span>
                      <span className="text-[11px] text-[#71717A] block font-light mt-0.5">
                        Método ABA, medicamentos e tutelas urgentes
                      </span>
                    </a>

                    <a
                      href="#areas-atuacao"
                      onClick={() => setAreasDropdownOpen(false)}
                      className="block px-5 py-3 hover:bg-[#FAF7F2] border-b border-[#F0ECE1] group/item"
                    >
                      <span className="text-xs font-medium text-[#18181B] block group-hover/item:text-[#8C7355]">
                        Família e Sucessões
                      </span>
                      <span className="text-[11px] text-[#71717A] block font-light mt-0.5">
                        Inventários em cartório (Res. 571/24) e partilhas
                      </span>
                    </a>

                    <a
                      href="#areas-atuacao"
                      onClick={() => setAreasDropdownOpen(false)}
                      className="block px-5 py-3 hover:bg-[#FAF7F2] border-b border-[#F0ECE1] group/item"
                    >
                      <span className="text-xs font-medium text-[#18181B] block group-hover/item:text-[#8C7355]">
                        Tributário & Isenções
                      </span>
                      <span className="text-[11px] text-[#71717A] block font-light mt-0.5">
                        Isenção de IPVA PCD/TEA e recuperação fiscal
                      </span>
                    </a>

                    <a
                      href="#areas-atuacao"
                      onClick={() => setAreasDropdownOpen(false)}
                      className="block px-5 py-3 hover:bg-[#FAF7F2] group/item"
                    >
                      <span className="text-xs font-medium text-[#18181B] block group-hover/item:text-[#8C7355]">
                        Direito Cível e Contratos
                      </span>
                      <span className="text-[11px] text-[#71717A] block font-light mt-0.5">
                        Segurança jurídica patrimonial e obrigações
                      </span>
                    </a>
                  </div>
                )}
              </div>

              <a href="#ferramentas" className="py-2 text-[#8C7355] hover:text-[#18181B] transition-colors whitespace-nowrap font-medium" style={{ whiteSpace: 'nowrap' }}>
                Central Jurídica
              </a>

              <a href="#informativos" className="py-2 hover:text-[#18181B] transition-colors whitespace-nowrap" style={{ whiteSpace: 'nowrap' }}>
                Informativos
              </a>

              <a href="#contato" className="py-2 hover:text-[#18181B] transition-colors whitespace-nowrap" style={{ whiteSpace: 'nowrap' }}>
                Contato
              </a>

              <a href="#faq" className="py-2 hover:text-[#18181B] transition-colors whitespace-nowrap" style={{ whiteSpace: 'nowrap' }}>
                FAQ
              </a>
            </nav>

            {/* Botão AGENDAR CONSULTA Proporcional, Enxuto e Alinhado */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="header-cta-btn bg-[#8C7355] text-white text-[12.5px] sm:text-[13px] tracking-[0.06em] uppercase font-medium hover:bg-[#735D43] transition-all rounded-[2px] shadow-2xs whitespace-nowrap inline-flex items-center justify-center shrink-0"
              style={{ marginLeft: '1rem', padding: '8px 16px', fontSize: '13px', whiteSpace: 'nowrap' }}
            >
              Agendar Consulta
            </a>
          </div>

          {/* Botão e CTA Mobile (< 1024px) - Alinhado no Eixo Central Vertical */}
          <div className="lg:hidden flex items-center gap-2 shrink-0">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-[#8C7355] text-white text-[11.5px] sm:text-[12px] tracking-[0.06em] uppercase font-medium hover:bg-[#735D43] transition-colors rounded-[2px] shadow-2xs whitespace-nowrap inline-flex items-center justify-center"
            >
              Agendar
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 sm:p-2 text-[#18181B] border border-[#E6E1D6] bg-white text-xs uppercase cursor-pointer flex items-center justify-center"
              aria-label="Abrir Menu de Navegação"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Menu Mobile Responsivo e Estruturado */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-[#E6E1D6] bg-[#FAF7F2] px-6 py-4 flex flex-col gap-3 text-sm">
            <a href="#inicio" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-[#8C7355]">Início</a>
            <a href="#institucional" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-[#8C7355]">O Escritório</a>

            {/* Accordion Áreas de Atuação no Mobile */}
            <div>
              <button
                onClick={() => setMobileAreasOpen(!mobileAreasOpen)}
                className="w-full text-left py-1 flex items-center justify-between font-medium text-[#18181B]"
              >
                <span>Áreas de Atuação</span>
                <span>{mobileAreasOpen ? '▴' : '▾'}</span>
              </button>
              {mobileAreasOpen && (
                <div className="pl-4 py-2 flex flex-col gap-2 text-xs border-l border-[#E6E1D6] my-1">
                  <a href="#saude-tea" onClick={() => setMobileMenuOpen(false)} className="text-[#8C7355] font-semibold">
                    • Direito à Saúde & Autismo (TEA)
                  </a>
                  <a href="#areas-atuacao" onClick={() => setMobileMenuOpen(false)} className="text-[#52525B]">
                    • Família e Sucessões
                  </a>
                  <a href="#areas-atuacao" onClick={() => setMobileMenuOpen(false)} className="text-[#52525B]">
                    • Tributário & Isenções
                  </a>
                  <a href="#areas-atuacao" onClick={() => setMobileMenuOpen(false)} className="text-[#52525B]">
                    • Direito Cível e Contratos
                  </a>
                </div>
              )}
            </div>

            <a href="#ferramentas" onClick={() => setMobileMenuOpen(false)} className="py-1 text-[#8C7355] font-semibold">Central de Ferramentas</a>
            <a href="#informativos" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-[#8C7355]">Informativos</a>
            <a href="#contato" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-[#8C7355]">Contato</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-[#8C7355]">FAQ</a>
          </div>
        )}
      </header>

      {/* Hero Section Editorial (Início) */}
      <section id="inicio" className="border-b border-[#E6E1D6] bg-[#FAF7F2] reveal-on-scroll is-visible" style={{ padding: '80px 0' }}>
        <div
          className="hero-grid w-full mx-auto"
          style={{ maxWidth: '1240px', margin: '0 auto', padding: '2rem', gap: '3rem', alignItems: 'center' }}
        >
          {/* Coluna Esquerda: Texto e CTAs */}
          <div className="w-full">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#E6E1D6] bg-white mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8C7355]"></span>
              <span className="text-[10px] tracking-[0.16em] uppercase text-[#52525B]">
                Assessoria Jurídica Especializada
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-[54px] text-[#18181B] leading-[1.12] tracking-tight font-normal">
              Orientação jurídica precisa e condução estratégica para proteger seus direitos com <span className="italic text-[#8C7355]">segurança e discrição.</span>
            </h1>

            <p className="mt-7 text-base md:text-lg text-[#52525B] font-light leading-relaxed max-w-2xl">
              Atuação consultiva e contenciosa pautada pelo rigor técnico, atendimento humanizado e confidencialidade irrestrita em demandas de Direito à Saúde, Proteção no Autismo (TEA), Sucessões e Contratos.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#saude-tea"
                className="btn-cta-primary inline-flex items-center justify-center text-center h-12 px-7 bg-[#8C7355] text-white text-xs tracking-[0.1em] uppercase font-medium border border-[#8C7355] hover:bg-[#735D43] hover:border-[#735D43] transition-all duration-300 rounded-[2px] shadow-2xs whitespace-nowrap"
                style={{ transition: 'all 0.3s ease' }}
              >
                Núcleo de Direito à Saúde & TEA
              </a>
              <a
                href="#contato"
                className="btn-cta-secondary inline-flex items-center justify-center text-center h-12 px-7 bg-white text-[#18181B] text-xs tracking-[0.1em] uppercase font-medium border border-[#D6CFC2] hover:border-[#8C7355] hover:text-[#8C7355] transition-all duration-300 rounded-[2px] shadow-2xs whitespace-nowrap"
                style={{ transition: 'all 0.3s ease' }}
              >
                Solicitar Análise de Urgência
              </a>
            </div>
          </div>

          {/* Sede Corporativa com Fotografia Real da Torre Nova York */}
          <div
            className="card-sede-corporativa w-full max-w-[380px] mx-auto lg:max-w-none flex flex-col"
            style={{ borderRadius: '8px', border: '1px solid rgba(210, 180, 140, 0.3)' }}
          >
            <div className="relative aspect-[16/11] overflow-hidden bg-[#FAF7F2] border-b border-[#D2B48C]/25 group">
              <img
                src="/assets/torre-fachada.jpg"
                alt="Fachada do Edifício Torre Nova York - Sede de Beatriz Rocha Advocacia em Marília SP"
                className="w-full h-full object-cover object-center filter saturate-[0.92] contrast-[1.03] group-hover:scale-105 transition-transform duration-700"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent"></div>
              <span className="absolute bottom-3 left-3 text-[10px] tracking-[0.16em] uppercase text-white font-medium bg-black/40 px-2.5 py-1 backdrop-blur-xs border border-white/20">
                Torre Nova York • Praça Capital
              </span>
            </div>

            <div className="card-body p-6" style={{ padding: '1.5rem' }}>
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#8C7355] block mb-2 font-medium">
                Sede Corporativa
              </span>
              <h2 className="font-serif text-2xl text-[#18181B] font-normal mb-2">
                Edifício Torre Nova York
              </h2>
              <p className="text-xs text-[#52525B] font-light leading-relaxed mb-5">
                Av. das Esmeraldas, nº 3895, Salas 305 e 306 — Marília/SP. Instalações de alto padrão preparadas para atendimento presencial privativo e condução estratégica em todo o Brasil.
              </p>

              {/* Metadados com respiro adequado */}
              <div className="pt-5 mt-4 border-t border-[#F0ECE1] space-y-3 text-xs text-[#52525B]">
                <div className="flex justify-between items-center py-0.5">
                  <span className="text-[#71717A] tracking-wider uppercase text-[10.5px]">Complexo</span>
                  <span className="text-[#18181B] font-medium">Praça Capital</span>
                </div>
                <div className="flex justify-between items-center py-0.5 border-t border-[#FAF7F2] pt-2">
                  <span className="text-[#71717A] tracking-wider uppercase text-[10.5px]">Atendimento</span>
                  <span className="text-[#18181B] font-medium">Com hora marcada</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* O Escritório / Institucional Humanizado */}
      <section id="institucional" className="section-spacing bg-white border-t border-[#D2B48C]/25 relative reveal-on-scroll">
        <div id="escritorio" className="absolute -top-24"></div>
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="grid md:grid-cols-12 gap-12 lg:gap-16 items-center mb-16">

            {/* Coluna 1: Texto Institucional & Assinatura Estilizada */}
            <div className="md:col-span-7 space-y-6">
              <span className="text-[11px] tracking-[0.2em] uppercase text-[#8C7355] block font-medium">
                Institucional & Condução Direta
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-[#18181B] font-normal leading-tight">
                Condução direta, estratégia e proximidade em cada caso.
              </h2>
              <div className="space-y-4 text-sm md:text-base text-[#52525B] font-light leading-relaxed">
                <p>
                  A <strong className="font-medium text-[#18181B]">Beatriz Rocha Advocacia</strong> nasceu da convicção de que assuntos complexos — em especial aqueles que envolvem a saúde de quem amamos ou o patrimônio familiar — não admitem intermediários nem respostas padronizadas. Aqui, cada cliente conta com a condução direta pelo escritório, do início ao fim da atuação.
                </p>
                <p>
                  Com sede instalada no Edifício Torre Nova York (Complexo Praça Capital), na Avenida das Esmeraldas, em Marília/SP, unimos a estrutura de um atendimento presencial privativo à agilidade do processo eletrônico. Atuamos com foco em medidas de urgência perante tribunais em todo o país.
                </p>
              </div>

              {/* Assinatura Institucional da Banca */}
              <div className="pt-6 border-t border-[#E6E1D6] mt-8 flex flex-col">
                <span className="font-serif italic text-3xl text-[#18181B] tracking-wide">
                  Beatriz Guilherme Rocha
                </span>
                <span className="text-xs uppercase tracking-[0.16em] text-[#8C7355] font-medium mt-1">
                  Advogada Titular • OAB/SP 463.673
                </span>
                <p className="text-xs text-[#71717A] font-light mt-1">
                  Condução estratégica de cada demanda pelo escritório com proximidade, rigor técnico e confidencialidade irrestrita.
                </p>
              </div>
            </div>

            {/* Coluna 2: Moldura Elegante e Sóbria da Sede Corporativa */}
            <div className="md:col-span-5">
              <div className="border border-[#E6E1D6] p-3.5 bg-[#FAF7F2] rounded-[4px] shadow-sm">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2px] bg-white border border-[#E6E1D6] group">
                  <img
                    src="/assets/recepcao-corporativa.jpg"
                    alt="Ambiente interno e recepção privativa da Beatriz Rocha Advocacia na Torre Nova York em Marília SP"
                    className="w-full h-full object-cover filter saturate-[0.92] contrast-[1.03] group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] uppercase tracking-wider text-[#D6CFC2] block font-medium">Torre Nova York • Marília/SP</span>
                    <p className="font-serif text-sm font-normal mt-0.5">Espaço Privativo para Atendimento Humanizado</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Galeria Arquitetônica do Complexo */}
          <div className="grid md:grid-cols-2 gap-6 pt-10 border-t border-[#E6E1D6]">
            <div className="relative aspect-[16/9] overflow-hidden rounded-[4px] border border-[#E6E1D6] bg-[#FAF7F2] group shadow-xs">
              <img
                src="/assets/complexo-esmeraldas.jpg"
                alt="Avenida das Esmeraldas e fachada integrada do complexo Praça Capital"
                className="w-full h-full object-cover filter saturate-[0.92] contrast-[1.03] group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] uppercase tracking-wider text-[#D6CFC2] block font-medium">Avenida das Esmeraldas • Marília/SP</span>
                <p className="font-serif text-base font-normal mt-0.5">Complexo Empresarial Praça Capital</p>
              </div>
            </div>

            <div className="relative aspect-[16/9] overflow-hidden rounded-[4px] border border-[#E6E1D6] bg-[#FAF7F2] group shadow-xs">
              <img
                src="/assets/portaria-seguranca.jpg"
                alt="Controle de acesso e segurança corporativa 24 horas"
                className="w-full h-full object-cover filter saturate-[0.92] contrast-[1.03] group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] uppercase tracking-wider text-[#D6CFC2] block font-medium">Acesso e Privacidade</span>
                <p className="font-serif text-base font-normal mt-0.5">Portaria 24 Horas e Segurança Integrada</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NÚCLEO EXCLUSIVO EM DESTAQUE: Direito à Saúde & Autismo (TEA) */}
      <section id="saude-tea" className="section-spacing bg-[#FAF7F2] border-t border-[#D2B48C]/25 reveal-on-scroll">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">

          <div className="max-w-3xl mb-14">
            <span className="text-[11px] tracking-[0.2em] uppercase text-[#8C7355] block mb-3 font-medium">
              Núcleo Especializado • Tutela Provisória de Urgência
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-[42px] text-[#18181B] font-normal leading-tight">
              Proteção Jurídica contra Negativas de Planos de Saúde e Garantia de Tratamento Integral no Autismo (TEA)
            </h2>
            <p className="mt-5 text-[#52525B] font-light leading-relaxed text-base md:text-lg">
              Receber a recusa de cobertura de um tratamento prescrito pelo médico ou ter o fornecimento de medicamentos de alto custo negado é um momento de extrema angústia para qualquer família. No caso do <strong>Transtorno do Espectro Autista (TEA)</strong>, a intervenção precoce é uma corrida contra o tempo: cada semana de atraso compromete a janela neurológica de desenvolvimento da criança.
            </p>
            <p className="mt-4 text-[#52525B] font-light leading-relaxed text-base">
              Nossa banca atua com foco em <strong>medidas liminares de urgência</strong> para restabelecer imediatamente a assistência devida, com base na premissa soberana de que a indicação do médico assistente prevalece sobre qualquer cláusula restritiva da operadora.
            </p>
          </div>

          {/* Cards de Atuação Especializada em Saúde */}
          <div className="grid md:grid-cols-2 gap-8 mb-14">

            <div className="p-8 border border-[#E6E1D6] bg-white card-hover shadow-xs rounded-[2px]">
              <span className="text-[10px] tracking-[0.16em] uppercase text-[#8C7355] font-medium block mb-2">
                Autismo e Desenvolvimento Atípico
              </span>
              <h3 className="font-serif text-2xl text-[#18181B] mb-3">
                Terapias Multidisciplinares pelo Método ABA sem Limite de Sessões
              </h3>
              <p className="text-sm text-[#52525B] font-light leading-relaxed mb-4">
                Garantia de custeio integral para todas as especialidades terapêuticas prescritas: <strong>Psicologia Comportamental (Método ABA)</strong>, Fonoaudiologia, Terapia Ocupacional com Integração Sensorial, Psicopedagogia e Musicoterapia. Ação voltada à derrubada de tetos anuais de sessões, coparticipações excessivas e obtenção de reembolso integral.
              </p>
              <div className="pt-4 border-t border-[#E6E1D6]/70 flex items-center justify-between text-xs text-[#8C7355]">
                <span>Lei 14.454/2022 • Tema 1.295 STJ</span>
                <span className="font-medium">Liminar Urgente</span>
              </div>
            </div>

            <div className="p-8 border border-[#E6E1D6] bg-white card-hover shadow-xs rounded-[2px]">
              <span className="text-[10px] tracking-[0.16em] uppercase text-[#8C7355] font-medium block mb-2">
                Fármacos Especiais e Oncologia
              </span>
              <h3 className="font-serif text-2xl text-[#18181B] mb-3">
                Medicamentos de Alto Custo, Biológicos e Tratamentos Oncológicos
              </h3>
              <p className="text-sm text-[#52525B] font-light leading-relaxed mb-4">
                Medidas jurídicas com pedido de tutela antecipada (liminar deferida em 24h a 48h) para fornecimento de medicamentos importados, imunobiológicos e quimioterápicos de uso oral ou ambulatorial recusados sob alegações de ausência na Diretriz de Utilização da ANS.
              </p>
              <div className="pt-4 border-t border-[#E6E1D6]/70 flex items-center justify-between text-xs text-[#8C7355]">
                <span>Lei 14.454/22 • TJSP</span>
                <span className="font-medium">Fornecimento Rápido</span>
              </div>
            </div>

            <div className="p-8 border border-[#E6E1D6] bg-white card-hover shadow-xs rounded-[2px]">
              <span className="text-[10px] tracking-[0.16em] uppercase text-[#8C7355] font-medium block mb-2">
                Cirurgias e Cuidados Críticos
              </span>
              <h3 className="font-serif text-2xl text-[#18181B] mb-3">
                Cirurgias de Urgência, Órteses, Próteses e Home Care
              </h3>
              <p className="text-sm text-[#52525B] font-light leading-relaxed mb-4">
                Atuação célere contra recusas de materiais cirúrgicos essenciais (próteses, stents, marca-passos) e obtenção de liminar para implantação de estrutura completa de internação domiciliar (<em>Home Care</em>) com enfermagem contínua e fisioterapia para pacientes dependentes de suporte.
              </p>
              <div className="pt-4 border-t border-[#E6E1D6]/70 flex items-center justify-between text-xs text-[#8C7355]">
                <span>Atendimento Plantonista</span>
                <span className="font-medium">Plantão Urgente</span>
              </div>
            </div>

            <div className="p-8 border border-[#E6E1D6] bg-white card-hover shadow-xs rounded-[2px]">
              <span className="text-[10px] tracking-[0.16em] uppercase text-[#8C7355] font-medium block mb-2">
                Equilíbrio Contratual
              </span>
              <h3 className="font-serif text-2xl text-[#18181B] mb-3">
                Cancelamentos Unilaterais e Reajustes Abusivos de Mensalidade
              </h3>
              <p className="text-sm text-[#52525B] font-light leading-relaxed mb-4">
                Restabelecimento judicial de contratos individuais e coletivos rescindidos de forma arbitrária durante internações ou tratamentos contínuos de saúde, bem como a revisão de reajustes desproporcionais por mudança de faixa etária aos 59 anos ou sinistralidade sem base atuarial comprovada.
              </p>
              <div className="pt-4 border-t border-[#E6E1D6]/70 flex items-center justify-between text-xs text-[#8C7355]">
                <span>Tema 1082 STJ • Manutenção Obrigatória</span>
                <span className="font-medium">Proteção do Vínculo</span>
              </div>
            </div>

          </div>

          {/* SEÇÃO: COMO FUNCIONA A ATUAÇÃO DE URGÊNCIA (Layout Compacto em Cards com Revelação por Hover no Passo 01) */}
          <div className="mb-16">
            <div className="max-w-2xl mb-10">
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#8C7355] block font-medium mb-2">
                Jornada do Paciente • Resposta Rápida e Previsibilidade
              </span>
              <h3 className="font-serif text-2xl md:text-3xl text-[#18181B] font-normal leading-tight">
                Como Funciona a Atuação em Medidas de Urgência
              </h3>
              <p className="mt-3 text-xs md:text-sm text-[#52525B] font-light leading-relaxed">
                Entenda o passo a passo transparente de condução do caso, estruturado para acolher a família e agir com a máxima rapidez perante o Poder Judiciário.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
              {/* Linha conectora visual no desktop */}
              <div className="hidden lg:block absolute top-10 left-12 right-12 h-px bg-[#E6E1D6] -z-0"></div>

              {/* Passo 01 (Interativo com Revelação por Hover) */}
              <div
                className={`relative bg-white border transition-all duration-300 group flex flex-col justify-between rounded-[2px] shadow-2xs hover:-translate-y-1 hover:shadow-md cursor-pointer overflow-hidden ${
                  step1Active ? 'border-[#8C7355] bg-[#FAF7F2]' : 'border-[#E6E1D6] hover:border-[#8C7355]'
                }`}
                onClick={() => setStep1Active(prev => !prev)}
                title="Passe o mouse para ver a instrução prática da triagem"
              >
                {/* Camada do Estado Normal (visível por padrão; esmaece suavemente no hover ou active touch) */}
                <div
                  className={`flex flex-col justify-between h-full transition-all duration-300 absolute inset-0 p-6 ${
                    step1Active ? 'opacity-0 pointer-events-none' : 'group-hover:opacity-0 group-hover:pointer-events-none'
                  }`}
                >
                  <div>
                    <div className="w-12 h-12 rounded-full bg-[#FAF7F2] border border-[#E6E1D6] group-hover:border-[#8C7355] group-hover:bg-[#8C7355] transition-colors flex items-center justify-center mb-5 relative z-10">
                      <span className="font-serif text-lg text-[#8C7355] group-hover:text-white font-normal transition-colors">01</span>
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-[#8C7355] font-semibold block mb-1">
                      Passo 01
                    </span>
                    <h4 className="font-serif text-lg text-[#18181B] mb-2 font-normal leading-snug">
                      Triagem Documental
                    </h4>
                    <p className="text-xs text-[#52525B] font-light leading-relaxed">
                      Análise técnica imediata da negativa formal do plano de saúde e do relatório médico circunstanciado.
                    </p>
                    <div className="mt-4 inline-flex items-center gap-1.5 text-[11px] text-[#8C7355] font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8C7355] animate-pulse"></span>
                      <span>Passe o mouse para ver detalhes ↳</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-[#F0ECE1] mt-5 flex items-center justify-between">
                    <span className="text-[10px] text-[#71717A] tracking-wider uppercase font-medium">Análise Imediata</span>
                    <span className="text-[10px] text-[#8C7355] font-semibold">Até 2h úteis</span>
                  </div>
                </div>

                {/* Camada Revelada no Hover (Transição Suave para tom Bege/Tan #D2B48C e Instrução Prática Detalhada) */}
                <div
                  className={`flex flex-col justify-between h-full transition-all duration-300 absolute inset-0 p-6 bg-[#FAF7F2] border-2 border-[#8C7355] shadow-xs ${
                    step1Active ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3.5">
                      <div className="w-8 h-8 rounded-full bg-[#8C7355] text-white flex items-center justify-center font-serif text-sm font-semibold shadow-2xs">
                        01
                      </div>
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-[#8C7355] bg-white border border-[#D2B48C] px-2 py-0.5 rounded-[3px]">
                        ⏱️ Até 2h úteis
                      </span>
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-[#8C7355] font-semibold block mb-1">
                      Instrução Prática
                    </span>
                    <h4 className="font-serif text-base text-[#18181B] font-medium leading-snug mb-2">
                      Como a Triagem é Feita:
                    </h4>
                    <p className="text-xs text-[#3F3F46] font-light leading-relaxed">
                      Conferência técnica do laudo médico (CID e metodologia prescrita) e da justificativa de recusa da operadora, avaliando o cabimento imediato do pedido de liminar contra o plano.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[#D2B48C]/40 mt-4 flex items-center justify-between">
                    <span className="text-[10px] text-[#8C7355] font-semibold uppercase tracking-wider">Conferência Direta</span>
                    <span className="text-[10px] text-emerald-800 font-medium bg-emerald-50 border border-emerald-200/60 px-1.5 py-0.5 rounded">Sem burocracia</span>
                  </div>
                </div>

                {/* Bloco invisível estrutural: mantém a altura do grid perfeitamente idêntica aos outros 3 cards sem salto de layout */}
                <div className="invisible pointer-events-none select-none aria-hidden" aria-hidden="true">
                  <div className="w-12 h-12 mb-5"></div>
                  <span className="text-[10px] block mb-1">Passo 01</span>
                  <h4 className="font-serif text-lg mb-2">Triagem Documental</h4>
                  <p className="text-xs leading-relaxed">
                    Análise técnica imediata da negativa formal do plano de saúde e do relatório médico circunstanciado com indicação da metodologia.
                  </p>
                  <div className="mt-4 text-[11px]">Placeholder de altura</div>
                  <div className="pt-4 border-t mt-5">
                    <span className="text-[10px]">Análise Imediata</span>
                  </div>
                </div>
              </div>

              {/* Passo 02 */}
              <div className="relative bg-white border border-[#E6E1D6] p-6 hover:border-[#8C7355] transition-all group flex flex-col justify-between rounded-[2px] shadow-2xs hover:-translate-y-1 hover:shadow-md duration-300">
                <div>
                  <div className="w-12 h-12 rounded-full bg-[#FAF7F2] border border-[#E6E1D6] group-hover:border-[#8C7355] group-hover:bg-[#8C7355] transition-colors flex items-center justify-center mb-5 relative z-10">
                    <span className="font-serif text-lg text-[#8C7355] group-hover:text-white font-normal transition-colors">02</span>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-[#8C7355] font-semibold block mb-1">
                    Passo 02
                  </span>
                  <h4 className="font-serif text-lg text-[#18181B] mb-2 font-normal leading-snug">
                    Estratégia e Protocolo
                  </h4>
                  <p className="text-xs text-[#52525B] font-light leading-relaxed">
                    Elaboração célere da petição inicial com pedido de Tutela Provisória de Urgência (liminar inaudita altera parte).
                  </p>
                </div>
                <div className="pt-4 border-t border-[#F0ECE1] mt-5">
                  <span className="text-[10px] text-[#71717A] tracking-wider uppercase font-medium">Ação Customizada</span>
                </div>
              </div>

              {/* Passo 03 */}
              <div className="relative bg-white border border-[#E6E1D6] p-6 hover:border-[#8C7355] transition-all group flex flex-col justify-between rounded-[2px] shadow-2xs hover:-translate-y-1 hover:shadow-md duration-300">
                <div>
                  <div className="w-12 h-12 rounded-full bg-[#FAF7F2] border border-[#E6E1D6] group-hover:border-[#8C7355] group-hover:bg-[#8C7355] transition-colors flex items-center justify-center mb-5 relative z-10">
                    <span className="font-serif text-lg text-[#8C7355] group-hover:text-white font-normal transition-colors">03</span>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-[#8C7355] font-semibold block mb-1">
                    Passo 03
                  </span>
                  <h4 className="font-serif text-lg text-[#18181B] mb-2 font-normal leading-snug">
                    Acompanhamento da Liminar
                  </h4>
                  <p className="text-xs text-[#52525B] font-light leading-relaxed">
                    Despacho direto com o magistrado da causa ou no plantão judiciário e monitoramento ostensivo da decisão em 24h a 72h.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#F0ECE1] mt-5">
                  <span className="text-[10px] text-emerald-800 tracking-wider uppercase font-medium">Decisão em 24h a 72h</span>
                </div>
              </div>

              {/* Passo 04 */}
              <div className="relative bg-white border border-[#E6E1D6] p-6 hover:border-[#8C7355] transition-all group flex flex-col justify-between rounded-[2px] shadow-2xs hover:-translate-y-1 hover:shadow-md duration-300">
                <div>
                  <div className="w-12 h-12 rounded-full bg-[#FAF7F2] border border-[#E6E1D6] group-hover:border-[#8C7355] group-hover:bg-[#8C7355] transition-colors flex items-center justify-center mb-5 relative z-10">
                    <span className="font-serif text-lg text-[#8C7355] group-hover:text-white font-normal transition-colors">04</span>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-[#8C7355] font-semibold block mb-1">
                    Passo 04
                  </span>
                  <h4 className="font-serif text-lg text-[#18181B] mb-2 font-normal leading-snug">
                    Efetivação do Direito
                  </h4>
                  <p className="text-xs text-[#52525B] font-light leading-relaxed">
                    Intimação da operadora sob pena de multa diária, assegurando o início das terapias, fornecimento do fármaco ou reembolso integral.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#F0ECE1] mt-5">
                  <span className="text-[10px] text-[#8C7355] tracking-wider uppercase font-medium">Tratamento Garantido</span>
                </div>
              </div>
            </div>

            <div className="mt-10 p-6 bg-white border border-[#E6E1D6] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#52525B] rounded-[4px]">
              <span>Possui uma dúvida específica sobre seu contrato ou laudo médico?</span>
              <a 
                href={whatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#8C7355] font-medium hover:text-[#18181B] transition-colors whitespace-nowrap uppercase tracking-wider"
              >
                Consultar o Escritório via WhatsApp ↗
              </a>
            </div>
          </div>

          {/* Bloco de Orientação Jurídica & Triagem Ética (Provimento 205/2021) */}
          <div className="p-8 md:p-10 border border-[#8C7355]/40 bg-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs rounded-[2px]">
            <div className="max-w-xl">
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#8C7355] font-semibold block mb-1">
                Atendimento Especializado em Saúde
              </span>
              <h3 className="font-serif text-2xl text-[#18181B] font-normal">
                Seu plano de saúde negou cobertura médica, terapias multidisciplinares ou medicamentos?
              </h3>
              <p className="text-sm text-[#52525B] font-light mt-2 leading-relaxed">
                Analise a viabilidade técnica de pleitear uma tutela provisória de urgência para a continuidade do tratamento médico prescrito, com fundamentação técnica e estrita observância legal.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <a
                href={whatsappUrgenciaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-3.5 bg-[#8C7355] text-white text-xs tracking-[0.1em] uppercase font-medium hover:bg-[#735D43] transition-colors text-center whitespace-nowrap shadow-sm"
              >
                Solicitar Análise Documental
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-3.5 border border-[#18181B] bg-white text-[#18181B] text-xs tracking-[0.1em] uppercase hover:bg-[#18181B] hover:text-white transition-colors text-center whitespace-nowrap"
              >
                Falar com o Escritório no WhatsApp ↗
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ÁREAS DE ATUAÇÃO / Especialidades (Família, Tributário & Cível) */}
      <section id="areas-atuacao" className="section-spacing bg-white border-t border-[#D2B48C]/25 relative reveal-on-scroll">
        <div id="atuacao" className="absolute -top-24"></div>
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="max-w-2xl mb-16">
            <span className="text-[11px] tracking-[0.2em] uppercase text-[#8C7355] block mb-3 font-medium">
              Prática Jurídica Integrada
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#18181B] font-normal">
              Demais Áreas de Especialidade
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Família e Sucessões */}
            <div className="bg-[#FAF7F2]/40 border border-[#E6E1D6] p-6 sm:p-8 rounded-[4px] shadow-2xs flex flex-col justify-between">
              <div>
                <span className="text-[10px] tracking-[0.18em] uppercase text-[#8C7355] block mb-3 font-medium">
                  Patrimonial & Sucessório
                </span>
                <h3 className="font-serif text-2xl text-[#18181B] font-normal mb-4">
                  Família e Sucessões
                </h3>
                <p className="text-sm text-[#52525B] font-light leading-relaxed mb-6">
                  Condução discreta e célere de inventários, partilhas e reorganização patrimonial familiar.
                </p>
                <ul className="space-y-2.5 text-sm text-[#52525B] font-light border-t border-[#E6E1D6] pt-5">
                  <li>• <strong>Inventários em cartório</strong> com menores ou testamento (Res. 571/2024 CNJ)</li>
                  <li>• Planejamento sucessório, testamentos e doações em vida</li>
                  <li>• Divórcios consensuais e partilha amigável ou litigiosa</li>
                  <li>• Pensão alimentícia, guarda e convivência familiar</li>
                </ul>
              </div>
            </div>

            {/* Direito Tributário */}
            <div className="bg-[#FAF7F2]/40 border border-[#E6E1D6] p-6 sm:p-8 rounded-[4px] shadow-2xs flex flex-col justify-between">
              <div>
                <span className="text-[10px] tracking-[0.18em] uppercase text-[#8C7355] block mb-3 font-medium">
                  Tributário & Fazendário
                </span>
                <h3 className="font-serif text-2xl text-[#18181B] font-normal mb-4">
                  Isenções e Recuperação Fiscal
                </h3>
                <p className="text-sm text-[#52525B] font-light leading-relaxed mb-6">
                  Defesa do contribuinte perante a Fazenda Estadual e recuperação administrativa de créditos tributários.
                </p>
                <ul className="space-y-2.5 text-sm text-[#52525B] font-light border-t border-[#E6E1D6] pt-5">
                  <li>• Isenção de IPVA para PCD e pessoas com TEA (condutores e não condutores)</li>
                  <li>• Assessoria em laudos do IMESC e restituição de valores pagos</li>
                  <li>• Recuperação administrativa de créditos (PIS/COFINS e ICMS-ST Simples Nacional)</li>
                  <li>• Anulação de lançamentos tributários indevidos</li>
                </ul>
              </div>
            </div>

            {/* Direito Cível e Contratos */}
            <div className="bg-[#FAF7F2]/40 border border-[#E6E1D6] p-6 sm:p-8 rounded-[4px] shadow-2xs flex flex-col justify-between">
              <div>
                <span className="text-[10px] tracking-[0.18em] uppercase text-[#8C7355] block mb-3 font-medium">
                  Obrigações & Negócios
                </span>
                <h3 className="font-serif text-2xl text-[#18181B] font-normal mb-4">
                  Direito Cível e Contratos
                </h3>
                <p className="text-sm text-[#52525B] font-light leading-relaxed mb-6">
                  Segurança jurídica na elaboração de negócios e atuação estratégica em litígios patrimoniais.
                </p>
                <ul className="space-y-2.5 text-sm text-[#52525B] font-light border-t border-[#E6E1D6] pt-5">
                  <li>• Elaboração e revisão de contratos civis, empresariais e imobiliários</li>
                  <li>• Ações indenizatórias por responsabilidade civil e fraudes bancárias</li>
                  <li>• Direito imobiliário: posse, usucapião e rescisões contratuais</li>
                  <li>• Cobranças judiciais e execução de títulos</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CENTRAL DE FERRAMENTAS JURÍDICAS (Produto Digital de Utilidade Pública) */}
      <CentralFerramentas />

      {/* SEÇÃO: INFORMATIVOS E ATUALIDADES JURÍDICAS (Carrossel Horizontal Editorial) */}
      <section id="informativos" className="section-spacing bg-[#FAF7F2] border-t border-[#D2B48C]/25 relative reveal-on-scroll">
        <div id="noticias" className="absolute -top-24"></div>
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">

          {/* Topo Editorial Simplificado com Título, Subtítulo e Setas de Navegação */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-[#18181B] font-normal tracking-tight">
                Informativos & Jurisprudência
              </h2>
              <p className="mt-2 text-sm text-[#52525B] font-light leading-relaxed max-w-xl">
                Precedentes vinculantes, resoluções e atualizações dos tribunais superiores.
              </p>
            </div>

            {/* Setas Discretas de Navegação */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => scrollNews('left')}
                aria-label="Avançar para notícia anterior"
                className="w-11 h-11 rounded-full border border-[#D2B48C]/50 bg-white hover:border-[#8C7355] hover:bg-[#FAF7F2] text-[#18181B] hover:text-[#8C7355] flex items-center justify-center transition-all duration-200 shadow-xs hover:shadow-sm cursor-pointer text-base active:scale-95"
              >
                ←
              </button>
              <button
                onClick={() => scrollNews('right')}
                aria-label="Avançar para próxima notícia"
                className="w-11 h-11 rounded-full border border-[#D2B48C]/50 bg-white hover:border-[#8C7355] hover:bg-[#FAF7F2] text-[#18181B] hover:text-[#8C7355] flex items-center justify-center transition-all duration-200 shadow-xs hover:shadow-sm cursor-pointer text-base active:scale-95"
              >
                →
              </button>
            </div>
          </div>

          {/* Carrossel Horizontal Drag & Scroll com Altura Padronizada e Botão Alinhado */}
          <div
            ref={carouselRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className="flex items-stretch gap-6 overflow-x-auto no-scrollbar scroll-smooth cursor-grab active:cursor-grabbing pb-8 select-none"
            style={{
              scrollSnapType: isDragging ? 'none' : 'x mandatory',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {newsDatabase.map((news) => (
              <article
                key={news.id}
                className="w-[340px] sm:w-[380px] shrink-0 bg-white border border-[rgba(210,180,140,0.4)] p-6 sm:p-7 flex flex-col justify-between rounded-[6px] shadow-2xs hover:shadow-md hover:border-[#8C7355] transition-all duration-300 snap-start h-auto"
              >
                <div className="flex-1 flex flex-col justify-between mb-4">
                  <div>
                    {/* Tag / Badge de Origem no Topo & Tempo de Leitura */}
                    <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-[#E5E0DA]">
                      <span className="px-2.5 py-1 bg-[#D2B48C]/20 border border-[#D2B48C]/40 text-[#8C7355] text-[10.5px] font-bold tracking-wider uppercase rounded-[3px]">
                        {news.badge}
                      </span>
                      <div className="flex items-center gap-1.5 text-[10.5px] text-[#71717A] font-mono">
                        <span>⏱️ {news.readTime}</span>
                        <span>•</span>
                        <span>{news.date}</span>
                      </div>
                    </div>

                    {/* Título da Notícia (Headline Editorial de Impacto) */}
                    <h3 className="font-serif text-[1.15rem] leading-[1.4] text-[#18181B] font-normal sm:font-medium mb-3 hover:text-[#8C7355] transition-colors">
                      {news.title}
                    </h3>

                    {/* Resumo Estratégico (O "Por que isso importa?") */}
                    <p className="text-xs sm:text-[13px] text-[#52525B] font-light leading-relaxed mb-4">
                      {news.summary}
                    </p>
                  </div>

                  {/* Micro-Copy: Impacto Prático */}
                  <div className="p-3 bg-[#FAF7F2] border-l-2 border-[#8C7355] rounded-r-[3px] mt-auto">
                    <span className="text-[10px] uppercase tracking-wider text-[#8C7355] font-bold block mb-0.5">
                      Impacto Prático:
                    </span>
                    <p className="text-xs text-[#18181B] font-medium leading-snug">
                      {news.impact}
                    </p>
                  </div>
                </div>

                {/* Rodapé com Botão Refinado [Acessar Publicação ↗] Alinhado na Base */}
                <div className="pt-4 border-t border-[#E5E0DA] flex items-center justify-between text-xs gap-2 mt-auto shrink-0">
                  <a
                    href={news.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF7F2] hover:bg-[#8C7355] text-[#8C7355] hover:text-white border border-[#D2B48C]/50 hover:border-[#8C7355] text-[11px] font-semibold tracking-wider uppercase rounded-[4px] transition-all duration-300 shadow-2xs group/btn active:scale-95"
                  >
                    <span>Acessar Publicação</span>
                    <span className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform">↗</span>
                  </a>

                  {news.partnerUrl && (
                    <a
                      href={news.partnerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1.5 bg-white border border-[#E5E0DA] hover:border-[#8C7355] text-[10.5px] text-[#71717A] hover:text-[#18181B] transition-colors rounded-[3px] active:scale-95"
                    >
                      {news.partnerLabel}
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>

          {/* Chamada Ética no Fechamento das Notícias (Provimento 205/2021) */}
          <div className="border border-[#E5E0DA] bg-white p-7 sm:p-9 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-[4px] shadow-2xs mt-4">
            <div className="space-y-1.5 text-center sm:text-left">
              <h4 className="font-serif text-xl sm:text-2xl text-[#18181B] font-normal">
                Dúvidas sobre a aplicação desses precedentes ao seu caso?
              </h4>
              <p className="text-xs sm:text-sm text-[#52525B] font-light">
                Solicite uma avaliação jurídica individualizada e confidencial com nossa banca.
              </p>
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 bg-[#18181B] text-white text-xs tracking-[0.1em] uppercase hover:bg-[#8C7355] transition-colors whitespace-nowrap shadow-xs font-medium rounded-[2px]"
            >
              Consultar Especialista via WhatsApp
            </a>
          </div>

        </div>
      </section>

      {/* CONTATO E AGENDAMENTO */}
      <section id="contato" className="section-spacing bg-white border-t border-[#D2B48C]/30 relative reveal-on-scroll">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">

          <div className="max-w-2xl mb-12">
            <span className="text-[11px] tracking-[0.2em] uppercase text-[#8C7355] block mb-3 font-medium">
              Agendamento & Localização
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#18181B] font-normal">
              Canais de Atendimento
            </h2>
            <p className="mt-3 text-sm md:text-base text-[#52525B] font-light leading-relaxed">
              Atendimento presencial privativo na cidade de Marília/SP ou telepresencial para clientes de qualquer localidade do país.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start" style={{ gap: '3rem' }}>
            {/* Coluna Esquerda: Informações, Fotos Reais da Torre Nova York e Mapa Monocromático */}
            <div className="space-y-8">
              {/* Cartão Institucional de Expediente & Contato */}
              <div className="bg-[#FAF7F2]/60 border border-[rgba(210,180,140,0.4)] p-5 sm:p-7 rounded-[6px] shadow-2xs space-y-5 text-sm">
                <div>
                  <span className="text-[10px] tracking-[0.16em] uppercase text-[#8C7355] font-semibold block mb-1">
                    Sede Corporativa
                  </span>
                  <p className="text-[#18181B] font-serif text-lg font-normal leading-snug">
                    Edifício Torre Nova York • Salas 305 e 306
                  </p>
                  <p className="text-xs text-[#52525B] font-light mt-0.5">
                    Av. das Esmeraldas, 3895 — Complexo Praça Capital • Marília/SP
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-[#E5E0DA]">
                  <div>
                    <span className="text-[10px] tracking-[0.16em] uppercase text-[#71717A] block mb-0.5">
                      Expediente
                    </span>
                    <p className="text-xs text-[#18181B] font-medium">
                      Seg. a Sex. 08h30 às 18h00
                    </p>
                    <span className="text-[11px] text-[#71717A] font-light">
                      Atendimento com hora marcada
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] tracking-[0.16em] uppercase text-[#71717A] block mb-0.5">
                      Canal Direto
                    </span>
                    <p className="text-xs text-[#18181B] font-medium">
                      (14) 99711-8732
                    </p>
                    <span className="text-[11px] text-[#71717A] font-light">
                      contato@beatrizrocha.adv.br
                    </span>
                  </div>
                </div>
              </div>

              {/* Fotografias da Torre Nova York / Praça Capital */}
              <div className="grid grid-cols-2 gap-4">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[6px] bg-[#FAF7F2] border border-[rgba(210,180,140,0.4)] shadow-2xs group">
                  <img
                    src="/assets/complexo-esmeraldas.jpg"
                    alt="Complexo Praça Capital e Edifício Torre Nova York na Avenida das Esmeraldas em Marília/SP"
                    className="w-full h-full object-cover filter saturate-[0.92] contrast-[1.03] group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent"></div>
                  <span className="absolute bottom-2.5 left-2.5 text-[9px] uppercase tracking-wider text-white bg-black/50 px-2 py-0.5 backdrop-blur-xs font-medium rounded-[3px]">
                    Fachada • Torre Nova York
                  </span>
                </div>

                <div className="relative aspect-[4/3] overflow-hidden rounded-[6px] bg-[#FAF7F2] border border-[rgba(210,180,140,0.4)] shadow-2xs group">
                  <img
                    src="/assets/recepcao-corporativa.jpg"
                    alt="Lobby e recepção corporativa da Torre Nova York"
                    className="w-full h-full object-cover filter saturate-[0.92] contrast-[1.03] group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent"></div>
                  <span className="absolute bottom-2.5 left-2.5 text-[9px] uppercase tracking-wider text-white bg-black/50 px-2 py-0.5 backdrop-blur-xs font-medium rounded-[3px]">
                    Recepção Privativa
                  </span>
                </div>
              </div>

              {/* Mapa Monocromático Limpo com Botões de Navegação */}
              <div className="space-y-3">
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[6px] border border-[rgba(210,180,140,0.4)] bg-[#FAF7F2] shadow-2xs">
                  <iframe
                    title="Localização Torre Nova York - Google Maps"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3693.3644917657156!2d-49.93988632386345!3d-22.226297379739504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94bfd71d34c19c99%3A0x6b44a30e8c7c91d4!2sAv.%20das%20Esmeraldas%2C%203895%20-%20Jardim%20Maringa%2C%20Mar%C3%ADlia%20-%20SP%2C%2017516-000!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr"
                    className="w-full h-full border-0 filter grayscale-[80%] contrast-[105%]"
                    loading="lazy"
                    allowFullScreen=""
                  ></iframe>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Av.+das+Esmeraldas%2C+3895+-+Mar%C3%ADlia%2C+SP"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-white border border-[rgba(210,180,140,0.4)] text-[11px] text-[#18181B] font-medium uppercase tracking-[0.08em] hover:bg-[#8C7355] hover:text-white hover:border-[#8C7355] transition-all duration-200 rounded-[6px] shadow-2xs"
                  >
                    <span>Google Maps ↗</span>
                  </a>
                  <a
                    href="https://waze.com/ul?q=Av.+das+Esmeraldas+3895+Marilia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-white border border-[rgba(210,180,140,0.4)] text-[11px] text-[#18181B] font-medium uppercase tracking-[0.08em] hover:bg-[#8C7355] hover:text-white hover:border-[#8C7355] transition-all duration-200 rounded-[6px] shadow-2xs"
                  >
                    <span>Abrir no Waze ↗</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Coluna Direita: Formulário de Solicitação de Orientação Jurídica */}
            <div className="bg-[#FAF7F2]/40 border border-[rgba(210,180,140,0.4)] p-5 sm:p-8 md:p-10 rounded-[6px] shadow-2xs">
              <div className="mb-7">
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#8C7355] font-semibold block mb-1">
                  Canal Confidencial
                </span>
                <h3 className="font-serif text-2xl md:text-[26px] text-[#18181B] font-normal">
                  Solicitar Orientação Jurídica
                </h3>
                <p className="mt-2 text-xs md:text-sm text-[#52525B] font-light leading-relaxed">
                  Preencha os campos abaixo para submeter sua demanda diretamente à banca. Seus dados e relatos são protegidos por sigilo profissional inegociável.
                </p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit} noValidate={false}>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="form-nome" className="block text-[11px] uppercase tracking-wider text-[#52525B] font-medium mb-2">
                      Nome Completo *
                    </label>
                    <input
                      id="form-nome"
                      name="nome"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Informe seu nome completo"
                      value={formData.nome}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FAF7F2]/50 border border-[rgba(210,180,140,0.4)] focus:border-[#8C7355] focus:bg-white focus:ring-2 focus:ring-[#8C7355]/20 text-sm text-[#18181B] rounded-[6px] transition-all duration-200 outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="form-telefone" className="block text-[11px] uppercase tracking-wider text-[#52525B] font-medium mb-2">
                      WhatsApp / Telefone *
                    </label>
                    <input
                      id="form-telefone"
                      name="telefone"
                      type="tel"
                      required
                      autoComplete="tel"
                      placeholder="(14) 99999-9999"
                      value={formData.telefone}
                      onChange={handlePhoneChange}
                      maxLength={15}
                      className="w-full px-4 py-3 bg-[#FAF7F2]/50 border border-[rgba(210,180,140,0.4)] focus:border-[#8C7355] focus:bg-white focus:ring-2 focus:ring-[#8C7355]/20 text-sm text-[#18181B] rounded-[6px] transition-all duration-200 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="form-email" className="block text-[11px] uppercase tracking-wider text-[#52525B] font-medium mb-2">
                    E-mail Institucional ou Pessoal
                  </label>
                  <input
                    id="form-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="seuemail@exemplo.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-[#FAF7F2]/50 border border-[rgba(210,180,140,0.4)] focus:border-[#8C7355] focus:bg-white focus:ring-2 focus:ring-[#8C7355]/20 text-sm text-[#18181B] rounded-[6px] transition-all duration-200 outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="form-area" className="block text-[11px] uppercase tracking-wider text-[#52525B] font-medium mb-2">
                    Matéria da Demanda
                  </label>
                  <select
                    id="form-area"
                    name="area"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    className="w-full px-4 py-3 bg-[#FAF7F2]/50 border border-[rgba(210,180,140,0.4)] focus:border-[#8C7355] focus:bg-white focus:ring-2 focus:ring-[#8C7355]/20 text-sm text-[#18181B] rounded-[6px] transition-all duration-200 outline-none"
                  >
                    <option value="">Selecione a área correspondente</option>
                    <option value="Direito à Saúde & Autismo / TEA">Direito à Saúde & Autismo / TEA (Liminares, Terapias, Medicamentos)</option>
                    <option value="Família e Sucessões">Família e Sucessões (Inventário em Cartório, Partilha, Divórcio)</option>
                    <option value="Direito Tributário">Direito Tributário (Isenção de IPVA PCD/TEA e Recuperação Fiscal)</option>
                    <option value="Direito Cível e Contratos">Direito Cível, Contratos e Indenizações</option>
                    <option value="Outros / Outros Assuntos Jurídicos (Análise Preliminar)">Outros / Outros Assuntos Jurídicos (Análise Preliminar)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="form-relato" className="block text-[11px] uppercase tracking-wider text-[#52525B] font-medium mb-2">
                    Resumo da Situação ou Urgência Médica
                  </label>
                  <textarea
                    id="form-relato"
                    name="relato"
                    rows="4"
                    placeholder="Descreva brevemente o caso ou se há urgência médica/prazo processual em andamento..."
                    value={formData.relato}
                    onChange={(e) => setFormData({ ...formData, relato: e.target.value })}
                    className="w-full px-4 py-3 bg-[#FAF7F2]/50 border border-[rgba(210,180,140,0.4)] focus:border-[#8C7355] focus:bg-white focus:ring-2 focus:ring-[#8C7355]/20 text-sm text-[#18181B] rounded-[6px] transition-all duration-200 outline-none leading-relaxed"
                  ></textarea>
                </div>

                <div className="text-[11px] text-[#71717A] leading-relaxed">
                  Ao enviar, seus dados são protegidos por sigilo profissional e tratados exclusivamente para triagem pré-jurídica, em estrita conformidade com a nossa{' '}
                  <button
                    type="button"
                    onClick={() => setPrivacyModalOpen(true)}
                    className="text-[#8C7355] hover:text-[#18181B] underline font-medium focus:outline-none cursor-pointer"
                  >
                    Política de Privacidade (LGPD)
                  </button>.
                </div>

                <button
                  type="submit"
                  className="w-full py-4 px-6 bg-[#18181B] hover:bg-[#8C7355] text-white text-xs tracking-[0.16em] uppercase font-medium transition-all duration-300 rounded-[6px] shadow-sm hover:shadow-md cursor-pointer flex items-center justify-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8C7355]"
                >
                  <svg className="w-4 h-4 text-[#D2B48C] group-hover:text-white transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                  <span>Enviar para Análise Confidencial</span>
                </button>
                <p className="text-[11px] text-[#71717A] text-center font-light">
                  Seus dados serão encaminhados diretamente via canal criptografado para o escritório Beatriz Rocha Advocacia.
                </p>
              </form>
            </div>
          </div>

        </div>
      </section>

      {/* SEÇÃO: FAQ EM ACORDEÃO (Perguntas Frequentes Interativas) */}
      <section id="faq" className="section-spacing bg-[#FAF7F2] border-t border-[#D2B48C]/25 reveal-on-scroll">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">

          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[11px] tracking-[0.2em] uppercase text-[#8C7355] block mb-3 font-medium">
              Esclarecimentos Jurídicos
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#18181B] font-normal leading-tight">
              Perguntas Frequentes
            </h2>
            <p className="mt-3 text-xs md:text-sm text-[#52525B] font-light leading-relaxed">
              Respostas claras e transparentes para as dúvidas mais comuns sobre liminares de saúde, autismo (TEA) e condução de inventários.
            </p>
          </div>

          <div className="space-y-4">
            {faqDatabase.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={faq.id}
                  className="bg-white border border-[#E6E1D6] rounded-[4px] overflow-hidden transition-all duration-300 shadow-2xs hover:border-[#8C7355]"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-serif text-base sm:text-lg text-[#18181B] font-normal leading-snug">
                      {faq.question}
                    </span>
                    <span className={`w-8 h-8 rounded-full border border-[#E6E1D6] flex items-center justify-center text-sm font-mono transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-45 bg-[#8C7355] text-white border-[#8C7355]' : 'bg-[#FAF7F2] text-[#8C7355]'}`}>
                      +
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-[#52525B] font-light leading-relaxed border-t border-[#F0ECE1] animate-fadeIn">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-10 p-6 bg-white border border-[#E6E1D6] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#52525B] rounded-[4px]">
            <span>Possui uma dúvida específica sobre seu contrato ou laudo médico?</span>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8C7355] font-medium hover:text-[#18181B] transition-colors whitespace-nowrap uppercase tracking-wider"
            >
              Consultar o Escritório via WhatsApp ↗
            </a>
          </div>

        </div>
      </section>

      {/* Rodapé Minimalista com Conformidade Ética e Links Institucionais */}
      <footer className="border-t border-[#D2B48C]/25 bg-white py-12 text-xs text-[#71717A]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#F0ECE1] pb-6">
            <div>
              <p className="font-serif text-[15px] text-[#18181B] tracking-[0.1em] uppercase font-normal">
                Beatriz Rocha Sociedade Individual de Advocacia
              </p>
              <p className="text-[11px] text-[#8C7355] mt-0.5 tracking-wider uppercase font-medium">
                Titular: Beatriz Guilherme Rocha • OAB/SP 463.673 • Sede: Edifício Torre Nova York, Salas 305/306 • Marília/SP
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-5 text-[11px] uppercase tracking-wider font-medium text-[#52525B]">
              <button
                type="button"
                onClick={() => setPrivacyModalOpen(true)}
                className="hover:text-[#8C7355] transition-colors cursor-pointer"
              >
                Política de Privacidade (LGPD)
              </button>
              <span className="text-[#D6CFC2]">•</span>
              <button
                type="button"
                onClick={() => setTermsModalOpen(true)}
                className="hover:text-[#8C7355] transition-colors cursor-pointer"
              >
                Termos de Uso & Aviso Legal
              </button>
              <span className="text-[#D6CFC2]">•</span>
              <a
                href="#inicio"
                className="hover:text-[#8C7355] transition-colors"
              >
                Voltar ao Topo ↑
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-[11px] font-light text-[#71717A]">
            <p>
              © {new Date().getFullYear()} Beatriz Rocha Sociedade Individual de Advocacia. Todos os direitos reservados.
            </p>
            <p className="text-[10.5px]">
              Conteúdo de caráter exclusivamente informativo, pautado pelo Provimento nº 205/2021 do Conselho Federal da OAB.
            </p>
          </div>
        </div>
      </footer>

      {/* Modal: Política de Privacidade e Proteção de Dados (LGPD) */}
      {privacyModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="privacy-modal-title"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn"
          onClick={() => setPrivacyModalOpen(false)}
        >
          <div
            className="relative bg-white border border-[#E5E0DA] w-full max-w-3xl my-8 p-6 sm:p-10 rounded-[4px] shadow-2xl max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-[#F0ECE1] pb-4 mb-5">
              <div>
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#8C7355] font-semibold block mb-1">
                  Proteção de Dados & Sigilo Profissional
                </span>
                <h3 id="privacy-modal-title" className="font-serif text-2xl text-[#18181B] font-normal">
                  Política de Privacidade (LGPD)
                </h3>
                <p className="text-xs text-[#71717A] mt-1 font-light">
                  Beatriz Rocha Sociedade Individual de Advocacia • OAB/SP 463.673
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPrivacyModalOpen(false)}
                className="w-8 h-8 rounded-full border border-[#E5E0DA] hover:bg-[#FAF7F2] text-[#18181B] flex items-center justify-center text-sm font-mono cursor-pointer transition-colors focus:outline-none"
                aria-label="Fechar modal de privacidade"
              >
                ✕
              </button>
            </div>

            <div className="overflow-y-auto pr-2 text-xs sm:text-sm text-[#52525B] space-y-4 leading-relaxed font-light">
              <p>
                A <strong className="font-medium text-[#18181B]">Beatriz Rocha Sociedade Individual de Advocacia</strong> (OAB/SP 463.673), sediada no Edifício Torre Nova York, Salas 305 e 306, Complexo Praça Capital, Av. das Esmeraldas, 3895, Marília/SP, preza pela máxima confidencialidade e segurança no tratamento de dados pessoais, em estrita consonância com a <strong className="font-medium text-[#18181B]">Lei Geral de Proteção de Dados Pessoais (Lei Federal nº 13.709/2018 - LGPD)</strong>, o Estatuto da Advocacia (Lei Federal nº 8.906/1994) e o Código de Ética e Disciplina da OAB.
              </p>

              <h4 className="font-serif text-base text-[#18181B] font-normal pt-2 border-t border-[#F0ECE1]">
                1. Princípio da Minimização e Coleta de Dados
              </h4>
              <p>
                Coletamos exclusivamente os dados fornecidos voluntariamente pelo usuário através de nossos canais oficiais de contato (formulário do site e WhatsApp): nome completo, número de telefone/WhatsApp, endereço de e-mail e síntese fática da demanda jurídica. Não coletamos dados de forma oculta nem utilizamos cookies invasivos de rastreamento de perfil comercial.
              </p>

              <h4 className="font-serif text-base text-[#18181B] font-normal pt-2 border-t border-[#F0ECE1]">
                2. Finalidade e Bases Legais do Tratamento
              </h4>
              <p>
                O tratamento dos dados pessoais fundamenta-se nas seguintes bases legais do Artigo 7º da LGPD:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong className="font-medium text-[#18181B]">Art. 7º, V:</strong> Procedimentos preliminares relacionados a contrato do qual seja parte o titular, a pedido do titular dos dados (triagem técnica inicial de casos);</li>
                <li><strong className="font-medium text-[#18181B]">Art. 7º, IX:</strong> Atendimento aos interesses legítimos do controlador, resguardados os direitos e liberdades fundamentais do titular;</li>
                <li><strong className="font-medium text-[#18181B]">Art. 11, II, 'e':</strong> Em demandas de Direito à Saúde envolvendo laudos médicos e diagnóstico de autismo (TEA), o tratamento de dados sensíveis destina-se estritamente ao exercício regular de direitos em processos judiciais e extrajudiciais.</li>
              </ul>

              <h4 className="font-serif text-base text-[#18181B] font-normal pt-2 border-t border-[#F0ECE1]">
                3. Inviolabilidade do Sigilo Profissional da Advocacia
              </h4>
              <p>
                Todas as informações, documentos, relatórios médicos e relatos compartilhados conosco são protegidos pelo <strong className="font-medium text-[#18181B]">sigilo profissional inegociável da advocacia</strong> (Art. 7º, II e Art. 34, VII do Estatuto da OAB). Nenhuma informação é vendida, alugada ou compartilhada com terceiros para fins comerciais ou publicitários.
              </p>

              <h4 className="font-serif text-base text-[#18181B] font-normal pt-2 border-t border-[#F0ECE1]">
                4. Direitos do Titular (Art. 18 da LGPD)
              </h4>
              <p>
                O titular dos dados tem o direito de solicitar a qualquer momento: (I) confirmação da existência de tratamento; (II) acesso aos dados; (III) correção de dados incompletos, inexatos ou desatualizados; (IV) anonimização, bloqueio ou eliminação de dados desnecessários; e (V) revogação do consentimento, ressalvadas as hipóteses de guarda obrigatória por dever legal ou regulatório.
              </p>

              <h4 className="font-serif text-base text-[#18181B] font-normal pt-2 border-t border-[#F0ECE1]">
                5. Canal do Encarregado pelo Tratamento de Dados (DPO)
              </h4>
              <p>
                Para exercer seus direitos ou esclarecer qualquer dúvida a respeito do tratamento de seus dados pessoais, entre em contato diretamente com nossa banca através do e-mail oficial: <strong className="font-medium text-[#18181B]">contato@beatrizrocha.adv.br</strong> ou pelo telefone/WhatsApp: <strong className="font-medium text-[#18181B]">(14) 99711-8732</strong>.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#F0ECE1] flex justify-end">
              <button
                type="button"
                onClick={() => setPrivacyModalOpen(false)}
                className="px-6 py-2.5 bg-[#18181B] text-white text-xs tracking-[0.1em] uppercase font-medium hover:bg-[#8C7355] transition-colors rounded-[2px] cursor-pointer focus:outline-none"
              >
                Compreendi e Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Termos de Uso e Aviso Legal Ético */}
      {termsModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="terms-modal-title"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn"
          onClick={() => setTermsModalOpen(false)}
        >
          <div
            className="relative bg-white border border-[#E5E0DA] w-full max-w-3xl my-8 p-6 sm:p-10 rounded-[4px] shadow-2xl max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-[#F0ECE1] pb-4 mb-5">
              <div>
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#8C7355] font-semibold block mb-1">
                  Transparência & Conformidade Ética
                </span>
                <h3 id="terms-modal-title" className="font-serif text-2xl text-[#18181B] font-normal">
                  Termos de Uso & Aviso Legal
                </h3>
                <p className="text-xs text-[#71717A] mt-1 font-light">
                  Provimento nº 205/2021 do Conselho Federal da OAB
                </p>
              </div>
              <button
                type="button"
                onClick={() => setTermsModalOpen(false)}
                className="w-8 h-8 rounded-full border border-[#E5E0DA] hover:bg-[#FAF7F2] text-[#18181B] flex items-center justify-center text-sm font-mono cursor-pointer transition-colors focus:outline-none"
                aria-label="Fechar modal de termos de uso"
              >
                ✕
              </button>
            </div>

            <div className="overflow-y-auto pr-2 text-xs sm:text-sm text-[#52525B] space-y-4 leading-relaxed font-light">
              <h4 className="font-serif text-base text-[#18181B] font-normal">
                1. Caráter Exclusivamente Informativo e Educativo
              </h4>
              <p>
                Este sítio eletrônico é mantido pela <strong className="font-medium text-[#18181B]">Beatriz Rocha Sociedade Individual de Advocacia</strong> (OAB/SP 463.673) com finalidade estritamente informativa, pedagógica e institucional, nos exatos moldes disciplinados pelo <strong className="font-medium text-[#18181B]">Provimento nº 205/2021 do Conselho Federal da OAB</strong> e pelo Código de Ética e Disciplina da Advocacia. Nenhum conteúdo publicado constitui publicidade mercantil ou captação indevida de clientela.
              </p>

              <h4 className="font-serif text-base text-[#18181B] font-normal pt-2 border-t border-[#F0ECE1]">
                2. Inexistência de Consulta Vinculante ou Contratação Automática
              </h4>
              <p>
                A navegação no website, a leitura de artigos jurisprudenciais ou o encaminhamento de mensagens via formulário/WhatsApp não caracterizam, por si sós, a formalização de contrato de prestação de serviços advocatícios ou a constituição de mandato judicial. A outorga de poderes processuais depende impreterivelmente de instrumento procuratório específico e celebração expressa de contrato de honorários advocatícios.
              </p>

              <h4 className="font-serif text-base text-[#18181B] font-normal pt-2 border-t border-[#F0ECE1]">
                3. Propriedade Intelectual e Direitos Autorais
              </h4>
              <p>
                Todos os textos, análises jurídicas, fotografias, marcas, logotipos e códigos-fonte presentes neste portal são protegidos pela legislação de direitos autorais e propriedade industrial (Leis nº 9.610/98 e 9.279/96). É terminantemente vedada a reprodução total ou parcial para finalidades comerciais sem prévia autorização por escrito.
              </p>

              <h4 className="font-serif text-base text-[#18181B] font-normal pt-2 border-t border-[#F0ECE1]">
                4. Links Oficiais para Tribunais e Fontes Públicas
              </h4>
              <p>
                Os hiperlinks presentes na seção de informativos direcionam o usuário diretamente para as fontes institucionais oficiais (Supremo Tribunal Federal, Superior Tribunal de Justiça, Tribunal de Justiça de São Paulo, Conselho Nacional de Justiça e Agência Nacional de Saúde Suplementar). O escritório não se responsabiliza pela disponibilidade ou alterações de conteúdo em portais de terceiros.
              </p>

              <h4 className="font-serif text-base text-[#18181B] font-normal pt-2 border-t border-[#F0ECE1]">
                5. Foro de Eleição
              </h4>
              <p>
                Eventuais controvérsias decorrentes do uso deste portal serão dirimidas pelo Foro da Comarca de Marília, Estado de São Paulo, com expressa renúncia a qualquer outro, por mais privilegiado que seja.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#F0ECE1] flex justify-end">
              <button
                type="button"
                onClick={() => setTermsModalOpen(false)}
                className="px-6 py-2.5 bg-[#18181B] text-white text-xs tracking-[0.1em] uppercase font-medium hover:bg-[#8C7355] transition-colors rounded-[2px] cursor-pointer focus:outline-none"
              >
                Compreendi e Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Banner Flutuante de Consentimento LGPD */}
      {!cookieConsentAccepted && (
        <aside
          role="region"
          aria-label="Consentimento de Privacidade e Cookies"
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-40 bg-white/95 backdrop-blur-md border border-[#E5E0DA] shadow-2xl p-5 rounded-[4px] animate-fadeIn text-[#18181B]"
        >
          <div className="flex items-start justify-between gap-3 mb-2">
            <span className="text-[10px] tracking-[0.18em] uppercase text-[#8C7355] font-semibold">
              Privacidade & Proteção de Dados (LGPD)
            </span>
          </div>
          <p className="text-xs text-[#52525B] leading-relaxed font-light mb-4">
            Utilizamos cookies essenciais estritamente para garantir o correto funcionamento e a segurança deste canal, em consonância com a Lei nº 13.709/2018 (LGPD) e o Provimento nº 205/2021 da OAB.
          </p>
          <div className="flex items-center justify-between gap-3 pt-2 border-t border-[#F0ECE1]">
            <button
              type="button"
              onClick={() => setPrivacyModalOpen(true)}
              className="text-[11px] text-[#8C7355] hover:text-[#18181B] underline font-medium cursor-pointer"
            >
              Ler Política Completa
            </button>
            <button
              type="button"
              onClick={handleAcceptCookies}
              className="px-4 py-2 bg-[#18181B] text-white text-xs tracking-wider uppercase font-medium hover:bg-[#8C7355] transition-colors rounded-[2px] cursor-pointer shadow-2xs"
            >
              Prosseguir
            </button>
          </div>
        </aside>
      )}

    </div>
  );
}
