const PROFILE_VALUE_LABELS = {
  None: '처음',
  'Crypto/DeFi': '크립토 / DeFi 경험',
  'RWA/TradFi': 'RWA / 전통 금융 경험',
  'Under $1K': '$1,000 미만',
  '$1K–$50K': '$1,000 ~ $50,000',
  '$50K–$500K': '$50,000 ~ $500,000',
  '$500K+': '$500,000 이상',
  'Stable yield': '안정적인 수익',
  Balanced: '균형 잡힌 성장',
  'High yield': '고수익 추구',
  Low: '보수적',
  Medium: '중립적',
  High: '공격적',
  Any: '체인 무관',
  'Short term': '단기',
  'Medium term': '중기',
  'Long term': '장기',
  Anytime: '즉시 회수',
  'Within 7 days': '7일 이내 회수',
  'Lockup acceptable': '락업 허용',
  'Regulatory risk': '규제 및 접근 제한',
  'Smart contract risk': '스마트 컨트랙트',
  'Liquidity risk': '유동성 및 환매',
  'Counterparty risk': '발행사 및 상대방',
};

export function formatProfileValue(value) {
  return PROFILE_VALUE_LABELS[value] || value;
}
