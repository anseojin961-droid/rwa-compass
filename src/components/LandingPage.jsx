import { useState } from 'react';
import { Icon, BrandMark, Spark } from './Icon.jsx';
import { T, LANGS } from '../i18n/index.js';

// ── Static fallback data (used until DeFiLlama responds) ──────────────────────

const STATIC_ASSETS = [
  { id: 'blackrock-buidl', sym: 'BUIDL', nm: 'BlackRock USD',   fallbackApy: 4.50 },
  { id: 'ethena-usde',     sym: 'USDe',  nm: 'Ethena sUSDe',    fallbackApy: 9.50 },
  { id: 'ondo-usdy',       sym: 'USDY',  nm: 'Ondo US Yield',   fallbackApy: 5.30 },
  { id: 'ondo-ousg',       sym: 'OUSG',  nm: 'Ondo Short-Term', fallbackApy: 4.20 },
  { id: 'sky-usds',        sym: 'sUSDS', nm: 'Sky Savings',     fallbackApy: 3.60 },
  { id: 'aave-usdc',       sym: 'aUSDC', nm: 'Aave USDC',       fallbackApy: 3.20 },
  { id: 'morpho-usdc-cbbtc', sym: 'mUSDC', nm: 'Morpho Base',   fallbackApy: 6.00 },
];

const STATIC_TICKER = [
  { sym: 'BUIDL',  id: 'blackrock-buidl' },
  { sym: 'USDe',   id: 'ethena-usde' },
  { sym: 'USDY',   id: 'ondo-usdy' },
  { sym: 'OUSG',   id: 'ondo-ousg' },
  { sym: 'sUSDS',  id: 'sky-usds' },
  { sym: 'aUSDC',  id: 'aave-usdc' },
  { sym: 'mUSDC',  id: 'morpho-usdc-cbbtc' },
];

function fmtB(n) {
  if (!n || n <= 0) return '—';
  if (n >= 1e9) return (n / 1e9).toFixed(2);
  if (n >= 1e6) return (n / 1e6).toFixed(0) + 'M';
  return '—';
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function buildSparkFromApy(apy) {
  // Simulate a 7-day sparkline around the current APY with small variance
  const base = apy;
  return [0.97, 0.98, 0.99, 1.0, 0.99, 1.005, 1.0].map(m =>
    Math.round(base * m * 100) / 100
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function Chrome({ lang, setLang, isLive }) {
  return (
    <div className="chrome">
      <div className="chrome-left">
        <div className="brand">
          <div className="brand-mark"><BrandMark size={14} /></div>
          <div className="brand-name">RWA <span className="accent">COMPASS</span></div>
        </div>
      </div>
      <div className="chrome-right">
        <span className="live-dot">{isLive ? 'Live · DeFiLlama' : 'Est. · DeFiLlama'}</span>
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

function TickerBar({ items }) {
  return (
    <div className="ticker-bar">
      <div className="ticker-track">
        {[...items, ...items].map((t, i) => (
          <span className="tick" key={i}>
            <span className="sym">{t.sym}</span>
            <span className="val">{t.apy != null ? `${t.apy}%` : '—%'}</span>
            <span className={`chg ${t.apy != null ? 'pos' : ''}`}>
              {t.apy != null ? 'APY' : '···'}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Feature definitions ───────────────────────────────────────────────────────

const FEATURES = [
  { glyph: 'cpu',       tag: '01 · Engine' },
  { glyph: 'satellite', tag: '02 · Data' },
  { glyph: 'shield',    tag: '03 · Risk' },
];

// ── Main component ────────────────────────────────────────────────────────────

export default function LandingPage({ onStart, marketData = {}, rwaStats = {} }) {
  const [lang, setLang] = useState('ko');
  const t = T[lang] || T.ko;

  const isLive = Object.keys(marketData).length > 0;
  const statsLive = rwaStats.totalTvl > 0;

  // Merge live APY into STATIC_ASSETS
  const assets = STATIC_ASSETS.map(a => {
    const live = marketData[a.id];
    const apy = live?.apy ?? a.fallbackApy;
    return { ...a, apy, spk: buildSparkFromApy(apy) };
  });

  // Ticker items from live data
  const tickerItems = STATIC_TICKER.map(t => ({
    sym: t.sym,
    apy: marketData[t.id]?.apy ?? null,
  }));

  // KPIs — all live where possible
  const liveApys = assets.map(a => a.apy);
  const avgApy = (liveApys.reduce((s, v) => s + v, 0) / liveApys.length).toFixed(2);

  const kpis = [
    {
      lbl: 'RWA TVL',
      val: statsLive ? `$${fmtB(rwaStats.totalTvl)}` : '$—',
      unit: statsLive ? 'B' : '',
      chg: statsLive ? 'DeFiLlama · Live' : 'loading...',
      cls: statsLive ? 'pos' : '',
    },
    {
      lbl: 'Active Protocols',
      val: statsLive ? String(rwaStats.activeProtocols) : '—',
      unit: '',
      chg: statsLive ? 'DeFiLlama · Live' : 'loading...',
      cls: statsLive ? 'pos' : '',
    },
    {
      lbl: 'Avg APY',
      val: avgApy,
      unit: '%',
      chg: isLive ? 'DeFiLlama · Live' : 'Est.',
      cls: 'pos',
    },
    {
      lbl: 'Tokenized T-Bills',
      val: isLive && marketData._tBillTvl > 0 ? `$${fmtB(marketData._tBillTvl)}` : '$—',
      unit: isLive && marketData._tBillTvl > 0 ? 'B' : '',
      chg: isLive ? 'DeFiLlama · Live' : 'loading...',
      cls: isLive && marketData._tBillTvl > 0 ? 'pos' : '',
    },
  ];

  return (
    <>
      <Chrome lang={lang} setLang={setLang} isLive={isLive} />
      <TickerBar items={tickerItems} />
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
              <span className="side-meta">{isLive ? 'DeFiLlama · Live' : 'DeFiLlama · Est.'}</span>
            </div>
            <div className="kpi-grid">
              {kpis.map((k, i) => (
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

          {/* Top Assets — live APY */}
          <div className="side-section">
            <div className="side-head">
              <span className="side-title">Top Assets · APY</span>
              <span className="side-meta">{isLive ? '🟢 Live' : '7 tracked'}</span>
            </div>
            {assets.map(a => (
              <div className="asset-row" key={a.sym}>
                <span className="sym">{a.sym}</span>
                <span className="nm">{a.nm}</span>
                <Spark values={a.spk} width={48} height={16} />
                <span className="ap">{a.apy.toFixed(2)}%</span>
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
