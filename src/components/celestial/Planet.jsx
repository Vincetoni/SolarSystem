import { useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html, Ring, Sphere } from '@react-three/drei'
import * as THREE from 'three'

function seededAngle(seed) {
  const source = seed.split('').reduce((total, char) => total + char.charCodeAt(0), 0)
  const normalized = Math.abs(Math.sin(source * 12.9898)) % 1
  return normalized * Math.PI * 2
}

function Planet({
  data,
  speedMultiplier,
  isPaused,
  isFocused,
  onClick,
  onFocusPositionChange,
}) {
  const groupRef = useRef(null)
  const planetRef = useRef(null)
  const moonRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const startAngle = useMemo(() => seededAngle(data.name), [data.name])
  const moonStartAngle = useMemo(() => seededAngle(`${data.name}-moon`), [data.name])

  useFrame((state, delta) => {
    if (!groupRef.current || !planetRef.current) {
      return
    }

    if (!isPaused) {
      const time = state.clock.elapsedTime
      const orbitSpeed = data.speed * speedMultiplier * 0.1
      const angle = startAngle + time * orbitSpeed

      groupRef.current.position.x = Math.cos(angle) * data.distance
      groupRef.current.position.z = Math.sin(angle) * data.distance
      planetRef.current.rotation.y += delta * 0.7

      if (data.hasMoon && moonRef.current) {
        const moonAngle = moonStartAngle + time * 2
        moonRef.current.position.x = Math.cos(moonAngle) * 2
        moonRef.current.position.z = Math.sin(moonAngle) * 2
      }
    }

    if (isFocused && onFocusPositionChange) {
      const { x, y, z } = groupRef.current.position
      onFocusPositionChange([x, y, z])
    }
  })

  const handleClick = (event) => {
    event.stopPropagation()
    const { x, y, z } = groupRef.current.position
    onClick(data, [x, y, z])
  }

  return (
    <group ref={groupRef}>
      <group
        onClick={handleClick}
        onPointerOver={() => setIsHovered(true)}
        onPointerOut={() => setIsHovered(false)}
      >
        <Sphere ref={planetRef} args={[data.radius, 32, 32]} castShadow receiveShadow>
          <meshStandardMaterial
            color={data.color}
            emissive={isFocused ? data.color : '#000000'}
            emissiveIntensity={isFocused ? 0.22 : 0}
            roughness={0.95}
            metalness={0.06}
          />
        </Sphere>
        {data.hasRings && (
          <Ring
            args={[data.radius * 1.5, data.radius * 2.35, 64]}
            rotation={[-Math.PI / 2.4, 0, 0]}
          >
            <meshStandardMaterial
              color="#ccb28a"
              transparent
              opacity={0.72}
              side={THREE.DoubleSide}
            />
          </Ring>
        )}
        {(isHovered || isFocused) && (
          <Html position={[0, data.radius + 0.95, 0]} center distanceFactor={9}>
            <div className="planet-label">{data.name}</div>
          </Html>
        )}
        {data.hasMoon && (
          <group ref={moonRef}>
            <Sphere args={[0.27, 16, 16]} castShadow>
              <meshStandardMaterial color="#d6d6d6" roughness={1} />
            </Sphere>
          </group>
        )}
      </group>
    </group>
  )
}

export default Planet
