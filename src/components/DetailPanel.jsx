export default function DetailPanel({ neighborhood, onClose }) {
    const isOpen = !!neighborhood

    // Colour the score number based on its position in the data range
    function scoreColor(score, min, max) {
        const t = max > min ? (score - min) / (max - min) : 0.5
        if (t < 0.33) return 'rgb(190,80,40)'
        if (t < 0.66) return 'rgb(160,140,20)'
        return 'var(--color-accent)'
    }

    return (
        <div className={`detail-panel${isOpen ? ' open' : ''}`} aria-label="Comune detail">
            <button className="detail-panel__close" onClick={onClose} aria-label="Close panel">
                ×
            </button>

            {neighborhood && (
                <>
                    <div className="detail-panel__hero">
                        <div className="detail-panel__tag">Comune · Lazio</div>
                        <div className="detail-panel__name">{neighborhood.name}</div>
                        <div className="detail-panel__score-row">
                            <span
                                className="detail-panel__score-num"
                                style={{ color: scoreColor(neighborhood.shiftScore, neighborhood.scoreMin, neighborhood.scoreMax) }}
                            >
                                {neighborhood.shiftScore.toFixed(1)}
                            </span>
                            <span className="detail-panel__score-denom">/ 100</span>
                        </div>
                        <div className="detail-panel__score-label">Shift Score</div>
                    </div>

                    <div className="detail-panel__body">
                        <div className="detail-section">
                            <div className="detail-section__label">Why this area?</div>
                            <p className="detail-section__explanation">{neighborhood.explanation}</p>
                        </div>

                        <div className="detail-section">
                            <div className="detail-section__label">Indicator Breakdown</div>
                            <div className="indicator-list">
                                {neighborhood.indicators.map(ind => (
                                    <div key={ind.key} className="indicator-item">
                                        <div className="indicator-item__label-row">
                                            <span className="indicator-item__name">{ind.label}</span>
                                            <span className="indicator-item__value">
                                                {ind.value}{ind.unit}
                                                <span style={{ fontWeight: 400, color: '#9b9895', marginLeft: 6, fontSize: 10 }}>
                                                    {ind.note}
                                                </span>
                                            </span>
                                        </div>
                                        <div className="indicator-item__track">
                                            <div
                                                className="indicator-item__fill"
                                                style={{ width: `${Math.min(100, ind.value)}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="detail-section">
                            <div className="detail-section__label">Score breakdown</div>
                            <p className="detail-section__explanation" style={{ fontSize: '12px' }}>
                                <strong>Shift Score</strong> = 55% × (100 − IMD rank) + 45% × TCD rank
                                <br /><br />
                                Both indicators are percentile-ranked within Lazio (378 comuni).
                                High score = low soil sealing + high green cover relative to regional peers.
                            </p>
                        </div>

                        <div className="detail-section">
                            <div className="detail-section__label">Data Sources</div>
                            <p className="detail-section__explanation" style={{ fontSize: '11px' }}>
                                IMD — Copernicus HRL Imperviousness Density 2018, 10 m, EPSG:3035.<br />
                                TCD — Copernicus HRL Tree Cover Density 2018, 10 m, EPSG:3035 (modelled where tiles missing).<br />
                                Boundaries — ISTAT comuni 2025, WGS84.<br />
                                Shift Score is a structural signal index, not a price forecast.
                            </p>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
