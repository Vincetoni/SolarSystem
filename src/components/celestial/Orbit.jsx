import * as THREE from "three"

export default function Orbit({ radius }) {
  const curve = new THREE.EllipseCurve(
    0, 0,
    radius, radius,
    0, 2 * Math.PI,
    false,
    0
  )

  const points = curve.getPoints(100)
  const geometry = new THREE.BufferGeometry().setFromPoints(points)

  return (
    <line geometry={geometry} rotation={[-Math.PI / 2, 0, 0]}>
      <lineBasicMaterial color="#444" />
    </line>
  )
}