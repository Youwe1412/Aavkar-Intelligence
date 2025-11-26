"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Clapperboard, Building2, GraduationCap, HeartPulse } from "lucide-react";

const worlds = [
    {
        icon: Clapperboard,
        title: "Media & Content",
        question: "What if your creative process had a thinking partner?",
        description: "We explore how applied AI can plug into filmmaking, editing, motion graphics, visual effects, and design pipelines, helping creative teams prototype faster, discover new visual directions, and attempt work that would be impossible without generative media AI.",
        color: "text-pink-500",
        bg: "group-hover:bg-pink-500/10",
        gradient: "from-pink-500 to-purple-600",
    },
    {
        icon: GraduationCap,
        title: "Education",
        question: "What if every learner had a path tuned to their curiosity?",
        description: "We’re interested in where applied AI can genuinely support learning without turning into an answering machine. That means working with schools, creators, and learning teams to make learning more visual, interactive, and personalised, using story, media, and existing AI tools in ways that still keep human teachers and mentors at the centre.",
        color: "text-amber-500",
        bg: "group-hover:bg-amber-500/10",
        gradient: "from-amber-500 to-orange-600",
    },
    {
        icon: HeartPulse,
        title: "Healthcare & Fitness",
        question: "What if clinicians and coaches had more presence, not more paperwork?",
        description: "We look for opportunities where AI can quietly support clinicians, coaches, and care teams, streamlining notes and follow-ups, surfacing the right information at the right moment, and supporting long-term behaviour change, while humans stay fully responsible for decisions and care.",
        color: "text-emerald-500",
        bg: "group-hover:bg-emerald-500/10",
        gradient: "from-emerald-500 to-teal-600",
    },
    {
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
    return (
        <section className="py-24 bg-midnight-light relative" data-animate="fade-up" id="services">
            <div className="container mx-auto px-6">
                <div className="mb-16">
                    <span className="text-electric-teal font-medium tracking-wide uppercase text-sm">The 4 Worlds</span>
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mt-4 mb-6">
                        Domains of Applied Intelligence
                    </h2>
                    <p className="text-slate-400 max-w-2xl text-lg">
                        We don’t offer a fixed menu of services. We explore what becomes possible in these worlds when we apply intelligence well.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {worlds.map((world, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5, scale: 1.02 }}
                        >
                            <Card className="h-full group relative overflow-hidden border-white/5 bg-midnight hover:border-white/20 transition-colors duration-500">
                                {/* Hover Gradient Background */}
                                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${world.gradient}`} />

                                <div className="relative z-10 p-6">
                                    <div className={`h-14 w-14 rounded-xl bg-white/5 flex items-center justify-center mb-8 transition-colors duration-300 ${world.bg}`}>
                                        <world.icon className={`h-7 w-7 ${world.color}`} />
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-2">{world.title}</h3>
                                    <h4 className="text-lg font-medium text-white/90 mb-4 italic font-serif">
                                        “{world.question}”
                                    </h4>
                                    <p className="text-slate-400 leading-relaxed mb-8">
                                        {world.description}
                                    </p>

                                    <div className="flex items-center text-sm font-medium text-slate-500 group-hover:text-white transition-colors">
                                        Explore possibilities <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
