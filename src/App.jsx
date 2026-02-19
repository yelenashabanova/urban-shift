import { useState } from 'react'
import MapView from './components/MapView'
import DetailPanel from './components/DetailPanel'
import RankList from './components/RankList'
import neighborhoods from './data/neighborhoods.json'

export default function App() {
  const [selected, setSelected] = useState(null)

  const sorted = [...neighborhoods].sort((a, b) => b.shiftScore - a.shiftScore)

  return (
    <div className="app">
      <RankList
        neighborhoods={sorted}
        selectedId={selected?.id}
        onSelect={setSelected}
      />
      <div className="map-container">
        <MapView
          neighborhoods={neighborhoods}
          selectedId={selected?.id}
          onSelect={setSelected}
        />
      </div>
      <DetailPanel
        neighborhood={selected}
        onClose={() => setSelected(null)}
      />
    </div>
  )
}
