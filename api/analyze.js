import Anthropic from '@anthropic-ai/sdk';

const SYSTEM_PROMPT = `You are an expert RWA (Real World Assets) risk education assistant specializing in tokenized assets, DeFi protocols, and blockchain-based investment products. You help users compare asset fit and understand risks; you do not provide investment advice or instructions to buy or sell. Consider regulatory compliance (including the GENIUS Act, enacted in the United States on July 18, 2025), smart contract risks, liquidity, counterparty risk, and yield sustainability. Be specific, data-driven, and use precise financial terminology. Format your responses in valid JSON when requested.`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { profile, assets, lang } = req.body;
  if (!profile || !assets) {
    return res.status(400).json({ error: 'Missing profile or assets' });
  }

  const langInstruction =
    lang === 'ko' ? 'Write ALL text fields (portfolioInsight, reasoning, keyRisk, geniusActImpact) in Korean (한국어).' :
    lang === 'zh' ? 'Write ALL text fields (portfolioInsight, reasoning, keyRisk, geniusActImpact) in Simplified Chinese (简体中文).' :
                    'Write ALL text fields in English.';

  const profileDesc = `
Experience Level: ${profile.experience}
Investment Amount: ${profile.investmentAmount}
Investment Goal: ${profile.goal}
Risk Tolerance: ${profile.riskTolerance}
Preferred Chain: ${profile.preferredChain}
Investment Horizon: ${profile.horizon}
Liquidity Need: ${profile.liquidityNeed}
Primary Risk Concern: ${profile.riskPriority}
  `.trim();

  const assetsDesc = assets.map(a =>
    `- ${a.name} (${a.ticker}): APY ${a.apy.min}${a.apy.min !== a.apy.max ? '-' + a.apy.max : ''}%, Base Risk: ${a.risk}, Chain: ${a.chains.join('/')}, Type: ${a.type}, Min Investment: $${a.minInvestment.toLocaleString()}, Lockup: ${a.lockupDays} days`
  ).join('\n');

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

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const message = await client.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: prompt }],
    });

    const text = message.content[0].text.trim();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return res.status(500).json({ error: 'Invalid AI response format' });

    let parsed;
    try {
      parsed = JSON.parse(jsonMatch[0]);
    } catch {
      let partial = jsonMatch[0];
      partial = partial.replace(/,?\s*\{[^}]*$/, '');
      const opens = (partial.match(/\[|\{/g) || []).length;
      const closes = (partial.match(/\]|\}/g) || []).length;
      for (let i = 0; i < opens - closes; i++) {
        partial += i === opens - closes - 1 ? '}' : ']';
      }
      try {
        parsed = JSON.parse(partial);
      } catch {
        return res.status(500).json({ error: 'JSON parse error — response may have been cut off' });
      }
    }

    return res.status(200).json(parsed);
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
}
