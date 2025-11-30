"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars, Environment } from "@react-three/drei";
import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import { useHardwareTier, HardwareTier } from "@/hooks/useHardwareTier";

function ElasticCamera({ tier }: { tier: HardwareTier }) {
    const { camera, viewport, size } = useThree();

    useFrame(() => {
        // Elastic Camera Logic: z = BaseDistance + (1 / aspect) * ScaleFactor
        // Base distance 5, ScaleFactor ~2. Adjust as needed.
        const aspect = size.width / size.height;
        const baseDistance = 4;
        const scaleFactor = 2.5;

        // Target Z based on aspect ratio
        const targetZ = baseDistance + (1 / aspect) * scaleFactor;

        // Smoothly interpolate camera position
        camera.position.z += (targetZ - camera.position.z) * 0.1;
        camera.updateProjectionMatrix();
    });

    return null;
}

function ParticleNetwork({ tier }: { tier: HardwareTier }) {
    const pointsRef = useRef<THREE.Points>(null);
    const { mouse } = useThree();

    // Generate particles based on tier count
    const particlesPosition = useMemo(() => {
        const count = tier.particleCount;
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
    }, [tier.particleCount]);

    useFrame((state) => {
        if (!pointsRef.current) return;
        const t = state.clock.getElapsedTime();

        // Base rotation (Auto-rotation)
        // On mobile (touch), we rely more on this auto-rotation
        const autoRotationSpeed = tier.isMobile ? 0.1 : 0.05;
        pointsRef.current.rotation.y = t * autoRotationSpeed;
        pointsRef.current.rotation.x = t * (autoRotationSpeed * 0.4);

        // Mouse Parallax (Desktop only)
        if (!tier.isMobile) {
            // mouse.x and mouse.y are normalized (-1 to 1)
            const targetRotationY = mouse.x * 0.2;
            const targetRotationX = -mouse.y * 0.2;

            // Smoothly interpolate towards mouse target
            // We add this to the base rotation or offset it
            // Here we'll just add a subtle offset to the auto-rotation
            pointsRef.current.rotation.y += (targetRotationY - pointsRef.current.rotation.y) * 0.05;
            pointsRef.current.rotation.x += (targetRotationX - pointsRef.current.rotation.x) * 0.05;
        }
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
                size={tier.isMobile ? 0.03 : 0.02} // Slightly larger on mobile for visibility with fewer particles
                color="#4F46E5" // Indigo
                transparent
                opacity={0.8}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

function Scene({ tier }: { tier: HardwareTier }) {
    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#2DD4BF" />
            <pointLight position={[-10, -10, -10]} intensity={1} color="#818CF8" />

            <Stars
                radius={100}
                depth={50}
                count={tier.isMobile ? 1000 : 5000}
                factor={4}
                saturation={0}
                fade
                speed={1}
            />

            <ParticleNetwork tier={tier} />
            <ElasticCamera tier={tier} />

            <Environment preset="city" />

            {/* Fog for depth */}
            <fog attach="fog" args={["#02040A", 5, 20]} />
        </>
    );
}

export function HeroScene() {
    const tier = useHardwareTier();

    return (
        <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 6], fov: 45 }}
                dpr={tier.dpr}
                gl={{ antialias: !tier.isMobile }} // Disable antialias on mobile for perf
            >
                <Scene tier={tier} />
            </Canvas>
        </div>
    );
}
