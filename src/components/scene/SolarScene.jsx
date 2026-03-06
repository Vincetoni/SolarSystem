import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import Galaxy from '../celestial/Galaxy'
import Sun from '../celestial/Sun'
import { useEffect } from 'react'

export const SolarScene = () => {
  return (
    <Canvas camera={{ position: [0, 12, 45], fov: 60 }}>
      <color attach="background" args={['#1a1818']} />
      <ambientLight intensity={0.3} />
      <Sun />

      <Galaxy />
      <Stars radius={300} depth={40} count={5000} factor={4} saturation={0} fade />
      <OrbitControls enablePan={false} />
    </Canvas>
  )
}
