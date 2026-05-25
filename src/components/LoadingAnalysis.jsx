import { useEffect, useState } from 'react';

const STEPS = [
  { label: 'Fetching market data...', icon: '📡' },
  { label: 'Analyzing risk profiles...', icon: '🔍' },
  { label: 'Running AI scoring engine...', icon: '🤖' },
  { label: 'Calibrating recommendations...', icon: '⚡' },
  { label: 'Generating personalized report...', icon: '📊' },
];

export default function LoadingAnalysis() {
  const [current, setCurrent] = useState(0);
  const [done, setDone] = useState([]);

  useEffect(() => {
    const t = setInterval(() => {
      setCurrent(prev => {
        if (prev < STEPS.length - 1) {
          setDone(d => [...d, prev]);
          return prev + 1;
        }
        clearInterval(t);
        return prev;
      });
    }, 1200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'linear-gradient(135deg, #050d1a 0%, #070f1e 50%, #050d1a 100%)' }}>
      <div className="w-full max-w-md">
        {/* Spinner */}
        <div className="flex justify-center mb-12">
          <div className="relative">
            <div className="w-24 h-24 rounded-full border-2 border-blue-500/30 animate-spin-slow" />
            <div className="absolute inset-2 w-20 h-20 rounded-full border-2 border-emerald-500/40"
              style={{ animation:'spin 2s linear infinite reverse' }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                style={{ background:'linear-gradient(135deg,#1e3a8a,#065f46)', boxShadow:'0 0 30px rgba(59,130,246,0.5)' }}>
                🧭
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">AI Analysis Running</h2>
          <p className="text-slate-400 text-sm">Claude is analyzing 7 RWA assets against your profile</p>
        </div>

        <div className="space-y-3">
          {STEPS.map((s, i) => {
            const isDone = done.includes(i);
            const isActive = current === i;
            return (
              <div key={i} className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-500 ${
                isActive ? 'bg-blue-500/10 border-blue-500/30'
                : isDone  ? 'bg-emerald-500/5 border-emerald-500/20'
                :           'border-slate-800/50'
              }`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm flex-shrink-0 transition-all ${
                  isDone   ? 'bg-emerald-500/20 border border-emerald-500/40'
                  : isActive ? 'bg-blue-500/20 border border-blue-500/40 animate-pulse'
                  :            'bg-slate-800 border border-slate-700'
                }`}>
                  {isDone ? '✓' : s.icon}
                </div>
                <span className={`text-sm font-medium transition-colors ${
                  isDone ? 'text-emerald-400' : isActive ? 'text-blue-300' : 'text-slate-600'
                }`}>{s.label}</span>
                {isActive && (
                  <div className="ml-auto flex gap-1">
                    {[0,1,2].map(d => (
                      <div key={d} className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce"
                        style={{ animationDelay:`${d*0.15}s` }} />
                    ))}
                  </div>
                )}
                {isDone && <span className="ml-auto text-xs text-emerald-500">Done</span>}
              </div>
            );
          })}
        </div>

        <div className="mt-6">
          <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transition-all duration-700"
              style={{ width:`${((current+1)/STEPS.length)*100}%` }} />
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-xs text-slate-600">Analyzing...</span>
            <span className="text-xs text-slate-500">{Math.round(((current+1)/STEPS.length)*100)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
