import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';

// Single elegant floating sphere for hero section
function HeroSphere() {
    const meshRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            const time = state.clock.getElapsedTime();

            // Very slow, gentle floating
            meshRef.current.position.y = Math.sin(time * 0.4) * 0.2;
            meshRef.current.position.x = Math.cos(time * 0.3) * 0.15;

            // Minimal rotation
            meshRef.current.rotation.y = time * 0.1;
        }
    });

    return (
        <mesh ref={meshRef}>
            <Sphere args={[1.2, 64, 64]}>
                <MeshDistortMaterial
                    color="#ec4899"
                    attach="material"
                    distort={0.3}
                    speed={1.2}
                    roughness={0.1}
                    metalness={0.9}
                    transparent
                    opacity={0.12}
                    emissive="#f97316"
                    emissiveIntensity={0.15}
                />
            </Sphere>
        </mesh>
    );
}

// Minimal floating object for hero
export default function FloatingObjects() {
    return (
        <div className="floating-objects-container">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 40 }}
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '100%',
                    height: '100%',
                    maxWidth: '500px',
                    maxHeight: '500px',
                    pointerEvents: 'none',
                    zIndex: 0
                }}
            >
                <ambientLight intensity={0.2} />
                <pointLight position={[3, 3, 3]} intensity={0.4} color="#ec4899" />

                <HeroSphere />
            </Canvas>
        </div>
    );
}
