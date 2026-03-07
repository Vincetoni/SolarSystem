import SpeedControl from './SpeedControl'
import CameraControls from './CameraControls'

export default function ControlPanel({
  speed,
  setSpeed,
  isPaused,
  setIsPaused,
  selectedPlanet,
  focusedPlanet,
  focusSelectedPlanet,
  resetFocus,
}) {
  return (
    <section className="control-panel">
      <button
        onClick={() => setIsPaused(!isPaused)}
        className="control-btn"
        type="button"
      >
        {isPaused ? 'Resume Motion' : 'Pause Motion'}
      </button>
      <SpeedControl speed={speed} setSpeed={setSpeed} />
      <CameraControls
        selectedPlanet={selectedPlanet}
        focusedPlanet={focusedPlanet}
        focusSelectedPlanet={focusSelectedPlanet}
        resetFocus={resetFocus}
      />
    </section>
  )
}
