export const T = {
  ko: {
    // Landing
    badge: 'AI 기반 RWA 내비게이터',
    heroTitle1: '토큰화 실물자산,',
    heroTitle2: '어디서 시작할지 모르겠다면',
    heroDesc: 'Claude AI가 8가지 질문으로 투자 성향을 분석하고\n최적의 RWA 자산을 추천해드립니다',
    features: [
      { icon: '🤖', title: 'AI 개인화 분석', desc: '투자 경험·금액·목표에 맞게 7개 자산을 점수화' },
      { icon: '📡', title: '실시간 시장 데이터', desc: 'DeFiLlama 연동으로 최신 APY 실시간 반영' },
      { icon: '🛡️', title: '리스크 비교', desc: '스마트컨트랙트·규제·유동성 위험 한눈에 비교' },
    ],
    statsAssets: '7개 RWA 자산', statsAssetsSub: '분석 대상',
    statsQuestions: '8가지 질문', statsQuestionsSub: '맞춤 프로파일링',
    statsAI: 'Claude AI',        statsAISub: '실시간 분석 엔진',
    cta: 'AI 분석 시작하기',     ctaSub: '무료 · 3분 소요 · 가입 불필요',
    powered: 'Powered by Claude AI & DeFiLlama',
    langLabel: '언어',

    // Results header
    reportTitle: '분석 리포트',
    done: '완료',
    reset: '재설정',

    // Profile bar labels
    profileLabels: { experience:'경험', investmentAmount:'금액', goal:'목표', riskTolerance:'리스크', preferredChain:'체인', horizon:'기간', liquidityNeed:'유동성', riskPriority:'중점 위험' },

    // Stats
    avgRisk: '평균 위험 점수',
    avgApy: '평균 표시 APY',
    regulated: '규제 자산 수',

    // AI insight
    aiSummary: 'AI 비교 요약',

    // Asset list
    assetComparison: (n) => `자산 비교 (${n}개)`,
    asOf: '확인일',

    // Radar
    radarTitle: '추천 자산 특성',
    radarAxes: ['수익률', '안전성', '유동성', '규제 명확성', '접근성'],

    // Asset card
    expectedApy: 'Expected APY',
    minInvestment: 'Min. Investment',
    lockup: 'Lockup',
    lockupNone: 'None',
    expandBtn: '▼ 위험 상세보기',
    collapseBtn: '▲ 접기',
    riskAnalysis: '위험 분석',
    keyRisk: '핵심 리스크',
    geniusAct: 'GENIUS Act 영향',
    source: '공식 출처',

    // Chat
    chatTitle: 'AI 질문하기',
    chatSubtitle: '자산 조건·위험 구조를 물어보세요',
    chatPlaceholder: '환매 조건이나 위험 요인을 질문하세요',
    chatSuggestions: ['BUIDL과 USDe의 위험 구조 차이는?', 'GENIUS Act가 이 상품들에 미치는 영향은?', '델타 중립 전략이란 무엇인가요?', '수익률 대비 위험 비교는?'],
    chatExamples: '예시 질문',
    chatSender: '🧭 RWA Compass',
    chatError: '오류',
  },

  en: {
    // Landing
    badge: 'AI-Powered RWA Navigator',
    heroTitle1: 'Tokenized Real World Assets,',
    heroTitle2: "Don't know where to start?",
    heroDesc: 'Claude AI analyzes your investor profile with 8 questions\nand recommends the best RWA assets for you',
    features: [
      { icon: '🤖', title: 'AI Personalization', desc: 'Scores 7 assets against your experience, budget & goals' },
      { icon: '📡', title: 'Live Market Data', desc: 'Real-time APY powered by DeFiLlama integration' },
      { icon: '🛡️', title: 'Risk Breakdown', desc: 'Smart contract, regulatory & liquidity risks at a glance' },
    ],
    statsAssets: '7 RWA Assets', statsAssetsSub: 'Analyzed',
    statsQuestions: '8 Questions', statsQuestionsSub: 'Personalized Profiling',
    statsAI: 'Claude AI',         statsAISub: 'Real-time Analysis',
    cta: 'Start AI Analysis',     ctaSub: 'Free · 3 minutes · No sign-up',
    powered: 'Powered by Claude AI & DeFiLlama',
    langLabel: 'Language',

    // Results header
    reportTitle: 'Analysis Report',
    done: 'Done',
    reset: 'Reset',

    // Profile bar labels
    profileLabels: { experience:'Experience', investmentAmount:'Amount', goal:'Goal', riskTolerance:'Risk', preferredChain:'Chain', horizon:'Horizon', liquidityNeed:'Liquidity', riskPriority:'Risk Focus' },

    // Stats
    avgRisk: 'Avg. Risk Score',
    avgApy: 'Avg. Displayed APY',
    regulated: 'Regulated Assets',

    // AI insight
    aiSummary: 'AI Summary',

    // Asset list
    assetComparison: (n) => `Asset Comparison (${n})`,
    asOf: 'As of',

    // Radar
    radarTitle: 'Top Asset Profile',
    radarAxes: ['Yield', 'Safety', 'Liquidity', 'Regulatory', 'Accessibility'],

    // Asset card
    expectedApy: 'Expected APY',
    minInvestment: 'Min. Investment',
    lockup: 'Lockup',
    lockupNone: 'None',
    expandBtn: '▼ Risk Details',
    collapseBtn: '▲ Collapse',
    riskAnalysis: 'Risk Analysis',
    keyRisk: 'Key Risk',
    geniusAct: 'GENIUS Act Impact',
    source: 'Official Source',

    // Chat
    chatTitle: 'Ask AI',
    chatSubtitle: 'Ask about asset terms & risk structure',
    chatPlaceholder: 'Ask about redemption terms or risk factors',
    chatSuggestions: ['BUIDL vs USDe — risk structure differences?', 'How does the GENIUS Act affect these products?', 'What is a delta-neutral strategy?', 'Risk vs yield comparison?'],
    chatExamples: 'Example questions',
    chatSender: '🧭 RWA Compass',
    chatError: 'Error',
  },

  zh: {
    // Landing
    badge: 'AI驱动的RWA导航器',
    heroTitle1: '代币化真实世界资产，',
    heroTitle2: '不知道从哪里开始？',
    heroDesc: 'Claude AI通过8个问题分析您的投资偏好\n为您推荐最适合的RWA资产',
    features: [
      { icon: '🤖', title: 'AI个性化分析', desc: '根据您的经验、预算和目标对7种资产进行评分' },
      { icon: '📡', title: '实时市场数据', desc: '通过DeFiLlama集成实时获取最新APY数据' },
      { icon: '🛡️', title: '风险对比', desc: '智能合约、监管和流动性风险一目了然' },
    ],
    statsAssets: '7种RWA资产', statsAssetsSub: '分析对象',
    statsQuestions: '8个问题',  statsQuestionsSub: '个性化分析',
    statsAI: 'Claude AI',       statsAISub: '实时分析引擎',
    cta: '开始AI分析',          ctaSub: '免费 · 3分钟 · 无需注册',
    powered: 'Powered by Claude AI & DeFiLlama',
    langLabel: '语言',

    // Results header
    reportTitle: '分析报告',
    done: '完成',
    reset: '重置',

    // Profile bar labels
    profileLabels: { experience:'经验', investmentAmount:'金额', goal:'目标', riskTolerance:'风险', preferredChain:'链', horizon:'期限', liquidityNeed:'流动性', riskPriority:'风险重点' },

    // Stats
    avgRisk: '平均风险评分',
    avgApy: '平均APY',
    regulated: '合规资产数',

    // AI insight
    aiSummary: 'AI综合摘要',

    // Asset list
    assetComparison: (n) => `资产比较 (${n}种)`,
    asOf: '更新日期',

    // Radar
    radarTitle: '推荐资产特征',
    radarAxes: ['收益率', '安全性', '流动性', '监管明确性', '可及性'],

    // Asset card
    expectedApy: '预期年化收益',
    minInvestment: '最低投资',
    lockup: '锁仓期',
    lockupNone: '无',
    expandBtn: '▼ 风险详情',
    collapseBtn: '▲ 收起',
    riskAnalysis: '风险分析',
    keyRisk: '核心风险',
    geniusAct: 'GENIUS法案影响',
    source: '官方来源',

    // Chat
    chatTitle: 'AI问答',
    chatSubtitle: '询问资产条件与风险结构',
    chatPlaceholder: '询问赎回条件或风险因素',
    chatSuggestions: ['BUIDL与USDe的风险结构差异？', 'GENIUS法案如何影响这些产品？', '什么是Delta中性策略？', '收益与风险对比？'],
    chatExamples: '示例问题',
    chatSender: '🧭 RWA Compass',
    chatError: '错误',
  },
};

export const LANGS = [
  { code: 'ko', label: '한국어', flag: '🇰🇷' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'zh', label: '中文',    flag: '🇨🇳' },
];

