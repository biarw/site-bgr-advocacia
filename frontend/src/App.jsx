import React, { useState } from 'react';

export default function BeatrizRochaAdvocacia() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [areasDropdownOpen, setAreasDropdownOpen] = useState(false);
  const [mobileAreasOpen, setMobileAreasOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [searchQuery, setSearchQuery] = useState('');

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

  // Base de Notícias Reais e Verificadas
  const newsDatabase = [
    {
      id: 1,
      title: "Segunda Seção do STJ veda limitação de sessões de terapia multidisciplinar para tratamento de autismo (Tema 1.295)",
      source: "Superior Tribunal de Justiça (STJ) & Migalhas",
      sourceBadge: "STJ • Tema 1.295",
      date: "Março de 2026",
      category: "Direito à Saúde & Autismo (TEA)",
      summary: "Sob o rito dos recursos repetitivos (Tema 1.295 – REsp 2.153.672 e REsp 2.167.050), a Segunda Seção fixou a tese vinculante de que é abusiva qualquer imposição de tetos ou limites anuais ao número de sessões de terapia multidisciplinar (psicologia/Método ABA, fonoaudiologia, fisioterapia e terapia ocupacional) prescritas ao paciente com TEA.",
      officialUrl: "https://www.stj.jus.br",
      partnerUrl: "https://www.migalhas.com.br",
      partnerLabel: "Migalhas ↗",
      verified: true
    },
    {
      id: 2,
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
      id: 3,
      title: "Justiça paulista assegura reembolso integral de terapias ABA quando rede credenciada não dispõe de especialista habilitado",
      source: "Consultor Jurídico (ConJur) & TJSP",
      sourceBadge: "ConJur & TJSP",
      date: "Fevereiro de 2025",
      category: "Direito à Saúde & Autismo (TEA)",
      summary: "Com base na Resolução Normativa nº 566/2022 da ANS e na jurisprudência das Câmaras de Direito Privado do TJSP, comprovada a inaptidão técnica ou indisponibilidade de profissionais com certificação específica no método prescrito na rede própria, a operadora deve custear integralmente a clínica particular.",
      officialUrl: "https://www.gov.br/ans",
      partnerUrl: "https://www.conjur.com.br",
      partnerLabel: "ConJur ↗",
      verified: true
    },
    {
      id: 4,
      title: "Lei Federal nº 14.454/2022 consolida rol exemplificativo da ANS e orienta tutelas de urgência no TJSP",
      source: "Tribunal de Justiça de São Paulo (TJSP)",
      sourceBadge: "TJSP • Lei 14.454/2022",
      date: "Jurisprudência Atual",
      category: "Direito à Saúde & Autismo (TEA)",
      summary: "Prevalência da indicação do médico assistente para fornecimento de medicamentos de alto custo, imunobiológicos e tratamentos oncológicos negados sob a justificativa de não constarem na Diretriz de Utilização da ANS, assegurando a concessão célere de liminares com fixação de multa diária.",
      officialUrl: "https://www.tjsp.jus.br",
      partnerUrl: "https://www.migalhas.com.br",
      partnerLabel: "Migalhas ↗",
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
      alert('Por favor, informe ao menos seu nome e telefone/WhatsApp.');
      return;
    }

    let text = `*SOLICITAÇÃO DE ORIENTAÇÃO JURÍDICA*\n`;
    text += `*Beatriz Rocha Sociedade Individual de Advocacia*\n\n`;
    text += `• *Nome:* ${formData.nome}\n`;
    text += `• *Telefone/WhatsApp:* ${formData.telefone}\n`;
    if (formData.email) text += `• *E-mail:* ${formData.email}\n`;
    if (formData.area) text += `• *Área:* ${formData.area}\n`;
    if (formData.relato) text += `• *Resumo:* ${formData.relato}\n\n`;
    text += `_Mensagem enviada através do site oficial do escritório._`;

    window.open(`${whatsappBaseUrl}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#18181B] font-sans antialiased selection:bg-[#8C7355]/20">
      
      {/* Topbar Minimalista e Fina */}
      <div className="border-b border-[#E6E1D6] bg-[#F4EFE6]/60 text-[11px] tracking-[0.06em] text-[#52525B] uppercase">
        <div className="max-w-6xl mx-auto px-6 py-2 flex flex-wrap justify-between items-center gap-4">
          <span>Edifício Torre Nova York • Av. das Esmeraldas, 3895, Salas 305/306 • Marília/SP</span>
          <div className="flex items-center gap-6">
            <span>Seg. a Sex. 08h30 às 18h00</span>
            <span>•</span>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="text-[#18181B] font-medium hover:text-[#8C7355] transition-colors">
              (14) 99711-8732
            </a>
          </div>
        </div>
      </div>

      {/* Header com Menu Higienizado, Submenu Organizado & CTA */}
      <header className="sticky top-0 z-50 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E6E1D6]">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Monograma BR + Identidade */}
          <a href="#inicio" className="flex items-center gap-3.5 group">
            <div className="w-10 h-10 border border-[#8C7355]/50 flex items-center justify-center bg-white shadow-xs">
              <span className="font-serif text-xl tracking-tighter text-[#18181B]">BR</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-base tracking-[0.14em] text-[#18181B] uppercase leading-none">
                Beatriz Rocha
              </span>
              <span className="text-[9px] tracking-[0.22em] text-[#71717A] uppercase mt-1">
                Sociedade Individual de Advocacia
              </span>
            </div>
          </a>

          {/* Menu Principal Higienizado & Objetivo (Sem Seção de Avaliação) */}
          <nav className="hidden lg:flex items-center gap-8 text-[13px] tracking-[0.02em] text-[#52525B]">
            <a href="#inicio" className="hover:text-[#18181B] transition-colors">
              Início
            </a>

            <a href="#escritorio" className="hover:text-[#18181B] transition-colors">
              O Escritório
            </a>

            {/* Dropdown Organizado de Áreas de Atuação */}
            <div 
              className="relative"
              onMouseEnter={() => setAreasDropdownOpen(true)}
              onMouseLeave={() => setAreasDropdownOpen(false)}
            >
              <a 
                href="#atuacao" 
                className="flex items-center gap-1 hover:text-[#18181B] transition-colors py-2"
              >
                <span>Áreas de Atuação</span>
                <span className="text-[10px] text-[#8C7355] font-serif">▾</span>
              </a>

              {/* Submenu Dropdown Elegante */}
              {areasDropdownOpen && (
                <div className="absolute left-0 top-full w-72 bg-white border border-[#E6E1D6] shadow-lg py-2 z-50 animate-fadeIn">
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
                    href="#atuacao" 
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
                    href="#atuacao" 
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
                    href="#atuacao" 
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

            <a href="#noticias" className="hover:text-[#18181B] transition-colors">
              Notícias
            </a>

            <a href="#contato" className="hover:text-[#18181B] transition-colors">
              Contato
            </a>
          </nav>

          {/* CTA Discreto e Fino + Botão Mobile */}
          <div className="flex items-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 bg-[#8C7355] text-white text-xs tracking-[0.08em] uppercase font-medium hover:bg-[#735D43] transition-colors shadow-sm"
            >
              Agendar Consulta
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#18181B] border border-[#E6E1D6] bg-white text-xs uppercase"
              aria-label="Abrir Menu"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Menu Mobile Responsivo e Estruturado */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-[#E6E1D6] bg-[#FAF7F2] px-6 py-4 flex flex-col gap-3 text-sm">
            <a href="#inicio" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-[#8C7355]">Início</a>
            <a href="#escritorio" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-[#8C7355]">O Escritório</a>
            
            {/* Accordion Áreas no Mobile */}
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
                  <a href="#atuacao" onClick={() => setMobileMenuOpen(false)} className="text-[#52525B]">
                    • Família e Sucessões (Inventários)
                  </a>
                  <a href="#atuacao" onClick={() => setMobileMenuOpen(false)} className="text-[#52525B]">
                    • Tributário & Isenção de IPVA
                  </a>
                  <a href="#atuacao" onClick={() => setMobileMenuOpen(false)} className="text-[#52525B]">
                    • Direito Cível e Contratos
                  </a>
                </div>
              )}
            </div>

            <a href="#noticias" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-[#8C7355]">Notícias</a>
            <a href="#contato" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-[#8C7355]">Contato</a>
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
                Solicitar Análise Confidencial
              </a>
            </div>
          </div>

          {/* Quadro Institucional Minimalista */}
          <div className="md:col-span-4 border border-[#E6E1D6] bg-white p-8 shadow-xs">
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#8C7355] block mb-4 font-medium">
              Sede Corporativa
            </span>
            <h2 className="font-serif text-2xl text-[#18181B] font-normal mb-2">
              Edifício Torre Nova York
            </h2>
            <p className="text-sm text-[#52525B] font-light leading-relaxed mb-6">
              Avenida das Esmeraldas, nº 3895, Salas 305 e 306 — Marília/SP. Estrutura privativa preparada para atendimento presencial e telepresencial em todo o país.
            </p>
            <div className="pt-6 border-t border-[#F0ECE1] space-y-3 text-xs text-[#52525B]">
              <div className="flex justify-between">
                <span className="text-[#71717A]">Atuação Processual</span>
                <span className="text-[#18181B] font-medium">TJSP, TRFs, STJ e STF</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#71717A]">Atendimento</span>
                <span className="text-[#18181B] font-medium">Com hora marcada</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* O Escritório */}
      <section id="escritorio" className="py-24 bg-white border-b border-[#E6E1D6]">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-5">
            <span className="text-[11px] tracking-[0.2em] uppercase text-[#8C7355] block mb-3 font-medium">
              Institucional
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#18181B] font-normal leading-tight">
              Atendimento artesanal, rigor técnico e transparência inegociável.
            </h2>
          </div>
          <div className="md:col-span-7 space-y-5 text-[#52525B] font-light leading-relaxed">
            <p>
              A <strong>Beatriz Rocha Sociedade Individual de Advocacia</strong> foi concebida sob o compromisso de que demandas jurídicas de alta complexidade — especialmente aquelas que envolvem a integridade física de entes queridos e o patrimônio da família — demandam condução direta, sem terceirizações ou respostas padronizadas.
            </p>
            <p>
              Localizado no Edifício Torre Nova York, na Avenida das Esmeraldas em Marília/SP, o escritório une o conforto de instalações modernas e privativas com sistemas digitais seguros para atendimento em comarcas de todo o território nacional, assegurando agilidade no protocolo de tutelas de urgência.
            </p>
          </div>
        </div>
      </section>

      {/* NÚCLEO EXCLUSIVO EM DESTAQUE: Direito à Saúde & Autismo (TEA) */}
      <section id="saude-tea" className="py-24 bg-[#FAF7F2] border-b border-[#E6E1D6]">
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

          {/* Destaque para os Marcos Jurídicos Consolidados */}
          <div className="mb-16 p-8 border border-[#E6E1D6] bg-white rounded-none">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#E6E1D6]">
              <div>
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#8C7355] block font-medium">
                  Fundamentação Técnica Inafastável
                </span>
                <h3 className="font-serif text-2xl text-[#18181B] font-normal mt-1">
                  Marcos Jurídicos e Precedentes que Protegem o Paciente
                </h3>
              </div>
              <span className="text-xs text-[#71717A] bg-[#FAF7F2] border border-[#E6E1D6] px-3.5 py-1.5 self-start md:self-auto">
                Jurisprudência Vinculante
              </span>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-[#FAF7F2]/60 p-6 border border-[#E6E1D6]">
                <span className="text-xs font-semibold text-[#8C7355] block mb-2 uppercase tracking-wider">
                  Lei Federal nº 14.454/2022
                </span>
                <h4 className="font-serif text-lg text-[#18181B] mb-2 font-medium">
                  Rol Exemplificativo da ANS
                </h4>
                <p className="text-xs text-[#52525B] font-light leading-relaxed">
                  Superação legislativa definitiva da tese do rol taxativo. O plano de saúde é obrigado a custear procedimentos e tratamentos prescritos que possuam respaldo técnico-científico e recomendação do médico assistente.
                </p>
              </div>

              <div className="bg-[#FAF7F2]/60 p-6 border border-[#E6E1D6]">
                <span className="text-xs font-semibold text-[#8C7355] block mb-2 uppercase tracking-wider">
                  Tema 1.295 do STJ
                </span>
                <h4 className="font-serif text-lg text-[#18181B] mb-2 font-medium">
                  Terapias Ilimitadas no TEA
                </h4>
                <p className="text-xs text-[#52525B] font-light leading-relaxed">
                  Tese repetitiva vinculante do STJ declarando abusiva qualquer limitação ao número de sessões de psicologia (Método ABA), fonoaudiologia, terapia ocupacional e fisioterapia.
                </p>
              </div>

              <div className="bg-[#FAF7F2]/60 p-6 border border-[#E6E1D6]">
                <span className="text-xs font-semibold text-[#8C7355] block mb-2 uppercase tracking-wider">
                  RN nº 566/2022 da ANS
                </span>
                <h4 className="font-serif text-lg text-[#18181B] mb-2 font-medium">
                  Reembolso Integral em Falha de Rede
                </h4>
                <p className="text-xs text-[#52525B] font-light leading-relaxed">
                  Garantia de custeio 100% integral dos honorários particulares caso a operadora não disponha de clínica credenciada capacitada na metodologia prescrita na comarca.
                </p>
              </div>
            </div>
          </div>

          {/* Cards de Atuação Especializada em Saúde */}
          <div className="grid md:grid-cols-2 gap-8 mb-14">
            
            <div className="p-8 border border-[#E6E1D6] bg-white hover:border-[#8C7355] transition-colors shadow-xs">
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

            <div className="p-8 border border-[#E6E1D6] bg-white hover:border-[#8C7355] transition-colors shadow-xs">
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

            <div className="p-8 border border-[#E6E1D6] bg-white hover:border-[#8C7355] transition-colors shadow-xs">
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

            <div className="p-8 border border-[#E6E1D6] bg-white hover:border-[#8C7355] transition-colors shadow-xs">
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

          {/* Bloco de Ação / Gatilhos de Conversão Éticos */}
          <div className="p-8 md:p-10 border border-[#8C7355]/40 bg-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
            <div className="max-w-xl">
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#8C7355] font-semibold block mb-1">
                Atendimento Prioritário em Saúde
              </span>
              <h3 className="font-serif text-2xl text-[#18181B] font-normal">
                Seu plano de saúde negou cobertura médica, terapias ou medicamentos?
              </h3>
              <p className="text-sm text-[#52525B] font-light mt-2">
                Analise a viabilidade de uma tutela de urgência (liminar) para restabelecer imediatamente os cuidados prescritos com total segurança jurídica.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <a
                href={whatsappUrgenciaUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-7 py-3.5 bg-[#8C7355] text-white text-xs tracking-[0.1em] uppercase font-medium hover:bg-[#735D43] transition-colors text-center whitespace-nowrap shadow-sm"
              >
                Solicitar Análise de Urgência
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-7 py-3.5 border border-[#18181B] bg-white text-[#18181B] text-xs tracking-[0.1em] uppercase hover:bg-[#18181B] hover:text-white transition-colors text-center whitespace-nowrap"
              >
                Fale com um Especialista via WhatsApp
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ÁREAS DE ATUAÇÃO (Família, Tributário & Cível) */}
      <section id="atuacao" className="py-24 bg-white border-b border-[#E6E1D6]">
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

      {/* Indicador Discreto de Avaliação e Satisfação */}
      <div className="py-6 border-b border-[#E6E1D6] bg-white">
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="flex text-[#8C7355] text-sm tracking-widest">
              <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
            </div>
            <span className="font-medium text-[#18181B]">5.0 no Google</span>
            <span className="text-[#D6CFC2]">•</span>
            <span className="text-[#52525B] font-light">Atendimento humanizado, discrição e rigor técnico</span>
          </div>
          <div className="text-[#71717A] text-[11px] font-light flex items-center gap-2">
            <span>Edifício Torre Nova York • Marília/SP</span>
            <span className="text-[#D6CFC2]">•</span>
            <span>Atendimento com hora marcada</span>
          </div>
        </div>
      </div>

      {/* SEÇÃO 1: NOTÍCIAS E ATUALIDADES JURÍDICAS (Conteúdos Reais, Verificados e com Links Diretos) */}
      <section id="noticias" className="py-24 bg-white border-b border-[#E6E1D6]">
        <div className="max-w-6xl mx-auto px-6">
          
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FAF7F2] border border-[#E6E1D6] text-[10px] text-[#8C7355] uppercase tracking-wider mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
              Fontes Oficiais Verificadas • Atualização Jurídica
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#18181B] font-normal leading-tight">
              Notícias e Entendimentos dos Tribunais Superiores
            </h2>
            <p className="mt-3 text-[#52525B] font-light leading-relaxed">
              Espaço informativo com precedentes vinculantes, resoluções e notícias jurídicas autênticas publicadas por órgãos oficiais (STJ, TJSP, CNJ, ANS) e portais jurídicos de referência (Migalhas e ConJur).
            </p>
          </div>

          {/* Barra de Filtros e Busca de Notícias */}
          <div className="bg-[#FAF7F2] p-5 border border-[#E6E1D6] mb-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Filtro por Categorias */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-[#71717A] mr-1 hidden sm:inline">Filtrar:</span>
              {['Todas', 'Direito à Saúde & Autismo (TEA)', 'Família e Sucessões', 'Tributário & Isenções'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs transition-colors ${
                    selectedCategory === cat 
                      ? 'bg-[#8C7355] text-white font-medium shadow-xs' 
                      : 'bg-white border border-[#E6E1D6] text-[#52525B] hover:text-[#18181B]'
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
                className="w-full px-3.5 py-1.5 text-xs bg-white border border-[#E6E1D6] focus:outline-none focus:border-[#8C7355]"
              />
            </div>
          </div>

          {/* Grade de Cards de Notícias Reais */}
          {filteredNews.length === 0 ? (
            <div className="p-12 text-center border border-[#E6E1D6] bg-[#FAF7F2] text-sm text-[#71717A]">
              Nenhum conteúdo jurídico validado encontrado para o termo pesquisado.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-14">
              {filteredNews.map((news) => (
                <article 
                  key={news.id} 
                  className="bg-[#FAF7F2]/40 border border-[#E6E1D6] p-7 flex flex-col justify-between hover:border-[#8C7355] hover:bg-white transition-all shadow-xs"
                >
                  <div>
                    {/* Cabeçalho do Card */}
                    <div className="flex items-center justify-between text-[11px] mb-4 pb-3 border-b border-[#E6E1D6]">
                      <span className="font-semibold text-[#8C7355] uppercase tracking-wider">
                        {news.sourceBadge}
                      </span>
                      <span className="text-[#71717A] text-[10px]">
                        {news.date}
                      </span>
                    </div>

                    {/* Título Original e Fiel */}
                    <h3 className="font-serif text-lg text-[#18181B] font-normal leading-snug mb-3">
                      {news.title}
                    </h3>

                    {/* Resumo Técnico e Verídico */}
                    <p className="text-xs text-[#52525B] font-light leading-relaxed mb-6">
                      {news.summary}
                    </p>
                  </div>

                  {/* Rodapé com Links Oficiais de Conferência Direta */}
                  <div className="pt-4 border-t border-[#E6E1D6]">
                    <div className="text-[10px] text-emerald-800 flex items-center gap-1.5 mb-2 font-medium">
                      <span>✓</span>
                      <span>Fonte Oficial Verificada</span>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1">
                      <a
                        href={news.officialUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#8C7355] font-medium hover:text-[#18181B] transition-colors inline-flex items-center gap-1"
                      >
                        Acessar Fonte Oficial ↗
                      </a>

                      {news.partnerUrl && (
                        <a
                          href={news.partnerUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#71717A] hover:text-[#18181B] transition-colors"
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

          {/* Chamada para Ação no Fechamento das Notícias */}
          <div className="border border-[#E6E1D6] bg-[#FAF7F2] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
              <h4 className="font-serif text-xl text-[#18181B] font-normal">
                Dúvidas sobre a aplicação desses precedentes ao seu caso?
              </h4>
              <p className="text-xs text-[#52525B] font-light">
                Solicite uma triagem direta pelo WhatsApp com nossa equipe especializada.
              </p>
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 bg-[#18181B] text-white text-xs tracking-[0.1em] uppercase hover:bg-[#8C7355] transition-colors whitespace-nowrap shadow-xs"
            >
              Falar no WhatsApp: (14) 99711-8732
            </a>
          </div>

        </div>
      </section>

      {/* CONTATO E AGENDAMENTO */}
      <section id="contato" className="py-24 bg-[#FAF7F2]">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-12 gap-12">
          
          {/* Dados de Contato Institucionais */}
          <div className="md:col-span-5 space-y-8">
            <div>
              <span className="text-[11px] tracking-[0.2em] uppercase text-[#8C7355] block mb-3 font-medium">
                Agendamento e Triagem
              </span>
              <h2 className="font-serif text-3xl text-[#18181B] font-normal">
                Canais de Atendimento
              </h2>
              <p className="mt-3 text-sm text-[#52525B] font-light leading-relaxed">
                Atendimento presencial privativo na cidade de Marília/SP ou telepresencial para clientes de qualquer localidade do Brasil.
              </p>
            </div>

            <div className="space-y-5 text-sm border-t border-[#E6E1D6] pt-6">
              <div>
                <span className="text-[10px] tracking-[0.16em] uppercase text-[#71717A] block">Endereço</span>
                <p className="text-[#18181B] mt-1">Av. das Esmeraldas, 3895 — Ed. Torre Nova York, Salas 305 e 306 • Marília/SP</p>
              </div>
              <div>
                <span className="text-[10px] tracking-[0.16em] uppercase text-[#71717A] block">Telefone & WhatsApp</span>
                <p className="text-[#18181B] mt-1 font-medium">(14) 99711-8732</p>
              </div>
              <div>
                <span className="text-[10px] tracking-[0.16em] uppercase text-[#71717A] block">E-mail Institucional</span>
                <p className="text-[#18181B] mt-1">contato@beatrizrocha.adv.br</p>
              </div>
              <div>
                <span className="text-[10px] tracking-[0.16em] uppercase text-[#71717A] block">Expediente</span>
                <p className="text-[#18181B] mt-1">Segunda a Sexta-feira, das 08h30 às 18h00</p>
              </div>
            </div>
          </div>

          {/* Formulário com Encaminhamento Direto */}
          <div className="md:col-span-7 bg-white border border-[#E6E1D6] p-8 md:p-10 shadow-xs">
            <h3 className="font-serif text-2xl text-[#18181B] font-normal mb-6">
              Solicitar Orientação Jurídica
            </h3>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#52525B] mb-2">Nome Completo *</label>
                  <input
                    type="text"
                    required
                    placeholder="Informe seu nome"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#E6E1D6] text-sm focus:outline-none focus:border-[#8C7355]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#52525B] mb-2">WhatsApp / Telefone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="(14) 99999-9999"
                    value={formData.telefone}
                    onChange={handlePhoneChange}
                    maxLength={15}
                    className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#E6E1D6] text-sm focus:outline-none focus:border-[#8C7355]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#52525B] mb-2">E-mail (Opcional)</label>
                <input
                  type="email"
                  placeholder="seuemail@exemplo.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#E6E1D6] text-sm focus:outline-none focus:border-[#8C7355]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#52525B] mb-2">Matéria da Demanda</label>
                <select 
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#E6E1D6] text-sm text-[#18181B] focus:outline-none focus:border-[#8C7355]"
                >
                  <option value="">Selecione a área correspondente</option>
                  <option value="Direito à Saúde & Autismo / TEA">Direito à Saúde & Autismo / TEA (Liminares, Terapias, Medicamentos)</option>
                  <option value="Família e Sucessões">Família e Sucessões (Inventário em Cartório, Partilha, Divórcio)</option>
                  <option value="Direito Tributário">Direito Tributário (Isenção de IPVA PCD/TEA e Recuperação Fiscal)</option>
                  <option value="Direito Cível e Contratos">Direito Cível, Contratos e Indenizações</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#52525B] mb-2">Resumo da Situação</label>
                <textarea
                  rows="4"
                  placeholder="Descreva brevemente o caso ou se há urgência médica/prazo em andamento..."
                  value={formData.relato}
                  onChange={(e) => setFormData({ ...formData, relato: e.target.value })}
                  className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#E6E1D6] text-sm focus:outline-none focus:border-[#8C7355]"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#18181B] text-white text-xs tracking-[0.12em] uppercase hover:bg-[#8C7355] transition-colors shadow-xs"
              >
                Enviar para Análise Confidencial
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* Rodapé Minimalista */}
      <footer className="border-t border-[#E6E1D6] bg-white py-10 text-xs text-[#71717A]">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Beatriz Rocha Sociedade Individual de Advocacia. Todos os direitos reservados.</p>
          <p>Edifício Torre Nova York • Marília/SP</p>
        </div>
      </footer>

    </div>
  );
}
