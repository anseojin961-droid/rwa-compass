export const QUESTIONS_I18N = {
  ko: [
    {
      id: 'experience', label: '투자 경험', subtitle: '크립토 / RWA 토큰에 투자해본 적이 있나요?', icon: '📚',
      options: [
        { value: 'None',        label: '처음이에요',               desc: '디지털 자산 투자가 완전히 처음입니다',       icon: '🌱' },
        { value: 'Crypto/DeFi', label: '크립토 / DeFi 경험 있음',  desc: 'BTC, ETH, DeFi 프로토콜 등을 사용해봤어요', icon: '⚡' },
        { value: 'RWA/TradFi',  label: 'RWA / 전통 금융 경험 있음', desc: '토큰화 자산, 채권, 펀드 투자 경험이 있어요', icon: '🏦' },
      ],
    },
    {
      id: 'investmentAmount', label: '투자 예정 금액', subtitle: '이번에 투자하려는 금액대는 어느 정도인가요?', icon: '💰',
      options: [
        { value: 'Under $1K',  label: '$1,000 미만',        desc: '소액으로 먼저 경험해보고 싶어요',     icon: '🪙' },
        { value: '$1K–$50K',   label: '$1,000 ~ $50,000',   desc: '중소형 포지션을 구성하려 합니다',     icon: '💵' },
        { value: '$50K–$500K', label: '$50,000 ~ $500,000', desc: '주요 자산으로 배분할 예정입니다',     icon: '💎' },
        { value: '$500K+',     label: '$500,000 이상',       desc: '기관 수준의 투자 규모입니다',         icon: '🏛️' },
      ],
    },
    {
      id: 'goal', label: '투자 목표', subtitle: '이번 투자에서 가장 중요하게 생각하는 것은?', icon: '🎯',
      options: [
        { value: 'Stable yield', label: '안정적인 수익', desc: '원금 보존 + 꾸준한 이자 수익',          icon: '🛡️' },
        { value: 'Balanced',     label: '균형 잡힌 성장', desc: '적정 리스크 감수하며 수익 극대화',      icon: '⚖️' },
        { value: 'High yield',   label: '고수익 추구',    desc: '높은 리스크를 감수하고 최대 수익 추구', icon: '🚀' },
      ],
    },
    {
      id: 'riskTolerance', label: '리스크 허용도', subtitle: '보유 자산이 일시적으로 20% 하락하면 어떻게 하시겠어요?', icon: '⚠️',
      options: [
        { value: 'Low',    label: '보수적', desc: '즉시 매도하거나 처음부터 피할 것 같아요', icon: '🟢' },
        { value: 'Medium', label: '중립적', desc: '조금 기다리며 회복을 지켜볼 것 같아요',   icon: '🟡' },
        { value: 'High',   label: '공격적', desc: '오히려 저점 매수 기회로 생각할 것 같아요', icon: '🔴' },
      ],
    },
    {
      id: 'preferredChain', label: '선호 블록체인', subtitle: '어떤 네트워크에서 운용하고 싶으신가요?', icon: '⛓️',
      options: [
        { value: 'Ethereum', label: 'Ethereum', desc: '가장 검증된 네트워크, 가스비 다소 높음', icon: '🔷' },
        { value: 'Solana',   label: 'Solana',   desc: '빠른 속도, 낮은 트랜잭션 비용',         icon: '🟣' },
        { value: 'Any',      label: '상관없음',  desc: '최적의 옵션이면 어느 체인이든 괜찮아요', icon: '🌐' },
      ],
    },
    {
      id: 'horizon', label: '투자 기간', subtitle: '얼마나 오래 보유할 계획인가요?', icon: '📅',
      options: [
        { value: 'Short term',  label: '단기 (3개월 미만)', desc: '빠른 회수가 중요해요',              icon: '⚡' },
        { value: 'Medium term', label: '중기 (3개월~1년)',  desc: '어느 정도 락업은 감수할 수 있어요', icon: '📊' },
        { value: 'Long term',   label: '장기 (1년 이상)',   desc: '장기 보유로 복리 효과를 노릴게요',  icon: '🌱' },
      ],
    },
    {
      id: 'liquidityNeed', label: '유동성 필요', subtitle: '투자금을 얼마나 빠르게 회수할 수 있어야 하나요?', icon: '💧',
      options: [
        { value: 'Anytime',           label: '언제든 회수 가능',   desc: '락업 없이 즉시 출금 가능한 옵션을 선호해요',       icon: '⚡' },
        { value: 'Within 7 days',     label: '7일 이내면 괜찮아요', desc: '짧은 대기 기간은 수용할 수 있어요',               icon: '📆' },
        { value: 'Lockup acceptable', label: '락업도 괜찮아요',     desc: '조건이 적합하다면 유동성 제약을 감수할 수 있어요', icon: '🔒' },
      ],
    },
    {
      id: 'riskPriority', label: '가장 우려하는 위험', subtitle: '자산을 비교할 때 어떤 위험을 가장 먼저 확인하고 싶나요?', icon: '🔎',
      options: [
        { value: 'Regulatory risk',     label: '규제 및 접근 제한',    desc: '자격 제한, 관할권, 제도 변화가 가장 걱정돼요', icon: '📋' },
        { value: 'Smart contract risk', label: '스마트 컨트랙트 위험', desc: '해킹, 취약점, 프로토콜 사고가 가장 걱정돼요', icon: '🔐' },
        { value: 'Liquidity risk',      label: '유동성 및 환매 위험',  desc: '필요할 때 회수하지 못할 가능성이 걱정돼요',   icon: '💧' },
        { value: 'Counterparty risk',   label: '발행사 및 상대방 위험', desc: '담보 보관자나 발행 주체의 신뢰성이 중요해요', icon: '🏢' },
      ],
    },
  ],

  en: [
    {
      id: 'experience', label: 'Investment Experience', subtitle: 'Have you invested in crypto or RWA tokens before?', icon: '📚',
      options: [
        { value: 'None',        label: 'First time',             desc: 'Completely new to digital asset investing',         icon: '🌱' },
        { value: 'Crypto/DeFi', label: 'Crypto / DeFi',          desc: "I've used BTC, ETH, or DeFi protocols before",      icon: '⚡' },
        { value: 'RWA/TradFi',  label: 'RWA / Traditional Finance', desc: "I've invested in tokenized assets, bonds or funds", icon: '🏦' },
      ],
    },
    {
      id: 'investmentAmount', label: 'Investment Amount', subtitle: 'How much are you looking to invest?', icon: '💰',
      options: [
        { value: 'Under $1K',  label: 'Under $1,000',       desc: "I'd like to start small and learn",         icon: '🪙' },
        { value: '$1K–$50K',   label: '$1,000 – $50,000',   desc: 'Building a small to mid-size position',     icon: '💵' },
        { value: '$50K–$500K', label: '$50,000 – $500,000', desc: 'Allocating as a core holding',              icon: '💎' },
        { value: '$500K+',     label: '$500,000+',           desc: 'Institutional-scale deployment',            icon: '🏛️' },
      ],
    },
    {
      id: 'goal', label: 'Investment Goal', subtitle: "What matters most to you in this investment?", icon: '🎯',
      options: [
        { value: 'Stable yield', label: 'Stable yield',    desc: 'Capital preservation + steady interest income', icon: '🛡️' },
        { value: 'Balanced',     label: 'Balanced growth', desc: 'Moderate risk for maximized returns',           icon: '⚖️' },
        { value: 'High yield',   label: 'High yield',      desc: 'Willing to take high risk for maximum upside',  icon: '🚀' },
      ],
    },
    {
      id: 'riskTolerance', label: 'Risk Tolerance', subtitle: 'If your portfolio dropped 20% temporarily, what would you do?', icon: '⚠️',
      options: [
        { value: 'Low',    label: 'Conservative', desc: "I'd sell immediately or avoid it from the start", icon: '🟢' },
        { value: 'Medium', label: 'Moderate',     desc: "I'd wait and monitor for recovery",              icon: '🟡' },
        { value: 'High',   label: 'Aggressive',   desc: "I'd see it as a buying opportunity",             icon: '🔴' },
      ],
    },
    {
      id: 'preferredChain', label: 'Preferred Blockchain', subtitle: 'Which network do you prefer to operate on?', icon: '⛓️',
      options: [
        { value: 'Ethereum', label: 'Ethereum', desc: 'Most battle-tested network, higher gas fees',      icon: '🔷' },
        { value: 'Solana',   label: 'Solana',   desc: 'Fast transactions with low fees',                  icon: '🟣' },
        { value: 'Any',      label: 'Any chain', desc: "I'll go wherever the best option is",             icon: '🌐' },
      ],
    },
    {
      id: 'horizon', label: 'Investment Horizon', subtitle: 'How long do you plan to hold?', icon: '📅',
      options: [
        { value: 'Short term',  label: 'Short term (< 3 months)', desc: 'Quick exit is important to me',            icon: '⚡' },
        { value: 'Medium term', label: 'Medium term (3m – 1yr)',   desc: 'Some lockup is acceptable',                icon: '📊' },
        { value: 'Long term',   label: 'Long term (1yr+)',         desc: 'Targeting compounding over the long haul', icon: '🌱' },
      ],
    },
    {
      id: 'liquidityNeed', label: 'Liquidity Need', subtitle: 'How quickly must you be able to withdraw?', icon: '💧',
      options: [
        { value: 'Anytime',           label: 'Anytime',           desc: 'Need instant access — no lockup at all',         icon: '⚡' },
        { value: 'Within 7 days',     label: 'Within 7 days',     desc: 'Short waiting periods are acceptable',           icon: '📆' },
        { value: 'Lockup acceptable', label: 'Lockup is fine',    desc: "I'll accept lockups for the right opportunity",  icon: '🔒' },
      ],
    },
    {
      id: 'riskPriority', label: 'Biggest Risk Concern', subtitle: 'Which risk do you want highlighted most in comparisons?', icon: '🔎',
      options: [
        { value: 'Regulatory risk',     label: 'Regulatory / Access',    desc: 'Eligibility limits, jurisdictions, policy changes', icon: '📋' },
        { value: 'Smart contract risk', label: 'Smart Contract Risk',    desc: 'Hacks, exploits, protocol incidents',               icon: '🔐' },
        { value: 'Liquidity risk',      label: 'Liquidity / Redemption', desc: 'Risk of not being able to exit when needed',        icon: '💧' },
        { value: 'Counterparty risk',   label: 'Issuer / Counterparty',  desc: 'Trustworthiness of the issuer or custodian',        icon: '🏢' },
      ],
    },
  ],

  zh: [
    {
      id: 'experience', label: '投资经验', subtitle: '您是否曾投资过加密货币或RWA代币？', icon: '📚',
      options: [
        { value: 'None',        label: '第一次',          desc: '完全是数字资产投资新手',              icon: '🌱' },
        { value: 'Crypto/DeFi', label: '加密/DeFi经验',   desc: '曾使用过BTC、ETH或DeFi协议',         icon: '⚡' },
        { value: 'RWA/TradFi',  label: 'RWA/传统金融经验', desc: '有代币化资产、债券或基金的投资经历', icon: '🏦' },
      ],
    },
    {
      id: 'investmentAmount', label: '投资金额', subtitle: '您计划投资多少金额？', icon: '💰',
      options: [
        { value: 'Under $1K',  label: '1,000美元以下',         desc: '希望小额体验',       icon: '🪙' },
        { value: '$1K–$50K',   label: '1,000 – 50,000美元',    desc: '构建中小型仓位',     icon: '💵' },
        { value: '$50K–$500K', label: '50,000 – 500,000美元',  desc: '作为核心资产配置',   icon: '💎' },
        { value: '$500K+',     label: '50万美元以上',           desc: '机构级投资规模',     icon: '🏛️' },
      ],
    },
    {
      id: 'goal', label: '投资目标', subtitle: '此次投资您最看重什么？', icon: '🎯',
      options: [
        { value: 'Stable yield', label: '稳定收益', desc: '本金保值 + 稳定利息收入',    icon: '🛡️' },
        { value: 'Balanced',     label: '均衡增长', desc: '承担适度风险以最大化收益',   icon: '⚖️' },
        { value: 'High yield',   label: '追求高收益', desc: '愿意承担高风险追求最大回报', icon: '🚀' },
      ],
    },
    {
      id: 'riskTolerance', label: '风险承受能力', subtitle: '如果持仓暂时下跌20%，您会怎么做？', icon: '⚠️',
      options: [
        { value: 'Low',    label: '保守型', desc: '立即卖出或从一开始就避开',     icon: '🟢' },
        { value: 'Medium', label: '稳健型', desc: '等待并观察是否会回升',         icon: '🟡' },
        { value: 'High',   label: '激进型', desc: '视之为低位加仓的机会',         icon: '🔴' },
      ],
    },
    {
      id: 'preferredChain', label: '首选区块链', subtitle: '您希望在哪个网络上运作？', icon: '⛓️',
      options: [
        { value: 'Ethereum', label: 'Ethereum', desc: '最成熟的网络，Gas费用较高', icon: '🔷' },
        { value: 'Solana',   label: 'Solana',   desc: '交易速度快，费用低',        icon: '🟣' },
        { value: 'Any',      label: '无偏好',    desc: '最优方案即可，链不限',      icon: '🌐' },
      ],
    },
    {
      id: 'horizon', label: '投资期限', subtitle: '您计划持有多长时间？', icon: '📅',
      options: [
        { value: 'Short term',  label: '短期（3个月以内）', desc: '快速退出很重要',       icon: '⚡' },
        { value: 'Medium term', label: '中期（3个月~1年）', desc: '可以接受一定锁仓期',   icon: '📊' },
        { value: 'Long term',   label: '长期（1年以上）',   desc: '长期持有获取复利效果', icon: '🌱' },
      ],
    },
    {
      id: 'liquidityNeed', label: '流动性需求', subtitle: '您需要多快能够提取资金？', icon: '💧',
      options: [
        { value: 'Anytime',           label: '随时可提取', desc: '不接受任何锁仓，需要即时提款',       icon: '⚡' },
        { value: 'Within 7 days',     label: '7天内可接受', desc: '短暂等待期可以接受',                icon: '📆' },
        { value: 'Lockup acceptable', label: '锁仓可接受', desc: '条件合适的话可以接受流动性限制',     icon: '🔒' },
      ],
    },
    {
      id: 'riskPriority', label: '最担忧的风险', subtitle: '比较资产时，您最想优先了解哪种风险？', icon: '🔎',
      options: [
        { value: 'Regulatory risk',     label: '监管与准入限制',  desc: '资格限制、司法管辖、政策变化',     icon: '📋' },
        { value: 'Smart contract risk', label: '智能合约风险',    desc: '黑客攻击、漏洞、协议事故',         icon: '🔐' },
        { value: 'Liquidity risk',      label: '流动性与赎回风险', desc: '需要时无法退出的风险',            icon: '💧' },
        { value: 'Counterparty risk',   label: '发行方与交易对手', desc: '发行方或托管方的可信度',           icon: '🏢' },
      ],
    },
  ],
};
