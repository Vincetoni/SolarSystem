import { useState } from 'react'

export default function useCameraFocus() {
  const [focusedPlanet, setFocusedPlanet] = useState(null)

  const focusPlanet = (planet) => {
    setFocusedPlanet(planet?.name ?? null)
  }

  const resetFocus = () => {
    setFocusedPlanet(null)
  }

  return {
    focusedPlanet,
    focusPlanet,
    resetFocus,
  }
}
