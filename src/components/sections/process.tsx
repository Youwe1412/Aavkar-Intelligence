"use client";

/**
 * Process.tsx
 * Purpose: Scrollytelling implementation of the "From Spec to System" process.
 * Libraries: gsap, ScrollTrigger
 * Interaction: Pins the timeline and lights up steps as the user scrolls.
 */

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        number: "01",
        title: "Listen & Map",
        description: "We don't start with code. We start by mapping your workflows, people, and constraints to understand where intelligence is actually needed.",
    },
    {
        number: "02",
        title: "Design the AI Layer",
        description: "We define the specifications (what good looks like) and the verification loops (how we check it). We decide where AI helps and where humans stay in control.",
    },
    {
        number: "03",
        title: "Build & Pilot",
        description: "We implement the agents and workflows, running controlled pilots with real users and human oversight to ensure safety and quality.",
    },
    {
        number: "04",
        title: "Learn & Scale",
        description: "We monitor performance, refine the system based on feedback, and gradually expand to more teams or domains.",
    },
];

export function Process() {
    const containerRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        if (!containerRef.current || !lineRef.current) return;

        const ctx = gsap.context(() => {
            // Animate the vertical line filling up
            gsap.fromTo(
                lineRef.current,
                { height: "0%" },
                {
                    height: "100%",
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top center",
                        end: "bottom center",
                        scrub: 0.5,
                    },
                }
            );

            // Animate each step
            stepsRef.current.forEach((step) => {
                if (!step) return;

                gsap.fromTo(
                    step,
                    { opacity: 0.3, scale: 0.95, filter: "blur(2px)" },
                    {
                        opacity: 1,
                        scale: 1,
                        filter: "blur(0px)",
                        duration: 0.5,
                        scrollTrigger: {
                            trigger: step,
                            start: "top center+=100",
                            end: "bottom center-=100",
                            toggleActions: "play reverse play reverse",
                        },
                    }
                );
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="py-32 bg-midnight-light relative overflow-hidden" data-animate="fade-up">
            <div className="container mx-auto px-6">
                <div className="text-center mb-24">
                    <span className="text-electric-teal font-medium tracking-wide uppercase text-sm">How We Work</span>
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mt-4">
                        From Spec to System
                    </h2>
                </div>

                <div className="max-w-4xl mx-auto relative">
                    {/* Central Spine */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2">
                        <div ref={lineRef} className="w-full bg-gradient-to-b from-electric-teal to-blue-violet shadow-[0_0_10px_rgba(45,212,191,0.5)]" />
                    </div>

                    <div className="space-y-24 py-12">
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                ref={(el) => { stepsRef.current[index] = el; }}
                                className={`flex flex-col md:flex-row gap-12 items-center ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                                    }`}
                            >
                                <div className="flex-1 w-full md:w-auto">
                                    <div className={`p-8 rounded-2xl bg-midnight border border-white/5 transition-all duration-500 hover:border-electric-teal/30 hover:bg-white/5 ${index % 2 === 0 ? "md:text-left" : "md:text-right"
                                        }`}>
                                        <span className="text-electric-teal font-mono text-xl mb-4 block">{step.number}</span>
                                        <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
                                        <p className="text-slate-400 leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="relative z-10 flex items-center justify-center w-4 h-4 rounded-full bg-midnight border border-electric-teal shadow-[0_0_15px_rgba(45,212,191,0.5)] shrink-0">
                                    <div className="w-1.5 h-1.5 rounded-full bg-electric-teal animate-pulse" />
                                </div>

                                <div className="flex-1 hidden md:block" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
