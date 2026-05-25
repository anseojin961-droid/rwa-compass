const getColor = s =>
  s <= 3 ? { text:'text-emerald-400', bg:'bg-emerald-400', border:'border-emerald-400/40' } :
  s <= 6 ? { text:'text-yellow-400',  bg:'bg-yellow-400',  border:'border-yellow-400/40'  } :
           { text:'text-red-400',     bg:'bg-red-400',     border:'border-red-400/40'     };

export function RiskScoreBar({ score, label, small = false }) {
  const c = getColor(score);
  if (small) return (
    <div className="flex items-center gap-2">
      <span className="text-slate-500 text-xs w-24 flex-shrink-0">{label}</span>
      <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${c.bg}`} style={{ width:`${score*10}%`, opacity:0.8 }} />
      </div>
      <span className={`text-xs font-medium w-4 text-right ${c.text}`}>{score}</span>
    </div>
  );
  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-slate-400 text-sm">{label}</span>
        <span className={`text-sm font-bold ${c.text}`}>{score}/10</span>
      </div>
      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${c.bg}`} style={{ width:`${score*10}%` }} />
      </div>
    </div>
  );
}

export function RiskScoreBadge({ score }) {
  const c = getColor(score);
  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border ${c.border}`}
      style={{ background:'rgba(0,0,0,0.3)' }}>
      <div className={`w-2.5 h-2.5 rounded-full ${c.bg}`} />
      <span className={`font-bold text-lg leading-none ${c.text}`}>{score}</span>
      <span className="text-xs opacity-70 text-slate-400">/10</span>
    </div>
  );
}
