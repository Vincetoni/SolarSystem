import { useState } from 'react'
import { SolarScene } from './components/scene/SolarScene'
import PlanetInfoPanel from './components/ui/PlanetInfo'
import ControlPanel from './components/ui/ControlPanel'
import useCameraFocus from './hooks/useCameraFocus'

export default function App() {
  const [selectedPlanet, setSelectedPlanet] = useState(null)
  const [speed, setSpeed] = useState(1)
  const [isPaused, setIsPaused] = useState(false)
  const { focusedPlanet, focusPlanet, resetFocus } = useCameraFocus()

  const handlePlanetSelect = (planet) => {
    setSelectedPlanet(planet)
    focusPlanet(planet)
  }

  const handleClosePanel = () => {
    setSelectedPlanet(null)
    resetFocus()
  }

  return (
    <div className="app-container">
      <header className="hero-panel">
        <p className="eyebrow">Interactive 3D Atlas</p>
        <h1>Solar System Explorer</h1>
        <p className="hero-copy">
          Orbit through the eight planets, inspect each world, and control time in
          a responsive real-time scene.
        </p>
      </header>
      <SolarScene
        onPlanetSelect={handlePlanetSelect}
        speed={speed}
        isPaused={isPaused}
        focusedPlanet={focusedPlanet}
      />
      <PlanetInfoPanel
        planet={selectedPlanet}
        close={handleClosePanel}
      />
      <ControlPanel
        speed={speed}
        setSpeed={setSpeed}
        isPaused={isPaused}
        setIsPaused={setIsPaused}
        selectedPlanet={selectedPlanet}
        focusedPlanet={focusedPlanet}
        focusSelectedPlanet={selectedPlanet ? () => focusPlanet(selectedPlanet) : null}
        resetFocus={resetFocus}
      />
    </div>
  )
}
