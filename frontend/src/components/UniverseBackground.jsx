import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, PointMaterial, Points } from '@react-three/drei';
import * as THREE from 'three';

// --------------------------------------------------------
// 1. Starfield Component (The Universe)
// --------------------------------------------------------
function Starfield({ theme }) {
    const pointsRef = useRef();

    // Decide star color based on theme
    const starColor = theme === 'light' ? '#ea580c' : '#ffffff';

    // Generate random positions for stars
    const particlesCount = 2000;
    const positions = useMemo(() => {
        const pos = new Float32Array(particlesCount * 3);
        for (let i = 0; i < particlesCount; i++) {
            // Spread the particles in a large sphere area
            pos[i * 3] = (Math.random() - 0.5) * 15;     // x
            pos[i * 3 + 1] = (Math.random() - 0.5) * 15; // y
            pos[i * 3 + 2] = (Math.random() - 0.5) * 15; // z
        }
        return pos;
    }, []);

    useFrame((state, delta) => {
        if (pointsRef.current) {
            // Smooth continuous rotation of the starfield
            pointsRef.current.rotation.x -= delta * 0.02;
            pointsRef.current.rotation.y -= delta * 0.03;
        }
    });

    return (
        <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color={starColor}
                size={0.015} // Dramatically reduced size (was 0.05)
                sizeAttenuation={true}
                depthWrite={false}
                opacity={theme === 'light' ? 0.1 : 0.25} // Dramatically reduced opacity
            />
        </Points>
    );
}

// --------------------------------------------------------
// 2. Celestial Body Component (Minimal Distorted Sphere)
// --------------------------------------------------------
function CelestialBody({ theme }) {
    const meshRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            const time = state.clock.getElapsedTime();
            // Slow hover floating
            meshRef.current.position.y = Math.sin(time * 0.5) * 0.2;
            // Gentle rotation
            meshRef.current.rotation.y = time * 0.1;
        }
    });

    const isLight = theme === 'light';
    const mainColor = isLight ? '#f97316' : '#ec4899'; // Orange in Light, Pink in Dark
    const emissiveColor = isLight ? '#ea580c' : '#f97316';
    const opacityVal = isLight ? 0.05 : 0.08; // Reduced opacity (was 0.08/0.15)

    return (
        <mesh ref={meshRef} position={[3.5, 0, -3]}>
            {/* Slightly larger sphere to serve as a backdrop body */}
            <Sphere args={[2, 64, 64]}>
                <MeshDistortMaterial
                    color={mainColor}
                    attach="material"
                    distort={0.4}       // Creates organic flowing shape
                    speed={1.5}         // Distortion speed
                    roughness={0.2}
                    metalness={0.8}
                    transparent
                    opacity={opacityVal}
                    emissive={emissiveColor}
                    emissiveIntensity={0.1} // Reduced intensity (was 0.2)
                    wireframe={isLight} // Wireframe structure in light mode for minimal look
                />
            </Sphere>
        </mesh>
    );
}

// --------------------------------------------------------
// 3. Main Universe Background Wrapper
// --------------------------------------------------------
export default function UniverseBackground({ theme }) {
    return (
        <div
            className="universe-background-container"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: -1, // Sits definitively behind standard content
                pointerEvents: 'none', // Do not block mouse interactions on the page
                background: 'transparent'
            }}
        >
            <Canvas
                camera={{ position: [0, 0, 5], fov: 60 }}
                gl={{ antialias: true, alpha: true }}
            >
                {/* Soft ambient light to keep everything visible */}
                <ambientLight intensity={theme === 'light' ? 0.5 : 0.2} />

                {/* Point lights for depth */}
                <pointLight position={[5, 5, 5]} intensity={0.5} color={theme === 'light' ? '#f97316' : '#ec4899'} />
                <pointLight position={[-5, -5, -5]} intensity={0.3} color="#38bdf8" />

                {/* 3D Elements */}
                <Starfield theme={theme} />
                <CelestialBody theme={theme} />
            </Canvas>
        </div>
    );
}
