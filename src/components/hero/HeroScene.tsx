"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Environment } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function ParticleNetwork() {
    const pointsRef = useRef<THREE.Points>(null);

    // Create 2000 random points inside a sphere
    const particlesPosition = useMemo(() => {
        const count = 2000;
        const positions = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos((Math.random() * 2) - 1);
            const r = Math.cbrt(Math.random()) * 2; // Radius ~2

            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;
        }

        return positions;
    }, []);

    useFrame((state) => {
        if (!pointsRef.current) return;
        const t = state.clock.getElapsedTime();
        // Slow galaxy rotation
        pointsRef.current.rotation.y = t * 0.05;
        pointsRef.current.rotation.x = t * 0.02;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particlesPosition.length / 3}
                    array={particlesPosition}
                    itemSize={3}
                    args={[particlesPosition, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.02}
                color="#4F46E5" // Indigo
                transparent
                opacity={0.8}
                sizeAttenuation={true}
                depthWrite={false}
            />
        </points>
    );
}

function Scene() {
    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#2DD4BF" />
            <pointLight position={[-10, -10, -10]} intensity={1} color="#818CF8" />

            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

            <ParticleNetwork />

            <Environment preset="city" />

            {/* Fog for depth */}
            <fog attach="fog" args={["#02040A", 5, 20]} />
        </>
    );
}

export function HeroScene() {
    return (
        <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]}>
                <Scene />
            </Canvas>
        </div>
    );
}
