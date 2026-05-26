import { useState } from 'react';
import { Icon, BrandMark } from './Icon.jsx';
import { QUESTIONS_I18N } from '../i18n/questions.js';
import { T, LANGS } from '../i18n/index.js';

// ── Icon mapping ──────────────────────────────────────────────────────────────

const QUESTION_GLYPH = {
  experience:       'scale',
  investmentAmount: 'chip',
  goal:             'target',
  riskTolerance:    'shield',
  preferredChain:   'globe',
  horizon:          'clock',
  liquidityNeed:    'drop',
  riskPriority:     'search',
};

const QUESTION_ENGLISH = {
  experience:       'EXPERIENCE',
  investmentAmount: 'ALLOCATION',
  goal:             'OBJECTIVE',
  riskTolerance:    'RISK',
  preferredChain:   'NETWORK',
  horizon:          'DURATION',
  liquidityNeed:    'LIQUIDITY',
  riskPriority:     'FOCUS',
};

const OPTION_ICON_MAP = {
  '🌱': 'leaf',
  '⚡': 'bolt',
  '🏦': 'bank',
  '🪙': 'drop',
  '💵': 'drop',
  '💎': 'drop',
  '🏛️': 'drop',
  '🛡️': 'shield',
  '⚖️': 'scale',
  '🚀': 'bolt',
  '🟢': 'leaf',
  '🟡': 'scale',
  '🔴': 'bolt',
  '🔷': 'globe',
  '🟣': 'globe',
  '🌐': 'globe',
  '📆': 'clock',
  '🔒': 'lock',
  '📊': 'clock',
  '📋': 'scale',
  '🔐': 'shield',
  '💧': 'drop',
  '🏢': 'bank',
};

function mapOptionIcon(emoji) {
  return OPTION_ICON_MAP[emoji] || 'drop';
}

// ── "Why we ask" texts ────────────────────────────────────────────────────────

const WHY_TEXTS = [
  '투자 경험은 위험 허용도와 가장 강한 상관계수를 가집니다.',
  '투자 금액에 따라 최소 입금액 조건이 다른 자산이 필터링됩니다.',
  '목표는 예상 수익률 분포의 무게중심을 결정합니다.',
  '최대 손실폭은 자산별 historical drawdown과 비교됩니다.',
  '체인별 가스비, 결제 속도, 유동성 분포가 다릅니다.',
  '보유 기간이 짧을수록 데일리 유동성 자산이 우선됩니다.',
  '환매 주기는 자산의 유동성 점수에 직접 반영됩니다.',
  '가장 우려하는 위험 축에 해당 자산의 점수가 가중 패널티로 반영됩니다.',
];

// ── Sub-components ────────────────────────────────────────────────────────────

function Chrome({ lang, setLang, onReset }) {
  return (
    <div className="chrome">
      <div className="chrome-left">
        <div className="brand">
          <div className="brand-mark"><BrandMark size={14} /></div>
          <div className="brand-name">RWA <span className="accent">COMPASS</span></div>
        </div>
        <div className="crumb">
          <span className="sep">/</span>
          <span>Risk Profile / Survey</span>
        </div>
      </div>
      <div className="chrome-right">
        <span className="live-dot">Live · DeFiLlama</span>
        <button className="btn-ghost" onClick={onReset}>
          <Icon name="refresh" size={13} /> 처음으로
        </button>
        <div className="lang-switch">
          {LANGS.map(l => (
            <button
              key={l.code}
              className={lang === l.code ? 'on' : ''}
              onClick={() => setLang(l.code)}
            >
              {l.flag} {l.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

const EMPTY = {
  experience: '', investmentAmount: '', goal: '', riskTolerance: '',
  preferredChain: '', horizon: '', liquidityNeed: '', riskPriority: '',
};

export default function OnboardingForm({ onComplete, lang: initialLang = 'ko' }) {
  const [lang, setLang] = useState(initialLang);
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState(EMPTY);

  const QUESTIONS = QUESTIONS_I18N[lang] || QUESTIONS_I18N.ko;
  const total = QUESTIONS.length;
  const q = QUESTIONS[step];
  const isLast = step === total - 1;
  const sel = profile[q.id] || null;
  const answeredCount = Object.values(profile).filter(Boolean).length;
  const pct = Math.round((answeredCount / total) * 100);
  const whyText = WHY_TEXTS[step] || '';

  function onSelect(value) {
    setProfile(prev => ({ ...prev, [q.id]: value }));
  }

  function onNext() {
    if (!sel) return;
    if (isLast) {
      onComplete(profile);
    } else {
      setStep(s => s + 1);
    }
  }

  function onBack() {
    if (step > 0) setStep(s => s - 1);
  }

  function onReset() {
    setStep(0);
    setProfile(EMPTY);
  }

  return (
    <>
      <Chrome lang={lang} setLang={setLang} onReset={onReset} />

      <div className="qwrap">
        {/* ── Left rail: survey path ──────────────────────────────────────── */}
        <div className="qrail-left">
          <div>
            <div className="side-title" style={{ marginBottom: 14 }}>Survey Path</div>
            <div className="q-step-list">
              {QUESTIONS.map((question, i) => (
                <div
                  key={question.id}
                  className={`q-step ${i < step ? 'done' : ''} ${i === step ? 'cur' : ''}`}
                  onClick={() => i <= step && setStep(i)}
                >
                  <span className="q-step-num">
                    {i < step
                      ? <Icon name="check" size={11} stroke="2.5" />
                      : i + 1}
                  </span>
                  <span>
                    <div className="lbl">{question.label}</div>
                    <div className="ek">{QUESTION_ENGLISH[question.id]}</div>
                  </span>
                  <span></span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 'auto', paddingTop: 18, borderTop: '1px solid var(--line-1)' }}>
            <div className="exec-row"><span className="l">예상 소요</span><span className="v">~3 min</span></div>
            <div className="exec-row"><span className="l">분석 자산</span><span className="v">7 RWAs</span></div>
            <div className="exec-row"><span className="l">엔진</span><span className="v">Claude</span></div>
          </div>
        </div>

        {/* ── Center: question card ───────────────────────────────────────── */}
        <div className="qmain">
          {/* Progress header */}
          <div className="q-progress">
            <span>
              Step{' '}
              <span className="mono dim-2">{String(step + 1).padStart(2, '0')}</span>
              {' '}/ <span className="mono dim">{String(total).padStart(2, '0')}</span>
            </span>
            <span className="pct">{pct}% complete</span>
          </div>

          {/* Segment bar */}
          <div className="q-bar">
            {QUESTIONS.map((_, i) => (
              <div
                key={i}
                className={`seg ${i < step ? 'on' : i === step ? 'cur' : ''}`}
              ></div>
            ))}
          </div>

          {/* Question card */}
          <div className="qcard" key={step}>
            <div className="qcard-head">
              <div className="qcard-glyph">
                <Icon name={QUESTION_GLYPH[q.id] || 'drop'} size={20} />
              </div>
              <div>
                <div className="qcard-meta">
                  Question {String(step + 1).padStart(2, '0')} · {QUESTION_ENGLISH[q.id]}
                </div>
                <h2>{q.label}</h2>
                <div className="qcard-q">{q.subtitle}</div>
              </div>
            </div>

            <div>
              {q.options.map(opt => (
                <div
                  key={opt.value}
                  className={`qopt ${sel === opt.value ? 'sel' : ''}`}
                  onClick={() => onSelect(opt.value)}
                >
                  <div className="qopt-glyph">
                    <Icon name={mapOptionIcon(opt.icon)} size={16} />
                  </div>
                  <div>
                    <div className="qopt-lbl">{opt.label}</div>
                    <div className="qopt-desc">{opt.desc}</div>
                  </div>
                  <div className="qopt-check"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="qnav">
            <button className="btn-ghost" disabled={step === 0} onClick={onBack}>
              <Icon name="arrow-left" size={13} /> 이전
            </button>
            <button className="btn-primary" disabled={!sel} onClick={onNext}>
              {isLast ? '분석 시작' : '다음 질문'}{' '}
              <Icon name="arrow-right" size={14} />
            </button>
          </div>
        </div>

        {/* ── Right rail: live profile ────────────────────────────────────── */}
        <div className="qrail-right">
          <div>
            <div className="side-title" style={{ marginBottom: 14 }}>Live Profile</div>
            <div className="tel-row">
              <span className="l">완료 답변</span>
              <span className="v ac">{answeredCount} / {total}</span>
            </div>
            <div className="tel-row">
              <span className="l">현재 단계</span>
              <span className="v">{QUESTION_ENGLISH[q.id]}</span>
            </div>
            <div className="tel-row">
              <span className="l">데이터 저장</span>
              <span className="v" style={{ color: 'var(--pos)' }}>로컬 전용</span>
            </div>
            <div className="tel-row">
              <span className="l">서버 전송</span>
              <span className="v">없음</span>
            </div>
          </div>

          <div>
            <div className="side-title" style={{ marginBottom: 14 }}>Why we ask</div>
            <p className="dim-2" style={{ fontSize: 12.5, lineHeight: 1.6, margin: 0 }}>
              {whyText}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
