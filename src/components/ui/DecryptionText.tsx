"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

interface DecryptionTextProps {
    text: string;
    className?: string;
    speed?: number; // ms per character reveal
    maxIterations?: number; // How many times a char scrambles before settling
}

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*";

export function DecryptionText({
    text,
    className = "",
    speed = 30,
    maxIterations = 10
}: DecryptionTextProps) {
    const [displayText, setDisplayText] = useState<{ char: string; isSolved: boolean }[]>(
        text.split("").map(() => ({ char: " ", isSolved: false }))
    );
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    useEffect(() => {
        if (!isInView) return;

        let interval: NodeJS.Timeout;
        let currentIteration = 0;

        const runDecryption = () => {
            interval = setInterval(() => {
                setDisplayText((prev) => {
                    return prev.map((item, index) => {
                        // If already solved, keep it
                        if (item.isSolved) return item;

                        // Calculate "progress" based on iteration and index
                        // This creates the left-to-right flow
                        const progress = currentIteration / maxIterations;
                        const indexProgress = index / text.length;

                        // If we've reached the point to solve this character
                        if (progress > indexProgress + 0.1) { // 0.1 buffer for stagger feel
                            return { char: text[index], isSolved: true };
                        }

                        // Otherwise, return a random character
                        return {
                            char: CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)],
                            isSolved: false
                        };
                    });
                });

                currentIteration++;

                // Stop when we've iterated enough to cover the whole string + buffer
                if (currentIteration > maxIterations + text.length) {
                    clearInterval(interval);
                    // Ensure final state is clean
                    setDisplayText(text.split("").map(char => ({ char, isSolved: true })));
                }
            }, speed);
        };

        runDecryption();

        return () => clearInterval(interval);
    }, [isInView, text, speed, maxIterations]);

    return (
        <span ref={ref} className={className}>
            {displayText.map((item, index) => (
                <span
                    key={index}
                    className={`${item.isSolved
                            ? "text-white"
                            : "text-slate-600 opacity-50"
                        } transition-colors duration-100`}
                >
                    {item.char}
                </span>
            ))}
        </span>
    );
}
