import React from 'react'
import { useRef } from 'react'
import { useFrame } from "@react-three/fiber"

const Sun = () => {
    const sunRef = useRef();

    useFrame(()=>{
        if (sunRef.current){
            sunRef.current.rotationY +=0.001
        }
    })
  return (
     <group>
     <pointLight
        intensity={3}
        distance={300}
        decay={2}
        color="#ffffff"
      />

      
        <mesh Ref={sunRef}>
       <sphereGeometry args={[5, 64, 64]} />
        <meshStandardMaterial
          emissive={"#ffaa00"}
          emissiveIntensity={2}
          color={"#ffcc66"}
        />
        </mesh>
     </group>
  )
}

export default Sun