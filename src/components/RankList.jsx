export default function RankList({ neighborhoods, selectedId, onSelect }) {
    return (
        <div className="rank-list">
            <div className="rank-list__header">
                <div className="rank-list__wordmark">Urban Shift</div>
                <div className="rank-list__subtitle">Rome — Shift Score ranking</div>
            </div>
            <div className="rank-list__label">Neighbourhoods</div>
            <div className="rank-list__items">
                {neighborhoods.map((n, idx) => (
                    <div
                        key={n.id}
                        className={`rank-item${selectedId === n.id ? ' active' : ''}`}
                        onClick={() => onSelect(n)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={e => e.key === 'Enter' && onSelect(n)}
                        aria-label={`${n.name}, Shift Score ${n.shiftScore}`}
                    >
                        <span className="rank-item__rank">{idx + 1}</span>
                        <div className="rank-item__info">
                            <div className="rank-item__name">{n.name}</div>
                            <div className="rank-item__score-bar-wrap">
                                <div
                                    className="rank-item__score-bar"
                                    style={{ width: `${n.shiftScore}%` }}
                                />
                            </div>
                        </div>
                        <span className="rank-item__score-val">{n.shiftScore}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
