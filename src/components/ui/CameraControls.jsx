export default function CameraControls({
  selectedPlanet,
  focusedPlanet,
  focusSelectedPlanet,
  resetFocus,
}) {
  return (
    <div className="camera-controls">
      <button className="control-btn" type="button" onClick={resetFocus}>
        Reset View
      </button>
      <button
        className="control-btn accent"
        type="button"
        disabled={!selectedPlanet}
        onClick={() => {
          if (focusSelectedPlanet) {
            focusSelectedPlanet()
          }
        }}
      >
        {selectedPlanet
          ? focusedPlanet === selectedPlanet.name
            ? `Tracking ${selectedPlanet.name}`
            : `Focus ${selectedPlanet.name}`
          : 'Select a planet'}
      </button>
    </div>
  )
}
