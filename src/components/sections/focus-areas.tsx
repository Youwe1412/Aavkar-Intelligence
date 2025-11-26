"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Wand2, Users } from "lucide-react";

export function FocusAreas() {
    return (
        <section className="py-24 bg-midnight relative overflow-hidden" data-animate="fade-up">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <span className="text-electric-teal font-medium tracking-wide uppercase text-sm">Active Focus</span>
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mt-4">
                        Where we are building today
                    </h2>
                    <p className="text-slate-500 mt-4 text-sm uppercase tracking-wider">
                        RIGHT NOW WE ARE APPLYING OUR AI STACK FIRST IN CLIENT-FACING MEDIA WORK FOR FILMS, CAMPAIGNS, AND YOUTUBE. IN PARALLEL WE ARE EXPLORING HOW THE SAME APPROACH CAN EXTEND INTO EDUCATION, HEALTHCARE, FITNESS, AND OPERATIONS.
                    </p>
                </div>

                <div className="space-y-24">
                    {/* Area 1: Media */}
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="order-2 md:order-1"
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 text-pink-400 text-xs font-medium mb-6">
                                <Wand2 className="h-3 w-3" />
                                Media & Content
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-6">
                                AI-Augmented Creative Workbench
                            </h3>
                            <p className="text-slate-400 text-lg leading-relaxed mb-8">
                                We are already using applied AI inside Aavkar Productions across research, scripting, visuals, motion graphics, VFX, and editing to deliver client projects that would be too slow, expensive, or complex with traditional pipelines alone.
                            </p>
                            <ul className="space-y-4 mb-8">
                                {["Cinematic ads, explainers, and YouTube films that blend live action with generative media", "Faster exploration of storyboards, visual directions, and edits before final lock", "Smart reuse of footage and assets across platforms without starting from scratch"].map((item, i) => (
                                    <li key={i} className="flex items-center text-slate-300">
                                        <span className="h-1.5 w-1.5 rounded-full bg-pink-500 mr-3" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <Button variant="outline">Explore Creative AI with Us</Button>
                        </motion.div>
                        <div className="order-1 md:order-2 relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-pink-900/20 to-midnight-light border border-white/10">
                            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-pink-500/20 font-serif text-6xl font-bold">Workbench</span>
                            </div>
                        </div>
                    </div>

                    {/* Area 2: Operations */}
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-blue-900/20 to-midnight-light border border-white/10">
                            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-blue-500/20 font-serif text-6xl font-bold">Frontline</span>
                            </div>
                        </div>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium mb-6">
                                <Users className="h-3 w-3" />
                                Operations & Training
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-6">
                                AI-Augmented Frontline Work
                            </h3>
                            <p className="text-slate-400 text-lg leading-relaxed mb-8">
                                In parallel, we’re exploring how digital co-workers and QA agents could quietly support frontline teams in clinics, factories, warehouses, and service roles by catching avoidable errors and surfacing the right information at the right time, while humans stay in charge.
                            </p>
                            <ul className="space-y-4 mb-8">
                                {["Onboarding flows that adapt to each person", "Checklists that watch for mistakes in real time", "Knowledge that appears when and where it’s needed"].map((item, i) => (
                                    <li key={i} className="flex items-center text-slate-300">
                                        <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-3" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <Button variant="outline">Explore Ops Possibilities</Button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
