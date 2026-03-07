import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function seededValue(seed) {
  const raw = Math.sin(seed * 12.9898) * 43758.5453
  return raw - Math.floor(raw)
}

export default function AsteroidBelt({ count = 600 }) {
  const meshRef = useRef(null)
  const beltRef = useRef(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const asteroids = useMemo(() => {
    return Array.from({ length: count }, (_, index) => {
      const angle = seededValue(index + 1) * Math.PI * 2
      const radius = 18 + seededValue((index + 1) * 2) * 4
      return {
        x: Math.cos(angle) * radius,
        y: (seededValue((index + 1) * 3) - 0.5) * 0.8,
        z: Math.sin(angle) * radius,
        scale: 0.05 + seededValue((index + 1) * 4) * 0.12,
        rotationX: seededValue((index + 1) * 5),
        rotationY: seededValue((index + 1) * 6),
        rotationZ: seededValue((index + 1) * 7),
      }
    })
  }, [count])

  useEffect(() => {
    if (!meshRef.current) {
      return
    }

    asteroids.forEach((asteroid, index) => {
      dummy.position.set(asteroid.x, asteroid.y, asteroid.z)
      dummy.scale.setScalar(asteroid.scale)
      dummy.rotation.set(asteroid.rotationX, asteroid.rotationY, asteroid.rotationZ)
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(index, dummy.matrix)
    })

    meshRef.current.instanceMatrix.needsUpdate = true
  }, [asteroids, dummy])

  useFrame((_, delta) => {
    if (beltRef.current) {
      beltRef.current.rotation.y += delta * 0.04
    }
  })

  return (
    <group ref={beltRef}>
      <instancedMesh ref={meshRef} args={[null, null, count]}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#7e7d88" roughness={1} />
      </instancedMesh>
    </group>
  )
}
