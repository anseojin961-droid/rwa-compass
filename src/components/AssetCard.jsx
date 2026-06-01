import { useState } from 'react';
import { Icon, Spark } from './Icon.jsx';
import { formatMinInvestment } from '../utils/riskScoring.js';

const FIT_CHIP_CLASS = {
  STRONG_MATCH:     'pos',
  GOOD_MATCH:       'accent',
  REVIEW_CAREFULLY: 'warn',
  HIGH_MISMATCH:    'neg',
  STRONG_BUY:       'pos',
  BUY:              'accent',
  HOLD:             'warn',
  AVOID:            'neg',
};

export default function AssetCard({ asset, analysis, isTopPick, budgetExceeds, index, t }) {
  const [expanded, setExpanded] = useState(false);

  const score    = analysis?.personalizedRiskScore ?? asset.riskScore;
  const apyStr   = asset.apy.min === asset.apy.max
    ? `${asset.apy.min}%`
    : `${asset.apy.min}–${asset.apy.max}%`;
  const logoText = asset.ticker ? asset.ticker.slice(0, 2).toUpperCase() : asset.name.slice(0, 2).toUpperCase();
  const riskCls  = score <= 2 ? 'low' : score <= 5 ? 'mid' : 'high';

  const sparkValues = [5, 6, 5, 7, 6, 8, 7, 6, 7, 8].map(v => v + (5 - asset.riskScore) * 0.3);

  const fitKey       = analysis?.fitAssessment || analysis?.recommendation || 'REVIEW_CAREFULLY';
  const fitLabel     = t.fitLabels?.[fitKey] ?? t.fitLabels?.REVIEW_CAREFULLY ?? 'Review';
  const fitChipClass = FIT_CHIP_CLASS[fitKey] || 'warn';

  return (
    <div className={`acard${isTopPick && !budgetExceeds ? ' top' : ''}${budgetExceeds ? ' budget-exceeded' : ''}`}>
      {budgetExceeds && (
        <div className="acard-budget-banner">
          🚫 <span>{t.budgetBanner ? t.budgetBanner(formatMinInvestment(asset.minInvestment)) : `${t.budgetExceeds} — ${formatMinInvestment(asset.minInvestment)}`}</span>
        </div>
      )}

      <div className="acard-rib">
        <div className="acard-rank">
          <span className="num">#{String(index + 1).padStart(2, '0')}</span>
          {isTopPick && !budgetExceeds
            ? <><Icon name="star" size={11} /> {t.topPick}</>
            : <>{t.ranked}</>
          }
        </div>
        <div className={`acard-risk ${riskCls}`}>
          <span className="pip"></span>
          Risk · <span className="mono" style={{ marginLeft: 4 }}>{score}/10</span>
        </div>
      </div>

      <div className="acard-body">
        <div className="acard-name-row">
          <div className="acard-logo">{logoText}</div>
          <div style={{ flex: 1 }}>
            <h3 className="acard-name">{asset.name}</h3>
            <div className="acard-issuer">{asset.issuer}</div>
            <div className="acard-tags">
              <span className="chip">{asset.type}</span>
              {analysis && (
                <span className={`chip ${fitChipClass}`}>{fitLabel}</span>
              )}
            </div>
          </div>
        </div>

        <div className="acard-metrics">
          <div className="acard-metric">
            <div className="l">{t.expectedApy}</div>
            <div className="v pos">{apyStr}</div>
          </div>
          <div className="acard-metric">
            <div className="l">{t.minInvestment}</div>
            <div className="v">{formatMinInvestment(asset.minInvestment)}</div>
          </div>
          <div className="acard-metric">
            <div className="l">{t.lockup}</div>
            <div className="v">{asset.lockupDays === 0 ? t.lockupNone : `${asset.lockupDays}d`}</div>
          </div>
        </div>

        {analysis?.reasoning && (
          <div className="acard-note">
            <span className="lbl">{t.aiAnalyst}</span>
            {analysis.reasoning}
          </div>
        )}

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {asset.chains.map(c => <span key={c} className="chip">{c}</span>)}
          <span className="chip">{asset.regulatory}</span>
        </div>
      </div>

      <div className="acard-foot">
        <Spark
          values={sparkValues}
          width={90}
          height={24}
          color={isTopPick && !budgetExceeds ? 'var(--ac-bright)' : 'var(--tx-2)'}
        />
        <span className="acard-cta" onClick={() => setExpanded(!expanded)}>
          {expanded ? t.collapseBtn : t.expandBtn} <Icon name="arrow-right" size={11} />
        </span>
      </div>

      {expanded && (
        <div className="acard-expand">
          {Object.entries(asset.risks).map(([k, v]) => (
            <div className="risk-bar-row" key={k}>
              <span className="risk-bar-label">
                {k.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}
              </span>
              <div className="risk-bar-track">
                <div
                  className="risk-bar-fill"
                  style={{
                    width: `${v * 10}%`,
                    background: v <= 3 ? 'var(--pos)' : v <= 6 ? 'var(--warn)' : 'var(--neg)',
                  }}
                />
              </div>
              <span className="risk-bar-val">{v}</span>
            </div>
          ))}

          {analysis?.keyRisk && (
            <div style={{
              marginTop: 12, padding: '10px 12px',
              background: 'var(--warn-soft)',
              border: '1px solid rgba(255,181,71,0.3)',
              borderRadius: 'var(--r-sm)', fontSize: 12, color: 'var(--tx-2)',
            }}>
              <span style={{ color: 'var(--warn)', fontWeight: 600, display: 'block', marginBottom: 4 }}>
                {t.keyRisk}
              </span>
              {analysis.keyRisk}
            </div>
          )}

          {analysis?.geniusActImpact && (
            <div style={{
              marginTop: 8, padding: '10px 12px',
              background: 'var(--ac-faint)',
              border: '1px solid rgba(46,141,255,0.2)',
              borderRadius: 'var(--r-sm)', fontSize: 12, color: 'var(--tx-2)',
            }}>
              <span style={{ color: 'var(--ac-bright)', fontWeight: 600, display: 'block', marginBottom: 4 }}>
                {t.geniusAct}
              </span>
              {analysis.geniusActImpact}
            </div>
          )}

          {asset.source?.url && (
            <a
              href={asset.source.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                marginTop: 10, fontSize: 11, color: 'var(--tx-3)',
              }}
            >
              🔗 {t.source}
            </a>
          )}
        </div>
      )}
    </div>
  );
}
