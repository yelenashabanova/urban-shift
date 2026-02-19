export default function DetailPanel({ neighborhood, onClose }) {
    const isOpen = !!neighborhood

    return (
        <div className={`detail-panel${isOpen ? ' open' : ''}`} aria-label="Neighbourhood detail">
            <button className="detail-panel__close" onClick={onClose} aria-label="Close panel">
                ×
            </button>

            {neighborhood && (
                <>
                    <div className="detail-panel__hero">
                        <div className="detail-panel__tag">Neighbourhood</div>
                        <div className="detail-panel__name">{neighborhood.name}</div>
                        <div className="detail-panel__score-row">
                            <span className="detail-panel__score-num">{neighborhood.shiftScore}</span>
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
                                            <span className="indicator-item__value">{ind.value}{ind.unit}</span>
                                        </div>
                                        <div className="indicator-item__track">
                                            <div
                                                className="indicator-item__fill"
                                                style={{ width: `${ind.value}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="detail-section">
                            <div className="detail-section__label">Data Sources</div>
                            <p className="detail-section__explanation" style={{ fontSize: '11px' }}>
                                Indicators derived from Copernicus Land Monitoring Service (Imperviousness Density 2018, Tree Cover Density 2018). Spatial units from ISTAT administrative boundaries 2025.
                                Shift Score is a structural signal index, not a price forecast.
                            </p>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
