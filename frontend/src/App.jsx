import React, { useState } from 'react';

export default function BeatrizRochaAdvocacia() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [areasDropdownOpen, setAreasDropdownOpen] = useState(false);
  const [mobileAreasOpen, setMobileAreasOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState(null);

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

  const filteredNews = newsDatabase.filter(news => {
    const matchesCategory = selectedCategory === 'Todas' || news.category === selectedCategory;
    const matchesQuery = searchQuery === '' ||
      news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      news.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      news.source.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nome || !formData.telefone) {
      alert('Por favor, informe ao menos seu nome e WhatsApp/telefone para contato.');
      return;
    }

    const lines = [
      `*SOLICITAÇÃO DE ORIENTAÇÃO JURÍDICA CONFIDENCIAL*`,
      `*Beatriz Rocha Sociedade Individual de Advocacia*`,
      ``,
      `• *Nome:* ${formData.nome}`,
      `• *WhatsApp/Telefone:* ${formData.telefone}`,
      formData.email ? `• *E-mail:* ${formData.email}` : null,
      formData.area ? `• *Matéria da Demanda:* ${formData.area}` : null,
      formData.relato ? `• *Resumo da Situação:* ${formData.relato}` : null,
      ``,
      `_Mensagem encaminhada diretamente pelo formulário oficial do site._`
    ].filter(Boolean);

    const message = lines.join('\n');
    window.open(`${whatsappBaseUrl}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#18181B] font-sans antialiased selection:bg-[#8C7355]/20">

      {/* Topbar Editorial Minimalista */}
      <aside className="border-b border-[#E6E1D6] bg-[#F4EFE6]/60 text-[11px] tracking-[0.08em] text-[#52525B] uppercase" aria-label="Informações Institucionais">
        <div className="max-w-6xl mx-auto px-6 py-2 flex flex-wrap justify-between items-center gap-3">
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
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">

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

          {/* Menu Principal Fluido & Rigorosamente Alinhado */}
          <nav className="hidden md:flex items-center gap-6 text-[11px] lg:text-[11.5px] font-medium tracking-[0.12em] uppercase text-[#52525B]">
            <a href="#institucional" className="py-2 hover:text-[#18181B] transition-colors whitespace-nowrap">
              O Escritório
            </a>

            <a href="#saude-tea" className="py-2 hover:text-[#18181B] transition-colors whitespace-nowrap">
              Saúde & TEA
            </a>

            {/* Dropdown Organizado de Especialidades */}
            <div
              className="relative py-2 whitespace-nowrap"
              onMouseEnter={() => setAreasDropdownOpen(true)}
              onMouseLeave={() => setAreasDropdownOpen(false)}
            >
              <a
                href="#areas-atuacao"
                className="flex items-center gap-1.5 hover:text-[#18181B] transition-colors whitespace-nowrap"
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

            <a href="#informativos" className="py-2 hover:text-[#18181B] transition-colors whitespace-nowrap">
              Informativos
            </a>

            <a href="#contato" className="py-2 hover:text-[#18181B] transition-colors whitespace-nowrap">
              Contato
            </a>

            <a href="#faq" className="py-2 hover:text-[#18181B] transition-colors whitespace-nowrap">
              FAQ
            </a>
          </nav>

          {/* CTA Discreto e Fino + Botão Mobile */}
          <div className="flex items-center ml-8 shrink-0">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 bg-[#8C7355] text-white text-[11px] tracking-[0.1em] uppercase font-medium hover:bg-[#735D43] transition-colors rounded-[2px] shadow-2xs whitespace-nowrap"
            >
              Agendar Consulta
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden ml-3 p-2 text-[#18181B] border border-[#E6E1D6] bg-white text-xs uppercase"
              aria-label="Abrir Menu"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Menu Mobile Responsivo e Estruturado */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-[#E6E1D6] bg-[#FAF7F2] px-6 py-4 flex flex-col gap-3 text-sm">
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
                    • Família e Sucessões (Inventários)
                  </a>
                  <a href="#areas-atuacao" onClick={() => setMobileMenuOpen(false)} className="text-[#52525B]">
                    • Tributário & Isenção de IPVA
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
      <section id="inicio" className="py-20 md:py-28 border-b border-[#E6E1D6]">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-8">
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
                className="px-7 py-3.5 bg-[#8C7355] text-white text-xs tracking-[0.1em] uppercase hover:bg-[#735D43] transition-colors"
              >
                Núcleo de Direito à Saúde & TEA
              </a>
              <a
                href="#contato"
                className="px-7 py-3.5 border border-[#D6CFC2] bg-white text-[#18181B] text-xs tracking-[0.1em] uppercase hover:border-[#8C7355] transition-colors"
              >
                Solicitar Análise de Urgência
              </a>
            </div>
          </div>

          {/* Sede Corporativa com Fotografia Real da Torre Nova York */}
          <div className="md:col-span-4 border border-[#E6E1D6] bg-white overflow-hidden shadow-xs rounded-[4px] flex flex-col">
            <div className="relative aspect-[16/11] overflow-hidden bg-[#FAF7F2] border-b border-[#E6E1D6] group">
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

            <div className="p-7">
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#8C7355] block mb-2 font-medium">
                Sede Corporativa
              </span>
              <h2 className="font-serif text-2xl text-[#18181B] font-normal mb-2">
                Edifício Torre Nova York
              </h2>
              <p className="text-xs text-[#52525B] font-light leading-relaxed mb-5">
                Av. das Esmeraldas, nº 3895, Salas 305 e 306 — Marília/SP. Instalações de alto padrão preparadas para atendimento presencial privativo e condução estratégica em todo o Brasil.
              </p>

              <div className="pt-4 border-t border-[#F0ECE1] space-y-2 text-xs text-[#52525B]">
                <div className="flex justify-between">
                  <span className="text-[#71717A]">Complexo</span>
                  <span className="text-[#18181B] font-medium">Praça Capital</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#71717A]">Atendimento</span>
                  <span className="text-[#18181B] font-medium">Com hora marcada</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* O Escritório / Institucional Humanizado */}
      <section id="institucional" className="py-28 lg:py-32 bg-white border-t border-[#D2B48C]/25 relative">
        <div id="escritorio" className="absolute -top-24"></div>
        <div className="max-w-6xl mx-auto px-6">
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
      <section id="saude-tea" className="py-28 lg:py-32 bg-[#FAF7F2] border-t border-[#D2B48C]/25">
        <div className="max-w-6xl mx-auto px-6">

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

          {/* SEÇÃO: COMO FUNCIONA A ATUAÇÃO DE URGÊNCIA (Passo a Passo Visual e Humanizado) */}
          <div className="mb-16 bg-white border border-[#E6E1D6] p-8 md:p-12 shadow-xs rounded-[4px]">
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

              {/* Passo 01 */}
              <div className="relative bg-white border border-[#E6E1D6] p-6 card-hover flex flex-col justify-between rounded-[2px] shadow-2xs">
                <div>
                  <div className="w-12 h-12 rounded-full bg-[#FAF7F2] border border-[#E6E1D6] group-hover:border-[#8C7355] group-hover:bg-[#8C7355] transition-colors flex items-center justify-center mb-5 relative z-10">
                    <span className="font-serif text-lg text-[#8C7355] group-hover:text-white font-normal">01</span>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-[#8C7355] font-semibold block mb-1">
                    Passo 01
                  </span>
                  <h4 className="font-serif text-lg text-[#18181B] mb-2 font-normal leading-snug">
                    Triagem Documental
                  </h4>
                  <p className="text-xs text-[#52525B] font-light leading-relaxed">
                    Análise técnica imediata da negativa formal do plano de saúde e do relatório médico circunstanciado com indicação da metodologia.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#F0ECE1] mt-5">
                  <span className="text-[10px] text-[#71717A] tracking-wider uppercase font-medium">Análise Imediata</span>
                </div>
              </div>

              {/* Passo 02 */}
              <div className="relative bg-white border border-[#E6E1D6] p-6 card-hover flex flex-col justify-between rounded-[2px] shadow-2xs">
                <div>
                  <div className="w-12 h-12 rounded-full bg-[#FAF7F2] border border-[#E6E1D6] group-hover:border-[#8C7355] group-hover:bg-[#8C7355] transition-colors flex items-center justify-center mb-5 relative z-10">
                    <span className="font-serif text-lg text-[#8C7355] group-hover:text-white font-normal">02</span>
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
              <div className="relative bg-white border border-[#E6E1D6] p-6 card-hover flex flex-col justify-between rounded-[2px] shadow-2xs">
                <div>
                  <div className="w-12 h-12 rounded-full bg-[#FAF7F2] border border-[#E6E1D6] group-hover:border-[#8C7355] group-hover:bg-[#8C7355] transition-colors flex items-center justify-center mb-5 relative z-10">
                    <span className="font-serif text-lg text-[#8C7355] group-hover:text-white font-normal">03</span>
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
              <div className="relative bg-white border border-[#E6E1D6] p-6 card-hover flex flex-col justify-between rounded-[2px] shadow-2xs">
                <div>
                  <div className="w-12 h-12 rounded-full bg-[#FAF7F2] border border-[#E6E1D6] group-hover:border-[#8C7355] group-hover:bg-[#8C7355] transition-colors flex items-center justify-center mb-5 relative z-10">
                    <span className="font-serif text-lg text-[#8C7355] group-hover:text-white font-normal">04</span>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-[#8C7355] font-semibold block mb-1">
                    Passo 04
                  </span>
                  <h4 className="font-serif text-lg text-[#18181B] mb-2 font-normal leading-snug">
                    Efetivação do Direito
                  </h4>
                  <p className="text-xs text-[#52525B] font-light leading-relaxed">
                    Garantia do início das terapias, fornecimento do fármaco ou reembolso mediante intimação e cumprimento da ordem judicial.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#F0ECE1] mt-5">
                  <span className="text-[10px] text-[#8C7355] tracking-wider uppercase font-medium">Efetivação do Direito</span>
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
      <section id="areas-atuacao" className="py-28 lg:py-32 bg-white border-t border-[#D2B48C]/25 relative">
        <div id="atuacao" className="absolute -top-24"></div>
        <div className="max-w-6xl mx-auto px-6">
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

      {/* SEÇÃO: INFORMATIVOS E ATUALIDADES JURÍDICAS */}
      <section id="informativos" className="py-28 lg:py-32 bg-[#FAF7F2] border-t border-[#D2B48C]/25 relative">
        <div id="noticias" className="absolute -top-24"></div>
        <div className="max-w-6xl mx-auto px-6">

          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-[#E5E0DA] text-[10px] text-[#8C7355] uppercase tracking-wider mb-4 shadow-2xs rounded-[2px] whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              Fontes Oficiais Verificadas • Atualização Jurídica
            </div>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-[42px] text-[#18181B] font-normal leading-tight tracking-tight">
              Notícias e Entendimentos dos Tribunais Superiores
            </h2>
            <p className="mt-4 text-[#52525B] font-light leading-relaxed text-sm md:text-base">
              Espaço informativo com precedentes vinculantes, resoluções e notícias jurídicas autênticas publicadas por órgãos oficiais (STJ, TJSP, CNJ, ANS) e portais jurídicos de referência (Migalhas e ConJur).
            </p>
          </div>

          {/* Barra de Filtros e Busca de Notícias */}
          <div className="bg-white p-5 border border-[#E6E1D6] mb-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shadow-2xs">

            {/* Filtro por Categorias */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-[#71717A] mr-1 hidden sm:inline">Filtrar:</span>
              {['Todas', 'Direito à Saúde & Autismo (TEA)', 'Família e Sucessões', 'Tributário & Isenções'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs transition-colors ${selectedCategory === cat
                      ? 'bg-[#8C7355] text-white font-medium shadow-xs'
                      : 'bg-[#FAF7F2] border border-[#E6E1D6] text-[#52525B] hover:text-[#18181B]'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Campo de Busca Rápida */}
            <div className="w-full md:w-64">
              <input
                type="text"
                placeholder="Buscar por palavra-chave..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3.5 py-1.5 text-xs bg-[#FAF7F2] border border-[#E6E1D6] focus:outline-none focus:border-[#8C7355]"
              />
            </div>
          </div>

          {/* Grade de Cards de Notícias Reais */}
          {filteredNews.length === 0 ? (
            <div className="p-12 text-center border border-[#E6E1D6] bg-white text-sm text-[#71717A]">
              Nenhum conteúdo jurídico validado encontrado para o termo pesquisado.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {filteredNews.map((news) => (
                <article
                  key={news.id}
                  className="bg-white border border-[#E6E1D6] border-l-4 border-l-[#D2B48C] p-7 sm:p-8 flex flex-col justify-between hover:border-[#8C7355] hover:border-l-[#8C7355] hover:shadow-md transition-all duration-300 shadow-2xs rounded-[2px] group"
                >
                  <div>
                    {/* Cabeçalho do Card com Badge em Evidência */}
                    <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] mb-4 pb-3.5 border-b border-[#E6E1D6]">
                      <span className="px-2.5 py-1 bg-[#FAF7F2] border border-[#E6E1D6] text-[10px] font-semibold tracking-wider text-[#8C7355] uppercase rounded-[2px]">
                        {news.sourceBadge}
                      </span>
                      <span className="text-[#71717A] text-[10.5px] font-mono tracking-wide">
                        {news.date}
                      </span>
                    </div>

                    {/* Título Original e Fiel */}
                    <h3 className="font-serif text-lg sm:text-xl text-[#18181B] font-normal leading-snug mb-3 group-hover:text-[#8C7355] transition-colors">
                      {news.title}
                    </h3>

                    {/* Resumo Técnico e Verídico */}
                    <p className="text-xs sm:text-[13px] text-[#52525B] font-light leading-relaxed mb-6">
                      {news.summary}
                    </p>
                  </div>

                  {/* Rodapé com Links Oficiais de Conferência Direta */}
                  <div className="pt-4 border-t border-[#E6E1D6]">
                    <div className="text-[10px] text-emerald-800 flex items-center gap-1.5 mb-2.5 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                      <span>Fonte Oficial Verificada</span>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1">
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
                          className="px-2.5 py-1 bg-[#FAF7F2] border border-[#E6E1D6] text-[10.5px] text-[#71717A] hover:text-[#18181B] hover:border-[#8C7355] transition-colors rounded-[2px]"
                        >
                          {news.partnerLabel}
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Chamada Ética no Fechamento das Notícias (Provimento 205/2021) */}
          <div className="border border-[#E6E1D6] bg-white p-7 sm:p-9 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-[2px] shadow-2xs">
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
      <section id="contato" className="py-28 lg:py-32 bg-white border-t border-[#D2B48C]/25">
        <div className="max-w-6xl mx-auto px-6">

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

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#52525B] font-medium mb-2">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Informe seu nome"
                      value={formData.nome}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-[#E5E0DA] focus:border-[#D2B48C] text-sm text-[#18181B] rounded-[2px] transition-colors focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#52525B] font-medium mb-2">
                      WhatsApp / Telefone *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="(14) 99999-9999"
                      value={formData.telefone}
                      onChange={handlePhoneChange}
                      maxLength={15}
                      className="w-full px-4 py-3 bg-white border border-[#E5E0DA] focus:border-[#D2B48C] text-sm text-[#18181B] rounded-[2px] transition-colors focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#52525B] font-medium mb-2">
                    E-mail Institucional ou Pessoal
                  </label>
                  <input
                    type="email"
                    placeholder="seuemail@exemplo.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-[#E5E0DA] focus:border-[#D2B48C] text-sm text-[#18181B] rounded-[2px] transition-colors focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#52525B] font-medium mb-2">
                    Matéria da Demanda
                  </label>
                  <select
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-[#E5E0DA] focus:border-[#D2B48C] text-sm text-[#18181B] rounded-[2px] transition-colors focus:outline-none"
                  >
                    <option value="">Selecione a área correspondente</option>
                    <option value="Direito à Saúde & Autismo / TEA">Direito à Saúde & Autismo / TEA (Liminares, Terapias, Medicamentos)</option>
                    <option value="Família e Sucessões">Família e Sucessões (Inventário em Cartório, Partilha, Divórcio)</option>
                    <option value="Direito Tributário">Direito Tributário (Isenção de IPVA PCD/TEA e Recuperação Fiscal)</option>
                    <option value="Direito Cível e Contratos">Direito Cível, Contratos e Indenizações</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#52525B] font-medium mb-2">
                    Resumo da Situação ou Urgência Médica
                  </label>
                  <textarea
                    rows="4"
                    placeholder="Descreva brevemente o caso ou se há urgência médica/prazo processual em andamento..."
                    value={formData.relato}
                    onChange={(e) => setFormData({ ...formData, relato: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-[#E5E0DA] focus:border-[#D2B48C] text-sm text-[#18181B] rounded-[2px] transition-colors focus:outline-none leading-relaxed"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#18181B] text-white text-xs tracking-[0.14em] uppercase font-medium hover:bg-[#8C7355] transition-colors rounded-[2px] shadow-sm cursor-pointer"
                >
                  Enviar para Análise Confidencial
                </button>
                <p className="text-[11px] text-[#71717A] text-center font-light">
                  Seus dados serão encaminhados diretamente via WhatsApp criptografado para a banca da Dra. Beatriz Rocha.
                </p>
              </form>
            </div>
          </div>

        </div>
      </section>

      {/* SEÇÃO: FAQ EM ACORDEÃO (Perguntas Frequentes Interativas) */}
      <section id="faq" className="py-28 lg:py-32 bg-[#FAF7F2] border-t border-[#D2B48C]/25">
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

      {/* Rodapé Minimalista */}
      <footer className="border-t border-[#D2B48C]/25 bg-white py-10 text-xs text-[#71717A]">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Beatriz Rocha Sociedade Individual de Advocacia • OAB/SP 463.673. Todos os direitos reservados.</p>
          <p>Edifício Torre Nova York • Marília/SP</p>
        </div>
      </footer>

    </div>
  );
}
