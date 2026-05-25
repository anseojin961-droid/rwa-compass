import { useState } from 'react';
import OnboardingForm from './components/OnboardingForm.jsx';
import ResultsDashboard from './components/ResultsDashboard.jsx';
import LoadingAnalysis from './components/LoadingAnalysis.jsx';
import { useClaudeAPI } from './hooks/useClaudeAPI.js';
import { RWA_ASSETS } from './data/assets.js';
import './index.css';

const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY;

export default function App() {
  const [stage, setStage] = useState('onboarding');
  const [userProfile, setUserProfile] = useState(null);
  const [aiResult, setAiResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const { analyzeAssets } = useClaudeAPI();

  async function handleProfileComplete(profile) {
    setUserProfile(profile);
    setStage('loading');
    try {
      const result = await analyzeAssets(profile, RWA_ASSETS, API_KEY);
      setAiResult(result);
      setStage('results');
    } catch (err) {
      setErrorMsg(err.message);
      setStage('error');
    }
  }

  function handleReset() {
    setStage('onboarding');
    setUserProfile(null);
    setAiResult(null);
    setErrorMsg('');
  }

  return (
    <div className="min-h-screen" style={{ background:'linear-gradient(135deg, #050d1a 0%, #070f1e 50%, #050d1a 100%)' }}>
      {stage === 'onboarding' && <OnboardingForm onComplete={handleProfileComplete} />}
      {stage === 'loading'    && <LoadingAnalysis />}
      {stage === 'results'    && (
        <ResultsDashboard profile={userProfile} aiResult={aiResult} apiKey={API_KEY} onReset={handleReset} />
      )}
      {stage === 'error' && (
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="w-full max-w-sm card-glass rounded-2xl p-8">
            <p className="text-xs font-medium uppercase tracking-widest text-red-400 mb-3">오류 발생</p>
            <h2 className="text-white font-semibold text-lg mb-2">분석을 완료하지 못했습니다</h2>
            <p className="text-slate-400 text-sm mb-4">잠시 후 다시 시도해주세요.</p>
            <p className="text-red-400 text-xs bg-red-500/5 border border-red-500/20 rounded-xl px-3 py-2.5 mb-6 leading-5">{errorMsg}</p>
            <button onClick={handleReset}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 text-white text-sm font-semibold hover:from-blue-500 hover:to-emerald-500 transition-all"
              style={{ boxShadow:'0 0 20px rgba(59,130,246,0.3)' }}>
              다시 시도하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
