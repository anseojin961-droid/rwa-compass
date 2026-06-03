// DeFiLlama yields API: https://yields.llama.fi/pools
// Project names verified 2026-05-29 against live API response.

const T_BILL_ASSET_IDS = ['blackrock-buidl', 'ondo-usdy', 'ondo-ousg'];

export async function fetchRWAStats() {
  const res = await fetch('https://api.llama.fi/protocols');
  if (!res.ok) throw new Error('DeFiLlama protocols fetch failed');
  const data = await res.json();

  const rwaProtocols = data.filter(p => p.category === 'RWA' && p.tvl > 0);
  const totalTvl = rwaProtocols.reduce((s, p) => s + (p.tvl || 0), 0);

  return {
    totalTvl,
    activeProtocols: rwaProtocols.length,
  };
}

const POOL_MATCHERS = {
  'ondo-usdy':         d => d.project === 'ondo-yield-assets' && d.symbol === 'USDY'  && d.chain === 'Ethereum',
  'blackrock-buidl':   d => d.project === 'blackrock-buidl'   && d.symbol === 'BUIDL' && d.chain === 'Ethereum',
  'ondo-ousg':         d => d.project === 'ondo-yield-assets' && d.symbol === 'OUSG'  && d.chain === 'Ethereum',
  'aave-usdc':         d => d.project === 'aave-v3'           && d.symbol === 'USDC'  && d.chain === 'Ethereum',
  'ethena-usde':       d => d.project === 'ethena-usde'       && d.symbol === 'SUSDE',
  'sky-usds':          d => d.project === 'sky-lending'       && d.symbol === 'SUSDS' && d.chain === 'Ethereum',
  'morpho-usdc-cbbtc': d => d.project === 'morpho-blue'       && d.symbol?.includes('USDC') && d.chain === 'Base',
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
        apy: Math.round(matches[0].apy * 100) / 100,
        tvl: matches[0].tvlUsd,
        pool: matches[0].pool,
      };
    }
  }

  result._tBillTvl = T_BILL_ASSET_IDS.reduce((s, id) => s + (result[id]?.tvl || 0), 0);
  return result;
}
