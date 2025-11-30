"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";
const HeroParticles = dynamic(() => import("@/components/hero/HeroParticles").then(mod => mod.HeroParticles), { ssr: false });
import { MagneticButton, FluidType, Magnetic } from "@/components/ui/InteractiveKit";
import gsap from "gsap";

export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const badgeRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            tl.fromTo(badgeRef.current,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8 }
            )
                .fromTo(titleRef.current?.children || [],
                    { y: 50, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1, stagger: 0.2 },
                    "-=0.4"
                )
                .fromTo(descRef.current,
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1 },
                    "-=0.6"
                )
                .fromTo(buttonsRef.current?.children || [],
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
                    "-=0.6"
                )
                .fromTo(scrollRef.current,
                    { opacity: 0 },
                    { opacity: 1, duration: 1, delay: 0.5 }
                );

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden" data-scroll-section>
            {/* 3D Background Scene */}
            <HeroParticles />

            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-midnight/30 via-midnight/70 to-midnight pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10 text-center">
                <div className="max-w-4xl mx-auto">
                    <div ref={badgeRef} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm opacity-0">
                        <span className="flex h-2 w-2 rounded-full bg-electric-teal animate-pulse" />
                        <span className="text-xs font-medium text-slate-300 tracking-wide uppercase">
                            Applied Intelligence by Aavkar
                        </span>
                    </div>

                    <h1 ref={titleRef} className="text-5xl md:text-7xl font-serif font-bold text-white leading-tight mb-6 drop-shadow-2xl">
                        <span className="block opacity-0">
                            <Magnetic className="inline-block">
                                <span className="inline-block">AI doesn’t create advantage.</span>
                            </Magnetic>
                        </span>
                        <span className="block opacity-0">
                            <FluidType
                                text="Intelligent humans"
                                className="text-transparent bg-clip-text bg-gradient-to-r from-electric-teal to-blue-violet bg-fixed"
                            />
                            {" "}
                            <Magnetic className="inline-block">
                                <span className="inline-block">using AI do.</span>
                            </Magnetic>
                        </span>
                    </h1>

                    <p ref={descRef} className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-md opacity-0">
                        We design AI-native workflows, copilots, and digital employees for creative, learning, health, and operations teams that want to work smarter, not louder.
                    </p>

                    <div ref={buttonsRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0">
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
                </div>
            </div>

            {/* Scroll Indicator */}
            <div ref={scrollRef} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 opacity-0">
                <span className="text-xs text-slate-500 uppercase tracking-widest">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-slate-500 to-transparent" />
            </div>
        </section>
    );
}
