export default function SpeedControl({ speed, setSpeed }) {
  return (
    <div className="slider-group">
      <div className="control-copy">
        <span>Time Scale</span>
        <strong>{speed.toFixed(1)}x</strong>
      </div>
      <input
        type="range"
        min="0"
        max="5"
        step="0.1"
        value={speed}
        onChange={(event) => setSpeed(Number(event.target.value))}
        aria-label="Orbital speed control"
      />
    </div>
  )
}
