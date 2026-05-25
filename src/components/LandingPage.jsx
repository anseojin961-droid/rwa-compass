import { useState } from 'react';
import { T, LANGS } from '../i18n/index.js';

export default function LandingPage({ onStart }) {
  const [lang, setLang] = useState('ko');
  const t = T[lang];

  return (
    <div className="min-h-screen flex flex-col"
      style={{ background: 'linear-gradient(135deg, #050d1a 0%, #070f1e 50%, #050d1a 100%)' }}>

      {/* Ambient blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-60 -left-60 w-[500px] h-[500px] rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #3b82f6, transparent)' }} />
        <div className="absolute -bottom-60 -right-60 w-[600px] h-[600px] rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #10b981, transparent)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-3"
          style={{ background: 'radial-gradient(circle, #1e40af, transparent)' }} />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-slate-800/50">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🧭</span>
          <span className="font-bold text-white text-lg gradient-text">RWA Compass</span>
        </div>

        {/* Language switcher */}
        <div className="flex items-center gap-1 bg-slate-900/60 border border-slate-700/50 rounded-xl p-1">
          {LANGS.map(l => (
            <button key={l.code} onClick={() => setLang(l.code)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                lang === l.code
                  ? 'bg-gradient-to-r from-blue-600/80 to-emerald-600/80 text-white'
                  : 'text-slate-400 hover:text-slate-300'
              }`}>
              <span>{l.flag}</span>
              <span>{l.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-16 text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          {t.badge}
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-3 leading-tight max-w-3xl">
          {t.heroTitle1}
        </h1>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight max-w-3xl gradient-text">
          {t.heroTitle2}
        </h1>

        {/* Description */}
        <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto mb-12 leading-relaxed whitespace-pre-line">
          {t.heroDesc}
        </p>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl w-full mb-14">
          {t.features.map((f, i) => (
            <div key={i} className="card-glass rounded-2xl p-5 text-left hover:border-blue-500/30 transition-all duration-300">
              <div className="text-2xl mb-3">{f.icon}</div>
              <h3 className="text-white font-semibold text-sm mb-1.5">{f.title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-8 mb-12">
          {[
            { val: t.statsAssets,    sub: t.statsAssetsSub },
            { val: t.statsQuestions, sub: t.statsQuestionsSub },
            { val: t.statsAI,        sub: t.statsAISub },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-white font-bold text-lg gradient-text">{s.val}</div>
              <div className="text-slate-500 text-xs mt-0.5">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button onClick={() => onStart(lang)}
          className="group px-10 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-bold text-lg hover:from-blue-500 hover:to-emerald-500 transition-all duration-300"
          style={{ boxShadow: '0 0 40px rgba(59,130,246,0.4)' }}>
          {t.cta}
          <span className="inline-block ml-1 group-hover:translate-x-1 transition-transform duration-200">→</span>
        </button>
        <p className="text-slate-600 text-xs mt-3">{t.ctaSub}</p>

        {/* Footer */}
        <p className="text-slate-700 text-xs mt-16">{t.powered}</p>
      </main>
    </div>
  );
}
