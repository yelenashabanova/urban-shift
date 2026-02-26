import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import neighborhoods from '../data/lazio_neighborhoods.json'

// Build lookup: id (PRO_COM_T) → { shiftScore, imd }
const scoreMap = Object.fromEntries(
    neighborhoods.map(n => [n.id, { score: n.shiftScore, imd: n.indicators[0]?.value }])
)

function scoreToColor(score) {
    // score 0–100: 0 = highly sealed (dark red/orange), 100 = very green
    const t = Math.max(0, Math.min(1, score / 100))
    if (t < 0.5) {
        const t2 = t / 0.5
        // orange → yellow-green
        const r = Math.round(230 + (180 - 230) * t2)
        const g = Math.round(126 + (200 - 126) * t2)
        const b = Math.round(34 + (80 - 34) * t2)
        return `rgb(${r},${g},${b})`
    } else {
        const t2 = (t - 0.5) / 0.5
        // yellow-green → deep green
        const r = Math.round(180 + (34 - 180) * t2)
        const g = Math.round(200 + (139 - 200) * t2)
        const b = Math.round(80 + (34 - 80) * t2)
        return `rgb(${r},${g},${b})`
    }
}

export default function MapView({ neighborhoods: data, selectedId, onSelect }) {
    const mapRef = useRef(null)
    const mapInstanceRef = useRef(null)
    const layersRef = useRef({})

    useEffect(() => {
        if (mapInstanceRef.current) return

        const map = L.map(mapRef.current, {
            center: [41.9, 12.9],   // centred on Lazio
            zoom: 8,
            zoomControl: true,
            attributionControl: true,
        })

        L.tileLayer(
            'https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png',
            {
                attribution:
                    '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/">CARTO</a>',
                subdomains: 'abcd',
                maxZoom: 19,
            }
        ).addTo(map)

        // Label overlay on top
        L.tileLayer(
            'https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png',
            { attribution: '', subdomains: 'abcd', maxZoom: 19, pane: 'overlayPane' }
        ).addTo(map)

        mapInstanceRef.current = map

        // Fetch real GeoJSON from public folder
        fetch(`${import.meta.env.BASE_URL}municipalities.geojson`)
            .then(r => r.json())
            .then(geojson => {
                L.geoJSON(geojson, {
                    style: (feature) => {
                        const id = feature.properties.id
                        const entry = scoreMap[id]
                        const score = entry?.score ?? 50
                        return {
                            fillColor: scoreToColor(score),
                            fillOpacity: 0.75,
                            color: '#ffffff',
                            weight: 0.8,
                            opacity: 0.9,
                        }
                    },
                    onEachFeature: (feature, layer) => {
                        const id = feature.properties.id
                        layersRef.current[id] = layer

                        const entry = scoreMap[id]
                        const name = feature.properties.name
                        const score = entry?.score?.toFixed(1) ?? '–'
                        const imd = entry?.imd?.toFixed(1) ?? '–'

                        layer.bindTooltip(
                            `<strong>${name}</strong><br/>` +
                            `Shift Score: <b>${score}</b><br/>` +
                            `Imperviousness: ${imd}%`,
                            { sticky: true }
                        )

                        layer.on('click', () => {
                            const neighborhood = data.find(n => n.id === id)
                            if (neighborhood) onSelect(neighborhood)
                        })

                        layer.on('mouseover', function () {
                            if (id !== selectedId) {
                                this.setStyle({ fillOpacity: 0.92, weight: 2 })
                            }
                        })
                        layer.on('mouseout', function () {
                            if (id !== selectedId) {
                                this.setStyle({ fillOpacity: 0.75, weight: 0.8 })
                            }
                        })
                    },
                }).addTo(map)
            })
    }, [])

    // Highlight selected polygon
    useEffect(() => {
        Object.entries(layersRef.current).forEach(([id, layer]) => {
            if (id === selectedId) {
                layer.setStyle({ fillOpacity: 0.95, weight: 2.5, color: '#1e6b5c' })
                layer.bringToFront()
            } else {
                layer.setStyle({ fillOpacity: 0.75, weight: 0.8, color: '#ffffff' })
            }
        })
    }, [selectedId])

    return (
        <>
            <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
            <div className="map-legend">
                <div className="map-legend__title">Shift Score</div>
                <div className="map-legend__bar" />
                <div className="map-legend__labels">
                    <span>Sealed</span>
                    <span>Green</span>
                </div>
            </div>
            <div className={`map-hint${selectedId ? ' hidden' : ''}`}>
                Click a comune to explore
            </div>
        </>
    )
}
