"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * FluidBackground.tsx
 * 
 * Performance Strategy:
 * Instead of a heavy FBO-based fluid solver (which can be expensive on mobile/laptops),
 * we use a domain-warped noise shader.
 * 
 * 1. Geometry: A single fullscreen PlaneGeometry.
 * 2. Shader: Fragment shader uses simplex noise to generate "smoke" patterns.
 * 3. Interaction: Mouse position is passed as a uniform (`uMouse`) to perturb the noise coordinates,
 *    creating a "trail" effect.
 * 4. Optimization: 
 *    - `dpr={[1, 1.5]}` limits pixel ratio to save GPU.
 *    - `pointer-events-none` ensures no DOM blocking.
 *    - No complex physics calculations per frame, just time-based shader math.
 */

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uResolution;
varying vec2 vUv;

// Simplex 2D noise
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 st = gl_FragCoord.xy / uResolution.xy;
  
  // Aspect ratio correction
  st.x *= uResolution.x / uResolution.y;

  // Mouse influence
  vec2 mouse = uMouse;
  mouse.x *= uResolution.x / uResolution.y;
  
  float dist = distance(st, mouse);
  float mouseForce = smoothstep(0.5, 0.0, dist);

  // Domain warping
  vec2 q = vec2(0.);
  q.x = snoise(st + uTime * 0.1);
  q.y = snoise(st + vec2(1.0));

  vec2 r = vec2(0.);
  r.x = snoise(st + 1.0 * q + vec2(1.7, 9.2) + 0.15 * uTime + mouseForce * 0.5);
  r.y = snoise(st + 1.0 * q + vec2(8.3, 2.8) + 0.126 * uTime);

  float f = snoise(st + r);

  // Color palette: Deep Black base -> Cyan/Purple highlights
  vec3 color = vec3(0.02, 0.02, 0.03); // Base dark
  
  // Mix in Cyan
  color = mix(color, vec3(0.176, 0.831, 0.749), clamp(length(q), 0.0, 1.0) * 0.1);
  
  // Mix in Purple
  color = mix(color, vec3(0.506, 0.549, 0.973), clamp(length(r), 0.0, 1.0) * 0.05);

  // Add "smoke" intensity
  color += f * f * f * 0.15;

  gl_FragColor = vec4(color, 1.0);
}
`;

function FluidPlane() {
    const mesh = useRef<THREE.Mesh>(null);
    const { viewport, size } = useThree();

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uMouse: { value: new THREE.Vector2(0, 0) },
            uResolution: { value: new THREE.Vector2(size.width, size.height) },
        }),
        [size]
    );

    useFrame((state) => {
        if (mesh.current) {
            const material = mesh.current.material as THREE.ShaderMaterial;
            material.uniforms.uTime.value = state.clock.getElapsedTime();

            // Smoothly interpolate mouse position for fluid feel
            const targetX = (state.pointer.x * 0.5 + 0.5) * size.width;
            const targetY = (state.pointer.y * 0.5 + 0.5) * size.height;

            material.uniforms.uMouse.value.lerp(new THREE.Vector2(targetX, targetY), 0.1);
        }
    });

    return (
        <mesh ref={mesh} scale={[viewport.width, viewport.height, 1]}>
            <planeGeometry args={[1, 1]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
            />
        </mesh>
    );
}

export function FluidBackground() {
    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none bg-[#050505]">
            <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 1.5]}>
                <FluidPlane />
            </Canvas>
        </div>
    );
}
