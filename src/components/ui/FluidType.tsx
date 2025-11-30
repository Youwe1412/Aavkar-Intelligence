"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

interface FluidTypeProps {
    text: string;
    className?: string;
    repulsionRadius?: number;
    repulsionStrength?: number;
}

export function FluidType({
    text,
    className = "",
    repulsionRadius = 100,
    repulsionStrength = 50
}: FluidTypeProps) {
    return (
        <span className="inline-block relative">
            {text.split("").map((char, i) => (
                <FluidChar
                    key={i}
                    char={char}
                    className={className}
                    radius={repulsionRadius}
                    strength={repulsionStrength}
                />
            ))}
        </span>
    );
}

function FluidChar({ char, className, radius, strength }: { char: string; className: string; radius: number; strength: number }) {
    const ref = useRef<HTMLSpanElement>(null);
    const x = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });
    const y = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!ref.current) return;

            const rect = ref.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const dx = e.clientX - centerX;
            const dy = e.clientY - centerY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < radius) {
                // Calculate repulsion force
                // The closer the mouse, the stronger the push
                const force = (radius - dist) / radius;

                // Direction vector away from mouse
                const angle = Math.atan2(dy, dx);

                // Push away!
                // We want to push in the opposite direction of the mouse
                const pushX = -Math.cos(angle) * force * strength;
                const pushY = -Math.sin(angle) * force * strength;

                x.set(pushX);
                y.set(pushY);
            } else {
                x.set(0);
                y.set(0);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [radius, strength, x, y]);

    return (
        <motion.span
            ref={ref}
            className={className}
            style={{ x, y, position: "relative", display: "inline-block" }}
        >
            {char === " " ? "\u00A0" : char}
        </motion.span>
    );
}
