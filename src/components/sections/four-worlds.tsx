"use client";

import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Clapperboard, Building2, GraduationCap, HeartPulse } from "lucide-react";
import { useUIStore } from "@/store/uiStore";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const worlds = [
    {
        id: "media",
        icon: Clapperboard,
        title: "Media & Content",
        question: "What if your creative process had a thinking partner?",
        description: "We explore how applied AI can plug into filmmaking, editing, motion graphics, visual effects, and design pipelines, helping creative teams prototype faster, discover new visual directions, and attempt work that would be impossible without generative media AI.",
        color: "text-pink-500",
        bg: "group-hover:bg-pink-500/10",
        gradient: "from-pink-500 to-purple-600",
    },
    {
        id: "education",
        icon: GraduationCap,
        title: "Education",
        question: "What if every learner had a path tuned to their curiosity?",
        description: "We’re interested in where applied AI can genuinely support learning without turning into an answering machine. That means working with schools, creators, and learning teams to make learning more visual, interactive, and personalised, using story, media, and existing AI tools in ways that still keep human teachers and mentors at the centre.",
        color: "text-amber-500",
        bg: "group-hover:bg-amber-500/10",
        gradient: "from-amber-500 to-orange-600",
    },
    {
        id: "health",
        icon: HeartPulse,
        title: "Healthcare & Fitness",
        question: "What if clinicians and coaches had more presence, not more paperwork?",
        description: "We look for opportunities where AI can quietly support clinicians, coaches, and care teams, streamlining notes and follow-ups, surfacing the right information at the right moment, and supporting long-term behaviour change, while humans stay fully responsible for decisions and care.",
        color: "text-emerald-500",
        bg: "group-hover:bg-emerald-500/10",
        gradient: "from-emerald-500 to-teal-600",
    },
    {
        id: "business",
        icon: Building2,
        title: "Business & Enterprise",
        question: "What if digital employees quietly supported every decision?",
        description: "We explore AI agents for onboarding, QA, and operations: digital co-workers that can watch for errors, handle repetitive flows, and keep knowledge at people’s fingertips, so teams can spend more time on judgement, relationships, and higher-value work.",
        color: "text-blue-500",
        bg: "group-hover:bg-blue-500/10",
        gradient: "from-blue-500 to-indigo-600",
    },
];

export function FourWorlds() {
    const setHoveredDomain = useUIStore((state) => state.setHoveredDomain);
    const containerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            cardsRef.current.forEach((card, index) => {
                if (!card) return;

                gsap.fromTo(card,
                    { opacity: 0, y: 50, scale: 0.9 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.8,
                        delay: index * 0.1,
                        scrollTrigger: {
                            trigger: card,
                            start: "top bottom-=100",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="py-24 relative" data-scroll-section>
            <div className="container mx-auto px-6">
                <div className="mb-16">
                    <span className="text-electric-teal font-medium tracking-wide uppercase text-sm">The 4 Worlds</span>
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mt-4 mb-6">
                        Domains of Applied Intelligence
                    </h2>
                    <p className="text-slate-400 max-w-2xl text-lg">
                        We don&apos;t offer a fixed menu of services. We explore what becomes possible in these worlds when we apply intelligence well.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {worlds.map((world, index) => (
                        <div
                            key={index}
                            ref={(el) => { cardsRef.current[index] = el }}
                            onMouseEnter={() => setHoveredDomain(world.id)}
                            onMouseLeave={() => setHoveredDomain(null)}
                            className="group relative"
                        >
                            {/* Animated Border Gradient */}
                            <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:animate-border-spin bg-[length:200%_200%]" />

                            <Card className="h-full relative overflow-hidden border-white/5 bg-midnight/80 backdrop-blur-md hover:border-white/20 transition-colors duration-500 z-10">
                                {/* Hover Gradient Background */}
                                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${world.gradient}`} />

                                <div className="relative z-10 p-6">
                                    <div className={`h-14 w-14 rounded-xl bg-white/5 flex items-center justify-center mb-8 transition-colors duration-300 ${world.bg}`}>
                                        <world.icon className={`h-7 w-7 ${world.color}`} />
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-2">{world.title}</h3>
                                    <h4 className="text-lg font-medium text-white/90 mb-4 italic font-serif">
                                        &quot;{world.question}&quot;
                                    </h4>
                                    <p className="text-slate-400 leading-relaxed mb-8">
                                        {world.description}
                                    </p>

                                    <div className="flex items-center text-sm font-medium text-slate-500 group-hover:text-white transition-colors">
                                        Explore possibilities <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
