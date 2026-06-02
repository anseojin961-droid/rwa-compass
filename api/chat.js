import Anthropic from '@anthropic-ai/sdk';

const SYSTEM_PROMPT = `You are an expert RWA (Real World Assets) risk education assistant specializing in tokenized assets, DeFi protocols, and blockchain-based investment products. You help users compare asset fit and understand risks; you do not provide investment advice or instructions to buy or sell. Consider regulatory compliance (including the GENIUS Act, enacted in the United States on July 18, 2025), smart contract risks, liquidity, counterparty risk, and yield sustainability. Be specific, data-driven, and use precise financial terminology. Format your responses in valid JSON when requested.`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages, userProfile, topAssets, lang } = req.body;
  if (!messages || !userProfile) {
    return res.status(400).json({ error: 'Missing messages or userProfile' });
  }

  const langInstruction =
    lang === 'ko' ? 'Always respond in Korean (한국어).' :
    lang === 'zh' ? 'Always respond in Simplified Chinese (简体中文).' :
                    'Always respond in English.';

  const profileContext = `User profile: ${userProfile.experience} experience, ${userProfile.investmentAmount} allocation, ${userProfile.goal} goal, ${userProfile.riskTolerance} risk tolerance, ${userProfile.preferredChain} chain preference, ${userProfile.horizon} horizon, ${userProfile.liquidityNeed} liquidity need, with ${userProfile.riskPriority} as the main concern.`;
  const assetsContext = `Highlighted assets for comparison: ${(topAssets || []).map(a => a.name).join(', ')}.`;

  const systemWithContext = `${SYSTEM_PROMPT}

${langInstruction}

Context for this conversation:
${profileContext}
${assetsContext}

Answer questions clearly and concisely. Use specific numbers and data when available. Keep responses under 200 words unless a detailed explanation is explicitly needed.`;

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const message = await client.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 600,
      system: systemWithContext,
      messages,
    });

    return res.status(200).json({ text: message.content[0].text });
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
}
