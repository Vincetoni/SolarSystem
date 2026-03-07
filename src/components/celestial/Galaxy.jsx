import { useEffect, useMemo } from 'react'
import { BufferAttribute, BufferGeometry } from 'three'

function seededValue(seed) {
  const raw = Math.sin(seed * 12.9898) * 43758.5453
  return raw - Math.floor(raw)
}

function Galaxy() {
  const geometry = useMemo(() => {
    const count = 8500
    const positions = new Float32Array(count * 3)

    for (let index = 0; index < count; index += 1) {
      const radius = 80 + seededValue(index + 1) * 210
      const spinAngle = radius * 0.08
      const branchAngle = (index % 4) * ((Math.PI * 2) / 4)
      const randomX = Math.pow(seededValue((index + 1) * 2), 3) * (seededValue((index + 1) * 3) < 0.5 ? 1 : -1) * 5
      const randomY = Math.pow(seededValue((index + 1) * 4), 3) * (seededValue((index + 1) * 5) < 0.5 ? 1 : -1) * 2
      const randomZ = Math.pow(seededValue((index + 1) * 6), 3) * (seededValue((index + 1) * 7) < 0.5 ? 1 : -1) * 5

      positions[index * 3] = Math.cos(branchAngle + spinAngle) * radius + randomX
      positions[index * 3 + 1] = randomY
      positions[index * 3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ
    }

    const createdGeometry = new BufferGeometry()
    createdGeometry.setAttribute('position', new BufferAttribute(positions, 3))
    return createdGeometry
  }, [])

  useEffect(() => {
    return () => geometry.dispose()
  }, [geometry])

  return (
    <points geometry={geometry}>
      <pointsMaterial size={0.45} color="#d9e6ff" transparent opacity={0.78} sizeAttenuation />
    </points>
  )
}

export default Galaxy
