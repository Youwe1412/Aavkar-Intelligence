"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Magnetic } from "./Magnetic";

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export function MagneticButton({ children, className = "", onClick }: MagneticButtonProps) {
    const [isHovered, setIsHovered] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <Magnetic>
            <div
                className={`relative group ${className}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onMouseMove={handleMouseMove}
                onClick={onClick}
            >
                {/* Spotlight Gradient / Fluid Fill */}
                <motion.div
                    className="absolute inset-0 rounded-md bg-gradient-to-r from-electric-teal/20 to-blue-violet/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                        background: useMotionTemplate`
                            radial-gradient(
                                150px circle at ${mouseX}px ${mouseY}px,
                                rgba(45, 212, 191, 0.3),
                                transparent 80%
                            )
                        `,
                    }}
                />

                {/* Content */}
                <div className="relative z-10">
                    {children}
                </div>
            </div>
        </Magnetic>
    );
}
