import { useState } from 'react';
import { RiskScoreBar, RiskScoreBadge } from './RiskScoreBar.jsx';
import { formatMinInvestment, getGasLabel } from '../utils/riskScoring.js';

const FIT_STYLES = {
  STRONG_MATCH:     { text:'text-emerald-400', bg:'bg-emerald-400/10', border:'border-emerald-400/30', label:'Strong Match' },
  GOOD_MATCH:       { text:'text-blue-400',    bg:'bg-blue-400/10',    border:'border-blue-400/30',    label:'Good Match'   },
  REVIEW_CAREFULLY: { text:'text-yellow-400',  bg:'bg-yellow-400/10',  border:'border-yellow-400/30',  label:'Review'       },
  HIGH_MISMATCH:    { text:'text-red-400',     bg:'bg-red-400/10',     border:'border-red-400/30',     label:'Avoid'        },
  STRONG_BUY:       { text:'text-emerald-400', bg:'bg-emerald-400/10', border:'border-emerald-400/30', label:'Strong Match' },
  BUY:              { text:'text-blue-400',    bg:'bg-blue-400/10',    border:'border-blue-400/30',    label:'Good Match'   },
  HOLD:             { text:'text-yellow-400',  bg:'bg-yellow-400/10',  border:'border-yellow-400/30',  label:'Review'       },
  AVOID:            { text:'text-red-400',     bg:'bg-red-400/10',     border:'border-red-400/30',     label:'Avoid'        },
};

const TYPE_COLORS = {
  blue:   { textColor:'text-blue-400',    bgColor:'bg-blue-400/10',    borderColor:'border-blue-400/30'    },
  purple: { textColor:'text-purple-400',  bgColor:'bg-purple-400/10',  borderColor:'border-purple-400/30'  },
  red:    { textColor:'text-red-400',     bgColor:'bg-red-400/10',     borderColor:'border-red-400/30'     },
  green:  { textColor:'text-emerald-400', bgColor:'bg-emerald-400/10', borderColor:'border-emerald-400/30' },
  orange: { textColor:'text-orange-400',  bgColor:'bg-orange-400/10',  borderColor:'border-orange-400/30'  },
};

export default function AssetCard({ asset, analysis, isTopPick, index }) {
  const [expanded, setExpanded] = useState(false);

  const fitKey = analysis?.fitAssessment || analysis?.recommendation || 'REVIEW_CAREFULLY';
  const recStyle = FIT_STYLES[fitKey] || FIT_STYLES.REVIEW_CAREFULLY;
  const typeStyle = TYPE_COLORS[asset.typeColor] || TYPE_COLORS.blue;
  const score = analysis?.personalizedRiskScore ?? asset.riskScore;
  const apyStr = asset.apy.min === asset.apy.max ? `${asset.apy.min}%` : `${asset.apy.min}–${asset.apy.max}%`;

  return (
    <div className={`animate-slide-up rounded-2xl border transition-all duration-300 overflow-hidden stagger-${Math.min(index+1,7)} ${
      isTopPick ? 'border-blue-500/40 hover:border-blue-500/60' : 'border-slate-700/50 hover:border-slate-600/60'
    } card-glass`}
      style={isTopPick ? { boxShadow:'0 0 30px rgba(59,130,246,0.1)' } : {}}>

      {isTopPick && (
        <div className="bg-gradient-to-r from-blue-600/20 to-emerald-600/20 border-b border-blue-500/20 px-4 py-2">
          <span className="text-yellow-400 text-sm">⭐</span>
          <span className="text-blue-300 text-xs font-semibold tracking-wide uppercase ml-1.5">AI Top Pick</span>
        </div>
      )}

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-slate-800/80 border border-slate-700/50 flex items-center justify-center text-2xl flex-shrink-0">
              {asset.logo}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-white font-bold text-base">{asset.name}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${typeStyle.textColor} ${typeStyle.bgColor} ${typeStyle.borderColor}`}>
                  {asset.type}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-slate-500 text-xs">{asset.issuer}</span>
                <span className="text-slate-700">·</span>
                <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${recStyle.text} ${recStyle.bg} ${recStyle.border}`}>
                  {recStyle.label}
                </span>
              </div>
            </div>
          </div>
          <RiskScoreBadge score={score} />
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            { label:'Expected APY', val:apyStr, color:'text-emerald-400' },
            { label:'Min. Investment', val:formatMinInvestment(asset.minInvestment), color:'text-slate-200' },
            { label:'Lockup', val:asset.lockupDays===0 ? 'None' : `${asset.lockupDays}d`, color:'text-slate-200' },
          ].map(m => (
            <div key={m.label} className="bg-slate-900/60 rounded-xl p-3 border border-slate-800/50 text-center">
              <div className={`font-bold text-lg ${m.color}`}>{m.val}</div>
              <div className="text-slate-500 text-xs mt-0.5">{m.label}</div>
            </div>
          ))}
        </div>

        {/* AI Reasoning */}
        {analysis?.reasoning && (
          <div className="bg-blue-500/5 border border-blue-500/15 rounded-xl p-3 mb-4">
            <div className="flex items-start gap-2">
              <span className="text-blue-400 text-sm flex-shrink-0 mt-0.5">🤖</span>
              <p className="text-slate-300 text-xs leading-relaxed">{analysis.reasoning}</p>
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {asset.chains.map(c => (
            <span key={c} className="text-xs px-2.5 py-1 rounded-full bg-slate-800/80 border border-slate-700/50 text-slate-400">
              {c==='Ethereum'?'🔷':c==='Solana'?'🟣':c==='Base'?'🔵':'⛓️'} {c}
            </span>
          ))}
          <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800/80 border border-slate-700/50 text-slate-400">
            ⛽ {getGasLabel(asset.gasFee)}
          </span>
          <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800/80 border border-slate-700/50 text-slate-400">
            {asset.regulatory?.includes('SEC')?'🏛️':'⚖️'} {asset.regulatory}
          </span>
        </div>

        <button onClick={() => setExpanded(!expanded)}
          className="w-full text-center text-slate-500 hover:text-slate-400 text-xs transition-colors py-1 flex items-center justify-center gap-1">
          {expanded ? '▲ 접기' : '▼ 위험 상세보기'}
        </button>

        {expanded && (
          <div className="mt-3 pt-3 border-t border-slate-800/50 animate-fade-in">
            <p className="text-slate-500 text-xs font-medium uppercase tracking-wide mb-3">위험 분석</p>
            <div className="space-y-2 mb-4">
              {Object.entries(asset.risks).map(([k,v]) => (
                <RiskScoreBar key={k} score={v}
                  label={k.replace(/([A-Z])/g,' $1').replace(/^./,s=>s.toUpperCase())} small />
              ))}
            </div>
            {analysis?.keyRisk && (
              <div className="bg-yellow-500/5 border border-yellow-500/15 rounded-lg p-3 mb-3">
                <p className="text-yellow-400 text-xs font-medium mb-0.5">핵심 리스크</p>
                <p className="text-slate-300 text-xs">{analysis.keyRisk}</p>
              </div>
            )}
            {analysis?.geniusActImpact && (
              <div className="bg-purple-500/5 border border-purple-500/15 rounded-lg p-3 mb-3">
                <p className="text-purple-400 text-xs font-medium mb-0.5">GENIUS Act 영향</p>
                <p className="text-slate-300 text-xs">{analysis.geniusActImpact}</p>
              </div>
            )}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {asset.features.map(f => (
                <span key={f} className="text-xs px-2 py-0.5 rounded-full bg-slate-800/60 border border-slate-700/40 text-slate-400">{f}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
