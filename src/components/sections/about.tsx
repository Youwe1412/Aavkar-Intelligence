"use client";

import { motion } from "framer-motion";
import { HoloBox } from "@/components/ui/HoloBox";

export function About() {
    return (
        <section className="py-24 bg-midnight relative overflow-hidden">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="mb-12">
                        <span className="text-electric-teal font-medium tracking-wide uppercase text-sm">The Human Layer</span>
                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mt-4">
                            Why we built this
                        </h2>
                    </div>

                    <div className="prose prose-invert prose-lg max-w-none">
                        <p className="text-xl text-slate-300 leading-relaxed mb-8">
                            Aavkar Productions started as a bridge between engineering and expression.
                            Founded by <span className="text-white font-medium">Yuvrajsinh (Yuvraj) Gohil</span>,
                            our roots are in computer engineering, but our heart has always been in storytelling and education.
                        </p>

                        <div className="grid md:grid-cols-2 gap-8 my-12">
                            <HoloBox className="h-full">
                                <div className="p-8 h-full flex flex-col">
                                    <div className="h-10 w-10 rounded-full bg-electric-teal/20 flex items-center justify-center mb-6">
                                        <div className="h-2 w-2 rounded-full bg-electric-teal animate-pulse" />
                                    </div>
                                    <h4 className="text-xl font-bold text-white mb-4">The Mission</h4>
                                    <p className="text-slate-400 text-base leading-relaxed">
                                        To move people away from rote work and rote learning toward understanding, creativity, and applied intelligence. We use AI to take over the repetitive parts of work so humans can focus on thinking, judgement, and craft.
                                    </p>
                                </div>
                            </HoloBox>

                            <HoloBox className="h-full">
                                <div className="p-8 h-full flex flex-col">
                                    <div className="h-10 w-10 rounded-full bg-blue-violet/20 flex items-center justify-center mb-6">
                                        <div className="h-2 w-2 rounded-full bg-blue-violet animate-pulse" />
                                    </div>
                                    <h4 className="text-xl font-bold text-white mb-4">The Approach</h4>
                                    <p className="text-slate-400 text-base leading-relaxed">
                                        We believe AI shouldn't replace human judgement. It should liberate it. By automating the mundane, we unlock the potential for deeper connection, higher quality work, and more meaningful innovation.
                                    </p>
                                </div>
                            </HoloBox>
                        </div>

                        <p className="text-slate-400">
                            We saw that most "AI agencies" were just wrapping generic tools. We wanted to build systems that actually understand the context of the work, whether that's editing a film, training a new hire, or teaching a student. That requires more than just code; it requires a deep respect for the human craft.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
