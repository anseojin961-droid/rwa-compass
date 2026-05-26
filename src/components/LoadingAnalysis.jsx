import { useEffect, useState } from 'react';
import { BrandMark } from './Icon.jsx';
import { T } from '../i18n/index.js';

const STAGES = [
  { nm: "Market data fetch · DeFiLlama feed", code: "MKT.FETCH" },
  { nm: "Risk profile vectorization",         code: "PROF.VEC"  },
  { nm: "AI scoring engine · 7 assets",       code: "AI.SCORE"  },
  { nm: "Recommendation calibration",         code: "REC.CAL"   },
  { nm: "Report synthesis",                   code: "RPT.GEN"   },
];

const blips = [
  { x: 130, y: 60,  r: 4   },
  { x: 70,  y: 80,  r: 3   },
  { x: 140, y: 120, r: 3   },
  { x: 60,  y: 140, r: 3.5 },
  { x: 110, y: 50,  r: 3   },
  { x: 95,  y: 145, r: 3   },
  { x: 155, y: 95,  r: 3   },
];

const LOG_ENTRIES = [
  { threshold: 5,  time: "00:00.091", level: "INFO",  msg: "Connecting to DeFiLlama market feed…" },
  { threshold: 15, time: "00:00.312", level: "INFO",  msg: "Market snapshot received · 7 assets" },
  { threshold: 25, time: "00:00.548", level: "OK",    msg: "APY data validated · latency 128ms" },
  { threshold: 35, time: "00:01.021", level: "INFO",  msg: "Vectorizing investor risk profile…" },
  { threshold: 45, time: "00:01.389", level: "INFO",  msg: "Embedding dimensions: 768 · OK" },
  { threshold: 55, time: "00:02.105", level: "INFO",  msg: "AI scoring engine initialised" },
  { threshold: 62, time: "00:02.441", level: "WARN",  msg: "Regulatory flag detected · GENIUS Act" },
  { threshold: 70, time: "00:03.017", level: "OK",    msg: "Score matrix complete · 7 × 10" },
  { threshold: 78, time: "00:03.502", level: "INFO",  msg: "Calibrating recommendation weights…" },
  { threshold: 86, time: "00:04.188", level: "OK",    msg: "Top picks selected · confidence 97.3%" },
  { threshold: 93, time: "00:04.774", level: "INFO",  msg: "Synthesising portfolio insight report…" },
  { threshold: 98, time: "00:05.201", level: "OK",    msg: "Report ready · streaming to client" },
];

function Chrome({ crumb }) {
  return (
    <div className="chrome">
      <BrandMark size={14} />
      <span className="crumb">{crumb}</span>
    </div>
  );
}

export default function LoadingAnalysis({ lang = 'ko' }) {
  const t = T[lang] || T.ko;

  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        const next = Math.min(100, prev + 2);
        setLogs(current => {
          const toAdd = LOG_ENTRIES.filter(
            e => e.threshold <= next && !current.find(l => l.time === e.time)
          );
          return toAdd.length ? [...current, ...toAdd] : current;
        });
        if (next >= 100) clearInterval(timer);
        return next;
      });
    }, 90);
    return () => clearInterval(timer);
  }, []);

  const stageIndex = Math.min(
    STAGES.length - 1,
    Math.floor((progress / 100) * STAGES.length)
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Chrome crumb="Engine / Analysis" />

      <div className="analyzing">
        {/* ── Left panel ── */}
        <div className="analyzing-left">
          <div className="al-eyebrow">{t.loadingTitle}</div>
          <div className="al-title">{t.loadingSubtitle}</div>
          <div className="al-sub">{t.loadingAnalyzing}</div>

          <div className="al-radar">
            <svg viewBox="0 0 200 200" className="al-radar-svg">
              <defs>
                <radialGradient id="sweepGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%"   stopColor="rgba(46,141,255,0.4)" />
                  <stop offset="100%" stopColor="rgba(46,141,255,0)"   />
                </radialGradient>
              </defs>
              <circle className="ring" cx="100" cy="100" r="92" />
              <circle className="ring" cx="100" cy="100" r="68" />
              <circle className="ring" cx="100" cy="100" r="44" />
              <circle className="ring" cx="100" cy="100" r="20" />
              <line x1="100" y1="8"   x2="100" y2="192" stroke="var(--line-2)" strokeWidth="1" />
              <line x1="8"   y1="100" x2="192" y2="100" stroke="var(--line-2)" strokeWidth="1" />
              <g className="sweep">
                <path d="M100 100 L100 8 A92 92 0 0 1 160 30 Z" fill="url(#sweepGrad)" />
              </g>
              {blips.map((p, i) => (
                <circle key={i} className="pt" cx={p.x} cy={p.y} r={p.r} />
              ))}
              <circle cx="100" cy="100" r="3" fill="var(--ac-bright)" />
            </svg>
          </div>

          <div className="al-steps">
            {STAGES.map((s, i) => {
              const done   = i < stageIndex;
              const active = i === stageIndex;
              return (
                <div key={s.code} className={`al-step${done ? ' done' : active ? ' active' : ''}`}>
                  <span className="al-step-dot"></span>
                  <span className="al-step-nm">{s.nm}</span>
                  <span className="al-step-code mono">{s.code}</span>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: 18 }}>
            <div style={{ height: 4, background: 'var(--bg-3)', borderRadius: 2, overflow: 'hidden' }}>
              <div
                style={{
                  height: '100%',
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, var(--ac), var(--ac-bright))',
                  borderRadius: 2,
                  transition: 'width 0.1s linear',
                }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 11, color: 'var(--tx-3)', fontFamily: 'var(--f-mono)', letterSpacing: '0.06em' }}>
              <span>{t.loadingAnalyzing}</span>
              <span>{progress}%</span>
            </div>
          </div>
        </div>

        {/* ── Right panel ── */}
        <div className="analyzing-right">
          <div className="al-log" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="al-log-head">
              <span className="ttl">Engine · Output Stream</span>
              <span className="mono" style={{ fontSize: 10, color: 'var(--tx-3)', letterSpacing: '0.08em' }}>tail -f compass.log</span>
            </div>
            <div>
              {logs.map((l, i) => (
                <div className="al-log-line" key={i}>
                  <span className="t">{l.time}</span>
                  <span className={`lvl ${l.level.toLowerCase()}`}>{l.level}</span>
                  <span className="msg">{l.msg}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="panel" style={{ flexShrink: 0 }}>
            <div className="panel-head">
              <div className="panel-title"><span className="accent-bar"></span>Diagnostics</div>
            </div>
            <div className="panel-body" style={{ paddingTop: 6 }}>
              <div className="exec-row"><span className="l">Latency</span><span className="v">128ms</span></div>
              <div className="exec-row"><span className="l">Data sources</span><span className="v">4</span></div>
              <div className="exec-row"><span className="l">Tokens used</span><span className="v">{Math.round(progress * 18)}</span></div>
              <div className="exec-row">
                <span className="l">Confidence</span>
                <span className="v" style={{ color: 'var(--ac-bright)' }}>
                  {Math.min(99, 85 + progress / 8).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
