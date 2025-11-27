"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Stars, Environment } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";

function FluidSphere() {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHover] = useState(false);

    useFrame((state) => {
        if (!meshRef.current) return;
        const t = state.clock.getElapsedTime();
        meshRef.current.rotation.x = t * 0.2;
        meshRef.current.rotation.y = t * 0.3;

        // Mouse interaction could go here
    });

    return (
        <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
            <Sphere args={[1.5, 64, 64]} ref={meshRef} onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)}>
                <MeshDistortMaterial
                    color={hovered ? "#2DD4BF" : "#4338ca"}
                    attach="material"
                    distort={0.5} // Strength, 0 disables the effect (default=1)
                    speed={2} // Speed (default=1)
                    roughness={0.2}
                    metalness={0.8}
                />
            </Sphere>
        </Float>
    );
}

function Scene() {
    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#2DD4BF" />
            <pointLight position={[-10, -10, -10]} intensity={1} color="#818CF8" />

            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

            <FluidSphere />

            <Environment preset="city" />

            {/* Fog for depth */}
            <fog attach="fog" args={["#02040A", 5, 20]} />
        </>
    );
}

export function HeroScene() {
    return (
        <div className="absolute inset-0 z-0 opacity-80">
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]}>
                <Scene />
            </Canvas>
        </div>
    );
}
