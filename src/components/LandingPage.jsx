import { useState } from 'react';
import { Icon, BrandMark, Spark } from './Icon.jsx';
import { T, LANGS } from '../i18n/index.js';

// ── Static market data ────────────────────────────────────────────────────────

const TICKER_ITEMS = [
  { sym: 'BUIDL',  val: '$1.00',   chg: '▲ 0.00%',  cls: 'pos' },
  { sym: 'USDe',   val: '$1.00',   chg: '▲ 0.02%',  cls: 'pos' },
  { sym: 'USDY',   val: '$1.06',   chg: '▲ 0.11%',  cls: 'pos' },
  { sym: 'OUSG',   val: '$106.84', chg: '▲ 0.08%',  cls: 'pos' },
  { sym: 'stUSDT', val: '$1.00',   chg: '▲ 0.01%',  cls: 'pos' },
  { sym: 'TBY',    val: '$100.23', chg: '▼ 0.03%',  cls: 'neg' },
  { sym: 'ONDO',   val: '$1.27',   chg: '▲ 2.14%',  cls: 'pos' },
];

const KPIS = [
  { lbl: 'RWA TVL',     val: '$12.84', unit: 'B', chg: '▲ 1.74% · 24h',  cls: 'pos' },
  { lbl: 'Active Protocols', val: '127',    unit: '',  chg: '▲ 3 · 7d',       cls: 'pos' },
  { lbl: 'Avg APY',     val: '8.34',  unit: '%', chg: '▼ 0.22% · 7d',   cls: 'neg' },
  { lbl: 'Tokenized T-Bills', val: '$4.21', unit: 'B', chg: '▲ 5.30% · 30d', cls: 'pos' },
];

const ASSETS = [
  { sym: 'BUIDL', nm: 'BlackRock USD',   apy: '5.12%', spk: [5.0, 5.05, 5.08, 5.10, 5.09, 5.12, 5.12] },
  { sym: 'USDe',  nm: 'Ethena Synth',    apy: '9.50%', spk: [8.2, 9.1, 9.8, 10.2, 9.6, 9.3, 9.5] },
  { sym: 'USDY',  nm: 'Ondo US Yield',   apy: '5.30%', spk: [5.1, 5.2, 5.25, 5.30, 5.28, 5.31, 5.30] },
  { sym: 'OUSG',  nm: 'Ondo Short-Term', apy: '5.07%', spk: [4.9, 4.95, 5.0, 5.05, 5.07, 5.06, 5.07] },
  { sym: 'stUSDT',nm: 'Tron Yield',      apy: '4.80%', spk: [4.5, 4.6, 4.7, 4.75, 4.80, 4.78, 4.80] },
  { sym: 'TBY',   nm: 'Bloom T-Bill',    apy: '5.15%', spk: [5.0, 5.1, 5.12, 5.14, 5.15, 5.13, 5.15] },
  { sym: 'ONDO',  nm: 'Ondo Finance',    apy: '6.80%', spk: [6.0, 6.3, 6.5, 6.7, 6.75, 6.8, 6.8] },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function Chrome({ lang, setLang }) {
  return (
    <div className="chrome">
      <div className="chrome-left">
        <div className="brand">
          <div className="brand-mark"><BrandMark size={14} /></div>
          <div className="brand-name">RWA <span className="accent">COMPASS</span></div>
        </div>
      </div>
      <div className="chrome-right">
        <span className="live-dot">Live · DeFiLlama</span>
        <div className="lang-switch">
          {LANGS.map(l => (
            <button
              key={l.code}
              className={lang === l.code ? 'on' : ''}
              onClick={() => setLang(l.code)}
            >
              {l.flag} {l.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function TickerBar() {
  return (
    <div className="ticker-bar">
      <div className="ticker-track">
        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((t, i) => (
          <span className="tick" key={i}>
            <span className="sym">{t.sym}</span>
            <span className="val">{t.val}</span>
            <span className={`chg ${t.cls}`}>{t.chg}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Feature definitions (icon-mapped) ────────────────────────────────────────

const FEATURES = [
  { glyph: 'cpu',      tag: '01 · Engine',  titleKey: 0, descKey: 0 },
  { glyph: 'satellite',tag: '02 · Data',    titleKey: 1, descKey: 1 },
  { glyph: 'shield',   tag: '03 · Risk',    titleKey: 2, descKey: 2 },
];

// ── Main component ────────────────────────────────────────────────────────────

export default function LandingPage({ onStart }) {
  const [lang, setLang] = useState('ko');
  const t = T[lang];

  return (
    <>
      <Chrome lang={lang} setLang={setLang} />
      <TickerBar />
      <div className="landing">
        {/* ── Left: main content ─────────────────────────────────────────── */}
        <div className="landing-main">
          <span className="landing-eyebrow">
            <span className="dot"></span>
            AI-Powered RWA Navigator · v2.4
          </span>

          <h1>
            {t.heroTitle1}
            <br />
            <span className="ac-line">{t.heroTitle2}</span>
          </h1>

          <p className="landing-sub">{t.heroDesc}</p>

          <div className="feature-row">
            {FEATURES.map((f, i) => (
              <div className="feature" key={i}>
                <div className="feature-head">
                  <div className="feature-glyph">
                    <Icon name={f.glyph} size={18} />
                  </div>
                  <span className="feature-tag">{f.tag}</span>
                </div>
                <h3>{t.features[i].title}</h3>
                <p>{t.features[i].desc}</p>
              </div>
            ))}
          </div>

          <div className="cta-row">
            <button className="btn-primary btn-lg" onClick={() => onStart(lang)}>
              {t.cta} <Icon name="arrow-right" size={16} />
            </button>
            <div className="cta-meta">
              {t.ctaPips.map((p, i) => <span className="pip" key={i}>{p}</span>)}
            </div>
          </div>
        </div>

        {/* ── Right: data panel ──────────────────────────────────────────── */}
        <div className="landing-side">
          {/* Market Overview */}
          <div className="side-section">
            <div className="side-head">
              <span className="side-title">Market Overview</span>
              <span className="side-meta">DeFiLlama · Live</span>
            </div>
            <div className="kpi-grid">
              {KPIS.map((k, i) => (
                <div className="kpi" key={i}>
                  <div className="kpi-lbl">{k.lbl}</div>
                  <div className="kpi-val">
                    {k.val}
                    <span className="dim">{k.unit}</span>
                  </div>
                  <div className={`kpi-chg ${k.cls}`}>{k.chg}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Assets */}
          <div className="side-section">
            <div className="side-head">
              <span className="side-title">Top Assets · APY</span>
              <span className="side-meta">7 tracked</span>
            </div>
            {ASSETS.map(a => (
              <div className="asset-row" key={a.sym}>
                <span className="sym">{a.sym}</span>
                <span className="nm">{a.nm}</span>
                <Spark values={a.spk} width={48} height={16} />
                <span className="ap">{a.apy}</span>
              </div>
            ))}
          </div>

          {/* Engine Status */}
          <div className="side-section">
            <div className="side-head">
              <span className="side-title">{t.engineStatus.title}</span>
              <span className="side-meta mono">Claude</span>
            </div>
            <div className="exec-row"><span className="l">{t.engineStatus.engine}</span><span className="v">Claude Sonnet</span></div>
            <div className="exec-row"><span className="l">{t.engineStatus.dataSource}</span><span className="v">DeFiLlama</span></div>
            <div className="exec-row"><span className="l">{t.engineStatus.assets}</span><span className="v">7 RWAs</span></div>
            <div className="exec-row"><span className="l">{t.engineStatus.serverSend}</span><span className="v" style={{ color: 'var(--pos)' }}>{t.engineStatus.none}</span></div>
          </div>
        </div>
      </div>
    </>
  );
}
