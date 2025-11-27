"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo, useState, useEffect } from "react";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

// Configuration
const PARTICLE_COUNT = 150;
const CONNECTION_DISTANCE = 2.5;
const MOUSE_REPULSION_RADIUS = 4;
const MOUSE_REPULSION_STRENGTH = 3;
const MOUSE_ATTRACTION_STRENGTH = 0.5;

function Constellation({ isSurging }: { isSurging: boolean }) {
    const { viewport, mouse, camera } = useThree();
    const linesGeometryRef = useRef<THREE.BufferGeometry>(null);
    const pointsRef = useRef<THREE.Points>(null);
    const groupRef = useRef<THREE.Group>(null);

    // Initialize particles
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            temp.push({
                x: (Math.random() - 0.5) * viewport.width * 1.5,
                y: (Math.random() - 0.5) * viewport.height * 1.5,
                vx: (Math.random() - 0.5) * 0.01,
                vy: (Math.random() - 0.5) * 0.01,
                originalX: 0, // Will be set on init
                originalY: 0
            });
        }
        return temp;
    }, [viewport]);

    // Positions for points
    const pointsPosition = useMemo(() => new Float32Array(PARTICLE_COUNT * 3), [particles]);

    // Positions for lines (max possible lines = count * count, but we limit for performance)
    const linesPosition = useMemo(() => new Float32Array(PARTICLE_COUNT * PARTICLE_COUNT * 3), []);

    useFrame((state) => {
        if (!pointsRef.current || !linesGeometryRef.current || !groupRef.current) return;

        // Global Parallax: Rotate the entire group based on mouse position
        // "Neural Handshake" - The scene rotates slightly to face the user
        const targetRotationX = -state.pointer.y * 0.05;
        const targetRotationY = state.pointer.x * 0.05;

        groupRef.current.rotation.x += (targetRotationX - groupRef.current.rotation.x) * 0.1;
        groupRef.current.rotation.y += (targetRotationY - groupRef.current.rotation.y) * 0.1;

        // Mouse position in world space
        const mouseX = (state.pointer.x * viewport.width) / 2;
        const mouseY = (state.pointer.y * viewport.height) / 2;

        let lineVertexIndex = 0;

        // Update particles
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const p = particles[i];

            // Surge effect: accelerate particles when clicking
            const speedMultiplier = isSurging ? 3.0 : 1.0;

            // Basic movement
            p.x += p.vx * speedMultiplier;
            p.y += p.vy * speedMultiplier;

            // Bounce off edges
            if (p.x < -viewport.width / 1.5 || p.x > viewport.width / 1.5) p.vx *= -1;
            if (p.y < -viewport.height / 1.5 || p.y > viewport.height / 1.5) p.vy *= -1;

            // Mouse Physics
            const dx = p.x - mouseX;
            const dy = p.y - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < MOUSE_REPULSION_RADIUS) {
                const force = (MOUSE_REPULSION_RADIUS - dist) / MOUSE_REPULSION_RADIUS;
                const angle = Math.atan2(dy, dx);

                // Repel
                p.x += Math.cos(angle) * force * MOUSE_REPULSION_STRENGTH * 0.05;
                p.y += Math.sin(angle) * force * MOUSE_REPULSION_STRENGTH * 0.05;
            } else if (dist < MOUSE_REPULSION_RADIUS * 1.5) {
                // Slight attraction at the edge of repulsion for "orbit" feel
                const angle = Math.atan2(dy, dx);
                p.x -= Math.cos(angle) * MOUSE_ATTRACTION_STRENGTH * 0.01;
                p.y -= Math.sin(angle) * MOUSE_ATTRACTION_STRENGTH * 0.01;
            }

            // Update point positions
            pointsPosition[i * 3] = p.x;
            pointsPosition[i * 3 + 1] = p.y;
            pointsPosition[i * 3 + 2] = 0;

            // Check connections
            for (let j = i + 1; j < PARTICLE_COUNT; j++) {
                const p2 = particles[j];
                const dx2 = p.x - p2.x;
                const dy2 = p.y - p2.y;
                const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

                if (dist2 < CONNECTION_DISTANCE) {
                    linesPosition[lineVertexIndex++] = p.x;
                    linesPosition[lineVertexIndex++] = p.y;
                    linesPosition[lineVertexIndex++] = 0;

                    linesPosition[lineVertexIndex++] = p2.x;
                    linesPosition[lineVertexIndex++] = p2.y;
                    linesPosition[lineVertexIndex++] = 0;
                }
            }
        }

        pointsRef.current.geometry.attributes.position.needsUpdate = true;

        linesGeometryRef.current.setAttribute(
            'position',
            new THREE.BufferAttribute(linesPosition.slice(0, lineVertexIndex), 3)
        );
        linesGeometryRef.current.attributes.position.needsUpdate = true;
    });

    return (
        <group ref={groupRef}>
            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={PARTICLE_COUNT}
                        array={pointsPosition}
                        itemSize={3}
                        args={[pointsPosition, 3]}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={isSurging ? 0.08 : 0.05}
                    color={isSurging ? "#818CF8" : "#2DD4BF"}
                    transparent
                    opacity={0.8}
                    sizeAttenuation
                />
            </points>
            <lineSegments>
                <bufferGeometry ref={linesGeometryRef} />
                <lineBasicMaterial
                    color={isSurging ? "#A78BFA" : "#818CF8"}
                    transparent
                    opacity={isSurging ? 0.3 : 0.15}
                />
            </lineSegments>
        </group>
    );
}

export function HeroParticles() {
    const [isSurging, setIsSurging] = useState(false);

    useEffect(() => {
        const handleMouseDown = () => setIsSurging(true);
        const handleMouseUp = () => setIsSurging(false);

        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, []);

    return (
        <div className="absolute inset-0 z-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
                <Constellation isSurging={isSurging} />
                <EffectComposer>
                    <Bloom
                        luminanceThreshold={0}
                        luminanceSmoothing={0.9}
                        height={300}
                        intensity={isSurging ? 3.0 : 1.0}
                    />
                </EffectComposer>
            </Canvas>
        </div>
    );
}
