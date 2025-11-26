"use client";

import { motion } from "framer-motion";

export function About() {
    return (
        <section className="py-24 bg-midnight relative overflow-hidden">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="mb-12">
                        <span className="text-electric-teal font-medium tracking-wide uppercase text-sm">The Human Layer</span>
                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mt-4">
                            Why we built this
                        </h2>
                    </div>

                    <div className="prose prose-invert prose-lg max-w-none">
                        <motion.p
                            initial={{ opacity: 0, y: 14 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                            className="text-xl text-slate-300 leading-relaxed mb-8"
                        >
                            Aavkar Productions started as a bridge between engineering and expression.
                            Founded by <span className="text-white font-medium">Yuvrajsinh (Yuvraj) Gohil</span>,
                            our roots are in computer engineering, but our heart has always been in storytelling and education.
                        </motion.p>

                        <div className="grid md:grid-cols-2 gap-12 my-12">
                            {[{
                                title: "The Mission",
                                copy: "To move people away from rote work and rote learning toward understanding, creativity, and applied intelligence. We use AI to take over the repetitive parts of work so humans can focus on thinking, judgement, and craft across media, education, healthcare, and business.",
                                accent: "border-electric-teal/30",
                            },
                            {
                                title: "The Approach",
                                copy: "We believe AI shouldn’t replace human judgement. It should liberate it.",
                                accent: "border-blue-violet/30",
                            }].map((item, index) => (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 * index }}
                                    className={`p-6 border-l-2 ${item.accent} bg-white/5 rounded-r-xl hover:bg-white/10 transition-colors`}
                                >
                                    <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                                    <p className="text-slate-400 text-base">{item.copy}</p>
                                </motion.div>
                            ))}
                        </div>

                        <motion.p
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                            className="text-slate-400"
                        >
                            We saw that most “AI agencies” were just wrapping generic tools. We wanted to build systems that actually understand the context of the work, whether that’s editing a film, training a new hire, or teaching a student. That requires more than just code; it requires a deep respect for the human craft.
                        </motion.p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
