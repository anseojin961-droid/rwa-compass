import { useState, useCallback } from 'react';

export function useClaudeAPI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyzeAssets = useCallback(async (userProfile, assets, lang = 'ko') => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ profile: userProfile, assets, lang }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `API error: ${res.status}`);
      }
      return await res.json();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const chat = useCallback(async (messages, userProfile, topAssets, lang = 'ko') => {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ messages, userProfile, topAssets, lang }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `API error: ${res.status}`);
    }
    const data = await res.json();
    return data.text;
  }, []);

  return { analyzeAssets, chat, loading, error };
}
