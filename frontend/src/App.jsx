import React, { useState } from 'react';

export default function BeatrizRochaAdvocacia() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
            <span>OAB/SP 463.673</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">Seg. a Sex. 08h30 às 18h00</span>
            <span>•</span>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="text-[#18181B] font-medium hover:text-[#8C7355] transition-colors">
              (14) 99711-8732
            </a>
          </div>
        </div>
      </div>

      {/* Header Enxuto e Elegante com Menu Otimizado */}
      <header className="sticky top-0 z-50 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#E6E1D6]">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Monograma BR + Nome */}
          <a href="#" className="flex items-center gap-3.5 group">
            <div className="w-10 h-10 border border-[#8C7355]/50 flex items-center justify-center bg-white">
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

          {/* Menu de Navegação Otimizado para UX & Conversão */}
          <nav className="hidden lg:flex items-center gap-8 text-[13px] tracking-[0.02em] text-[#52525B]">
            <a href="#escritorio" className="hover:text-[#18181B] transition-colors">
              O Escritório
            </a>
            <a 
              href="#saude-tea" 
              className="text-[#8C7355] font-medium border-b-2 border-[#8C7355] pb-0.5 hover:text-[#18181B] hover:border-[#18181B] transition-colors flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#8C7355]"></span>
              Saúde & Autismo (TEA)
            </a>
            <a href="#atuacao" className="hover:text-[#18181B] transition-colors">
              Áreas de Atuação
            </a>
            <a href="#jurisprudencia" className="hover:text-[#18181B] transition-colors">
              Jurisprudência & Notícias
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

        {/* Menu Mobile */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-[#E6E1D6] bg-[#FAF7F2] px-6 py-4 flex flex-col gap-3 text-sm">
            <a href="#escritorio" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-[#8C7355]">O Escritório</a>
            <a href="#saude-tea" onClick={() => setMobileMenuOpen(false)} className="py-1 text-[#8C7355] font-medium flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8C7355]"></span> Saúde & Autismo (TEA)
            </a>
            <a href="#atuacao" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-[#8C7355]">Áreas de Atuação</a>
            <a href="#jurisprudencia" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-[#8C7355]">Jurisprudência & Notícias</a>
            <a href="#contato" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-[#8C7355]">Contato</a>
          </div>
        )}
      </header>

      {/* Hero Section Editorial */}
      <section className="py-20 md:py-28 border-b border-[#E6E1D6]">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#E6E1D6] bg-white mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8C7355]"></span>
              <span className="text-[10px] tracking-[0.16em] uppercase text-[#52525B]">
                Sociedade de Advocacia • OAB/SP 463.673
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
          <div className="md:col-span-4 border border-[#E6E1D6] bg-white p-8">
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#8C7355] block mb-4">
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

      {/* ABA / SEÇÃO EXCLUSIVA EM DESTAQUE: Direito à Saúde & Autismo (TEA) */}
      <section id="saude-tea" className="py-24 bg-white border-b border-[#E6E1D6]">
        <div className="max-w-6xl mx-auto px-6">
          
          {/* Cabeçalho da Seção focado na dor do cliente e autoridade */}
          <div className="max-w-3xl mb-14">
            <span className="text-[11px] tracking-[0.2em] uppercase text-[#8C7355] block mb-3 font-medium">
              Núcleo Especializado • Tutela Provisória de Urgência
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-[42px] text-[#18181B] font-normal leading-tight">
              Proteção Jurídica contra Negativas de Planos de Saúde e Garantia de Tratamento Integral no Autismo (TEA)
            </h2>
            <p className="mt-5 text-[#52525B] font-light leading-relaxed text-base md:text-lg">
              Receber a recusa de cobertura de um tratamento prescrito pelo médico ou ter o fornecimento de medicamentos de alto custo negado é um momento de extrema angústia e sensação de desamparo para qualquer família. No caso do <strong>Transtorno do Espectro Autista (TEA)</strong>, a intervenção precoce é uma corrida contra o relógio: cada semana de atraso afeta diretamente a janela neurológica de desenvolvimento da criança.
            </p>
            <p className="mt-4 text-[#52525B] font-light leading-relaxed text-base">
              Nossa banca atua com foco em <strong>medidas liminares de urgência</strong> para restabelecer imediatamente a assistência devida, com base no princípio supremo de que a indicação do médico assistente prevalece sobre qualquer cláusula restritiva da operadora.
            </p>
          </div>

          {/* Destaque para os Marcos Jurídicos Consolidados */}
          <div className="mb-16 p-8 border border-[#E6E1D6] bg-[#FAF7F2] rounded-none">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#E6E1D6]">
              <div>
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#8C7355] block font-medium">
                  Fundamentação Técnica Inafastável
                </span>
                <h3 className="font-serif text-2xl text-[#18181B] font-normal mt-1">
                  Marcos Jurídicos e Precedentes que Protegem o Paciente
                </h3>
              </div>
              <span className="text-xs text-[#71717A] bg-white border border-[#E6E1D6] px-3.5 py-1.5 self-start md:self-auto">
                Jurisprudência Vinculante
              </span>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 border border-[#E6E1D6]">
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

              <div className="bg-white p-6 border border-[#E6E1D6]">
                <span className="text-xs font-semibold text-[#8C7355] block mb-2 uppercase tracking-wider">
                  Tema 1069 do STJ
                </span>
                <h4 className="font-serif text-lg text-[#18181B] mb-2 font-medium">
                  Tratamento Multidisciplinar Contínuo
                </h4>
                <p className="text-xs text-[#52525B] font-light leading-relaxed">
                  Tese fixada pelo Superior Tribunal de Justiça reconhecendo a ilegalidade de limitações contratuais que restrinjam a quantidade de sessões de terapias necessárias à reabilitação do paciente.
                </p>
              </div>

              <div className="bg-white p-6 border border-[#E6E1D6]">
                <span className="text-xs font-semibold text-[#8C7355] block mb-2 uppercase tracking-wider">
                  Súmula 102 do TJSP
                </span>
                <h4 className="font-serif text-lg text-[#18181B] mb-2 font-medium">
                  Prevalência da Prescrição Médica
                </h4>
                <p className="text-xs text-[#52525B] font-light leading-relaxed">
                  <em>"Havendo expressa indicação médica, é abusiva a negativa de cobertura de custeio de tratamento sob o argumento da sua natureza experimental ou por não estar previsto no rol da ANS."</em>
                </p>
              </div>
            </div>
          </div>

          {/* Cards de Atuação Especializada em Saúde */}
          <div className="grid md:grid-cols-2 gap-8 mb-14">
            
            <div className="p-8 border border-[#E6E1D6] bg-[#FAF7F2]/40 hover:bg-[#FAF7F2] transition-colors">
              <span className="text-[10px] tracking-[0.16em] uppercase text-[#8C7355] font-medium block mb-2">
                Autismo e Desenvolvimento Atípico
              </span>
              <h3 className="font-serif text-2xl text-[#18181B] mb-3">
                Terapias Multidisciplinares pelo Método ABA sem Limite de Sessões
              </h3>
              <p className="text-sm text-[#52525B] font-light leading-relaxed mb-4">
                Garantia de custeio integral para todas as especialidades terapêuticas prescritas: <strong>Psicologia Comportamental (Método ABA)</strong>, Fonoaudiologia, Terapia Ocupacional com Integração Sensorial, Psicopedagogia e Musicoterapia. Ação voltada à derrubada de tetos anuais de sessões, cobrança indevida de coparticipação e obtenção de reembolso integral quando a operadora não possuir profissionais devidamente certificados na comarca.
              </p>
              <div className="pt-4 border-t border-[#E6E1D6]/70 flex items-center justify-between text-xs text-[#8C7355]">
                <span>Lei 14.454/2022 • Tema 1069 STJ</span>
                <span className="font-medium">Liminar Urgente</span>
              </div>
            </div>

            <div className="p-8 border border-[#E6E1D6] bg-[#FAF7F2]/40 hover:bg-[#FAF7F2] transition-colors">
              <span className="text-[10px] tracking-[0.16em] uppercase text-[#8C7355] font-medium block mb-2">
                Fármacos Especiais e Oncologia
              </span>
              <h3 className="font-serif text-2xl text-[#18181B] mb-3">
                Medicamentos de Alto Custo, Biológicos e Tratamentos Oncológicos
              </h3>
              <p className="text-sm text-[#52525B] font-light leading-relaxed mb-4">
                Medidas jurídicas com pedido de tutela antecipada (liminar deferida em 24h a 48h) para fornecimento de medicamentos importados, imunobiológicos e quimioterápicos de uso oral ou ambulatorial recusados sob alegação genérica de ausência na Diretriz de Utilização (DUT) ou no Rol da ANS.
              </p>
              <div className="pt-4 border-t border-[#E6E1D6]/70 flex items-center justify-between text-xs text-[#8C7355]">
                <span>Súmula 102 TJSP • Tema 106 STJ</span>
                <span className="font-medium">Fornecimento Rápido</span>
              </div>
            </div>

            <div className="p-8 border border-[#E6E1D6] bg-[#FAF7F2]/40 hover:bg-[#FAF7F2] transition-colors">
              <span className="text-[10px] tracking-[0.16em] uppercase text-[#8C7355] font-medium block mb-2">
                Cirurgias e Cuidados Críticos
              </span>
              <h3 className="font-serif text-2xl text-[#18181B] mb-3">
                Cirurgias de Urgência, Órteses, Próteses e Home Care
              </h3>
              <p className="text-sm text-[#52525B] font-light leading-relaxed mb-4">
                Atuação célere contra glosas abusivas de materiais cirúrgicos essenciais (próteses, stents, marca-passos) e obtenção de liminar para implantação de estrutura completa de internação domiciliar (<em>Home Care</em>) com enfermagem 12h/24h, fisioterapia motora e respiratória para pacientes com dependência de suporte à vida.
              </p>
              <div className="pt-4 border-t border-[#E6E1D6]/70 flex items-center justify-between text-xs text-[#8C7355]">
                <span>Súmula 90 TJSP • Atendimento Plantonista</span>
                <span className="font-medium">Plantão Urgente</span>
              </div>
            </div>

            <div className="p-8 border border-[#E6E1D6] bg-[#FAF7F2]/40 hover:bg-[#FAF7F2] transition-colors">
              <span className="text-[10px] tracking-[0.16em] uppercase text-[#8C7355] font-medium block mb-2">
                Equilíbrio Contratual
              </span>
              <h3 className="font-serif text-2xl text-[#18181B] mb-3">
                Cancelamentos Unilaterais e Reajustes Abusivos de Mensalidade
              </h3>
              <p className="text-sm text-[#52525B] font-light leading-relaxed mb-4">
                Restabelecimento judicial de contratos individuais e coletivos rescindidos de forma arbitrária durante internações ou tratamentos contínuos de saúde, bem como a revisão de reajustes desproporcionais por mudança de faixa etária aos 59 anos ou sinistralidade sem cálculo atuarial transparente.
              </p>
              <div className="pt-4 border-t border-[#E6E1D6]/70 flex items-center justify-between text-xs text-[#8C7355]">
                <span>Tema 1082 STJ • Manutenção Obrigatória</span>
                <span className="font-medium">Proteção do Vínculo</span>
              </div>
            </div>

          </div>

          {/* Bloco de Ação / Gatilhos de Conversão Éticos */}
          <div className="p-8 md:p-10 border border-[#8C7355]/40 bg-[#FAF7F2] flex flex-col md:flex-row items-center justify-between gap-6">
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

      {/* SUB-BLOCO / SEÇÃO EXCLUSIVA: Jurisprudência & Notícias Reais */}
      <section id="jurisprudencia" className="py-24 bg-[#FAF7F2] border-b border-[#E6E1D6]">
        <div className="max-w-6xl mx-auto px-6">
          
          <div className="max-w-3xl mb-14">
            <span className="text-[11px] tracking-[0.2em] uppercase text-[#8C7355] block mb-3 font-medium">
              Atualização Jurisprudencial • Segurança Jurídica
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#18181B] font-normal leading-tight">
              Últimas Notícias e Entendimentos dos Tribunais Superiores
            </h2>
            <p className="mt-4 text-[#52525B] font-light leading-relaxed">
              O ordenamento jurídico brasileiro e a jurisprudência dominante nos tribunais (STJ e TJSP) garantem amparo rigoroso contra abusividades cometidas por convênios médicos. Acompanhe os precedentes mais recentes aplicados em nossas teses:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-14">
            
            {/* Notícia 1: Terapias ABA no STJ (Tema 1.295) */}
            <article className="bg-white border border-[#E6E1D6] p-8 flex flex-col justify-between shadow-xs hover:border-[#8C7355] transition-all">
              <div>
                <div className="flex items-center justify-between text-[11px] text-[#71717A] mb-4 pb-3 border-b border-[#F0ECE1]">
                  <span className="font-semibold text-[#8C7355] uppercase tracking-wider">STJ • Tema Repetitivo 1.295</span>
                  <span className="bg-[#FAF7F2] px-2 py-0.5 border border-[#E6E1D6] text-[10px]">Tese Vinculante</span>
                </div>
                <h3 className="font-serif text-xl text-[#18181B] font-normal leading-snug mb-3">
                  STJ veda em recurso repetitivo a limitação de sessões multidisciplinares (ABA) para pessoas com TEA
                </h3>
                <p className="text-xs text-[#52525B] font-light leading-relaxed mb-6">
                  Em julgamento vinculante da Segunda Seção sob o rito dos recursos repetitivos (Tema 1.295 – REsp 2.153.672 e REsp 2.167.050), o Superior Tribunal de Justiça fixou a tese de que é manifestamente abusiva a imposição de tetos quantitativos ou limites anuais para sessões de psicologia (Método ABA), fonoaudiologia, terapia ocupacional e fisioterapia prescritas a pacientes com TEA, obrigando todas as operadoras do país à cobertura integral e ininterrupta.
                </p>
              </div>
              <div className="pt-4 border-t border-[#F0ECE1] flex items-center justify-between">
                <span className="text-[10px] text-[#71717A] uppercase tracking-wider">Fonte Oficial</span>
                <a
                  href="https://www.stj.jus.br"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#8C7355] font-medium hover:text-[#18181B] transition-colors"
                >
                  Consultar acórdão no STJ ↗
                </a>
              </div>
            </article>

            {/* Notícia 2: Medicamentos e Liminares no TJSP */}
            <article className="bg-white border border-[#E6E1D6] p-8 flex flex-col justify-between shadow-xs hover:border-[#8C7355] transition-all">
              <div>
                <div className="flex items-center justify-between text-[11px] text-[#71717A] mb-4 pb-3 border-b border-[#F0ECE1]">
                  <span className="font-semibold text-[#8C7355] uppercase tracking-wider">TJSP • Lei Federal 14.454/22</span>
                  <span className="bg-[#FAF7F2] px-2 py-0.5 border border-[#E6E1D6] text-[10px]">Tutela de Urgência</span>
                </div>
                <h3 className="font-serif text-xl text-[#18181B] font-normal leading-snug mb-3">
                  TJSP concede liminares em até 48h para fornecimento urgente de medicamentos oncológicos e de alto custo
                </h3>
                <p className="text-xs text-[#52525B] font-light leading-relaxed mb-6">
                  Com respaldo na Lei Federal nº 14.454/2022 — que superou a tese do rol taxativo da ANS — e nos precedentes pacíficos das Câmaras de Direito Privado de São Paulo, magistrados têm deferido liminares com fixação de multa diária (astreintes) obrigando convênios a disponibilizarem fármacos biológicos, imunoterápicos e orais de alta complexidade negados sob alegações burocráticas de falta de previsão em diretrizes internas.
                </p>
              </div>
              <div className="pt-4 border-t border-[#F0ECE1] flex items-center justify-between">
                <span className="text-[10px] text-[#71717A] uppercase tracking-wider">Fonte Oficial</span>
                <a
                  href="https://www.tjsp.jus.br"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#8C7355] font-medium hover:text-[#18181B] transition-colors"
                >
                  Consultar jurisprudência no TJSP ↗
                </a>
              </div>
            </article>

            {/* Notícia 3: Reembolso Integral por Falta de Rede Apta */}
            <article className="bg-white border border-[#E6E1D6] p-8 flex flex-col justify-between shadow-xs hover:border-[#8C7355] transition-all">
              <div>
                <div className="flex items-center justify-between text-[11px] text-[#71717A] mb-4 pb-3 border-b border-[#F0ECE1]">
                  <span className="font-semibold text-[#8C7355] uppercase tracking-wider">ANS & Jurisprudência</span>
                  <span className="bg-[#FAF7F2] px-2 py-0.5 border border-[#E6E1D6] text-[10px]">Reembolso 100%</span>
                </div>
                <h3 className="font-serif text-xl text-[#18181B] font-normal leading-snug mb-3">
                  Justiça consolida dever de reembolso 100% integral quando operadora não dispõe de rede apta em método específico
                </h3>
                <p className="text-xs text-[#52525B] font-light leading-relaxed mb-6">
                  Em conformidade com a Resolução Normativa nº 566/2022 da ANS e farta jurisprudência noticiada pelo Consultor Jurídico (ConJur), a ausência de clínica credenciada devidamente certificada na metodologia recomendada (como ABA ou Integração Sensorial de Ayres) ou a existência de filas desproporcionais obriga a operadora ao reembolso total das faturas particulares emitidas pela equipe escolhida pela família.
                </p>
              </div>
              <div className="pt-4 border-t border-[#F0ECE1] flex items-center justify-between">
                <span className="text-[10px] text-[#71717A] uppercase tracking-wider">Conferência Externa</span>
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.gov.br/ans"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-[#8C7355] font-medium hover:text-[#18181B] transition-colors"
                  >
                    Portal ANS ↗
                  </a>
                  <span className="text-[#D6CFC2]">•</span>
                  <a
                    href="https://www.conjur.com.br"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-[#8C7355] font-medium hover:text-[#18181B] transition-colors"
                  >
                    ConJur ↗
                  </a>
                </div>
              </div>
            </article>

          </div>

          {/* Barra de Conversão na Seção de Notícias */}
          <div className="border border-[#E6E1D6] bg-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
              <h4 className="font-serif text-xl text-[#18181B] font-normal">
                Dúvidas sobre os seus direitos ou laudo médico em mãos?
              </h4>
              <p className="text-xs text-[#52525B] font-light">
                Consulte nossa equipe especializada pelo WhatsApp e esclareça a viabilidade do seu caso.
              </p>
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 bg-[#18181B] text-white text-xs tracking-[0.1em] uppercase hover:bg-[#8C7355] transition-colors whitespace-nowrap"
            >
              Falar no WhatsApp: (14) 99711-8732
            </a>
          </div>

        </div>
      </section>

      {/* Demais Áreas de Atuação (Sem Criminal, Limpo e Fino) */}
      <section id="atuacao" className="py-24 border-b border-[#E6E1D6]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mb-16">
            <span className="text-[11px] tracking-[0.2em] uppercase text-[#8C7355] block mb-3 font-medium">
              Prática Jurídica Integrada
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#18181B] font-normal">
              Outras Áreas de Especialidade
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Família e Sucessões */}
            <div className="bg-white border border-[#E6E1D6] p-8 flex flex-col justify-between">
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
                <ul className="space-y-2.5 text-sm text-[#52525B] font-light border-t border-[#F0ECE1] pt-5">
                  <li>• Inventários em cartório (inclusive com menores — Res. 571/2024 CNJ) e judiciais</li>
                  <li>• Planejamento sucessório, testamentos e doações em vida</li>
                  <li>• Divórcios consensuais ou litigiosos e partilha de bens</li>
                  <li>• Pensão alimentícia, guarda e regulamentação de convivência</li>
                </ul>
              </div>
            </div>

            {/* Direito Tributário */}
            <div className="bg-white border border-[#E6E1D6] p-8 flex flex-col justify-between">
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
                <ul className="space-y-2.5 text-sm text-[#52525B] font-light border-t border-[#F0ECE1] pt-5">
                  <li>• Isenção de IPVA para PCD e pessoas com TEA (condutores e não condutores)</li>
                  <li>• Assessoria em laudos do IMESC e restituição de valores pagos</li>
                  <li>• Recuperação administrativa de créditos (PIS/COFINS monofásico e ICMS-ST para Simples Nacional)</li>
                  <li>• Anulação de cobranças fiscais indevidas</li>
                </ul>
              </div>
            </div>

            {/* Direito Cível e Contratos */}
            <div className="bg-white border border-[#E6E1D6] p-8 flex flex-col justify-between">
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
                <ul className="space-y-2.5 text-sm text-[#52525B] font-light border-t border-[#F0ECE1] pt-5">
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

      {/* O Escritório */}
      <section id="escritorio" className="py-24 bg-white border-b border-[#E6E1D6]">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-5">
            <span className="text-[11px] tracking-[0.2em] uppercase text-[#8C7355] block mb-3 font-medium">
              Institucional
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#18181B] font-normal leading-tight">
              Atendimento artesanal, rigor técnico e transparência.
            </h2>
          </div>
          <div className="md:col-span-7 space-y-5 text-[#52525B] font-light leading-relaxed">
            <p>
              A <strong>Beatriz Rocha Sociedade Individual de Advocacia</strong> (OAB/SP 463.673) foi estruturada sob a premissa de que demandas sensíveis — especialmente aquelas que envolvem a saúde da família e o patrimônio construído ao longo da vida — exigem atenção direta, estudo minucioso e comunicação clara.
            </p>
            <p>
              Localizado no Edifício Torre Nova York, na Avenida das Esmeraldas em Marília/SP, o escritório combina o acolhimento presencial com atuação digital integrada em todas as comarcas do país, assegurando agilidade no protocolo de medidas urgentes e acompanhamento próximo em cada etapa processual.
            </p>
          </div>
        </div>
      </section>

      {/* Contato e Triagem */}
      <section id="contato" className="py-24">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-12 gap-12">
          
          {/* Dados de Contato */}
          <div className="md:col-span-5 space-y-8">
            <div>
              <span className="text-[11px] tracking-[0.2em] uppercase text-[#8C7355] block mb-3 font-medium">
                Agendamento e Triagem
              </span>
              <h2 className="font-serif text-3xl text-[#18181B] font-normal">
                Canais de Atendimento
              </h2>
              <p className="mt-3 text-sm text-[#52525B] font-light leading-relaxed">
                Atendimento presencial em Marília/SP mediante agendamento prévio ou consultas por videoconferência para todo o território nacional.
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
                <p className="text-[#18181B] mt-1">beatrizrochaf@adv.oabsp.org.br</p>
              </div>
              <div>
                <span className="text-[10px] tracking-[0.16em] uppercase text-[#71717A] block">Expediente</span>
                <p className="text-[#18181B] mt-1">Segunda a Sexta-feira, das 08h30 às 18h00</p>
              </div>
            </div>
          </div>

          {/* Formulário Limpo (Sem Defesa Criminal) */}
          <div className="md:col-span-7 bg-white border border-[#E6E1D6] p-8 md:p-10">
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
                  <option value="Família e Sucessões">Família e Sucessões (Inventário, Partilha, Divórcio)</option>
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
                className="w-full py-3.5 bg-[#18181B] text-white text-xs tracking-[0.12em] uppercase hover:bg-[#8C7355] transition-colors"
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
          <p>© {new Date().getFullYear()} Beatriz Rocha Sociedade Individual de Advocacia • OAB/SP 463.673.</p>
          <p>Conteúdo informativo nos termos do Provimento nº 205/2021 da OAB.</p>
        </div>
      </footer>

    </div>
  );
}
