import { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage.jsx';
import OnboardingForm from './components/OnboardingForm.jsx';
import ResultsDashboard from './components/ResultsDashboard.jsx';
import LoadingAnalysis from './components/LoadingAnalysis.jsx';
import { useClaudeAPI } from './hooks/useClaudeAPI.js';
import { RWA_ASSETS } from './data/assets.js';
import { fetchMarketData, fetchRWAStats } from './utils/marketData.js';
import { filterAssetsByProfile } from './utils/riskScoring.js';
import { T } from './i18n/index.js';
import './index.css';

export default function App() {
  const [stage, setStage] = useState('landing');
  const [lang, setLang] = useState('ko');
  const [userProfile, setUserProfile] = useState(null);
  const [aiResult, setAiResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [marketData, setMarketData] = useState({});
  const [rwaStats, setRwaStats] = useState({});
  const { analyzeAssets } = useClaudeAPI();

  useEffect(() => {
    Promise.all([
      fetchMarketData().catch(() => ({})),
      fetchRWAStats().catch(() => ({})),
    ]).then(([md, stats]) => {
      setMarketData(md);
      setRwaStats(stats);
    });
  }, []);

  async function handleProfileComplete(profile) {
    setUserProfile(profile);
    setStage('loading');
    try {
      const liveAssets = RWA_ASSETS.map(a => {
        const live = marketData[a.id];
        return live ? { ...a, apy: { min: live.apy, max: live.apy } } : a;
      });
      const assetsToAnalyze = filterAssetsByProfile(liveAssets, profile);
      const result = await analyzeAssets(profile, assetsToAnalyze, lang);
      setAiResult(result);
      setStage('results');
    } catch (err) {
      setErrorMsg(err.message);
      setStage('error');
    }
  }

  function handleReset() {
    setStage('landing');
    setUserProfile(null);
    setAiResult(null);
    setErrorMsg('');
  }

  return (
    <div className="min-h-screen" style={{ background:'linear-gradient(135deg, #050d1a 0%, #070f1e 50%, #050d1a 100%)' }}>
      {stage === 'landing'    && <LandingPage onStart={(selectedLang) => { setLang(selectedLang); setStage('onboarding'); }} marketData={marketData} rwaStats={rwaStats} />}
      {stage === 'onboarding' && <OnboardingForm onComplete={handleProfileComplete} lang={lang} />}
      {stage === 'loading'    && <LoadingAnalysis lang={lang} />}
      {stage === 'results'    && (
        <ResultsDashboard profile={userProfile} aiResult={aiResult} marketData={marketData} lang={lang} onReset={handleReset} />
      )}
      {stage === 'error' && (() => {
        const t = T[lang] || T.ko;
        return (
          <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-sm card-glass rounded-2xl p-8">
              <p className="text-xs font-medium uppercase tracking-widest text-red-400 mb-3">{t.errorLabel}</p>
              <h2 className="text-white font-semibold text-lg mb-2">{t.errorHeading}</h2>
              <p className="text-slate-400 text-sm mb-4">{t.errorDesc}</p>
              <p className="text-red-400 text-xs bg-red-500/5 border border-red-500/20 rounded-xl px-3 py-2.5 mb-6 leading-5">{errorMsg}</p>
              <button onClick={handleReset}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 text-white text-sm font-semibold hover:from-blue-500 hover:to-emerald-500 transition-all"
                style={{ boxShadow:'0 0 20px rgba(59,130,246,0.3)' }}>
                {t.retry}
              </button>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
