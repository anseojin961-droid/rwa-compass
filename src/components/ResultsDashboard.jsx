import { useMemo } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts';
import AssetCard from './AssetCard.jsx';
import AIChat from './AIChat.jsx';
import { DATASET_NOTICE, DATASET_REVIEWED_AT, RWA_ASSETS } from '../data/assets.js';
import { formatProfileValue } from '../utils/profileLabels.js';

const PROFILE_KEYS = ['experience','investmentAmount','goal','riskTolerance','preferredChain','horizon','liquidityNeed','riskPriority'];
const PROFILE_LABELS = {
  experience:'경험', investmentAmount:'금액', goal:'목표', riskTolerance:'리스크',
  preferredChain:'체인', horizon:'기간', liquidityNeed:'유동성', riskPriority:'중점 위험',
};

function Header({ profile, onReset }) {
  return (
    <div className="flex items-center gap-3 border-b border-slate-700/50 px-5 py-3.5 sticky top-0 backdrop-blur-sm z-10"
      style={{ background:'rgba(5,13,26,0.95)' }}>
      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-emerald-600 flex items-center justify-center flex-shrink-0">
        <span className="text-white text-sm">🧭</span>
      </div>
      <span className="text-white text-sm font-semibold gradient-text">RWA Compass</span>
      <span className="text-slate-600 text-sm">—</span>
      <span className="text-slate-400 text-sm">분석 리포트</span>
      <div className="ml-auto flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-500 text-xs">완료</span>
        </div>
        <button onClick={onReset}
          className="text-xs px-3 py-1.5 rounded-lg border border-slate-700/50 text-slate-400 hover:border-blue-500/40 hover:text-slate-300 transition-colors">
          재설정
        </button>
      </div>
    </div>
  );
}

function ProfileBar({ profile }) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {PROFILE_KEYS.filter(k => profile[k]).map(k => (
        <div key={k} className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/60 border border-slate-700/50">
          <span className="text-slate-500 text-[11px]">{PROFILE_LABELS[k]}</span>
          <span className="text-slate-300 text-[11px] font-medium">{formatProfileValue(profile[k])}</span>
        </div>
      ))}
    </div>
  );
}

function Stats({ analyses, topAssets }) {
  const avgRisk = topAssets.length
    ? (topAssets.reduce((s,a) => s + (analyses.find(x=>x.id===a.id)?.personalizedRiskScore ?? a.riskScore), 0) / topAssets.length).toFixed(1)
    : '—';
  const avgApy = topAssets.length
    ? ((topAssets.reduce((s,a) => s + (a.apy.min+a.apy.max)/2, 0)) / topAssets.length).toFixed(1)
    : '—';
  const regulated = topAssets.filter(a => a.regulatory?.includes('SEC') || a.regulatory?.includes('Registered')).length;

  const items = [
    { label:'평균 위험 점수', val:avgRisk, unit:'/10', color:'text-yellow-400' },
    { label:'평균 표시 APY',  val:avgApy,  unit:'%',   color:'text-emerald-400' },
    { label:'규제 자산 수',   val:regulated, unit:`/${topAssets.length}개`, color:'text-blue-400' },
  ];
  return (
    <div className="grid grid-cols-3 gap-3 mb-6">
      {items.map(it => (
        <div key={it.label} className="card-glass rounded-xl px-4 py-3.5">
          <div className="text-slate-500 text-[11px] mb-1.5">{it.label}</div>
          <div className={`num text-2xl font-bold ${it.color}`}>
            {it.val}<span className="text-sm text-slate-500 font-normal ml-0.5">{it.unit}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function Radar_({ assets }) {
  if (!assets.length) return null;
  const data = [
    { s:'수익률', v:0 }, { s:'안전성', v:0 }, { s:'유동성', v:0 },
    { s:'규제 명확성', v:0 }, { s:'접근성', v:0 },
  ];
  const n = Math.min(assets.length, 3);
  assets.slice(0,n).forEach(a => {
    data[0].v += (a.apy.max/15)*10;
    data[1].v += 10 - a.riskScore;
    data[2].v += a.lockupDays===0 ? 10 : Math.max(0, 7-Math.min(a.lockupDays,7))+3;
    data[3].v += (10 - (a.risks?.regulatory ?? 5));
    data[4].v += a.minInvestment<=1 ? 10 : a.minInvestment<=5000 ? 7 : 3;
  });
  data.forEach(d => { d.v = Math.min(10, d.v/n); });

  return (
    <div className="card-glass rounded-2xl p-4 mb-4">
      <p className="text-slate-400 text-[11px] font-semibold uppercase tracking-widest mb-3">추천 자산 특성</p>
      <ResponsiveContainer width="100%" height={170}>
        <RadarChart data={data.map(d => ({ subject:d.s, value:d.v }))}>
          <PolarGrid stroke="rgba(59,130,246,0.15)" />
          <PolarAngleAxis dataKey="subject" tick={{ fill:'#64748b', fontSize:10 }} />
          <Radar dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.12} strokeWidth={1.5} />
          <Tooltip contentStyle={{ background:'rgba(10,22,40,0.95)', border:'1px solid rgba(59,130,246,0.3)', borderRadius:8, fontSize:12, color:'#e2e8f0' }}
            formatter={v => [v.toFixed(1)+'/10', '점수']} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function ResultsDashboard({ profile, aiResult, apiKey, onReset }) {
  const analyses  = useMemo(() => aiResult?.analyses  || [], [aiResult]);
  const topPickIds = useMemo(() => aiResult?.topPicks || [], [aiResult]);

  const sorted = useMemo(() => [...RWA_ASSETS].sort((a,b) => {
    const aTop = topPickIds.includes(a.id), bTop = topPickIds.includes(b.id);
    if (aTop && !bTop) return -1;
    if (!aTop && bTop) return 1;
    return (analyses.find(x=>x.id===a.id)?.personalizedRiskScore ?? a.riskScore)
         - (analyses.find(x=>x.id===b.id)?.personalizedRiskScore ?? b.riskScore);
  }), [analyses, topPickIds]);

  const topAssets = sorted.filter(a => topPickIds.includes(a.id));

  return (
    <div className="min-h-screen" style={{ background:'linear-gradient(135deg, #050d1a 0%, #070f1e 50%, #050d1a 100%)' }}>
      <Header profile={profile} onReset={onReset} />

      <div className="max-w-7xl mx-auto px-5 py-7">
        <ProfileBar profile={profile} />

        {/* AI Insight */}
        {aiResult?.portfolioInsight && (
          <div className="card-glass rounded-2xl p-5 mb-7 border-blue-500/20">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-blue-400">🤖</span>
              <p className="text-blue-400 text-[11px] font-semibold uppercase tracking-widest">AI 비교 요약</p>
            </div>
            <p className="text-slate-300 text-sm leading-6">{aiResult.portfolioInsight}</p>
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Main */}
          <div className="xl:col-span-2">
            <Stats analyses={analyses} topAssets={topAssets} />

            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-semibold text-sm">자산 비교 <span className="text-slate-500 font-normal">({RWA_ASSETS.length}개)</span></h2>
              <span className="text-slate-500 text-xs">확인일 {DATASET_REVIEWED_AT}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {sorted.map((asset, i) => (
                <AssetCard key={asset.id} asset={asset}
                  analysis={analyses.find(a => a.id===asset.id)}
                  isTopPick={topPickIds.includes(asset.id)}
                  index={i} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <Radar_ assets={topAssets} />
            <AIChat userProfile={profile} topAssets={topAssets} apiKey={apiKey} />
          </div>
        </div>

        <div className="mt-10 pt-5 border-t border-slate-800/50">
          <p className="text-slate-600 text-xs leading-5">{DATASET_NOTICE}</p>
        </div>
      </div>
    </div>
  );
}
