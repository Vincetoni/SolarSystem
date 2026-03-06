import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export default function AsteroidBelt({ count = 600 }) {

  const meshRef = useRef()

  const dummy = new THREE.Object3D()

  const asteroids = useMemo(() => {
    const positions = []

    for (let i = 0; i < count; i++) {

      const angle = Math.random() * Math.PI * 2

      const radius = 18 + Math.random() * 3

      const x = Math.cos(angle) * radius
      const z = Math.sin(angle) * radius

      const y = (Math.random() - 0.5) * 0.5

      positions.push([x, y, z])
    }

    return positions

  }, [count])

  useFrame(() => {

    asteroids.forEach((pos, i) => {

      dummy.position.set(pos[0], pos[1], pos[2])
      dummy.updateMatrix()

      meshRef.current.setMatrixAt(i, dummy.matrix)

    })

    meshRef.current.instanceMatrix.needsUpdate = true

  })

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <sphereGeometry args={[0.1, 6, 6]} />
      <meshStandardMaterial color="#888" />
    </instancedMesh>
  )
}