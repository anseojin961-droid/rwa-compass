import { useState } from 'react';
import { QUESTIONS_I18N } from '../i18n/questions.js';
import { T } from '../i18n/index.js';

const EMPTY = {
  experience:'', investmentAmount:'', goal:'', riskTolerance:'',
  preferredChain:'', horizon:'', liquidityNeed:'', riskPriority:'',
};

export default function OnboardingForm({ onComplete, lang = 'ko' }) {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState(EMPTY);

  const t = T[lang] || T.ko;
  const QUESTIONS = QUESTIONS_I18N[lang] || QUESTIONS_I18N.ko;
  const q = QUESTIONS[step];
  const isLast = step === QUESTIONS.length - 1;
  const allDone = Object.values(profile).every(Boolean);

  function pick(value) {
    const next = { ...profile, [q.id]: value };
    setProfile(next);
    if (!isLast) setTimeout(() => setStep(s => s + 1), 300);
  }

  function getChipLabel(key, value) {
    const q = QUESTIONS.find(q => q.id === key);
    return q?.options.find(o => o.value === value)?.label || value;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
      style={{ background: 'linear-gradient(135deg, #050d1a 0%, #070f1e 50%, #050d1a 100%)' }}>

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
          🧭 <span className="gradient-text">RWA Compass</span>
        </h1>
        <p className="text-slate-400 text-base max-w-md mx-auto">{t.onboardingSubtitle}</p>
      </div>

      {/* Progress */}
      <div className="w-full max-w-xl mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-slate-500">{t.questionOf(step + 1, QUESTIONS.length)}</span>
          <span className="text-xs text-slate-500">{t.percentDone(Math.round(((step + 1) / QUESTIONS.length) * 100))}</span>
        </div>
        <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transition-all duration-500"
            style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }} />
        </div>
        <div className="flex justify-between mt-2">
          {QUESTIONS.map((_, i) => (
            <button key={i} onClick={() => i < step && setStep(i)}
              className={`w-7 h-7 rounded-full text-xs font-bold transition-all duration-300 ${
                i < step     ? 'bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 cursor-pointer hover:bg-emerald-500/30'
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
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                    selected ? 'border-blue-500/60 bg-blue-500/10' : 'border-slate-700/50 hover:border-slate-600 hover:bg-slate-800/50'
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
              allDone ? 'bg-gradient-to-r from-blue-600 to-emerald-600 text-white hover:from-blue-500 hover:to-emerald-500'
                      : 'bg-slate-800 text-slate-600 cursor-not-allowed'
            }`}
            style={allDone ? { boxShadow: '0 0 30px rgba(59,130,246,0.4)' } : {}}>
            {t.startAnalysis}
          </button>
        </div>
      )}

      {/* Back */}
      {step > 0 && (
        <button onClick={() => setStep(s => s - 1)}
          className="mt-4 text-slate-500 hover:text-slate-400 text-sm transition-colors">
          {t.back}
        </button>
      )}

      {/* Profile chips */}
      {Object.values(profile).filter(Boolean).length > 0 && (
        <div className="flex flex-wrap gap-2 mt-5 justify-center max-w-xl">
          {Object.entries(profile).filter(([,v]) => v).map(([k,v]) => (
            <span key={k} className="px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/50 text-slate-400 text-xs">
              {getChipLabel(k, v)}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
