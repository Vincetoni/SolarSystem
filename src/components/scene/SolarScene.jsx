import { Fragment, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import * as THREE from 'three'
import Galaxy from '../celestial/Galaxy'
import Sun from '../celestial/Sun'
import { PLANET_DATA } from '../../data/planets'
import Planet from '../celestial/Planet'
import Orbit from '../celestial/Orbit'
import AsteroidBelt from '../celestial/AsteroidBelt'

function SceneCameraRig({ focusedPlanet, focusPosition }) {
  const controlsRef = useRef(null)
  const { camera } = useThree()
  const defaultPosition = useRef(new THREE.Vector3(0, 12, 45))
  const offset = useRef(new THREE.Vector3(6, 4, 6))
  const target = useRef(new THREE.Vector3())
  const lookAt = useRef(new THREE.Vector3())

  useFrame((_, delta) => {
    if (focusedPlanet && focusPosition) {
      lookAt.current.set(...focusPosition)
      target.current.copy(lookAt.current).add(offset.current)
    } else {
      lookAt.current.set(0, 0, 0)
      target.current.copy(defaultPosition.current)
    }

    const damping = 1 - Math.exp(-delta * 2.2)
    camera.position.lerp(target.current, damping)

    if (controlsRef.current) {
      controlsRef.current.target.lerp(lookAt.current, damping)
      controlsRef.current.update()
    }
  })

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      minDistance={8}
      maxDistance={90}
      maxPolarAngle={Math.PI / 1.7}
    />
  )
}

export function SolarScene({ onPlanetSelect, speed, isPaused, focusedPlanet }) {
  const [focusPosition, setFocusPosition] = useState(null)

  const handlePlanetClick = (planetData, position) => {
    setFocusPosition(position)
    onPlanetSelect(planetData)
  }

  return (
    <Canvas
      camera={{ position: [0, 12, 45], fov: 58 }}
      dpr={[1, 1.75]}
      shadows
    >
      <color attach="background" args={['#030711']} />
      <fog attach="fog" args={['#030711', 55, 135]} />
      <ambientLight intensity={0.28} />
      <Sun />
      {PLANET_DATA.map((planet) => (
        <Fragment key={planet.name}>
          <Orbit radius={planet.distance} />
          <Planet
            data={planet}
            speedMultiplier={speed}
            isPaused={isPaused}
            isFocused={focusedPlanet === planet.name}
            onClick={handlePlanetClick}
            onFocusPositionChange={setFocusPosition}
          />
        </Fragment>
      ))}
      <AsteroidBelt />
      <Galaxy />
      <Stars radius={220} depth={90} count={5500} factor={4} saturation={0} fade />
      <SceneCameraRig focusedPlanet={focusedPlanet} focusPosition={focusPosition} />
    </Canvas>
  )
}
