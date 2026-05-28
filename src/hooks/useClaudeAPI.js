import { useState, useCallback } from 'react';

const SYSTEM_PROMPT = `You are an expert RWA (Real World Assets) risk education assistant specializing in tokenized assets, DeFi protocols, and blockchain-based investment products. You help users compare asset fit and understand risks; you do not provide investment advice or instructions to buy or sell. Consider regulatory compliance (including the GENIUS Act, enacted in the United States on July 18, 2025), smart contract risks, liquidity, counterparty risk, and yield sustainability. Be specific, data-driven, and use precise financial terminology. Format your responses in valid JSON when requested.`;

export function useClaudeAPI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyzeAssets = useCallback(async (userProfile, assets, apiKey, lang = 'ko') => {
    setLoading(true);
    setError(null);

    const langInstruction =
      lang === 'ko' ? 'Write ALL text fields (portfolioInsight, reasoning, keyRisk, geniusActImpact) in Korean (한국어).' :
      lang === 'zh' ? 'Write ALL text fields (portfolioInsight, reasoning, keyRisk, geniusActImpact) in Simplified Chinese (简体中文).' :
                      'Write ALL text fields in English.';

    const profileDesc = `
Experience Level: ${userProfile.experience}
Investment Amount: ${userProfile.investmentAmount}
Investment Goal: ${userProfile.goal}
Risk Tolerance: ${userProfile.riskTolerance}
Preferred Chain: ${userProfile.preferredChain}
Investment Horizon: ${userProfile.horizon}
Liquidity Need: ${userProfile.liquidityNeed}
Primary Risk Concern: ${userProfile.riskPriority}
    `.trim();

    const assetsDesc = assets.map(a => `
- ${a.name} (${a.ticker}): APY ${a.apy.min}${a.apy.min !== a.apy.max ? '-' + a.apy.max : ''}%, Base Risk: ${a.risk}, Chain: ${a.chains.join('/')}, Type: ${a.type}, Min Investment: $${a.minInvestment.toLocaleString()}, Lockup: ${a.lockupDays} days
`).join('');

    const prompt = `${langInstruction}

Analyze these RWA assets for a user with this profile:

USER PROFILE:
${profileDesc}

ASSETS TO ANALYZE:
${assetsDesc}

For each asset, provide a personalized risk score (1-10, where 1=safest) based on this specific user's profile and goals.

Respond with ONLY a valid JSON object (no markdown, no explanation) in this exact format:
{
  "analyses": [
    {
      "id": "asset-id",
      "personalizedRiskScore": 3,
      "fitAssessment": "STRONG_MATCH | GOOD_MATCH | REVIEW_CAREFULLY | HIGH_MISMATCH",
      "reasoning": "One concise sentence explaining why this fits or doesn't fit this user's profile",
      "keyRisk": "The single most important risk factor for this user",
      "geniusActImpact": "How the enacted GENIUS Act stablecoin framework affects this asset"
    }
  ],
  "topPicks": ["asset-id-1", "asset-id-2", "asset-id-3"],
  "portfolioInsight": "2-3 sentence portfolio-level insight for this user's specific profile and goals"
}

Asset IDs: ${assets.map(a => a.id).join(', ')}`;

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 4096,
          system: SYSTEM_PROMPT,
          messages: [{ role: 'user', content: prompt }],
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error?.message || `API error: ${response.status}`);
      }

      const data = await response.json();
      const text = data.content[0].text.trim();
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error('Invalid response format from AI');

      let parsed;
      try {
        parsed = JSON.parse(jsonMatch[0]);
      } catch {
        // Response was truncated — attempt to salvage partial JSON
        let partial = jsonMatch[0];
        // Close any open arrays/objects by counting brackets
        const opens = (partial.match(/\[|\{/g) || []).length;
        const closes = (partial.match(/\]|\}/g) || []).length;
        const diff = opens - closes;
        // Remove trailing incomplete object/property
        partial = partial.replace(/,?\s*\{[^}]*$/, '');
        // Close open arrays and objects
        for (let i = 0; i < diff; i++) {
          partial += i === diff - 1 ? '}' : ']';
        }
        try {
          parsed = JSON.parse(partial);
        } catch {
          throw new Error(`JSON parse error — response may have been cut off. Try again.`);
        }
      }
      return parsed;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const chat = useCallback(async (messages, userProfile, topAssets, apiKey) => {
    const profileContext = `User profile: ${userProfile.experience} experience, ${userProfile.investmentAmount} allocation, ${userProfile.goal} goal, ${userProfile.riskTolerance} risk tolerance, ${userProfile.preferredChain} chain preference, ${userProfile.horizon} horizon, ${userProfile.liquidityNeed} liquidity need, with ${userProfile.riskPriority} as the main concern.`;
    const assetsContext = `Highlighted assets for comparison: ${topAssets.map(a => a.name).join(', ')}.`;

    const systemWithContext = `${SYSTEM_PROMPT}

Context for this conversation:
${profileContext}
${assetsContext}

Answer questions clearly and concisely. Use specific numbers and data when available. Keep responses under 200 words unless a detailed explanation is explicitly needed.`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 600,
        system: systemWithContext,
        messages,
      }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error?.message || `API error: ${response.status}`);
    }

    const data = await response.json();
    return data.content[0].text;
  }, []);

  return { analyzeAssets, chat, loading, error };
}
