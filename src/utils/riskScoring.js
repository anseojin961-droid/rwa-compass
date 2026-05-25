// 투자 금액 텍스트 → 숫자 변환
const AMOUNT_MAP = {
  'Under $1K': 999,
  '$1K–$50K': 25000,
  '$50K–$500K': 275000,
  '$500K+': 5_000_000,
};

export function filterAssetsByProfile(assets, profile) {
  const userAmount = AMOUNT_MAP[profile.investmentAmount] ?? Infinity;

  return assets.filter(asset => {
    // 체인 필터
    if (profile.preferredChain !== 'Any') {
      if (!asset.chains.includes(profile.preferredChain)) return false;
    }

    // 최소 투자금 필터 (유저 금액 < 자산 최소금이면 제외)
    if (userAmount < asset.minInvestment) return false;

    // 리스크 허용도 필터
    if (profile.riskTolerance === 'Low' && asset.riskScore > 4) return false;
    if (profile.riskTolerance === 'Medium' && asset.riskScore > 7) return false;

    // 목표 필터
    if (profile.goal === 'Stable yield' && asset.risk === 'high') return false;

    // 초보자는 복잡한 구조 자산 제외
    if (profile.experience === 'None' && asset.riskScore >= 7) return false;

    // 즉시 유동성이 중요하면 락업 자산 제외
    if (profile.liquidityNeed === 'Anytime' && asset.lockupDays > 0) return false;

    return true;
  });
}

export function getRiskColor(score) {
  if (score <= 3) return { text: 'text-[#286148]', bg: 'bg-[#4d8568]', border: 'border-[#b9d2c2]', label: '낮음' };
  if (score <= 6) return { text: 'text-[#826324]', bg: 'bg-[#b28b37]', border: 'border-[#dfc989]', label: '보통' };
  return { text: 'text-[#963e35]', bg: 'bg-[#ba5b52]', border: 'border-[#dfb5af]', label: '높음' };
}

export function getRecommendationStyle(rec) {
  const styles = {
    STRONG_MATCH: { text: 'text-[#286148]', bg: 'bg-[#edf5f0]', border: 'border-[#c8ddd0]', label: '높은 적합도' },
    GOOD_MATCH: { text: 'text-[#315b50]', bg: 'bg-[#f0f5f2]', border: 'border-[#d2e0d9]', label: '검토 적합' },
    REVIEW_CAREFULLY: { text: 'text-[#826324]', bg: 'bg-[#faf6e9]', border: 'border-[#e9dab0]', label: '주의 검토' },
    HIGH_MISMATCH: { text: 'text-[#963e35]', bg: 'bg-[#fbf2f0]', border: 'border-[#e8c9c4]', label: '적합도 낮음' },
  };
  const legacyMappings = {
    STRONG_BUY: 'STRONG_MATCH',
    BUY: 'GOOD_MATCH',
    HOLD: 'REVIEW_CAREFULLY',
    AVOID: 'HIGH_MISMATCH',
  };
  return styles[rec] || styles[legacyMappings[rec]] || styles.REVIEW_CAREFULLY;
}

export function formatMinInvestment(amount) {
  if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(0)}M+`;
  if (amount >= 1_000) return `$${(amount / 1_000).toFixed(0)}K+`;
  return `$${amount}+`;
}

export function getGasLabel(level) {
  const labels = { low: '< $0.01', medium: '$2-15', high: '$20+' };
  return labels[level] || level;
}
