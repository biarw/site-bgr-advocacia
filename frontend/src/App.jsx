import React, { useState, useRef, useEffect } from 'react';

export default function BeatrizRochaAdvocacia() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [areasDropdownOpen, setAreasDropdownOpen] = useState(false);
  const [mobileAreasOpen, setMobileAreasOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  // Estados do Stepper de Medidas de Urgência & Checklist Dinâmico
  const [activeUrgencyStep, setActiveUrgencyStep] = useState(0);
  const [checklistItems, setChecklistItems] = useState({
    negativa: false,
    laudo: false,
    comprovantes: false
  });

  const toggleChecklistItem = (key) => {
    setChecklistItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const hasAnyChecklistSelected = checklistItems.negativa || checklistItems.laudo || checklistItems.comprovantes;

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
  const whatsappUrl = `${whatsappBaseUrl}?text=Ol%C3%A1%2C%20Dra.%20Beatriz.%20Gostaria%20de%20solicitar%20uma%20orienta%C3%A7%C3%A3o%20jur%C3%ADdica.`;
  const whatsappUrgenciaUrl = `${whatsappBaseUrl}?text=Ol%C3%A1%2C%20Dra.%20Beatriz.%20Preciso%20de%20uma%20an%C3%A1lise%20de%20urg%C3%AAncia%20para%20uma%20negativa%20de%20sa%C3%BAde%20%2F%20terapias%20TEA.`;

  // URL dinâmica com itens assinalados no checklist de triagem
  const getChecklistWhatsAppUrl = () => {
    const selectedLabels = [];
    if (checklistItems.negativa) {
      selectedLabels.push("• Negativa formal do plano de saúde por escrito (ou protocolo de recusa)");
    }
    if (checklistItems.laudo) {
      selectedLabels.push("• Relatório médico circunstanciado com a CID e indicação terapêutica detalhada");
    }
    if (checklistItems.comprovantes) {
      selectedLabels.push("• Carteirinha do plano de saúde e comprovantes de quitação recentes");
    }

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

    return `${whatsappBaseUrl}?text=${encodeURIComponent(message)}`;
  };

  // Dados Estruturados das Etapas da Atuação em Medidas de Urgência
  const urgencyStepsData = [
    {
      id: 0,
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
      id: 1,
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
      id: 2,
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
      id: 3,
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

  // Base de Notícias Reais e Verificadas
  const newsDatabase = [
    {
      id: 1,
      title: "Plano de saúde deve aceitar criança autista após recusar adesão por \"ausência de interesse comercial\"",
      source: "Portal Migalhas & Justiça Estadual",
      sourceBadge: "Migalhas • Seleção de Risco em TEA",
      date: "Jurisprudência Atual",
      category: "Direito à Saúde & Autismo (TEA)",
      summary: "Decisão da Justiça reforça que a recusa de contratação de plano de saúde sob justificativas comerciais genéricas logo após a ciência do diagnóstico de TEA é ilegal e configura prática abusiva de seleção de risco.",
      officialUrl: "https://www.migalhas.com.br/quentes/466978/plano-de-saude-deve-aceitar-crianca-autista-apos-recusar-adesao",
      partnerUrl: "https://www.tjsp.jus.br",
      partnerLabel: "TJSP ↗",
      verified: true
    },
    {
      id: 2,
      title: "Justiça garante custeio de tratamento multidisciplinar fora da rede credenciada para crianças com TEA",
      source: "Portal Migalhas & Tribunais de Justiça",
      sourceBadge: "Migalhas • Reembolso Integral",
      date: "Jurisprudência Atual",
      category: "Direito à Saúde & Autismo (TEA)",
      summary: "Diante da ausência ou inaptidão de profissionais especializados devidamente certificados na rede própria da operadora, o judiciário assegura o direito ao reembolso integral ou custeio direto de terapias particulares (como método ABA).",
      officialUrl: "https://www.migalhas.com.br/quentes/430648/plano-indenizara-crianca-com-tea-apos-negar-tratamento-fora-da-rede",
      partnerUrl: "https://www.gov.br/ans",
      partnerLabel: "Portal ANS ↗",
      verified: true
    },
    {
      id: 3,
      title: "STF e STJ definem parâmetros para cobertura de tratamentos e fármacos não previstos no rol da ANS",
      source: "Portal Migalhas • STF & STJ",
      sourceBadge: "Migalhas • STF & STJ Extra-Rol",
      date: "ADIn 7.265 / Tema STJ",
      category: "Direito à Saúde & Autismo (TEA)",
      summary: "Com base nos parâmetros fixados pelo Supremo Tribunal Federal (ADIn 7.265) e nas diretrizes dos tribunais, pacientes com prescrição fundamentada e respaldo científico obtêm tutelas de urgência para tratamentos de alto custo.",
      officialUrl: "https://www.migalhas.com.br/quentes/461400/toffoli-manda-stj-reanalisar-cobertura-de-remedio-fora-do-rol-da-ans",
      partnerUrl: "https://portal.stf.jus.br",
      partnerLabel: "Portal STF ↗",
      verified: true
    },
    {
      id: 4,
      title: "Resolução CNJ nº 571/2024 autoriza inventário e partilha extrajudiciais em cartório mesmo com menores e incapazes",
      source: "Conselho Nacional de Justiça (CNJ)",
      sourceBadge: "CNJ • Resolução 571/2024",
      date: "26 de agosto de 2024",
      category: "Família e Sucessões",
      summary: "O CNJ alterou a Resolução nº 35/2007 para permitir a lavratura de escrituras públicas de inventário e partilha em cartório de notas havendo herdeiros menores de idade ou incapazes, desde que consensual e resguardado o quinhão legal com oitiva do Ministério Público, agilizando transmissões sucessórias.",
      officialUrl: "https://www.cnj.jus.br",
      partnerUrl: "https://www.conjur.com.br",
      partnerLabel: "ConJur ↗",
      verified: true
    },
    {
      id: 5,
      title: "TJSP consolida direito à isenção de IPVA e restituição de valores pagos para PCD e pessoas com TEA",
      source: "Tribunal de Justiça de SP & Sefaz/SP",
      sourceBadge: "TJSP • Fazenda Pública",
      date: "Jurisprudência Consolidada",
      category: "Tributário & Isenções",
      summary: "Órgão Especial e Câmaras de Direito Público do TJSP mantêm a suspensão de cobranças indevidas e garantem a isenção de IPVA e repetição de indébito para veículos de pessoas com deficiência ou autismo, rechaçando critérios discriminatórios e burocráticos do Estado.",
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

      {/* Topbar Editorial Minimalista */}
      <aside className="border-b border-[#E6E1D6] bg-[#F4EFE6]/60 text-[11px] tracking-[0.08em] text-[#52525B] uppercase" aria-label="Informações Institucionais">
        <div
          className="topbar-container max-w-[1280px] mx-auto px-4 sm:px-8 py-2 flex justify-between items-center w-full"
          style={{ maxWidth: '1280px', margin: '0 auto', padding: '0.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}
        >
          <span className="font-normal whitespace-nowrap">
            EDIFÍCIO TORRE NOVA YORK • MARÍLIA/SP | OAB/SP 463.673
          </span>
          <div className="flex items-center gap-3 sm:gap-4 whitespace-nowrap text-[10.5px]">
            <span>Seg. a Sex. 08h30 às 18h00</span>
            <span className="text-[#D6CFC2]">•</span>
            <a 
              href={whatsappUrl} 
              target="_blank" 
              rel="noreferrer" 
              className="text-[#18181B] font-medium hover:text-[#8C7355] transition-colors tracking-normal inline-flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block"></span>
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </aside>

      {/* Header com Alinhamento Editorial Rigoroso, Logo Harmonizado & CTA */}
      <header
        className="sticky top-0 z-50 header-glass border-b border-[#E5E0DA]"
        style={{ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', backgroundColor: 'rgba(255, 255, 255, 0.92)' }}
      >
        <div
          className="header-container max-w-[1280px] mx-auto px-4 sm:px-8 h-20 flex items-center justify-between w-full"
          style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}
        >

          {/* Monograma BR + Identidade */}
          <a href="#inicio" className="flex items-center gap-3.5 group shrink-0">
            <div className="w-10 h-10 border border-[#8C7355]/40 flex items-center justify-center bg-white shadow-2xs group-hover:border-[#8C7355] transition-colors shrink-0">
              <span className="font-serif text-lg tracking-tight text-[#18181B]">BR</span>
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-serif text-[17px] tracking-[0.14em] text-[#18181B] uppercase leading-none font-normal whitespace-nowrap">
                Beatriz Rocha
              </span>
              <span className="text-[8.5px] sm:text-[9px] tracking-[0.2em] text-[#8C7355] uppercase font-sans font-medium mt-1.5 leading-none whitespace-nowrap">
                Sociedade Individual de Advocacia
              </span>
            </div>
          </a>

          {/* Navegação Desktop Fluida & Botão Agendar Consulta */}
          <div className="hidden lg:flex items-center">
            <nav
              className="flex items-center text-[12.5px] font-medium tracking-[0.1em] uppercase text-[#52525B]"
              style={{ gap: '2rem' }}
            >
              <a href="#institucional" className="py-2 hover:text-[#18181B] transition-colors whitespace-nowrap" style={{ whiteSpace: 'nowrap' }}>
                O Escritório
              </a>

              <a href="#saude-tea" className="py-2 hover:text-[#18181B] transition-colors whitespace-nowrap" style={{ whiteSpace: 'nowrap' }}>
                Saúde & TEA
              </a>

              {/* Dropdown Organizado de Especialidades */}
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
                  <span>Especialidades</span>
                  <span className="text-[10px] text-[#8C7355] font-serif">▾</span>
                </a>

                {/* Submenu Dropdown Elegante */}
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

            {/* Botão AGENDAR CONSULTA Proporcional e com Margem Fixa */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="header-cta-btn bg-[#8C7355] text-white text-[11.5px] tracking-[0.1em] uppercase font-medium hover:bg-[#735D43] transition-colors rounded-[2px] shadow-2xs whitespace-nowrap inline-flex items-center justify-center shrink-0"
              style={{ marginLeft: '1.5rem', padding: '0.6rem 1.2rem', whiteSpace: 'nowrap' }}
            >
              Agendar Consulta
            </a>
          </div>

          {/* Botão e CTA Mobile (< 1024px) */}
          <div className="lg:hidden flex items-center gap-3 shrink-0">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-1.5 bg-[#8C7355] text-white text-[11px] tracking-[0.08em] uppercase font-medium hover:bg-[#735D43] transition-colors rounded-[2px] shadow-2xs whitespace-nowrap"
            >
              Agendar
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#18181B] border border-[#E6E1D6] bg-white text-xs uppercase cursor-pointer"
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
            <a href="#saude-tea" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-[#8C7355]">Saúde & TEA</a>

            {/* Accordion Áreas no Mobile */}
            <div>
              <button
                onClick={() => setMobileAreasOpen(!mobileAreasOpen)}
                className="w-full text-left py-1 flex items-center justify-between font-medium text-[#18181B]"
              >
                <span>Especialidades</span>
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

            <a href="#informativos" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-[#8C7355]">Informativos</a>
            <a href="#contato" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-[#8C7355]">Contato</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-[#8C7355]">FAQ</a>
          </div>
        )}
      </header>

      {/* Hero Section Editorial (Início) */}
      <section id="inicio" className="border-b border-[#E6E1D6] bg-[#FAF7F2]" style={{ padding: '80px 0' }}>
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
                alt="Fachada do Edifício Torre Nova York no Complexo Praça Capital na Avenida das Esmeraldas em Marília/SP"
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
      <section id="institucional" className="section-spacing bg-white border-t border-[#D2B48C]/25 relative" style={{ padding: '100px 0' }}>
        <div id="escritorio" className="absolute -top-24"></div>
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="grid md:grid-cols-12 gap-12 lg:gap-16 items-center mb-16">

            {/* Coluna 1: Texto Institucional & Assinatura Estilizada */}
            <div className="md:col-span-7 space-y-6">
              <span className="text-[11px] tracking-[0.2em] uppercase text-[#8C7355] block font-medium">
                Institucional & Condução Direta
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-[#18181B] font-normal leading-tight">
                Atendimento artesanal, rigor técnico e transparência inegociável.
              </h2>
              <div className="space-y-4 text-sm md:text-base text-[#52525B] font-light leading-relaxed">
                <p>
                  A <strong>Beatriz Rocha Sociedade Individual de Advocacia</strong> foi concebida sob o compromisso inegociável de que demandas jurídicas de alta complexidade — especialmente aquelas que envolvem a integridade física de entes queridos e o patrimônio da família — demandam condução direta, sem terceirizações ou respostas padronizadas.
                </p>
                <p>
                  Sediada no Edifício Torre Nova York, no complexo corporativo Praça Capital na Avenida das Esmeraldas em Marília/SP, nossa banca alia a sofisticação e o acolhimento de instalações modernas à agilidade do processo eletrônico nacional, assegurando resposta célere e medidas liminares efetivas perante qualquer tribunal do país.
                </p>
              </div>

              {/* Assinatura Estilizada da Advogada Titular */}
              <div className="pt-6 border-t border-[#E6E1D6] mt-8 flex flex-col">
                <span className="font-serif italic text-3xl text-[#18181B] tracking-wide">
                  Beatriz Guilherme Rocha
                </span>
                <span className="text-xs uppercase tracking-[0.16em] text-[#8C7355] font-medium mt-1">
                  Advogada Titular • OAB/SP 463.673
                </span>
                <p className="text-xs text-[#71717A] font-light mt-1">
                  Condução pessoal de cada demanda com proximidade, rigor técnico e confidencialidade irrestrita.
                </p>
              </div>
            </div>

            {/* Coluna 2: Moldura Elegante e Sóbria da Sede / Advogada */}
            <div className="md:col-span-5">
              <div className="border border-[#E6E1D6] p-3.5 bg-[#FAF7F2] rounded-[4px] shadow-sm">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2px] bg-white border border-[#E6E1D6] group">
                  <img
                    src="/assets/recepcao-corporativa.jpg"
                    alt="Ambiente interno privativo da Torre Nova York em Marília/SP"
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
      <section id="saude-tea" className="section-spacing bg-[#FAF7F2] border-t border-[#D2B48C]/25" style={{ padding: '100px 0' }}>
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

          {/* SEÇÃO: COMO FUNCIONA A ATUAÇÃO DE URGÊNCIA (Componente Interativo em Abas / Stepper Dinâmico) */}
          <div className="mb-16 bg-white border border-[#E6E1D6] p-6 sm:p-8 md:p-12 shadow-xs rounded-[4px]">
            <div className="max-w-2xl mb-8">
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#8C7355] block font-medium mb-2">
                Jornada do Paciente • Resposta Rápida e Previsibilidade
              </span>
              <h3 className="font-serif text-2xl md:text-3xl text-[#18181B] font-normal leading-tight">
                Como Funciona a Atuação em Medidas de Urgência
              </h3>
              <p className="mt-3 text-xs md:text-sm text-[#52525B] font-light leading-relaxed">
                Navegue pelas etapas interativas abaixo para entender o rito técnico, os prazos estimados e os documentos necessários para a obtenção de liminar contra o plano de saúde.
              </p>
            </div>

            {/* Stepper / Abas Horizontais Clicáveis */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-8 p-1.5 bg-[#FAF7F2] border border-[#E6E1D6] rounded-[4px]" role="tablist" aria-label="Etapas da atuação de urgência">
              {urgencyStepsData.map((step, idx) => {
                const isActive = activeUrgencyStep === idx;
                return (
                  <button
                    key={step.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveUrgencyStep(idx)}
                    className={`relative p-3 sm:p-4 text-left rounded-[3px] transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                      isActive
                        ? 'bg-white border border-[#D2B48C] shadow-xs'
                        : 'bg-transparent border border-transparent hover:bg-white/60 hover:border-[#E6E1D6]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`w-7 h-7 rounded-full text-xs font-semibold flex items-center justify-center transition-colors ${
                          isActive
                            ? 'bg-[#8C7355] text-white shadow-xs'
                            : 'bg-[#EAE5DC] text-[#71717A]'
                        }`}
                      >
                        {step.stepNumber}
                      </span>
                      <span className={`text-[10px] uppercase tracking-wider font-medium ${
                        isActive ? 'text-[#8C7355]' : 'text-[#A1A1AA]'
                      }`}>
                        {step.timeEstimate}
                      </span>
                    </div>
                    <div>
                      <h4 className={`text-xs sm:text-sm font-serif font-medium leading-tight ${
                        isActive ? 'text-[#18181B]' : 'text-[#52525B]'
                      }`}>
                        {step.shortTitle}
                      </h4>
                    </div>
                    {isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#8C7355] rounded-full"></span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Card Principal da Etapa Ativa (Com Transição Fade-In Suave) */}
            <div
              key={activeUrgencyStep}
              className="animate-fadeIn bg-[#FAF7F2]/50 border border-[#E6E1D6] p-6 sm:p-8 md:p-10 rounded-[4px]"
            >
              {/* Header do Card Ativo */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-5 border-b border-[#E6E1D6]">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-1 text-[11px] font-semibold tracking-wider uppercase bg-white border border-[#D2B48C] text-[#8C7355] rounded-[2px] shadow-2xs">
                    {urgencyStepsData[activeUrgencyStep].phaseBadge}
                  </span>
                  <span className="text-xs text-[#71717A]">
                    Etapa {activeUrgencyStep + 1} de {urgencyStepsData.length}
                  </span>
                </div>
                <div className="inline-flex items-center gap-2 text-xs font-medium text-emerald-900 bg-emerald-50 border border-emerald-200/80 px-3 py-1.5 rounded-[2px] self-start sm:self-auto shadow-2xs">
                  <svg className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" strokeWidth="2"></circle>
                    <polyline points="12 6 12 12 16 14" strokeWidth="2"></polyline>
                  </svg>
                  <span>{urgencyStepsData[activeUrgencyStep].timeBadge}</span>
                </div>
              </div>

              {/* Título & Descrição Detalhada */}
              <div className="mt-6 mb-6">
                <h4 className="font-serif text-xl sm:text-2xl md:text-3xl text-[#18181B] font-normal leading-snug">
                  {urgencyStepsData[activeUrgencyStep].fullTitle}
                </h4>
                <p className="mt-3 text-sm md:text-base text-[#52525B] font-light leading-relaxed max-w-3xl">
                  {urgencyStepsData[activeUrgencyStep].description}
                </p>
              </div>

              {/* Grid Técnico: Tese Jurídica & Entrega / Provimento */}
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6 my-6">
                <div className="bg-white border border-[#E6E1D6] p-5 rounded-[3px] shadow-2xs">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8C7355]"></span>
                    <span className="text-[10.5px] uppercase tracking-wider text-[#8C7355] font-semibold">
                      Tese Jurídica Aplicada
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#3F3F46] font-light leading-relaxed">
                    {urgencyStepsData[activeUrgencyStep].legalThesis}
                  </p>
                </div>

                <div className="bg-white border border-[#E6E1D6] p-5 rounded-[3px] shadow-2xs">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8C7355]"></span>
                    <span className="text-[10.5px] uppercase tracking-wider text-[#8C7355] font-semibold">
                      Entrega & Provimento Esperado
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#3F3F46] font-light leading-relaxed">
                    {urgencyStepsData[activeUrgencyStep].deliverable}
                  </p>
                </div>
              </div>

              {/* CHECKLIST PRÁTICO INTEGRADO (Exclusivo na Etapa 01: Triagem Documental) */}
              {urgencyStepsData[activeUrgencyStep].isChecklistStep && (
                <div className="mt-8 pt-6 border-t border-[#E6E1D6] bg-white border border-[#D2B48C]/60 p-6 md:p-7 rounded-[4px] shadow-xs">
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-6 h-6 rounded-full bg-[#FAF7F2] border border-[#D2B48C] flex items-center justify-center text-[#8C7355]">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <polyline points="20 6 9 17 4 12" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></polyline>
                      </svg>
                    </div>
                    <h5 className="font-serif text-lg text-[#18181B] font-medium">
                      Checklist Prático para Triagem Imediata
                    </h5>
                  </div>
                  <p className="text-xs text-[#52525B] font-light mb-4">
                    Assinale abaixo os documentos que você já tem em mãos para agilizar a verificação prévia de viabilidade:
                  </p>

                  <div className="space-y-3">
                    {/* Item 1 */}
                    <label
                      onClick={() => toggleChecklistItem('negativa')}
                      className={`flex items-start gap-3 p-3.5 rounded-[3px] border transition-all cursor-pointer select-none ${
                        checklistItems.negativa
                          ? 'bg-[#FAF7F2] border-[#8C7355] shadow-2xs'
                          : 'bg-white border-[#E6E1D6] hover:border-[#D2B48C]'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checklistItems.negativa}
                        onChange={() => {}} // Controlled by label onClick
                        className="mt-0.5 w-4 h-4 rounded text-[#8C7355] focus:ring-[#8C7355] accent-[#8C7355] cursor-pointer"
                      />
                      <div className="flex-1">
                        <span className="text-xs sm:text-sm font-medium text-[#18181B] block">
                          Negativa formal do plano de saúde por escrito
                        </span>
                        <span className="text-[11px] text-[#71717A] font-light">
                          Documento de recusa, e-mail da operadora ou número de protocolo SAC com prazo extrapolado.
                        </span>
                      </div>
                    </label>

                    {/* Item 2 */}
                    <label
                      onClick={() => toggleChecklistItem('laudo')}
                      className={`flex items-start gap-3 p-3.5 rounded-[3px] border transition-all cursor-pointer select-none ${
                        checklistItems.laudo
                          ? 'bg-[#FAF7F2] border-[#8C7355] shadow-2xs'
                          : 'bg-white border-[#E6E1D6] hover:border-[#D2B48C]'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checklistItems.laudo}
                        onChange={() => {}}
                        className="mt-0.5 w-4 h-4 rounded text-[#8C7355] focus:ring-[#8C7355] accent-[#8C7355] cursor-pointer"
                      />
                      <div className="flex-1">
                        <span className="text-xs sm:text-sm font-medium text-[#18181B] block">
                          Relatório médico circunstanciado com a CID e indicação terapêutica
                        </span>
                        <span className="text-[11px] text-[#71717A] font-light">
                          Prescrição do médico assistente justificando a urgência, método recomendado (ex: ABA) e carga horária.
                        </span>
                      </div>
                    </label>

                    {/* Item 3 */}
                    <label
                      onClick={() => toggleChecklistItem('comprovantes')}
                      className={`flex items-start gap-3 p-3.5 rounded-[3px] border transition-all cursor-pointer select-none ${
                        checklistItems.comprovantes
                          ? 'bg-[#FAF7F2] border-[#8C7355] shadow-2xs'
                          : 'bg-white border-[#E6E1D6] hover:border-[#D2B48C]'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checklistItems.comprovantes}
                        onChange={() => {}}
                        className="mt-0.5 w-4 h-4 rounded text-[#8C7355] focus:ring-[#8C7355] accent-[#8C7355] cursor-pointer"
                      />
                      <div className="flex-1">
                        <span className="text-xs sm:text-sm font-medium text-[#18181B] block">
                          Carteirinha do plano e comprovantes de pagamento recentes
                        </span>
                        <span className="text-[11px] text-[#71717A] font-light">
                          Cópia da identificação do beneficiário e boletos/comprovantes dos últimos 3 meses que atestem adimplência.
                        </span>
                      </div>
                    </label>
                  </div>

                  {/* Botão Dinâmico de Envio do Checklist */}
                  {hasAnyChecklistSelected ? (
                    <div className="mt-5 p-4 bg-[#FAF7F2] border border-[#8C7355]/40 rounded-[3px] flex flex-col sm:flex-row items-center justify-between gap-4 animate-fadeIn">
                      <div className="text-left w-full sm:w-auto">
                        <span className="text-xs font-semibold text-[#8C7355] block">
                          ✓ Documentos assinalados prontos para envio
                        </span>
                        <span className="text-[11px] text-[#52525B] font-light">
                          Inicie o contato direto para a conferência inicial sem custo ou compromisso.
                        </span>
                      </div>
                      <a
                        href={getChecklistWhatsAppUrl()}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#18181B] hover:bg-[#8C7355] text-white text-xs font-medium tracking-wider uppercase transition-all duration-300 rounded-[2px] shadow-sm whitespace-nowrap cursor-pointer"
                      >
                        <svg className="w-4 h-4 text-emerald-400 fill-current" viewBox="0 0 24 24">
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                        </svg>
                        <span>Enviar Documentos Selecionados para Análise Preliminar no WhatsApp</span>
                      </a>
                    </div>
                  ) : (
                    <div className="mt-4 p-3.5 bg-[#FAF7F2]/80 border border-dashed border-[#E6E1D6] rounded-[3px] text-xs text-[#71717A] flex items-center gap-2">
                      <span className="text-[#8C7355] text-sm">💡</span>
                      <span>Selecione ao menos um dos itens acima para desbloquear o envio direto da sua lista para triagem no WhatsApp.</span>
                    </div>
                  )}
                </div>
              )}

              {/* Barra de Navegação do Stepper (Anterior / Próximo) */}
              <div className="mt-8 pt-6 border-t border-[#E6E1D6] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  {activeUrgencyStep > 0 ? (
                    <button
                      type="button"
                      onClick={() => setActiveUrgencyStep(prev => prev - 1)}
                      className="inline-flex items-center gap-2 px-4 py-2 border border-[#E6E1D6] bg-white hover:bg-[#FAF7F2] text-[#18181B] text-xs font-medium rounded-[2px] transition-colors cursor-pointer"
                    >
                      ← Etapa Anterior: {urgencyStepsData[activeUrgencyStep - 1].shortTitle}
                    </button>
                  ) : (
                    <span className="text-xs text-[#A1A1AA] italic">Início da jornada de urgência</span>
                  )}
                </div>

                {/* Marcadores de Etapa (Dots) */}
                <div className="flex items-center gap-2">
                  {urgencyStepsData.map((s, dotIdx) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setActiveUrgencyStep(dotIdx)}
                      aria-label={`Ir para etapa ${dotIdx + 1}`}
                      className={`h-2.5 rounded-full transition-all cursor-pointer ${
                        activeUrgencyStep === dotIdx
                          ? 'w-6 bg-[#8C7355]'
                          : 'w-2.5 bg-[#D4CEB2] hover:bg-[#8C7355]/60'
                      }`}
                    />
                  ))}
                </div>

                <div>
                  {activeUrgencyStep < urgencyStepsData.length - 1 ? (
                    <button
                      type="button"
                      onClick={() => setActiveUrgencyStep(prev => prev + 1)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#18181B] hover:bg-[#8C7355] text-white text-xs font-medium rounded-[2px] transition-colors cursor-pointer shadow-2xs"
                    >
                      Próxima Etapa: {urgencyStepsData[activeUrgencyStep + 1].shortTitle} →
                    </button>
                  ) : (
                    <a
                      href={whatsappUrgenciaUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#8C7355] hover:bg-[#735D43] text-white text-xs font-medium rounded-[2px] transition-colors shadow-2xs cursor-pointer"
                    >
                      Solicitar Orientação Jurídica Imediata →
                    </a>
                  )}
                </div>
              </div>
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
                rel="noreferrer"
                className="w-full sm:w-auto px-7 py-3.5 bg-[#8C7355] text-white text-xs tracking-[0.1em] uppercase font-medium hover:bg-[#735D43] transition-colors text-center whitespace-nowrap shadow-sm"
              >
                Solicitar Análise Documental
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-7 py-3.5 border border-[#18181B] bg-white text-[#18181B] text-xs tracking-[0.1em] uppercase hover:bg-[#18181B] hover:text-white transition-colors text-center whitespace-nowrap"
              >
                Falar com a Advogada no WhatsApp ↗
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ÁREAS DE ATUAÇÃO / Especialidades (Família, Tributário & Cível) */}
      <section id="areas-atuacao" className="section-spacing bg-white border-t border-[#D2B48C]/25 relative" style={{ padding: '100px 0' }}>
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
            <div className="bg-[#FAF7F2]/40 border border-[#E6E1D6] p-8 flex flex-col justify-between">
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
            <div className="bg-[#FAF7F2]/40 border border-[#E6E1D6] p-8 flex flex-col justify-between">
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
            <div className="bg-[#FAF7F2]/40 border border-[#E6E1D6] p-8 flex flex-col justify-between">
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

      {/* SEÇÃO: INFORMATIVOS E ATUALIDADES JURÍDICAS (Carrossel Horizontal Editorial) */}
      <section id="informativos" className="section-spacing bg-[#FAF7F2] border-t border-[#D2B48C]/25 relative" style={{ padding: '100px 0' }}>
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
            <div className="flex items-center gap-2.5 shrink-0">
              <button
                onClick={() => scrollNews('left')}
                aria-label="Avançar para notícia anterior"
                className="w-10 h-10 rounded-full border border-[#D2B48C]/40 bg-white hover:border-[#8C7355] hover:bg-[#FAF7F2] text-[#18181B] flex items-center justify-center transition-colors shadow-2xs cursor-pointer text-sm"
              >
                ←
              </button>
              <button
                onClick={() => scrollNews('right')}
                aria-label="Avançar para próxima notícia"
                className="w-10 h-10 rounded-full border border-[#D2B48C]/40 bg-white hover:border-[#8C7355] hover:bg-[#FAF7F2] text-[#18181B] flex items-center justify-center transition-colors shadow-2xs cursor-pointer text-sm"
              >
                →
              </button>
            </div>
          </div>

          {/* Carrossel Horizontal Drag & Scroll */}
          <div
            ref={carouselRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth cursor-grab active:cursor-grabbing pb-8 select-none"
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
                className="w-[330px] sm:w-[370px] shrink-0 bg-white border border-[#D2B48C]/30 p-7 sm:p-8 flex flex-col justify-between rounded-[4px] shadow-2xs hover:border-[#8C7355] transition-all duration-300 snap-start"
              >
                <div>
                  {/* Tag de Origem no Topo */}
                  <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-[#E5E0DA]">
                    <span className="text-[10px] tracking-[0.16em] uppercase text-[#8C7355] font-semibold">
                      {news.sourceBadge.split('•')[0].trim()}
                    </span>
                    <span className="text-[10.5px] text-[#71717A] font-mono tracking-wide">
                      {news.date}
                    </span>
                  </div>

                  {/* Título da Notícia */}
                  <h3 className="font-serif text-lg sm:text-[19px] text-[#18181B] font-normal leading-snug mb-3 hover:text-[#8C7355] transition-colors">
                    {news.title}
                  </h3>

                  {/* Breve Resumo */}
                  <p className="text-xs sm:text-[13px] text-[#52525B] font-light leading-relaxed mb-6">
                    {news.summary}
                  </p>
                </div>

                {/* Rodapé com Link de Conferência Oficial */}
                <div className="pt-4 border-t border-[#E5E0DA] flex items-center justify-between text-xs">
                  <a
                    href={news.officialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#8C7355] font-medium hover:text-[#18181B] transition-colors inline-flex items-center gap-1.5 uppercase text-[11px] tracking-wider"
                  >
                    <span>Acessar Publicação</span>
                    <span>↗</span>
                  </a>

                  {news.partnerUrl && (
                    <a
                      href={news.partnerUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-2.5 py-1 bg-[#FAF7F2] border border-[#E5E0DA] text-[10.5px] text-[#71717A] hover:text-[#18181B] hover:border-[#8C7355] transition-colors rounded-[2px]"
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
              rel="noreferrer"
              className="px-7 py-3.5 bg-[#18181B] text-white text-xs tracking-[0.1em] uppercase hover:bg-[#8C7355] transition-colors whitespace-nowrap shadow-xs font-medium rounded-[2px]"
            >
              Consultar Especialista via WhatsApp
            </a>
          </div>

        </div>
      </section>

      {/* CONTATO E AGENDAMENTO */}
      <section id="contato" className="section-spacing bg-white border-t border-[#D2B48C]/25" style={{ padding: '100px 0' }}>
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

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-14 items-start">
            {/* Coluna Esquerda: Informações, Fotos Reais da Torre Nova York e Mapa Monocromático */}
            <div className="space-y-8">
              {/* Cartão Institucional de Expediente & Contato */}
              <div className="bg-[#FAF7F2]/60 border border-[#E5E0DA] p-7 rounded-[4px] shadow-2xs space-y-5 text-sm">
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
                <div className="relative aspect-[4/3] overflow-hidden rounded-[4px] bg-[#FAF7F2] border border-[#E5E0DA] shadow-2xs group">
                  <img
                    src="/assets/complexo-esmeraldas.jpg"
                    alt="Complexo Praça Capital e Edifício Torre Nova York na Avenida das Esmeraldas em Marília/SP"
                    className="w-full h-full object-cover filter saturate-[0.92] contrast-[1.03] group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent"></div>
                  <span className="absolute bottom-2.5 left-2.5 text-[9px] uppercase tracking-wider text-white bg-black/50 px-2 py-0.5 backdrop-blur-xs font-medium rounded-[2px]">
                    Fachada • Torre Nova York
                  </span>
                </div>

                <div className="relative aspect-[4/3] overflow-hidden rounded-[4px] bg-[#FAF7F2] border border-[#E5E0DA] shadow-2xs group">
                  <img
                    src="/assets/recepcao-corporativa.jpg"
                    alt="Lobby e recepção corporativa da Torre Nova York"
                    className="w-full h-full object-cover filter saturate-[0.92] contrast-[1.03] group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent"></div>
                  <span className="absolute bottom-2.5 left-2.5 text-[9px] uppercase tracking-wider text-white bg-black/50 px-2 py-0.5 backdrop-blur-xs font-medium rounded-[2px]">
                    Recepção Privativa
                  </span>
                </div>
              </div>

              {/* Mapa Monocromático Limpo com Botões de Navegação */}
              <div className="space-y-3">
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[4px] border border-[#E5E0DA] bg-[#FAF7F2] shadow-2xs">
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
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-white border border-[#E5E0DA] text-[11px] text-[#18181B] font-medium uppercase tracking-[0.08em] hover:bg-[#8C7355] hover:text-white hover:border-[#8C7355] transition-colors rounded-[3px] shadow-2xs"
                  >
                    <span>Google Maps ↗</span>
                  </a>
                  <a
                    href="https://waze.com/ul?q=Av.+das+Esmeraldas+3895+Marilia"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-white border border-[#E5E0DA] text-[11px] text-[#18181B] font-medium uppercase tracking-[0.08em] hover:bg-[#8C7355] hover:text-white hover:border-[#8C7355] transition-colors rounded-[3px] shadow-2xs"
                  >
                    <span>Abrir no Waze ↗</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Coluna Direita: Formulário de Solicitação de Orientação Jurídica */}
            <div className="bg-[#FAF7F2]/40 border border-[#E5E0DA] p-8 md:p-10 rounded-[4px] shadow-2xs">
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
                      className="w-full px-4 py-3 bg-white border border-[#E5E0DA] focus:border-[#8C7355] focus:ring-1 focus:ring-[#8C7355] text-sm text-[#18181B] rounded-[2px] transition-colors focus:outline-none"
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
                      className="w-full px-4 py-3 bg-white border border-[#E5E0DA] focus:border-[#8C7355] focus:ring-1 focus:ring-[#8C7355] text-sm text-[#18181B] rounded-[2px] transition-colors focus:outline-none"
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
                    className="w-full px-4 py-3 bg-white border border-[#E5E0DA] focus:border-[#8C7355] focus:ring-1 focus:ring-[#8C7355] text-sm text-[#18181B] rounded-[2px] transition-colors focus:outline-none"
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
                    className="w-full px-4 py-3 bg-white border border-[#E5E0DA] focus:border-[#8C7355] focus:ring-1 focus:ring-[#8C7355] text-sm text-[#18181B] rounded-[2px] transition-colors focus:outline-none"
                  >
                    <option value="">Selecione a área correspondente</option>
                    <option value="Direito à Saúde & Autismo / TEA">Direito à Saúde & Autismo / TEA (Liminares, Terapias, Medicamentos)</option>
                    <option value="Família e Sucessões">Família e Sucessões (Inventário em Cartório, Partilha, Divórcio)</option>
                    <option value="Direito Tributário">Direito Tributário (Isenção de IPVA PCD/TEA e Recuperação Fiscal)</option>
                    <option value="Direito Cível e Contratos">Direito Cível, Contratos e Indenizações</option>
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
                    className="w-full px-4 py-3 bg-white border border-[#E5E0DA] focus:border-[#8C7355] focus:ring-1 focus:ring-[#8C7355] text-sm text-[#18181B] rounded-[2px] transition-colors focus:outline-none leading-relaxed"
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
                  className="w-full py-4 bg-[#18181B] text-white text-xs tracking-[0.14em] uppercase font-medium hover:bg-[#8C7355] transition-colors rounded-[2px] shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8C7355]"
                >
                  Enviar para Análise Confidencial
                </button>
                <p className="text-[11px] text-[#71717A] text-center font-light">
                  Seus dados serão encaminhados diretamente via canal criptografado para a banca da Dra. Beatriz Rocha.
                </p>
              </form>
            </div>
          </div>

        </div>
      </section>

      {/* SEÇÃO: FAQ EM ACORDEÃO (Perguntas Frequentes Interativas) */}
      <section id="faq" className="section-spacing bg-[#FAF7F2] border-t border-[#D2B48C]/25" style={{ padding: '100px 0' }}>
        <div className="max-w-4xl mx-auto px-6">

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
              rel="noreferrer"
              className="text-[#8C7355] font-medium hover:text-[#18181B] transition-colors whitespace-nowrap uppercase tracking-wider"
            >
              Consultar Advogada via WhatsApp ↗
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
                OAB/SP 463.673 • Sede: Edifício Torre Nova York, Salas 305/306 • Marília/SP
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
