import { useState } from 'react';

const QUESTIONS = [
  {
    id: 'experience',
    label: '투자 경험',
    subtitle: '크립토 / RWA 토큰에 투자해본 적이 있나요?',
    icon: '📚',
    options: [
      { value: 'None',        label: '처음이에요',               desc: '디지털 자산 투자가 완전히 처음입니다',         icon: '🌱' },
      { value: 'Crypto/DeFi', label: '크립토 / DeFi 경험 있음',  desc: 'BTC, ETH, DeFi 프로토콜 등을 사용해봤어요',    icon: '⚡' },
      { value: 'RWA/TradFi',  label: 'RWA / 전통 금융 경험 있음', desc: '토큰화 자산, 채권, 펀드 투자 경험이 있어요',   icon: '🏦' },
    ],
  },
  {
    id: 'investmentAmount',
    label: '투자 예정 금액',
    subtitle: '이번에 투자하려는 금액대는 어느 정도인가요?',
    icon: '💰',
    options: [
      { value: 'Under $1K',  label: '$1,000 미만',        desc: '소액으로 먼저 경험해보고 싶어요',       icon: '🪙' },
      { value: '$1K–$50K',   label: '$1,000 ~ $50,000',   desc: '중소형 포지션을 구성하려 합니다',       icon: '💵' },
      { value: '$50K–$500K', label: '$50,000 ~ $500,000', desc: '주요 자산으로 배분할 예정입니다',       icon: '💎' },
      { value: '$500K+',     label: '$500,000 이상',       desc: '기관 수준의 투자 규모입니다',           icon: '🏛️' },
    ],
  },
  {
    id: 'goal',
    label: '투자 목표',
    subtitle: '이번 투자에서 가장 중요하게 생각하는 것은?',
    icon: '🎯',
    options: [
      { value: 'Stable yield', label: '안정적인 수익', desc: '원금 보존 + 꾸준한 이자 수익',             icon: '🛡️' },
      { value: 'Balanced',     label: '균형 잡힌 성장', desc: '적정 리스크 감수하며 수익 극대화',         icon: '⚖️' },
      { value: 'High yield',   label: '고수익 추구',    desc: '높은 리스크를 감수하고 최대 수익 추구',    icon: '🚀' },
    ],
  },
  {
    id: 'riskTolerance',
    label: '리스크 허용도',
    subtitle: '보유 자산이 일시적으로 20% 하락하면 어떻게 하시겠어요?',
    icon: '⚠️',
    options: [
      { value: 'Low',    label: '보수적', desc: '즉시 매도하거나 처음부터 피할 것 같아요', icon: '🟢' },
      { value: 'Medium', label: '중립적', desc: '조금 기다리며 회복을 지켜볼 것 같아요',   icon: '🟡' },
      { value: 'High',   label: '공격적', desc: '오히려 저점 매수 기회로 생각할 것 같아요', icon: '🔴' },
    ],
  },
  {
    id: 'preferredChain',
    label: '선호 블록체인',
    subtitle: '어떤 네트워크에서 운용하고 싶으신가요?',
    icon: '⛓️',
    options: [
      { value: 'Ethereum', label: 'Ethereum', desc: '가장 검증된 네트워크, 가스비 다소 높음', icon: '🔷' },
      { value: 'Solana',   label: 'Solana',   desc: '빠른 속도, 낮은 트랜잭션 비용',         icon: '🟣' },
      { value: 'Any',      label: '상관없음',  desc: '최적의 옵션이면 어느 체인이든 괜찮아요', icon: '🌐' },
    ],
  },
  {
    id: 'horizon',
    label: '투자 기간',
    subtitle: '얼마나 오래 보유할 계획인가요?',
    icon: '📅',
    options: [
      { value: 'Short term',  label: '단기 (3개월 미만)', desc: '빠른 회수가 중요해요',               icon: '⚡' },
      { value: 'Medium term', label: '중기 (3개월~1년)',  desc: '어느 정도 락업은 감수할 수 있어요',  icon: '📊' },
      { value: 'Long term',   label: '장기 (1년 이상)',   desc: '장기 보유로 복리 효과를 노릴게요',   icon: '🌱' },
    ],
  },
  {
    id: 'liquidityNeed',
    label: '유동성 필요',
    subtitle: '투자금을 얼마나 빠르게 회수할 수 있어야 하나요?',
    icon: '💧',
    options: [
      { value: 'Anytime',           label: '언제든 회수 가능',   desc: '락업 없이 즉시 출금 가능한 옵션을 선호해요',       icon: '⚡' },
      { value: 'Within 7 days',     label: '7일 이내면 괜찮아요', desc: '짧은 대기 기간은 수용할 수 있어요',               icon: '📆' },
      { value: 'Lockup acceptable', label: '락업도 괜찮아요',     desc: '조건이 적합하다면 유동성 제약을 감수할 수 있어요', icon: '🔒' },
    ],
  },
  {
    id: 'riskPriority',
    label: '가장 우려하는 위험',
    subtitle: '자산을 비교할 때 어떤 위험을 가장 먼저 확인하고 싶나요?',
    icon: '🔎',
    options: [
      { value: 'Regulatory risk',     label: '규제 및 접근 제한',    desc: '자격 제한, 관할권, 제도 변화가 가장 걱정돼요',  icon: '📋' },
      { value: 'Smart contract risk', label: '스마트 컨트랙트 위험', desc: '해킹, 취약점, 프로토콜 사고가 가장 걱정돼요',  icon: '🔐' },
      { value: 'Liquidity risk',      label: '유동성 및 환매 위험',  desc: '필요할 때 회수하지 못할 가능성이 걱정돼요',    icon: '💧' },
      { value: 'Counterparty risk',   label: '발행사 및 상대방 위험', desc: '담보 보관자나 발행 주체의 신뢰성이 중요해요', icon: '🏢' },
    ],
  },
];

const EMPTY = {
  experience:'', investmentAmount:'', goal:'', riskTolerance:'',
  preferredChain:'', horizon:'', liquidityNeed:'', riskPriority:'',
};

export default function OnboardingForm({ onComplete }) {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState(EMPTY);

  const q = QUESTIONS[step];
  const isLast = step === QUESTIONS.length - 1;
  const allDone = Object.values(profile).every(Boolean);

  function pick(value) {
    const next = { ...profile, [q.id]: value };
    setProfile(next);
    if (!isLast) setTimeout(() => setStep(s => s + 1), 300);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
      style={{ background: 'linear-gradient(135deg, #050d1a 0%, #070f1e 50%, #050d1a 100%)' }}>

      {/* Ambient blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #3b82f6, transparent)' }} />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #10b981, transparent)' }} />
      </div>

      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          AI-Powered Risk Analysis
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
          🧭{' '}
          <span className="gradient-text">RWA Compass</span>
        </h1>
        <p className="text-slate-400 text-base max-w-md mx-auto">
          AI가 당신의 투자 성향을 분석해 최적의 RWA 자산을 추천해드립니다
        </p>
      </div>

      {/* Progress */}
      <div className="w-full max-w-xl mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-slate-500">{step + 1} / {QUESTIONS.length} 질문</span>
          <span className="text-xs text-slate-500">{Math.round(((step + 1) / QUESTIONS.length) * 100)}% 완료</span>
        </div>
        <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transition-all duration-500"
            style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }} />
        </div>
        <div className="flex justify-between mt-2">
          {QUESTIONS.map((_, i) => (
            <button key={i} onClick={() => i < step && setStep(i)}
              className={`w-7 h-7 rounded-full text-xs font-bold transition-all duration-300 ${
                i < step  ? 'bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 cursor-pointer hover:bg-emerald-500/30'
                : i === step ? 'bg-blue-500/20 border border-blue-500/60 text-blue-400'
                :              'bg-slate-800 border border-slate-700 text-slate-600 cursor-default'
              }`}>
              {i < step ? '✓' : i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Question card */}
      <div className="w-full max-w-xl mb-5">
        <div key={step} className="animate-slide-up rounded-2xl border border-slate-700/50 p-6 card-glass">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-xl flex-shrink-0">
              {q.icon}
            </div>
            <div>
              <h2 className="text-white font-semibold text-lg leading-tight">{q.label}</h2>
              <p className="text-slate-400 text-sm mt-0.5">{q.subtitle}</p>
            </div>
          </div>

          <div className="grid gap-2.5">
            {q.options.map(opt => {
              const selected = profile[q.id] === opt.value;
              return (
                <button key={opt.value} onClick={() => pick(opt.value)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 group ${
                    selected
                      ? 'border-blue-500/60 bg-blue-500/10'
                      : 'border-slate-700/50 hover:border-slate-600 hover:bg-slate-800/50'
                  }`}
                  style={selected ? { boxShadow: '0 0 20px rgba(59,130,246,0.2)' } : {}}>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl flex-shrink-0">{opt.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className={`font-semibold text-sm ${selected ? 'text-blue-300' : 'text-white'}`}>{opt.label}</p>
                      <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">{opt.desc}</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 transition-all ${
                      selected ? 'bg-blue-500 border-blue-500' : 'border-slate-600'
                    }`}>
                      {selected && <span className="text-white text-xs">✓</span>}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Submit */}
      {isLast && (
        <div className="w-full max-w-xl animate-slide-up">
          <button onClick={() => allDone && onComplete(profile)} disabled={!allDone}
            className={`w-full py-4 rounded-xl font-bold text-base transition-all duration-300 ${
              allDone
                ? 'bg-gradient-to-r from-blue-600 to-emerald-600 text-white hover:from-blue-500 hover:to-emerald-500'
                : 'bg-slate-800 text-slate-600 cursor-not-allowed'
            }`}
            style={allDone ? { boxShadow: '0 0 30px rgba(59,130,246,0.4)' } : {}}>
            ⚡ AI 분석 시작하기 →
          </button>
        </div>
      )}

      {/* Back */}
      {step > 0 && (
        <button onClick={() => setStep(s => s - 1)}
          className="mt-4 text-slate-500 hover:text-slate-400 text-sm transition-colors">
          ← 이전으로
        </button>
      )}

      {/* Profile chips */}
      {Object.values(profile).filter(Boolean).length > 0 && (
        <div className="flex flex-wrap gap-2 mt-5 justify-center max-w-xl">
          {Object.entries(profile).filter(([,v]) => v).map(([k,v]) => (
            <span key={k} className="px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/50 text-slate-400 text-xs">{v}</span>
          ))}
        </div>
      )}
    </div>
  );
}
