import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import neighborhoods from '../data/neighborhoods.json'

const scoreMap = Object.fromEntries(neighborhoods.map(n => [n.id, n.shiftScore]))

function scoreToColor(score) {
    const t = Math.max(0, Math.min(1, score / 100))
    if (t < 0.5) {
        const r = Math.round(217 + (106 - 217) * (t / 0.5))
        const g = Math.round(232 + (180 - 232) * (t / 0.5))
        const b = Math.round(226 + (160 - 226) * (t / 0.5))
        return `rgb(${r},${g},${b})`
    } else {
        const t2 = (t - 0.5) / 0.5
        const r = Math.round(106 + (30 - 106) * t2)
        const g = Math.round(180 + (107 - 180) * t2)
        const b = Math.round(160 + (92 - 160) * t2)
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
            center: [41.878, 12.514],
            zoom: 13,
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

        // Fetch GeoJSON from public folder
        fetch('/rome-neighborhoods.geojson')
            .then(r => r.json())
            .then(geojson => {
                L.geoJSON(geojson, {
                    style: (feature) => {
                        const id = feature.properties.id
                        const score = scoreMap[id] ?? 50
                        return {
                            fillColor: scoreToColor(score),
                            fillOpacity: 0.72,
                            color: '#ffffff',
                            weight: 2,
                            opacity: 1,
                        }
                    },
                    onEachFeature: (feature, layer) => {
                        const id = feature.properties.id
                        layersRef.current[id] = layer

                        const score = scoreMap[id]
                        layer.bindTooltip(
                            `<strong>${feature.properties.name}</strong><br/>Shift Score: ${score}`,
                            { sticky: true }
                        )

                        layer.on('click', () => {
                            const neighborhood = data.find(n => n.id === id)
                            if (neighborhood) onSelect(neighborhood)
                        })

                        layer.on('mouseover', function () {
                            if (id !== selectedId) {
                                this.setStyle({ fillOpacity: 0.9, weight: 3 })
                            }
                        })
                        layer.on('mouseout', function () {
                            if (id !== selectedId) {
                                this.setStyle({ fillOpacity: 0.72, weight: 2 })
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
                layer.setStyle({ fillOpacity: 0.95, weight: 3, color: '#1e6b5c' })
                layer.bringToFront()
            } else {
                layer.setStyle({ fillOpacity: 0.72, weight: 2, color: '#ffffff' })
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
                    <span>Low</span>
                    <span>High</span>
                </div>
            </div>
            <div className={`map-hint${selectedId ? ' hidden' : ''}`}>
                Click a neighbourhood to explore
            </div>
        </>
    )
}
