import { useMemo, useState, useCallback } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts';
import AssetCard from './AssetCard.jsx';
import AIChat from './AIChat.jsx';
import { Icon, BrandMark } from './Icon.jsx';
import { DATASET_NOTICE, DATASET_REVIEWED_AT, RWA_ASSETS } from '../data/assets.js';
import { T } from '../i18n/index.js';
import { QUESTIONS_I18N } from '../i18n/questions.js';
import { AMOUNT_MAP } from '../utils/riskScoring.js';

const PROFILE_KEYS = [
  'experience', 'investmentAmount', 'goal', 'riskTolerance',
  'preferredChain', 'horizon', 'liquidityNeed', 'riskPriority',
];

function getValueLabel(key, value, lang) {
  const questions = QUESTIONS_I18N[lang] || QUESTIONS_I18N.ko;
  const q = questions.find(q => q.id === key);
  return q?.options.find(o => o.value === value)?.label || value;
}

function Chrome({ crumb, rightExtra }) {
  return (
    <div className="chrome">
      <BrandMark size={14} />
      <span className="crumb">{crumb}</span>
      {rightExtra && <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>{rightExtra}</div>}
    </div>
  );
}

function RadarPanel({ assets, t }) {
  if (!assets.length) return null;
  const axes = t.radarAxes;
  const data = axes.map(s => ({ s, v: 0 }));
  const n = Math.min(assets.length, 3);
  assets.slice(0, n).forEach(a => {
    data[0].v += (a.apy.max / 15) * 10;
    data[1].v += 10 - a.riskScore;
    data[2].v += a.lockupDays === 0 ? 10 : Math.max(0, 7 - Math.min(a.lockupDays, 7)) + 3;
    data[3].v += (10 - (a.risks?.regulatory ?? 5));
    data[4].v += a.minInvestment <= 1 ? 10 : a.minInvestment <= 5000 ? 7 : 3;
  });
  data.forEach(d => { d.v = Math.min(10, d.v / n); });

  return (
    <ResponsiveContainer width="100%" height={170}>
      <RadarChart data={data.map(d => ({ subject: d.s, value: d.v }))}>
        <PolarGrid stroke="var(--line-1)" />
        <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--tx-3)', fontSize: 10 }} />
        <Radar
          dataKey="value"
          stroke="var(--ac-bright)"
          fill="var(--ac-bright)"
          fillOpacity={0.10}
          strokeWidth={1.5}
        />
        <Tooltip
          contentStyle={{
            background: 'var(--bg-1)',
            border: '1px solid var(--line-1)',
            borderRadius: 6,
            fontSize: 12,
            color: 'var(--tx-1)',
          }}
          formatter={v => [v.toFixed(1) + '/10', t.radarTitle]}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}

export default function ResultsDashboard({ profile, aiResult, apiKey, marketData = {}, lang = 'ko', onReset }) {
  const t = T[lang] || T.ko;
  const [copied, setCopied] = useState(false);

  const analyses   = useMemo(() => aiResult?.analyses  || [], [aiResult]);
  const topPickIds = useMemo(() => aiResult?.topPicks  || [], [aiResult]);

  const userBudget = useMemo(() => AMOUNT_MAP[profile?.investmentAmount] ?? Infinity, [profile]);

  const enrichedAssets = useMemo(() => RWA_ASSETS.map(a => {
    const live = marketData[a.id];
    if (!live) return a;
    return { ...a, apy: { min: live.apy, max: live.apy }, isLive: true };
  }), [marketData]);

  const sorted = useMemo(() => {
    const withBudget = enrichedAssets.map(a => ({ ...a, _budgetExceeds: userBudget < a.minInvestment }));
    return [...withBudget].sort((a, b) => {
      if (a._budgetExceeds && !b._budgetExceeds) return 1;
      if (!a._budgetExceeds && b._budgetExceeds) return -1;
      const aTop = topPickIds.includes(a.id), bTop = topPickIds.includes(b.id);
      if (aTop && !bTop) return -1;
      if (!aTop && bTop) return 1;
      return (analyses.find(x => x.id === a.id)?.personalizedRiskScore ?? a.riskScore)
           - (analyses.find(x => x.id === b.id)?.personalizedRiskScore ?? b.riskScore);
    });
  }, [analyses, topPickIds, enrichedAssets, userBudget]);

  const topAssets = sorted.filter(a => topPickIds.includes(a.id));

  // Stat computations (for rep-stats block)
  const avgRisk = topAssets.length
    ? (topAssets.reduce((s, a) => s + (analyses.find(x => x.id === a.id)?.personalizedRiskScore ?? a.riskScore), 0) / topAssets.length).toFixed(1)
    : '—';
  const avgApy = topAssets.length
    ? ((topAssets.reduce((s, a) => s + (a.apy.min + a.apy.max) / 2, 0)) / topAssets.length).toFixed(1)
    : '—';
  const regulated = topAssets.filter(a => a.regulatory?.includes('SEC') || a.regulatory?.includes('Registered')).length;

  const handleShare = useCallback(async () => {
    const topNames = topAssets.map(a => a.name).join(', ') || '—';
    const url = 'https://rwa-compass.vercel.app/';
    const text = t.shareText(topNames, url);
    if (navigator.share) {
      try { await navigator.share({ title: 'RWA Compass', text }); return; } catch {}
    }
    await navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [topAssets, t]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Chrome
        crumb="Analysis Report · RC-24.05"
        rightExtra={
          <>
            <button className="btn-ghost" onClick={handleShare}>
              <Icon name="share" size={13} /> {copied ? t.shareCopied : t.shareBtn}
            </button>
            <button className="btn-ghost" onClick={onReset}>
              <Icon name="refresh" size={13} /> {t.reset}
            </button>
          </>
        }
      />

      <div className="rep">
        {/* ── Left: Profile panel ── */}
        <div className="rep-left">
          <div className="side-title" style={{ marginBottom: 14 }}>Your Profile</div>
          {PROFILE_KEYS.filter(k => profile[k]).map(k => (
            <div className="rep-profile-block" key={k}>
              <span className="l">{t.profileLabels[k]}</span>
              <span className="v">{getValueLabel(k, profile[k], lang)}</span>
            </div>
          ))}

          <div style={{ marginTop: 22 }}>
            <div className="side-title" style={{ marginBottom: 12 }}>Allocation Suggestion</div>
            <div className="alloc-bar">
              <div className="alloc-seg" style={{ width: '60%', background: 'var(--ac)' }} />
              <div className="alloc-seg" style={{ width: '30%', background: 'var(--ac-soft)' }} />
              <div className="alloc-seg" style={{ width: '10%', background: 'var(--bg-3)' }} />
            </div>
            <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 11.5 }}>
              <div className="exec-row">
                <span className="l" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 8, height: 8, background: 'var(--ac)', borderRadius: 2 }}></span>
                  Core
                </span>
                <span className="v">60%</span>
              </div>
              <div className="exec-row">
                <span className="l" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 8, height: 8, background: 'var(--ac-soft)', borderRadius: 2 }}></span>
                  Satellite
                </span>
                <span className="v">30%</span>
              </div>
              <div className="exec-row">
                <span className="l" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 8, height: 8, background: 'var(--bg-3)', borderRadius: 2 }}></span>
                  Learn
                </span>
                <span className="v">10%</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Middle: Main content ── */}
        <div className="rep-mid">
          {aiResult?.portfolioInsight && (
            <div className="rep-summary">
              <div className="rep-summary-head">
                <span className="chip accent"><span className="chip-dot"></span>AI Briefing</span>
                <span className="who">Claude AI</span>
                <span style={{
                  marginLeft: 'auto',
                  fontFamily: 'var(--f-mono)',
                  fontSize: 11,
                  color: 'var(--tx-3)',
                  letterSpacing: '0.06em',
                }}>
                  {DATASET_REVIEWED_AT}
                </span>
              </div>
              <p>{aiResult.portfolioInsight}</p>
            </div>
          )}

          <div className="rep-stats">
            <div className="rep-stat">
              <div className="l">{t.avgRisk}</div>
              <div className="v" style={{ color: 'var(--warn)' }}>
                {avgRisk}<span className="unit">/10</span>
              </div>
            </div>
            <div className="rep-stat">
              <div className="l">{t.avgApy}</div>
              <div className="v" style={{ color: 'var(--pos)' }}>
                {avgApy}<span className="unit">%</span>
              </div>
            </div>
            <div className="rep-stat">
              <div className="l">{t.regulated}</div>
              <div className="v">
                {regulated}<span className="unit">/{topAssets.length}</span>
              </div>
            </div>
          </div>

          <div className="rep-section-head">
            <h3><span className="accent-bar"></span>{t.assetComparison(RWA_ASSETS.length)}</h3>
            <span className="meta">{t.asOf} {DATASET_REVIEWED_AT}</span>
          </div>

          <div className="asset-grid">
            {sorted.map((asset, i) => (
              <AssetCard
                key={asset.id}
                asset={asset}
                analysis={analyses.find(a => a.id === asset.id)}
                isTopPick={topPickIds.includes(asset.id)}
                budgetExceeds={asset._budgetExceeds}
                index={i}
                t={t}
              />
            ))}
          </div>

          <div style={{ marginTop: 28, paddingTop: 16, borderTop: '1px solid var(--line-2)' }}>
            <p style={{ fontSize: 11, color: 'var(--tx-3)', lineHeight: 1.6 }}>{DATASET_NOTICE}</p>
          </div>
        </div>

        {/* ── Right: Radar + Chat ── */}
        <div className="rep-right">
          <div className="panel">
            <div className="panel-head">
              <div className="panel-title"><span className="accent-bar"></span>{t.radarTitle}</div>
              <span className="mono" style={{ fontSize: 10, color: 'var(--tx-3)', letterSpacing: '0.08em' }}>
                5 AXES
              </span>
            </div>
            <div className="panel-body" style={{ padding: 8 }}>
              <RadarPanel assets={topAssets} t={t} />
            </div>
          </div>

          <div className="panel" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <div className="panel-head">
              <div className="panel-title"><span className="accent-bar"></span>{t.chatTitle}</div>
              <span className="live-dot" style={{ fontSize: 10 }}>Claude</span>
            </div>
            <div className="panel-body" style={{ display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>
              <AIChat userProfile={profile} topAssets={topAssets} apiKey={apiKey} t={t} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
