import React, { useState, useEffect } from 'react';

// ============================================================================
// CENTRAL DE FERRAMENTAS JURÍDICAS - BEATRIZ ROCHA ADVOCACIA (OAB/SP 463.673)
// Design de Sistemas Jurídicos (LegalTech) • Experiência Despoluída em 1 Clique
// Processamento 100% privado no navegador, sem cadastro e sem burocracia.
// ============================================================================

export default function CentralFerramentas() {
  // Modal ativo: null | 'simulador-bpc' | 'coparticipacao' | 'emergencia-pix' | 'triagem-documentos'
  const [activeModal, setActiveModal] = useState(null);
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Estados dos simuladores (pré-preenchidos com parâmetros realistas)
  // 1. BPC/LOAS
  const [bpcMembers, setBpcMembers] = useState(3);
  const [bpcGrossIncome, setBpcGrossIncome] = useState(1412);
  const [bpcMedicalExpenses, setBpcMedicalExpenses] = useState(350);

  // 2. Coparticipação
  const [copayMonthly, setCopayMonthly] = useState(850);
  const [copaySessions, setCopaySessions] = useState(16);
  const [copaySessionValue, setCopaySessionValue] = useState(95);

  // 3. Emergência Pix
  const [pixTimeframe, setPixTimeframe] = useState('menos_2h');
  const [pixType, setPixType] = useState('golpe');

  // Trava o scroll da página e escuta a tecla ESC enquanto o modal estiver aberto
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveModal(null);
      }
    };

    if (activeModal) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeModal]);

  const copyToClipboard = (text) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 2500);
    }
  };

  // Cálculos BPC
  const netIncome = Math.max(0, bpcGrossIncome - bpcMedicalExpenses);
  const rawPerCapita = bpcMembers > 0 ? bpcGrossIncome / bpcMembers : 0;
  const netPerCapita = bpcMembers > 0 ? netIncome / bpcMembers : 0;
  const deductionPerCapita = bpcMembers > 0 ? bpcMedicalExpenses / bpcMembers : 0;

  // Cálculos Coparticipação
  const totalCopay = copaySessions * copaySessionValue;
  const copayPercentage = copayMonthly > 0 ? (totalCopay / copayMonthly) * 100 : 0;

  return (
    <section id="ferramentas" className="relative reveal-on-scroll border-t border-b border-[#D2B48C]/60" style={{ paddingTop: '110px', paddingBottom: '110px', background: 'linear-gradient(180deg, #F5F1EB 0%, #EDE6DC 50%, #F5F1EB 100%)' }}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* CABEÇALHO DA SEÇÃO COM AUTORIDADE */}
        <div className="max-w-3xl mb-12 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-[#D2B48C]/70 rounded-[3px] shadow-2xs mb-4">
            <span className="text-[#8C7355] text-xs leading-none">⚡</span>
            <span className="text-[10px] sm:text-[10.5px] font-bold tracking-[0.2em] text-[#8C7355] uppercase">
              TECNOLOGIA E AGILIDADE NA PRESTAÇÃO JURÍDICA
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] text-[#18181B] font-normal leading-tight tracking-tight">
            Central de Ferramentas e Triagem Digital
          </h2>
          <p className="mt-3.5 text-sm sm:text-base text-[#52525B] font-light leading-relaxed max-w-2xl">
            Recursos automatizados para análise de viabilidade, conferência documental e suporte ágil aos nossos clientes.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-[11px] text-[#71717A]">
            <span className="inline-flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Processamento 100% privado no seu dispositivo
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8C7355]"></span>
              Sem cadastro prévio • Provimento CFOAB nº 205/2021
            </span>
          </div>
        </div>

        {/* GRID DE 4 FERRAMENTAS ESSENCIAIS EM DESTAQUE (ESTILO SAAS PREMIUM) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* CARD 1: SIMULADOR BPC/LOAS */}
          <div 
            onClick={() => setActiveModal('simulador-bpc')}
            className="legaltech-card bg-white border border-[rgba(210,180,140,0.55)] rounded-[10px] p-7 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-300 group cursor-pointer relative overflow-hidden"
          >
            <div>
              <div className="w-12 h-12 rounded-[8px] bg-[#FAF7F2] border border-[#D2B48C]/40 flex items-center justify-center text-xl mb-5 text-[#8C7355] group-hover:bg-[#8C7355] group-hover:text-white group-hover:border-[#8C7355] transition-all duration-300 shadow-2xs">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-[10px] uppercase tracking-[0.16em] text-[#8C7355] font-semibold block mb-1">
                Previdenciário & Assistencial
              </span>
              <h3 className="font-serif text-xl sm:text-[22px] text-[#18181B] font-normal leading-snug mb-2 group-hover:text-[#8C7355] transition-colors">
                Simulador BPC/LOAS
              </h3>
              <p className="text-xs text-[#52525B] font-light leading-relaxed mb-6">
                Calcule a renda per capita da sua família com abatimento de remédios e consulte os critérios do benefício do INSS.
              </p>
            </div>

            <button
              type="button"
              className="w-full py-3 px-4 rounded-[6px] bg-[#FAF7F2] group-hover:bg-[#8C7355] text-[#8C7355] group-hover:text-white border border-[#D2B48C]/60 group-hover:border-[#8C7355] text-[11.5px] font-semibold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-1.5 shadow-2xs group-hover:shadow-xs active:scale-[0.98]"
            >
              <span>Iniciar Simulação de Renda</span>
              <span>→</span>
            </button>
          </div>

          {/* CARD 2: CALCULADORA DE COPARTICIPAÇÃO */}
          <div 
            onClick={() => setActiveModal('coparticipacao')}
            className="legaltech-card bg-white border border-[rgba(210,180,140,0.55)] rounded-[10px] p-7 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-300 group cursor-pointer relative overflow-hidden"
          >
            <div>
              <div className="w-12 h-12 rounded-[8px] bg-[#FAF7F2] border border-[#D2B48C]/40 flex items-center justify-center text-xl mb-5 text-[#8C7355] group-hover:bg-[#8C7355] group-hover:text-white group-hover:border-[#8C7355] transition-all duration-300 shadow-2xs">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="text-[10px] uppercase tracking-[0.16em] text-[#8C7355] font-semibold block mb-1">
                Saúde & Terapias TEA
              </span>
              <h3 className="font-serif text-xl sm:text-[22px] text-[#18181B] font-normal leading-snug mb-2 group-hover:text-[#8C7355] transition-colors">
                Calculadora de Coparticipação
              </h3>
              <p className="text-xs text-[#52525B] font-light leading-relaxed mb-6">
                Descubra se os valores cobrados em terapias e consultas superam o teto legal permitido pela ANS e pelo STJ.
              </p>
            </div>

            <button
              type="button"
              className="w-full py-3 px-4 rounded-[6px] bg-[#FAF7F2] group-hover:bg-[#8C7355] text-[#8C7355] group-hover:text-white border border-[#D2B48C]/60 group-hover:border-[#8C7355] text-[11.5px] font-semibold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-1.5 shadow-2xs group-hover:shadow-xs active:scale-[0.98]"
            >
              <span>Calcular Teto Legal</span>
              <span>→</span>
            </button>
          </div>

          {/* CARD 3: EMERGÊNCIA PIX & GOLPES */}
          <div 
            onClick={() => setActiveModal('emergencia-pix')}
            className="legaltech-card bg-white border border-[rgba(210,180,140,0.55)] hover:border-rose-700 rounded-[10px] p-7 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-300 group cursor-pointer relative overflow-hidden"
          >
            <div>
              <div className="w-12 h-12 rounded-[8px] bg-rose-50 border border-rose-200/80 flex items-center justify-center text-xl mb-5 text-rose-800 group-hover:bg-rose-800 group-hover:text-white group-hover:border-rose-800 transition-all duration-300 shadow-2xs">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-[10px] uppercase tracking-[0.16em] text-rose-800 font-semibold block mb-1">
                Segurança & Direito Bancário
              </span>
              <h3 className="font-serif text-xl sm:text-[22px] text-[#18181B] font-normal leading-snug mb-2 group-hover:text-rose-800 transition-colors">
                Emergência Pix & Golpes
              </h3>
              <p className="text-xs text-[#52525B] font-light leading-relaxed mb-6">
                Roteiro prático em 3 passos para acionar o bloqueio cautelar imediato (MED) e responsabilizar a instituição.
              </p>
            </div>

            <button
              type="button"
              className="w-full py-3 px-4 rounded-[6px] bg-rose-50/80 group-hover:bg-rose-800 text-rose-900 group-hover:text-white border border-rose-200/80 group-hover:border-rose-800 text-[11.5px] font-semibold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-1.5 shadow-2xs group-hover:shadow-xs active:scale-[0.98]"
            >
              <span>Acessar Roteiro MED</span>
              <span>→</span>
            </button>
          </div>

          {/* CARD 4: ENVIO SEGURO PARA TRIAGEM */}
          <div 
            onClick={() => setActiveModal('triagem-documentos')}
            className="legaltech-card bg-white border border-[rgba(210,180,140,0.55)] rounded-[10px] p-7 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-300 group cursor-pointer relative overflow-hidden"
          >
            <div>
              <div className="w-12 h-12 rounded-[8px] bg-[#FAF7F2] border border-[#D2B48C]/40 flex items-center justify-center text-xl mb-5 text-[#8C7355] group-hover:bg-[#8C7355] group-hover:text-white group-hover:border-[#8C7355] transition-all duration-300 shadow-2xs">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <span className="text-[10px] uppercase tracking-[0.16em] text-[#8C7355] font-semibold block mb-1">
                Atendimento & Triagem
              </span>
              <h3 className="font-serif text-xl sm:text-[22px] text-[#18181B] font-normal leading-snug mb-2 group-hover:text-[#8C7355] transition-colors">
                Envio Seguro de Documentos
              </h3>
              <p className="text-xs text-[#52525B] font-light leading-relaxed mb-6">
                Envie laudos médicos, negativas do plano ou notificações bancárias para triagem técnica preliminar sob sigilo.
              </p>
            </div>

            <button
              type="button"
              className="w-full py-3 px-4 rounded-[6px] bg-[#FAF7F2] group-hover:bg-[#8C7355] text-[#8C7355] group-hover:text-white border border-[#D2B48C]/60 group-hover:border-[#8C7355] text-[11.5px] font-semibold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-1.5 shadow-2xs group-hover:shadow-xs active:scale-[0.98]"
            >
              <span>Acesso Imediato à Triagem</span>
              <span>→</span>
            </button>
          </div>

        </div>

        {/* FEEDBACK DE CÓPIA FLUTUANTE */}
        {copiedNotification && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#18181B] text-white text-xs px-4 py-3 rounded-[4px] shadow-lg flex items-center gap-2 animate-fadeIn border border-[#D2B48C]">
            <span className="text-emerald-400 font-bold">✓</span>
            <span>Relatório estruturado copiado com sucesso!</span>
          </div>
        )}

        {/* ==================================================================== */}
        {/* MODAIS INTERATIVOS DE FLUXO DIRETO (1 CLIQUE)                        */}
        {/* ==================================================================== */}

        {/* MODAL 1: SIMULADOR BPC/LOAS */}
        {activeModal === 'simulador-bpc' && (
          <div 
            role="dialog"
            aria-modal="true"
            onClick={() => setActiveModal(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn"
          >
            <div 
              className="bg-white border border-[#D2B48C]/60 rounded-[8px] shadow-2xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative animate-scaleUp"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="absolute top-5 right-5 text-gray-400 hover:text-gray-800 text-lg p-1 transition-colors cursor-pointer"
                aria-label="Fechar"
              >
                ✕
              </button>

              <div className="mb-6">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#8C7355] font-semibold block mb-1">
                  Simulação Instantânea
                </span>
                <h3 className="font-serif text-2xl text-[#18181B]">
                  Simulador de Renda BPC/LOAS
                </h3>
                <p className="text-xs text-[#52525B] font-light mt-1">
                  Ajuste os valores abaixo para calcular a renda per capita líquida com as deduções autorizadas pelo STF e pela lei.
                </p>
              </div>

              {/* Grid de Inputs */}
              <div className="grid sm:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-[11px] font-medium text-[#52525B] uppercase tracking-wider mb-1.5">
                    Pessoas na Família
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="15"
                    value={bpcMembers}
                    onChange={(e) => setBpcMembers(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full px-3 py-2 text-sm bg-[#FAF7F2] border border-[#D2B48C]/50 rounded-[4px] focus:bg-white focus:border-[#8C7355] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[#52525B] uppercase tracking-wider mb-1.5">
                    Renda Familiar (R$)
                  </label>
                  <input
                    type="number"
                    step="50"
                    min="0"
                    value={bpcGrossIncome}
                    onChange={(e) => setBpcGrossIncome(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full px-3 py-2 text-sm bg-[#FAF7F2] border border-[#D2B48C]/50 rounded-[4px] focus:bg-white focus:border-[#8C7355] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[#52525B] uppercase tracking-wider mb-1.5">
                    Gastos com Saúde (R$)
                  </label>
                  <input
                    type="number"
                    step="50"
                    min="0"
                    value={bpcMedicalExpenses}
                    onChange={(e) => setBpcMedicalExpenses(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full px-3 py-2 text-sm bg-[#FAF7F2] border border-[#D2B48C]/50 rounded-[4px] focus:bg-white focus:border-[#8C7355] focus:outline-none"
                  />
                </div>
              </div>

              {/* Resultado do Cálculo */}
              <div className="p-4 sm:p-5 bg-[#FAF7F2] border border-[#D2B48C]/40 rounded-[6px] mb-6">
                <div className="grid grid-cols-3 gap-3 text-center pb-4 border-b border-[#E6E1D6]">
                  <div>
                    <span className="text-[10px] uppercase text-[#71717A] block">Renda Bruta / Pessoa</span>
                    <strong className="text-sm font-semibold text-[#18181B]">
                      R$ {rawPerCapita.toFixed(2).replace('.', ',')}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-[#71717A] block">Dedução Saúde</span>
                    <strong className="text-sm font-semibold text-rose-700">
                      - R$ {deductionPerCapita.toFixed(2).replace('.', ',')}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-[#71717A] block">Renda Líquida / Pessoa</span>
                    <strong className="text-sm font-semibold text-emerald-800">
                      R$ {netPerCapita.toFixed(2).replace('.', ',')}
                    </strong>
                  </div>
                </div>

                <div className="pt-3 text-xs leading-relaxed text-[#52525B]">
                  {netPerCapita <= 353.00 ? (
                    <p className="text-emerald-900 font-medium">
                      ✓ A renda líquida de R$ {netPerCapita.toFixed(2).replace('.', ',')} está <strong>dentro do limite objetivo estrito de 1/4 do salário mínimo (R$ 353,00)</strong>. Atende formalmente aos critérios administrativos diretos de concessão do INSS.
                    </p>
                  ) : netPerCapita <= 706.00 ? (
                    <p className="text-amber-900 font-medium">
                      ⚖️ A renda líquida de R$ {netPerCapita.toFixed(2).replace('.', ',')} está entre 1/4 e 1/2 salário mínimo (R$ 706,00). O INSS costuma negar administrativamente, mas a <strong>jurisprudência consolidada do STF (RE 567.985)</strong> autoriza a concessão mediante comprovação das despesas contínuas de saúde.
                    </p>
                  ) : (
                    <p className="text-[#52525B]">
                      ℹ️ A renda líquida apurada de R$ {netPerCapita.toFixed(2).replace('.', ',')} supera 1/2 salário mínimo. A concessão exige demonstração probatória aprofundada de vulnerabilidade socioeconômica.
                    </p>
                  )}
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="flex flex-col sm:flex-row items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => copyToClipboard(`[SIMULAÇÃO BPC/LOAS]\nEscritório: Beatriz Rocha Advocacia (OAB/SP 463.673)\n\n• Pessoas na família: ${bpcMembers}\n• Renda Bruta: R$ ${bpcGrossIncome.toFixed(2)}\n• Despesas Médicas: R$ ${bpcMedicalExpenses.toFixed(2)}\n• Renda Líquida per Capita: R$ ${netPerCapita.toFixed(2)}\n• Enquadramento: ${netPerCapita <= 353 ? 'Dentro de 1/4 SM (Objetivo)' : netPerCapita <= 706 ? 'Entre 1/4 e 1/2 SM (Critério Jurisprudencial STF)' : 'Acima de 1/2 SM'}`)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-[4px] bg-white border border-[#D2B48C]/60 hover:border-[#8C7355] text-xs font-semibold text-[#18181B] transition-colors cursor-pointer"
                >
                  Copiar Resumo da Simulação
                </button>
                <a
                  href="#contato"
                  onClick={() => setActiveModal(null)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-[4px] bg-[#8C7355] hover:bg-[#725C42] text-xs font-semibold text-white transition-colors text-center cursor-pointer shadow-2xs"
                >
                  Tirar Dúvidas com o Escritório
                </a>
              </div>
            </div>
          </div>
        )}

        {/* MODAL 2: CALCULADORA DE COPARTICIPAÇÃO */}
        {activeModal === 'coparticipacao' && (
          <div 
            role="dialog"
            aria-modal="true"
            onClick={() => setActiveModal(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn"
          >
            <div 
              className="bg-white border border-[#D2B48C]/60 rounded-[8px] shadow-2xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative animate-scaleUp"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="absolute top-5 right-5 text-gray-400 hover:text-gray-800 text-lg p-1 transition-colors cursor-pointer"
                aria-label="Fechar"
              >
                ✕
              </button>

              <div className="mb-6">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#8C7355] font-semibold block mb-1">
                  Saúde Suplementar
                </span>
                <h3 className="font-serif text-2xl text-[#18181B]">
                  Calculadora de Abusividade de Coparticipação
                </h3>
                <p className="text-xs text-[#52525B] font-light mt-1">
                  Confronte o valor mensal cobrado pela operadora com os tetos normativos da ANS e a tese de cobertura integral no autismo (Tema 1.295 do STJ).
                </p>
              </div>

              {/* Grid de Inputs */}
              <div className="grid sm:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-[11px] font-medium text-[#52525B] uppercase tracking-wider mb-1.5">
                    Mensalidade do Plano (R$)
                  </label>
                  <input
                    type="number"
                    step="50"
                    min="100"
                    value={copayMonthly}
                    onChange={(e) => setCopayMonthly(Math.max(1, parseFloat(e.target.value) || 1))}
                    className="w-full px-3 py-2 text-sm bg-[#FAF7F2] border border-[#D2B48C]/50 rounded-[4px] focus:bg-white focus:border-[#8C7355] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[#52525B] uppercase tracking-wider mb-1.5">
                    Sessões no Mês
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={copaySessions}
                    onChange={(e) => setCopaySessions(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full px-3 py-2 text-sm bg-[#FAF7F2] border border-[#D2B48C]/50 rounded-[4px] focus:bg-white focus:border-[#8C7355] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[#52525B] uppercase tracking-wider mb-1.5">
                    Valor por Sessão (R$)
                  </label>
                  <input
                    type="number"
                    step="10"
                    min="1"
                    value={copaySessionValue}
                    onChange={(e) => setCopaySessionValue(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full px-3 py-2 text-sm bg-[#FAF7F2] border border-[#D2B48C]/50 rounded-[4px] focus:bg-white focus:border-[#8C7355] focus:outline-none"
                  />
                </div>
              </div>

              {/* Resultado do Cálculo */}
              <div className="p-4 sm:p-5 bg-[#FAF7F2] border border-[#D2B48C]/40 rounded-[6px] mb-6">
                <div className="grid grid-cols-2 gap-3 text-center pb-4 border-b border-[#E6E1D6]">
                  <div>
                    <span className="text-[10px] uppercase text-[#71717A] block">Total de Coparticipação</span>
                    <strong className="text-base font-semibold text-rose-800">
                      R$ {totalCopay.toFixed(2).replace('.', ',')}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-[#71717A] block">Impacto na Mensalidade</span>
                    <strong className="text-base font-semibold text-[#18181B]">
                      {copayPercentage.toFixed(1)}% do plano
                    </strong>
                  </div>
                </div>

                <div className="pt-3 text-xs leading-relaxed text-[#52525B]">
                  {copayPercentage > 50 ? (
                    <p className="text-rose-900 font-medium">
                      ⚠️ <strong>Cobrança com Fortes Indícios de Abusividade:</strong> A coparticipação equivale a {copayPercentage.toFixed(1)}% da mensalidade, violando o teto orientativo da ANS (máximo de 30% a 50%) e inviabilizando o tratamento. Para pacientes com TEA, o STJ (Tema 1.295) veda restrições financeiras que comprometam as horas prescritas.
                    </p>
                  ) : (
                    <p className="text-emerald-900 font-medium">
                      ✓ A coparticipação calculada ({copayPercentage.toFixed(1)}%) encontra-se dentro dos limites percentuais gerais. Contudo, em casos de TEA ou tratamentos graves e contínuos, limites de sessões e cobranças cumulativas não podem impedir a continuidade terapêutica prescrita.
                    </p>
                  )}
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="flex flex-col sm:flex-row items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => copyToClipboard(`[ANÁLISE DE COPARTICIPAÇÃO]\nEscritório: Beatriz Rocha Advocacia (OAB/SP 463.673)\n\n• Mensalidade: R$ ${copayMonthly.toFixed(2)}\n• Sessões: ${copaySessions}x de R$ ${copaySessionValue.toFixed(2)}\n• Total Coparticipação: R$ ${totalCopay.toFixed(2)} (${copayPercentage.toFixed(1)}% da mensalidade)\n• Parecer: ${copayPercentage > 50 ? 'Custo desproporcional / Indício de Abusividade (Tema 1.295 STJ)' : 'Dentro dos limites gerais da ANS'}`)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-[4px] bg-white border border-[#D2B48C]/60 hover:border-[#8C7355] text-xs font-semibold text-[#18181B] transition-colors cursor-pointer"
                >
                  Copiar Análise de Abusividade
                </button>
                <a
                  href="#contato"
                  onClick={() => setActiveModal(null)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-[4px] bg-[#8C7355] hover:bg-[#725C42] text-xs font-semibold text-white transition-colors text-center cursor-pointer shadow-2xs"
                >
                  Solicitar Análise de Urgência
                </a>
              </div>
            </div>
          </div>
        )}

        {/* MODAL 3: EMERGÊNCIA PIX & GOLPES */}
        {activeModal === 'emergencia-pix' && (
          <div 
            role="dialog"
            aria-modal="true"
            onClick={() => setActiveModal(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn"
          >
            <div 
              className="bg-white border border-rose-300 rounded-[8px] shadow-2xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative animate-scaleUp"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="absolute top-5 right-5 text-gray-400 hover:text-gray-800 text-lg p-1 transition-colors cursor-pointer"
                aria-label="Fechar"
              >
                ✕
              </button>

              <div className="mb-6">
                <span className="text-[10px] uppercase tracking-[0.2em] text-rose-800 font-semibold block mb-1">
                  Ação Urgente • Banco Central
                </span>
                <h3 className="font-serif text-2xl text-[#18181B]">
                  Roteiro de Emergência Pix (MED)
                </h3>
                <p className="text-xs text-[#52525B] font-light mt-1">
                  Procedimento imediato para acionar o Mecanismo Especial de Devolução (Resolução BCB nº 103/2021) e resguardar a responsabilização bancária.
                </p>
              </div>

              {/* Seletor Rápido */}
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-[11px] font-medium text-[#52525B] uppercase tracking-wider mb-1.5">
                    Tempo Decorrido do Pix
                  </label>
                  <select
                    value={pixTimeframe}
                    onChange={(e) => setPixTimeframe(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-[#FAF7F2] border border-[#D2B48C]/50 rounded-[4px] focus:bg-white focus:border-[#8C7355] focus:outline-none"
                  >
                    <option value="menos_2h">Menos de 2 horas (Altíssima prioridade)</option>
                    <option value="2h_24h">Entre 2 e 24 horas</option>
                    <option value="mais_24h">Mais de 24 horas</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[#52525B] uppercase tracking-wider mb-1.5">
                    Tipo de Ocorrência
                  </label>
                  <select
                    value={pixType}
                    onChange={(e) => setPixType(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-[#FAF7F2] border border-[#D2B48C]/50 rounded-[4px] focus:bg-white focus:border-[#8C7355] focus:outline-none"
                  >
                    <option value="golpe">Golpe / Engenharia Social / WhatsApp</option>
                    <option value="invasao">Invasão de Conta / Celular Furtado</option>
                    <option value="boleto">Boleto Falso ou Chave Fraudulenta</option>
                  </select>
                </div>
              </div>

              {/* 3 Passos Imediatos */}
              <div className="space-y-3 mb-6">
                <div className="p-3.5 bg-rose-50/60 border-l-3 border-rose-800 rounded-r-[4px]">
                  <strong className="text-xs font-semibold text-rose-950 block mb-0.5">
                    1. Acione o MED no Aplicativo do seu Banco (Agora)
                  </strong>
                  <p className="text-xs text-rose-900 font-light leading-relaxed">
                    Abra o extrato do banco, clique no comprovante do Pix enviado, selecione <em>"Contestar transação"</em> ou <em>"Reportar fraude"</em> e exija a abertura da notificação de infração eletrônica imediata ao banco que recebeu o dinheiro.
                  </p>
                </div>

                <div className="p-3.5 bg-[#FAF7F2] border-l-3 border-[#8C7355] rounded-r-[4px]">
                  <strong className="text-xs font-semibold text-[#18181B] block mb-0.5">
                    2. Registre Boletim de Ocorrência Policial (B.O.)
                  </strong>
                  <p className="text-xs text-[#52525B] font-light leading-relaxed">
                    Registre boletim online com a chave Pix do destinatário e o <strong>código End-to-End Id</strong> (código de 32 caracteres presente no comprovante). O documento é indispensável para embasar o processo.
                  </p>
                </div>

                <div className="p-3.5 bg-[#FAF7F2] border-l-3 border-[#8C7355] rounded-r-[4px]">
                  <strong className="text-xs font-semibold text-[#18181B] block mb-0.5">
                    3. Responsabilidade Objetiva do Banco (Súmula 479 do STJ)
                  </strong>
                  <p className="text-xs text-[#52525B] font-light leading-relaxed">
                    Se o banco rejeitar a contestação ou alegar falta de saldo na conta fraudulenta, a jurisprudência fixa a responsabilidade civil objetiva da instituição por falha nos filtros de segurança de movimentações atípicas.
                  </p>
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="flex flex-col sm:flex-row items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => copyToClipboard(`[ROTEIRO DE EMERGÊNCIA PIX / MED]\nEscritório: Beatriz Rocha Advocacia (OAB/SP 463.673)\n\n1. ACIONAR MED NO APP:\n- Entrar no comprovante do Pix e clicar em 'Contestar/Reportar Fraude' (Resolução BCB nº 103/2021).\n\n2. BOLETIM DE OCORRÊNCIA:\n- Lavrar B.O. com o código End-to-End Id de 32 caracteres.\n\n3. BASE JURÍDICA:\n- Súmula 479 do STJ (Responsabilidade objetiva das instituições financeiras por fortuito interno).`)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-[4px] bg-white border border-[#D2B48C]/60 hover:border-[#8C7355] text-xs font-semibold text-[#18181B] transition-colors cursor-pointer"
                >
                  Copiar Roteiro Passo a Passo
                </button>
                <a
                  href="#contato"
                  onClick={() => setActiveModal(null)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-[4px] bg-rose-800 hover:bg-rose-900 text-xs font-semibold text-white transition-colors text-center cursor-pointer shadow-2xs"
                >
                  Falar com o Escritório
                </a>
              </div>
            </div>
          </div>
        )}

        {/* MODAL 4: ENVIO SEGURO DE DOCUMENTOS PARA TRIAGEM */}
        {activeModal === 'triagem-documentos' && (
          <div 
            role="dialog"
            aria-modal="true"
            onClick={() => setActiveModal(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn"
          >
            <div 
              className="bg-white border border-[#D2B48C]/60 rounded-[8px] shadow-2xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative animate-scaleUp"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="absolute top-5 right-5 text-gray-400 hover:text-gray-800 text-lg p-1 transition-colors cursor-pointer"
                aria-label="Fechar"
              >
                ✕
              </button>

              <div className="mb-6">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#8C7355] font-semibold block mb-1">
                  Sigilo Profissional • Lei 8.906/94
                </span>
                <h3 className="font-serif text-2xl text-[#18181B]">
                  Envio Seguro de Documentos para Triagem
                </h3>
                <p className="text-xs text-[#52525B] font-light mt-1">
                  Canal privativo para envio de relatórios e negativas. Cada caso é submetido à triagem técnica direta da banca sob sigilo absoluto.
                </p>
              </div>

              {/* Orientações Práticas */}
              <div className="space-y-4 mb-6">
                <div className="p-4 bg-[#FAF7F2] border border-[#D2B48C]/40 rounded-[6px]">
                  <h4 className="text-xs uppercase font-semibold text-[#8C7355] mb-2 tracking-wider">
                    Documentos Recomendados para Triagem Imediata:
                  </h4>
                  <ul className="text-xs text-[#52525B] space-y-1.5 font-light">
                    <li>• <strong>Demandas de Saúde / TEA:</strong> Relatório do médico assistente prescrevendo a terapia e o comprovante da negativa da operadora.</li>
                    <li>• <strong>BPC/LOAS:</strong> Extrato de indeferimento do INSS e comprovantes de despesas médicas contínuas.</li>
                    <li>• <strong>Inventário / Partilha:</strong> Certidão de óbito e relação sumária dos bens a partilhar.</li>
                    <li>• <strong>Fraudes / Pix:</strong> Comprovante com End-to-End Id e protocolo de contestação no banco.</li>
                  </ul>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <a
                    href="https://wa.me/5514997118732?text=Ol%C3%A1%2C%20gostaria%20de%20enviar%20documentos%20para%20triagem%20jur%C3%ADdica%20preliminar."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-[6px] bg-emerald-50/80 border border-emerald-300 hover:border-emerald-600 transition-all flex flex-col justify-between group cursor-pointer"
                  >
                    <div>
                      <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider block mb-1">
                        Canal Direto ⚡
                      </span>
                      <strong className="text-sm font-semibold text-[#18181B] block mb-1">
                        Enviar via WhatsApp
                      </strong>
                      <p className="text-xs text-[#52525B] font-light">
                        Inicie o contato com a equipe e anexe os arquivos em formato PDF ou foto legível.
                      </p>
                    </div>
                    <span className="mt-4 text-xs font-semibold text-emerald-800 group-hover:translate-x-1 transition-transform inline-block">
                      Abrir WhatsApp Seguro ↗
                    </span>
                  </a>

                  <a
                    href="#contato"
                    onClick={() => setActiveModal(null)}
                    className="p-4 rounded-[6px] bg-[#FAF7F2] border border-[#D2B48C]/50 hover:border-[#8C7355] transition-all flex flex-col justify-between group cursor-pointer"
                  >
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#8C7355] tracking-wider block mb-1">
                        Formulário do Site 📄
                      </span>
                      <strong className="text-sm font-semibold text-[#18181B] block mb-1">
                        Preencher Solicitação
                      </strong>
                      <p className="text-xs text-[#52525B] font-light">
                        Submeta um relato formal e detalhado diretamente através da seção de contato do site.
                      </p>
                    </div>
                    <span className="mt-4 text-xs font-semibold text-[#8C7355] group-hover:translate-x-1 transition-transform inline-block">
                      Ir para o Formulário ↓
                    </span>
                  </a>
                </div>
              </div>

              {/* Botão Fechar */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-5 py-2.5 rounded-[4px] bg-[#18181B] hover:bg-[#27272A] text-xs font-semibold text-white transition-colors cursor-pointer"
                >
                  Concluído
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
