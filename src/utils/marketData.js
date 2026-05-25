const POOL_MATCHERS = {
  'aave-usdc':         d => d.project === 'aave-v3'    && d.symbol === 'USDC'  && d.chain === 'Ethereum',
  'ethena-usde':       d => d.project === 'ethena'     && d.symbol?.includes('USDe'),
  'sky-usds':          d => (d.project === 'sky' || d.project === 'spark') && d.symbol?.toLowerCase().includes('usds'),
  'morpho-usdc-cbbtc': d => d.project?.includes('morpho') && d.symbol?.includes('USDC') && d.chain === 'Base',
  'ondo-usdy':         d => d.project?.includes('ondo') && d.symbol?.includes('USDY'),
  'ondo-ousg':         d => d.project?.includes('ondo') && d.symbol?.includes('OUSG'),
};

export async function fetchMarketData() {
  const res = await fetch('https://yields.llama.fi/pools');
  if (!res.ok) throw new Error('DeFiLlama fetch failed');
  const { data } = await res.json();

  const result = {};
  for (const [assetId, matcher] of Object.entries(POOL_MATCHERS)) {
    const matches = data.filter(matcher).sort((a, b) => (b.tvlUsd || 0) - (a.tvlUsd || 0));
    if (matches[0]?.apy != null) {
      result[assetId] = {
        apy: Math.round(matches[0].apy * 10) / 10,
        tvl: matches[0].tvlUsd,
      };
    }
  }
  return result;
}
