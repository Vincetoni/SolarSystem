import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import Galaxy from '../celestial/Galaxy'
import Sun from '../celestial/Sun'
import { useEffect, useState } from 'react'
import { PLANET_DATA } from '../../data/planets' 
import Planet from '../celestial/Planet'
export const SolarScene = () => {
  const [speed, setSpeed] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  
  const handlePlanetClick = (planetData, position) => {
    console.log('Clicked:', planetData.name, 'at', position);
  };
  return (
    <Canvas camera={{ position: [0, 12, 45], fov: 60 }}>
      <color attach="background" args={['#1a1818']} />
      <ambientLight intensity={0.3} />
      <Sun />
    {PLANET_DATA.map((planet) => (
    <Planet
          key={planet.name}  // React needs this
          data={planet}
          speedMultiplier={speed}
          isPaused={isPaused}
          onClick={handlePlanetClick}
    />
      ))}
      <Galaxy />
      <Stars radius={300} depth={40} count={5000} factor={4} saturation={0} fade />
      <OrbitControls enablePan={false} />
    </Canvas>
  )
}
