"use client";

/**
 * HeroScene.tsx
 * Purpose: Renders a subtle, interactive 3D background for the Hero section.
 * Libraries: @react-three/fiber, @react-three/drei, three
 * Performance: Uses instanced mesh or simple geometry to keep draw calls low.
 *              Should only render when in viewport (handled by parent or inherent R3F behavior).
 */

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

function NeuralNode({ position, mouse }: { position: [number, number, number]; mouse: React.MutableRefObject<[number, number]> }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHover] = useState(false);

    useFrame((state, delta) => {
        if (!meshRef.current) return;

        // Subtle rotation
        meshRef.current.rotation.x += delta * 0.2;
        meshRef.current.rotation.y += delta * 0.15;

        // Mouse interaction (parallax)
        const x = (mouse.current[0] * state.viewport.width) / 50;
        const y = (mouse.current[1] * state.viewport.height) / 50;

        meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, position[0] + x, 0.1);
        meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, position[1] + y, 0.1);
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <mesh
                ref={meshRef}
                position={position}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
            >
                <icosahedronGeometry args={[1, 1]} />
                <meshStandardMaterial
                    color={hovered ? "#2DD4BF" : "#818CF8"}
                    wireframe
                    transparent
                    opacity={0.3}
                    roughness={0}
                    metalness={0.5}
                />
            </mesh>
        </Float>
    );
}

function Scene() {
    const mouse = useRef<[number, number]>([0, 0]);

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            mouse.current = [
                (event.clientX / window.innerWidth) * 2 - 1,
                -(event.clientY / window.innerHeight) * 2 + 1,
            ];
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#2DD4BF" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#818CF8" />

            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

            {/* Central "Neural" Cluster */}
            <group>
                <NeuralNode position={[0, 0, 0]} mouse={mouse} />
                <NeuralNode position={[-2, 1, -2]} mouse={mouse} />
                <NeuralNode position={[2, -1, -2]} mouse={mouse} />
                <NeuralNode position={[0, 2, -3]} mouse={mouse} />
                <NeuralNode position={[0, -2, -3]} mouse={mouse} />
            </group>

            {/* Fog for depth */}
            <fog attach="fog" args={["#02040A", 5, 20]} />
        </>
    );
}

export function HeroScene() {
    return (
        <div className="absolute inset-0 z-0 opacity-60">
            <Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={[1, 2]}>
                <Scene />
            </Canvas>
        </div>
    );
}
