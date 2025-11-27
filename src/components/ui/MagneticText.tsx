"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

export function MagneticText({ text, className }: { text: string; className?: string }) {
    const words = text.split(" ");

    return (
        <span className={className}>
            {words.map((word, wordIndex) => (
                <span key={wordIndex} className="inline-block whitespace-nowrap">
                    {word.split("").map((char, charIndex) => (
                        <MagneticChar key={`${wordIndex}-${charIndex}`} char={char} />
                    ))}
                    {wordIndex < words.length - 1 && (
                        <span className="inline-block">&nbsp;</span>
                    )}
                </span>
            ))}
        </span>
    );
}

function MagneticChar({ char }: { char: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current?.getBoundingClientRect() || {
            left: 0,
            top: 0,
            width: 0,
            height: 0,
        };

        const centerX = left + width / 2;
        const centerY = top + height / 2;

        const distance = Math.sqrt(
            Math.pow(clientX - centerX, 2) + Math.pow(clientY - centerY, 2)
        );

        if (distance < 100) {
            const x = (clientX - centerX) * 0.3; // Repel factor
            const y = (clientY - centerY) * 0.3;
            setPosition({ x: -x, y: -y }); // Repel (negative)
        } else {
            setPosition({ x: 0, y: 0 });
        }
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.span
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className="inline-block cursor-default"
        >
            {char === " " ? "\u00A0" : char}
        </motion.span>
    );
}
