"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false);

    // Raw mouse position (for the dot - instant)
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Spring mouse position (for the ring - smooth lag)
    const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === "BUTTON" ||
                target.tagName === "A" ||
                target.closest("button") ||
                target.closest("a") ||
                target.closest(".interactive")
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [mouseX, mouseY]);

    return (
        <>
            {/* The Dot - Instant tracking */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            >
                <div className="h-2 w-2 rounded-full bg-electric-teal" />
            </motion.div>

            {/* The Ring - Smooth spring following */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-difference"
                style={{
                    x: springX,
                    y: springY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            >
                <motion.div
                    animate={{
                        scale: isHovering ? 3 : 1,
                        opacity: isHovering ? 0.5 : 0.3,
                        borderWidth: isHovering ? "0px" : "1px",
                        backgroundColor: isHovering ? "rgba(45, 212, 191, 0.3)" : "transparent",
                    }}
                    transition={{ duration: 0.2 }}
                    className="h-8 w-8 rounded-full border border-electric-teal"
                />
            </motion.div>
        </>
    );
}
