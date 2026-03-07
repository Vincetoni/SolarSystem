export default function ControlPanel({ speed, setSpeed, isPaused, setIsPaused }) {

  return (
    <div className="control-panel">

      <button
        onClick={() => setIsPaused(!isPaused)}
        className="control-btn"
      >
        {isPaused ? "Resume" : "Pause"}
      </button>

      <div className="slider-group">
        <label>Speed</label>

        <input
          type="range"
          min="0"
          max="5"
          step="0.1"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
        />
      </div>

    </div>
  )
}