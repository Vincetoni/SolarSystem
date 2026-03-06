import { useMemo, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { BufferAttribute, BufferGeometry } from 'three'

function Galaxy() {
  const geometry = useMemo(() => {
    const count = 10000
    const positions = new Float32Array(count * 3)

    for (let i = 0; i < count; i += 1) {
      const radius = 80 + Math.random() * 200
      const spinAngle = radius * 0.1
      const branchAngle = (i % 3) * ((Math.PI * 2) / 3)

      const randomX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1)
      const randomY = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1)
      const randomZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1)

      positions[i * 3] = Math.cos(branchAngle + spinAngle) * radius + randomX
      positions[i * 3 + 1] = randomY
      positions[i * 3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ
    }

    const geo = new BufferGeometry()
    geo.setAttribute('position', new BufferAttribute(positions, 3))
    return geo
  }, [])
  
  useEffect(() => {
  return () => geometry.dispose()
}, [geometry])

  return (
    <points geometry={geometry}>
      <pointsMaterial
        size={0.5}
        color="#ffffff"
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  )
}

export default Galaxy
