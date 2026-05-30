"use client";

import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

function FloatingShapes() {
  const group = useRef<THREE.Group>(null);
  
  // Generate random shapes
  const shapes = useMemo(() => {
    return Array.from({ length: 25 }).map(() => ({
      position: [
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 15 - 5
      ] as [number, number, number],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        0
      ] as [number, number, number],
      scale: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.15 + 0.05,
      type: Math.random() > 0.5 ? 'box' : 'icosahedron'
    }));
  }, []);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
      group.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.05) * 0.1;
    }
  });

  return (
    <group ref={group}>
      {shapes.map((shape, i) => (
        <Float 
          key={i} 
          speed={shape.speed * 3} 
          rotationIntensity={1.5} 
          floatIntensity={2}
          position={shape.position}
        >
          <mesh rotation={shape.rotation} scale={shape.scale}>
            {shape.type === 'box' ? (
              <boxGeometry args={[1, 1, 1]} />
            ) : (
              <icosahedronGeometry args={[1, 0]} />
            )}
            <meshStandardMaterial 
              color="#ffffff" 
              roughness={0.1} 
              metalness={0.5}
              envMapIntensity={2}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export default function ThreeBackground() {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return (
      <div className="fixed inset-0 z-[-1] bg-slate-50 pointer-events-none overflow-hidden">
        {/* Subtle overlay gradient to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/30 to-white/60 z-[1]" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[-1] bg-slate-50 pointer-events-none overflow-hidden">
      <Canvas camera={{ position: [0, 0, 15], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#94a3b8" />
        
        <FloatingShapes />
        
        <Environment preset="city" />
        <ContactShadows position={[0, -10, 0]} opacity={0.3} scale={50} blur={2.5} far={15} />
      </Canvas>
      
      {/* Subtle overlay gradient to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/30 to-white/60 z-[1]" />
    </div>
  );
}
