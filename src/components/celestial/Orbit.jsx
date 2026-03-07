import { useMemo } from 'react'
import * as THREE from 'three'

export default function Orbit({ radius }) {
  const geometry = useMemo(() => {
    const curve = new THREE.EllipseCurve(0, 0, radius, radius, 0, Math.PI * 2, false, 0)
    const points = curve.getPoints(180)
    return new THREE.BufferGeometry().setFromPoints(points)
  }, [radius])

  return (
    <line geometry={geometry} rotation={[-Math.PI / 2, 0, 0]}>
      <lineBasicMaterial color="#2f3b55" transparent opacity={0.55} />
    </line>
  )
}
