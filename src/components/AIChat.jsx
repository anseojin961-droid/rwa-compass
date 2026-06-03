import { useState, useRef, useEffect } from 'react';
import { useClaudeAPI } from '../hooks/useClaudeAPI.js';

export default function AIChat({ userProfile, topAssets, lang = 'ko', t }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);
  const { chat } = useClaudeAPI();

  useEffect(() => { endRef.current?.scrollIntoView({ behavior:'smooth' }); }, [messages]);

  async function send(text) {
    const msg = text || input.trim();
    if (!msg || loading) return;
    setInput('');
    const next = [...messages, { role:'user', content:msg }];
    setMessages(next);
    setLoading(true);
    try {
      const reply = await chat(next, userProfile, topAssets, lang);
      setMessages([...next, { role:'assistant', content:reply }]);
    } catch (e) {
      setMessages([...next, { role:'assistant', content:`${t?.chatError || 'Error'}: ${e.message}` }]);
    } finally { setLoading(false); }
  }

  const suggested = t?.chatSuggestions || [];

  return (
    <div className="rounded-2xl border border-slate-700/50 card-glass overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-700/50 flex items-center justify-between">
        <div>
          <p className="text-white text-sm font-semibold">{t?.chatTitle || 'Ask AI'}</p>
          <p className="text-slate-500 text-xs mt-0.5">{t?.chatSubtitle || 'Ask about asset conditions & risk structure'}</p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-500 text-[11px]">Claude</span>
        </div>
      </div>

      {/* Messages */}
      <div className="h-64 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col justify-center">
            <p className="text-slate-500 text-sm mb-4">{t?.chatExamples || 'Example questions'}</p>
            <div className="flex flex-wrap gap-2">
              {suggested.map(q => (
                <button key={q} onClick={() => send(q)}
                  className="text-[11px] px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-700/50 text-slate-400 hover:border-blue-500/40 hover:text-slate-300 transition-colors text-left">
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[88%] px-3.5 py-2.5 rounded-xl text-sm leading-relaxed ${
              m.role === 'user'
                ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium rounded-tr-sm'
                : 'bg-slate-900/60 border border-slate-700/50 text-slate-300 rounded-tl-sm'
            }`}>
              {m.role === 'assistant' && (
                <span className="text-blue-400 text-[10px] font-semibold uppercase tracking-widest block mb-1.5">{t?.chatSender || '🧭 RWA Compass'}</span>
              )}
              <p className="whitespace-pre-wrap">{m.content}</p>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-900/60 border border-slate-700/50 rounded-xl rounded-tl-sm px-4 py-3">
              <span className="text-blue-400 text-[10px] font-semibold uppercase tracking-widest block mb-2">{t?.chatSender || '🧭 RWA Compass'}</span>
              <div className="flex gap-1.5">
                {[0,1,2].map(d => (
                  <div key={d} className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce"
                    style={{ animationDelay:`${d*0.15}s` }} />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <div className="px-4 pb-4 pt-3 border-t border-slate-700/50 flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
          placeholder={t?.chatPlaceholder || 'Ask about redemption terms or risk factors'}
          disabled={loading}
          className="flex-1 bg-slate-900/60 border border-slate-700/50 rounded-lg px-3 py-2.5 text-sm text-slate-300 placeholder-slate-600 focus:outline-none focus:border-blue-500/50 transition-colors disabled:opacity-40"
        />
        <button onClick={() => send()} disabled={!input.trim() || loading}
          className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-emerald-600 text-white text-sm font-semibold hover:from-blue-500 hover:to-emerald-500 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0">
          →
        </button>
      </div>
    </div>
  );
}
