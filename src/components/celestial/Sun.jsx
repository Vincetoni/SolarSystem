import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

function Sun() {
  const sunRef = useRef(null)
  const glowRef = useRef(null)

  useFrame((_, delta) => {
    if (sunRef.current) {
      sunRef.current.rotation.y += delta * 0.18
    }

    if (glowRef.current) {
      glowRef.current.rotation.y -= delta * 0.06
    }
  })

  return (
    <group>
      <pointLight intensity={3.4} distance={260} decay={2} color="#ffd27a" castShadow />
      <mesh ref={sunRef} castShadow>
        <sphereGeometry args={[4.2, 64, 64]} />
        <meshStandardMaterial color="#ffb347" emissive="#ff8c1a" emissiveIntensity={2.2} />
      </mesh>
      <mesh ref={glowRef} scale={1.22}>
        <sphereGeometry args={[4.2, 32, 32]} />
        <meshBasicMaterial color="#ffcf70" transparent opacity={0.14} />
      </mesh>
    </group>
  )
}

export default Sun
