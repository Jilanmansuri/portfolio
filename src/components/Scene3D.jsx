import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, MeshDistortMaterial } from '@react-three/drei';

// Single minimal 3D element with mouse parallax
function MinimalShape({ mousePosition }) {
    const meshRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            const time = state.clock.getElapsedTime();

            // Slow, gentle floating motion
            meshRef.current.position.y = Math.sin(time * 0.3) * 0.3;

            // Slow, smooth rotation
            meshRef.current.rotation.x = time * 0.05;
            meshRef.current.rotation.y = time * 0.08;

            // Subtle mouse parallax effect
            meshRef.current.rotation.z = mousePosition.x * 0.1;
            meshRef.current.position.x = mousePosition.x * 0.5;
        }
    });

    return (
        <mesh ref={meshRef} position={[0, 0, 0]}>
            <RoundedBox args={[2.5, 2.5, 2.5]} radius={0.5} smoothness={10}>
                <MeshDistortMaterial
                    color="#ec4899"
                    attach="material"
                    distort={0.4}
                    speed={1.5}
                    roughness={0.2}
                    metalness={0.8}
                    transparent
                    opacity={0.15}
                    emissive="#f97316"
                    emissiveIntensity={0.2}
                />
            </RoundedBox>
        </mesh>
    );
}

// Main minimal 3D Scene Component
export default function Scene3D({ theme }) {
    const mousePosition = useRef({ x: 0, y: 0 });

    // Track mouse movement for parallax
    React.useEffect(() => {
        const handleMouseMove = (e) => {
            mousePosition.current = {
                x: (e.clientX / window.innerWidth) * 2 - 1,
                y: -(e.clientY / window.innerHeight) * 2 + 1
            };
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="scene-3d-container">
            <Canvas
                camera={{ position: [0, 0, 8], fov: 35 }}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 0,
                    pointerEvents: 'none'
                }}
            >
                {/* Soft ambient lighting */}
                <ambientLight intensity={0.3} />

                {/* Subtle accent lights */}
                <pointLight position={[5, 5, 5]} intensity={0.5} color="#ec4899" />
                <pointLight position={[-5, -5, -5]} intensity={0.3} color="#f97316" />

                {/* Single minimal shape */}
                <MinimalShape mousePosition={mousePosition.current} />
            </Canvas>
        </div>
    );
}
