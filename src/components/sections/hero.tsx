"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { HeroScene } from "@/components/hero/HeroScene";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useSmoothScrollContainer } from "@/components/layout/SmoothScrollProvider";

export function Hero() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const scroller = useSmoothScrollContainer();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!sectionRef.current || !scroller) return;
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top top",
                end: "bottom+=200 top",
                scroller,
                scrub: true,
                onUpdate: (self) => setProgress(self.progress),
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [scroller]);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
        >
            {/* 3D Background Scene */}
            <HeroScene scrollProgress={progress} />

            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-midnight/50 to-midnight pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="hero-kicker inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
                        <span className="flex h-2 w-2 rounded-full bg-electric-teal animate-pulse" />
                        <span className="text-xs font-medium text-slate-300 tracking-wide uppercase">
                            Applied Intelligence by Aavkar
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-white leading-tight mb-6 drop-shadow-2xl">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                            className="hero-line block"
                        >
                            AI doesn’t create advantage.
                        </motion.span>
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                            className="hero-line block"
                        >
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-teal to-blue-violet">
                                Intelligent humans
                            </span>{" "}
                            using AI do.
                        </motion.span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-md" data-animate="fade-up">
                        We design AI-native workflows, copilots, and digital employees for creative, learning, health, and operations teams that want to work smarter, not louder.
                    </p>

                    <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4">
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
                    </div>
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
        </section>
    );
}
