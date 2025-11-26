"use client";

/**
 * HeroScene.tsx
 * Purpose: Renders a subtle, interactive 3D background for the Hero section.
 * Libraries: @react-three/fiber, @react-three/drei, three
 * Performance: Uses instanced mesh or simple geometry to keep draw calls low.
 *              Should only render when in viewport (handled by parent or inherent R3F behavior).
 */

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Stars, useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

interface HeroSceneProps {
    scrollProgress?: number;
}

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

function TechShard({ progress }: { progress?: number }) {
    const { scene } = useGLTF("/models/tech-orb.gltf");
    const shardRef = useRef<THREE.Group>(null);

    useFrame((state, delta) => {
        if (!shardRef.current) return;
        const rotationOffset = (progress ?? 0) * Math.PI * 2;
        shardRef.current.rotation.y += delta * 0.35 + rotationOffset * 0.05;
        shardRef.current.rotation.x = THREE.MathUtils.lerp(
            shardRef.current.rotation.x,
            0.3 + rotationOffset * 0.2,
            0.08
        );
    });

    const clonedScene = useMemo(() => scene.clone(true), [scene]);

    return (
        <group ref={shardRef} scale={1.8} position={[0, 0, -2]}>
            <primitive object={clonedScene} />
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[2, 0.02, 16, 100]} />
                <meshBasicMaterial color="#2DD4BF" transparent opacity={0.2} />
            </mesh>
        </group>
    );
}

function Scene({ progress }: { progress?: number }) {
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
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#2DD4BF" />
            <pointLight position={[-10, -10, -10]} intensity={0.4} color="#818CF8" />
            <Environment preset="city" />

            <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />

            <TechShard progress={progress} />

            <group>
                <NeuralNode position={[0, 0, 0]} mouse={mouse} />
                <NeuralNode position={[-2, 1, -2]} mouse={mouse} />
                <NeuralNode position={[2, -1, -2]} mouse={mouse} />
                <NeuralNode position={[0, 2, -3]} mouse={mouse} />
                <NeuralNode position={[0, -2, -3]} mouse={mouse} />
            </group>

            <fog attach="fog" args={["#02040A", 5, 20]} />
        </>
    );
}

export function HeroScene({ scrollProgress }: HeroSceneProps) {
    return (
        <div className="absolute inset-0 z-0 opacity-60">
            <Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={[1, 2]}>
                <Scene progress={scrollProgress} />
            </Canvas>
        </div>
    );
}

useGLTF.preload("/models/tech-orb.gltf");
