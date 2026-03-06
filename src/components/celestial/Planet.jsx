import React, { useRef, useMemo , useState} from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Html, Ring } from '@react-three/drei';
import * as THREE from 'three';

function Planet({ data, speedMultiplier, isPaused, onClick }) {
  const groupRef = useRef();        // Moves around Sun
  const planetRef = useRef();       // Spins on axis
  const moonRef = useRef();         // Moves around Earth
  
  const startAngle = useMemo(() => Math.random() * Math.PI * 2, []);
  const moonStartAngle = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state, delta) => {
    if (isPaused) return;
    if (!groupRef.current || !planetRef.current) return;

    const time = state.clock.elapsedTime;
    const speed = data.speed * speedMultiplier * 0.1;
    const angle = startAngle + time * speed;
    
    groupRef.current.position.x = Math.cos(angle) * data.distance;
    groupRef.current.position.z = Math.sin(angle) * data.distance;
    
    // Earth spins
    planetRef.current.rotation.y += delta * 0.5;
    
    // Moon orbits Earth
    if (data.hasMoon && moonRef.current) {
      const moonAngle = moonStartAngle + time * 2;  // 2 = moon speed
      moonRef.current.position.x = Math.cos(moonAngle) * 2;
      moonRef.current.position.z = Math.sin(moonAngle) * 2;
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    onClick(data, groupRef.current.position);
  };

  return (
    <group ref={groupRef}>
      {/* Everything inside here moves together */}
      <group onClick={handleClick}>
        
        {/* Earth */}
        <Sphere ref={planetRef} args={[data.radius, 32, 32]}>
          <meshStandardMaterial color={data.color} />
        </Sphere>

        {/* Rings */}
        {data.hasRings && (
          <Ring args={[data.radius * 1.4, data.radius * 2.2, 64]} rotation={[-Math.PI / 2, 0, 0]}>
            <meshStandardMaterial color="#C4A484" transparent opacity={0.6} side={THREE.DoubleSide} />
          </Ring>
        )}

        {/* Label */}
        <Html distanceFactor={10}>
          <div style={{color: 'white', fontSize: '12px'}}>{data.name}</div>
        </Html>

        {/* Moon - INSIDE the group, not outside */}
        {data.hasMoon && (
          <group ref={moonRef}>
            <Sphere args={[0.27, 16, 16]}>
              <meshStandardMaterial color="#C0C0C0" />
            </Sphere>
          </group>
        )}
        
      </group>
    </group>
  );
}

export default Planet