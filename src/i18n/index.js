export const T = {
  ko: {
    // ── Landing ──────────────────────────────────────────────
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
    ctaPips: ['무료', '3분 소요', '가입 불필요'],
    engineStatus: { title: '엔진 현황', engine: '분석 엔진', dataSource: '데이터 소스', assets: '분석 자산', serverSend: '서버 전송', none: '없음' },
    powered: 'Powered by Claude AI & DeFiLlama',
    langLabel: '언어',

    // ── Onboarding ───────────────────────────────────────────
    onboardingSubtitle: 'AI가 당신의 투자 성향을 분석해 최적의 RWA 자산을 추천해드립니다',
    questionOf: (cur, total) => `${cur} / ${total} 질문`,
    percentDone: (pct) => `${pct}% 완료`,
    startAnalysis: '⚡ AI 분석 시작하기 →',
    back: '← 이전으로',

    // ── Loading ──────────────────────────────────────────────
    loadingTitle: 'AI 분석 중',
    loadingSubtitle: 'Claude가 7개 RWA 자산을 프로필에 맞게 분석하고 있습니다',
    loadingSteps: [
      '시장 데이터 수집 중...',
      '리스크 프로파일 분석 중...',
      'AI 점수 엔진 실행 중...',
      '추천 보정 중...',
      '개인화 리포트 생성 중...',
    ],
    loadingAnalyzing: '분석 중...',

    // ── Error ────────────────────────────────────────────────
    errorLabel: '오류 발생',
    errorHeading: '분석을 완료하지 못했습니다',
    errorDesc: '잠시 후 다시 시도해주세요.',
    retry: '다시 시도하기',

    // ── Results header ───────────────────────────────────────
    reportTitle: '분석 리포트',
    done: '완료',
    reset: '재설정',

    // ── Profile bar ──────────────────────────────────────────
    profileLabels: { experience:'경험', investmentAmount:'금액', goal:'목표', riskTolerance:'리스크', preferredChain:'체인', horizon:'기간', liquidityNeed:'유동성', riskPriority:'중점 위험' },

    // ── Stats ────────────────────────────────────────────────
    avgRisk: '평균 위험 점수',
    avgApy: '평균 표시 APY',
    regulated: '규제 자산 수',

    // ── AI insight ───────────────────────────────────────────
    aiSummary: 'AI 비교 요약',

    // ── Asset list ───────────────────────────────────────────
    assetComparison: (n) => `자산 비교 (${n}개)`,
    asOf: '확인일',

    // ── Radar ────────────────────────────────────────────────
    radarTitle: '추천 자산 특성',
    radarAxes: ['수익률', '안전성', '유동성', '규제 명확성', '접근성'],

    // ── Asset card ───────────────────────────────────────────
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

    // ── Chat ─────────────────────────────────────────────────
    chatTitle: 'AI 질문하기',
    chatSubtitle: '자산 조건·위험 구조를 물어보세요',
    chatPlaceholder: '환매 조건이나 위험 요인을 질문하세요',
    chatSuggestions: ['BUIDL과 USDe의 위험 구조 차이는?', 'GENIUS Act가 이 상품들에 미치는 영향은?', '델타 중립 전략이란 무엇인가요?', '수익률 대비 위험 비교는?'],
    chatExamples: '예시 질문',
    chatSender: '🧭 RWA Compass',
    chatError: '오류',

    // ── Budget / Share ───────────────────────────────────────
    budgetExceeds: '예산 초과',
    budgetExceedsDesc: '최소 투자금이 선택한 예산을 초과합니다',
    shareBtn: '공유',
    shareCopied: '클립보드에 복사되었습니다!',
    shareText: (topNames, url) => `🧭 RWA Compass 분석 결과\n\n추천 자산: ${topNames}\n\n지금 바로 분석해보기 👉 ${url}`,
  },

  en: {
    // ── Landing ──────────────────────────────────────────────
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
    ctaPips: ['Free', '3 min', 'No sign-up'],
    engineStatus: { title: 'Engine Status', engine: 'Analysis Engine', dataSource: 'Data Source', assets: 'Tracked Assets', serverSend: 'Server Transfer', none: 'None' },
    powered: 'Powered by Claude AI & DeFiLlama',
    langLabel: 'Language',

    // ── Onboarding ───────────────────────────────────────────
    onboardingSubtitle: 'Claude AI analyzes your investor profile and recommends the best RWA assets for you',
    questionOf: (cur, total) => `Question ${cur} of ${total}`,
    percentDone: (pct) => `${pct}% complete`,
    startAnalysis: '⚡ Start AI Analysis →',
    back: '← Back',

    // ── Loading ──────────────────────────────────────────────
    loadingTitle: 'AI Analysis Running',
    loadingSubtitle: 'Claude is analyzing 7 RWA assets against your profile',
    loadingSteps: [
      'Fetching market data...',
      'Analyzing risk profiles...',
      'Running AI scoring engine...',
      'Calibrating recommendations...',
      'Generating personalized report...',
    ],
    loadingAnalyzing: 'Analyzing...',

    // ── Error ────────────────────────────────────────────────
    errorLabel: 'Error',
    errorHeading: 'Analysis could not be completed',
    errorDesc: 'Please try again in a moment.',
    retry: 'Try Again',

    // ── Results header ───────────────────────────────────────
    reportTitle: 'Analysis Report',
    done: 'Done',
    reset: 'Reset',

    // ── Profile bar ──────────────────────────────────────────
    profileLabels: { experience:'Experience', investmentAmount:'Amount', goal:'Goal', riskTolerance:'Risk', preferredChain:'Chain', horizon:'Horizon', liquidityNeed:'Liquidity', riskPriority:'Risk Focus' },

    // ── Stats ────────────────────────────────────────────────
    avgRisk: 'Avg. Risk Score',
    avgApy: 'Avg. Displayed APY',
    regulated: 'Regulated Assets',

    // ── AI insight ───────────────────────────────────────────
    aiSummary: 'AI Summary',

    // ── Asset list ───────────────────────────────────────────
    assetComparison: (n) => `Asset Comparison (${n})`,
    asOf: 'As of',

    // ── Radar ────────────────────────────────────────────────
    radarTitle: 'Top Asset Profile',
    radarAxes: ['Yield', 'Safety', 'Liquidity', 'Regulatory', 'Accessibility'],

    // ── Asset card ───────────────────────────────────────────
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

    // ── Chat ─────────────────────────────────────────────────
    chatTitle: 'Ask AI',
    chatSubtitle: 'Ask about asset terms & risk structure',
    chatPlaceholder: 'Ask about redemption terms or risk factors',
    chatSuggestions: ['BUIDL vs USDe — risk structure differences?', 'How does the GENIUS Act affect these products?', 'What is a delta-neutral strategy?', 'Risk vs yield comparison?'],
    chatExamples: 'Example questions',
    chatSender: '🧭 RWA Compass',
    chatError: 'Error',

    // ── Budget / Share ───────────────────────────────────────
    budgetExceeds: 'Budget Exceeded',
    budgetExceedsDesc: 'Minimum investment exceeds your selected budget',
    shareBtn: 'Share',
    shareCopied: 'Copied to clipboard!',
    shareText: (topNames, url) => `🧭 RWA Compass Analysis\n\nTop picks: ${topNames}\n\nAnalyze yours 👉 ${url}`,
  },

  zh: {
    // ── Landing ──────────────────────────────────────────────
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
    ctaPips: ['免费', '3分钟', '无需注册'],
    engineStatus: { title: '引擎状态', engine: '分析引擎', dataSource: '数据来源', assets: '追踪资产', serverSend: '服务器传输', none: '无' },
    powered: 'Powered by Claude AI & DeFiLlama',
    langLabel: '语言',

    // ── Onboarding ───────────────────────────────────────────
    onboardingSubtitle: 'Claude AI分析您的投资偏好，为您推荐最适合的RWA资产',
    questionOf: (cur, total) => `第 ${cur} / ${total} 题`,
    percentDone: (pct) => `${pct}% 完成`,
    startAnalysis: '⚡ 开始AI分析 →',
    back: '← 返回',

    // ── Loading ──────────────────────────────────────────────
    loadingTitle: 'AI分析运行中',
    loadingSubtitle: 'Claude正在根据您的投资偏好分析7种RWA资产',
    loadingSteps: [
      '正在获取市场数据...',
      '正在分析风险特征...',
      '正在运行AI评分引擎...',
      '正在校准推荐结果...',
      '正在生成个性化报告...',
    ],
    loadingAnalyzing: '分析中...',

    // ── Error ────────────────────────────────────────────────
    errorLabel: '错误',
    errorHeading: '分析未能完成',
    errorDesc: '请稍后再试。',
    retry: '重试',

    // ── Results header ───────────────────────────────────────
    reportTitle: '分析报告',
    done: '完成',
    reset: '重置',

    // ── Profile bar ──────────────────────────────────────────
    profileLabels: { experience:'经验', investmentAmount:'金额', goal:'目标', riskTolerance:'风险', preferredChain:'链', horizon:'期限', liquidityNeed:'流动性', riskPriority:'风险重点' },

    // ── Stats ────────────────────────────────────────────────
    avgRisk: '平均风险评分',
    avgApy: '平均APY',
    regulated: '合规资产数',

    // ── AI insight ───────────────────────────────────────────
    aiSummary: 'AI综合摘要',

    // ── Asset list ───────────────────────────────────────────
    assetComparison: (n) => `资产比较 (${n}种)`,
    asOf: '更新日期',

    // ── Radar ────────────────────────────────────────────────
    radarTitle: '推荐资产特征',
    radarAxes: ['收益率', '安全性', '流动性', '监管明确性', '可及性'],

    // ── Asset card ───────────────────────────────────────────
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

    // ── Chat ─────────────────────────────────────────────────
    chatTitle: 'AI问答',
    chatSubtitle: '询问资产条件与风险结构',
    chatPlaceholder: '询问赎回条件或风险因素',
    chatSuggestions: ['BUIDL与USDe的风险结构差异？', 'GENIUS法案如何影响这些产品？', '什么是Delta中性策略？', '收益与风险对比？'],
    chatExamples: '示例问题',
    chatSender: '🧭 RWA Compass',
    chatError: '错误',

    // ── Budget / Share ───────────────────────────────────────
    budgetExceeds: '超出预算',
    budgetExceedsDesc: '最低投资金额超出您选择的预算范围',
    shareBtn: '分享',
    shareCopied: '已复制到剪贴板！',
    shareText: (topNames, url) => `🧭 RWA Compass 分析结果\n\n推荐资产：${topNames}\n\n立即分析 👉 ${url}`,
  },
};

export const LANGS = [
  { code: 'ko', label: '한국어', flag: '🇰🇷' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'zh', label: '中文',    flag: '🇨🇳' },
];
