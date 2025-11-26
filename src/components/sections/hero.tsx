"use client";

import { Button } from "@/components/ui/button";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import type { MouseEvent } from "react";
import { ArrowRight } from "lucide-react";
import { HeroScene } from "@/components/hero/HeroScene";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Hero() {
    const prefersReducedMotion = useReducedMotion();
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springX = useSpring(mouseX, { stiffness: 80, damping: 12, mass: 0.4 });
    const springY = useSpring(mouseY, { stiffness: 80, damping: 12, mass: 0.4 });

    const rotateX = useTransform(springY, [-150, 150], [8, -8]);
    const rotateY = useTransform(springX, [-150, 150], [-8, 8]);
    const translateX = useTransform(springX, [-200, 200], [-12, 12]);
    const translateY = useTransform(springY, [-200, 200], [-8, 8]);

    const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
        if (prefersReducedMotion) return;

        const { innerWidth, innerHeight } = window;
        const x = event.clientX - innerWidth / 2;
        const y = event.clientY - innerHeight / 2;

        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.section
            className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            {/* 3D Background Scene */}
            <HeroScene />

            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-midnight/50 to-midnight pointer-events-none" />

            {/* Subtle moving glow tied to cursor */}
            <motion.div
                aria-hidden
                className="absolute inset-0 z-0"
                style={{
                    translateX,
                    translateY,
                    background: "radial-gradient(circle at 40% 40%, rgba(45,212,191,0.15), transparent 40%)",
                }}
            />

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div className="max-w-4xl mx-auto" style={{ rotateX, rotateY, translateX, translateY }}>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
                        <motion.span
                            className="flex h-2 w-2 rounded-full bg-electric-teal"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
                        />
                        <span className="text-xs font-medium text-slate-200 tracking-wide uppercase">
                            Applied Intelligence by Aavkar
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-white leading-tight mb-6 drop-shadow-2xl">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                            className="block"
                        >
                            AI doesn’t create advantage.
                        </motion.span>
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.45 }}
                            className="block"
                        >
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-teal to-blue-violet">
                                Intelligent humans
                            </span>{" "}
                            using AI do.
                        </motion.span>
                    </h1>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
                        className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-md"
                    >
                        We design AI-native workflows, copilots, and digital employees for creative, learning, health, and operations teams that want to work smarter, not louder.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.75 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <MagneticButton>
                            <Button size="lg" className="group relative overflow-hidden">
                                <span className="relative z-10 flex items-center">
                                    Book an AI Strategy Call
                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-electric-teal to-blue-violet opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </Button>
                        </MagneticButton>

                        <MagneticButton>
                            <Button variant="outline" size="lg" className="backdrop-blur-sm bg-white/5 border-white/10 hover:bg-white/10">
                                Explore our approach
                            </Button>
                        </MagneticButton>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
            >
                <span className="text-xs text-slate-500 uppercase tracking-widest">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-slate-500 to-transparent" />
            </motion.div>
        </motion.section>
    );
}
