export default function PlanetInfo({ planet, close }) {
  return (
    <aside className={`planet-panel ${planet ? 'is-open' : ''}`} aria-hidden={!planet}>
      {planet ? (
        <>
          <button className="close-btn" onClick={close} aria-label="Close planet details">
            x
          </button>
          <p className="panel-kicker">Planet Profile</p>
          <h2>{planet.name}</h2>
          <p className="panel-description">{planet.description}</p>
          <div className="planet-data">
            <div className="data-card">
              <span>Distance from Sun</span>
              <p>{planet.realDistance}</p>
            </div>
            <div className="data-card">
              <span>Orbital Period</span>
              <p>{planet.orbitalPeriod}</p>
            </div>
            <div className="data-card">
              <span>Moons</span>
              <p>{planet.moons}</p>
            </div>
            <div className="data-card">
              <span>Relative Radius</span>
              <p>{planet.radius} Earths</p>
            </div>
          </div>
        </>
      ) : (
        <>
          <p className="panel-kicker">Planet Profile</p>
          <h2>Select a planet</h2>
          <p className="panel-description">
            Click any planet in the scene to inspect its details and trigger the smooth
            camera focus.
          </p>
        </>
      )}
    </aside>
  )
}
