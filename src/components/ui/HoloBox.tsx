"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface HoloBoxProps {
    children: React.ReactNode;
    className?: string;
}

export function HoloBox({ children, className = "" }: HoloBoxProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [hovering, setHovering] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseXFromCenter = e.clientX - rect.left - width / 2;
        const mouseYFromCenter = e.clientY - rect.top - height / 2;

        x.set(mouseXFromCenter / width);
        y.set(mouseYFromCenter / height);
    };

    const handleMouseLeave = () => {
        setHovering(false);
        x.set(0);
        y.set(0);
    };

    const handleMouseEnter = () => {
        setHovering(true);
    };

    return (
        <motion.div
            ref={ref}
            className={`relative rounded-xl overflow-hidden bg-black/40 backdrop-blur-md border border-white/10 ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
            style={{
                transformStyle: "preserve-3d",
                rotateX,
                rotateY,
            }}
        >
            {/* Digital Rain / Noise Texture */}
            <div
                className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    backgroundSize: "100px 100px"
                }}
            />

            {/* Perceptual Glare */}
            <motion.div
                className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-300"
                style={{
                    opacity: hovering ? 0.6 : 0,
                    background: useTransform(
                        [mouseX, mouseY],
                        ([latestX, latestY]: any[]) => `radial-gradient(
                            800px circle at ${latestX * 100 + 50}% ${latestY * 100 + 50}%,
                            rgba(255,255,255,0.15),
                            transparent 40%
                        )`
                    ),
                }}
            />

            {/* Border Glow */}
            <motion.div
                className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-300"
                style={{
                    opacity: hovering ? 1 : 0,
                    background: useTransform(
                        [mouseX, mouseY],
                        ([latestX, latestY]: any[]) => `radial-gradient(
                            600px circle at ${latestX * 100 + 50}% ${latestY * 100 + 50}%,
                            rgba(45, 212, 191, 0.15),
                            transparent 40%
                        )`
                    ),
                }}
            />

            {/* Glass Reflection */}
            <div className="absolute inset-0 z-20 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative z-30 h-full transform-gpu" style={{ transform: "translateZ(20px)" }}>
                {children}
            </div>
        </motion.div>
    );
}
