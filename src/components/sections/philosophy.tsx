"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

export function Philosophy() {
    return (
        <section className="py-24 bg-midnight-light relative">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="text-electric-teal font-medium tracking-wide uppercase text-sm">Our Philosophy</span>
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mt-4">
                        The Shift to Software 2.0
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Software 1.0 */}
                    <div className="p-8 rounded-2xl border border-white/5 bg-midnight/50">
                        <h3 className="text-xl font-bold text-slate-400 mb-6">Software 1.0 (The Old Way)</h3>
                        <p className="text-slate-400 mb-8 h-20">
                            You specify the rules. Limited by what you can explicitly code. Brittle when edge cases arise.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-slate-500">
                                <X className="h-5 w-5 text-red-500/50 mt-0.5" />
                                <span>Explicit logic only</span>
                            </li>
                            <li className="flex items-start gap-3 text-slate-500">
                                <X className="h-5 w-5 text-red-500/50 mt-0.5" />
                                <span>Fails on ambiguity</span>
                            </li>
                            <li className="flex items-start gap-3 text-slate-500">
                                <X className="h-5 w-5 text-red-500/50 mt-0.5" />
                                <span>Hard to maintain complexity</span>
                            </li>
                        </ul>
                    </div>

                    {/* Software 2.0 */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="p-8 rounded-2xl border border-electric-teal/20 bg-gradient-to-b from-electric-teal/5 to-midnight relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-20">
                            <div className="h-32 w-32 bg-electric-teal rounded-full blur-[64px]" />
                        </div>

                        <h3 className="text-xl font-bold text-white mb-6">Software 2.0 (Applied Intelligence)</h3>
                        <p className="text-slate-300 mb-8 h-20">
                            You specify the goal. The system learns the rules. You verify the output.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-white">
                                <Check className="h-5 w-5 text-electric-teal mt-0.5" />
                                <span>Handles ambiguity & context</span>
                            </li>
                            <li className="flex items-start gap-3 text-white">
                                <Check className="h-5 w-5 text-electric-teal mt-0.5" />
                                <span>Learns from examples</span>
                            </li>
                            <li className="flex items-start gap-3 text-white">
                                <Check className="h-5 w-5 text-electric-teal mt-0.5" />
                                <span>Scales with data</span>
                            </li>
                        </ul>
                    </motion.div>
                </div>

                <div className="mt-16 text-center max-w-2xl mx-auto">
                    <p className="text-lg text-slate-400">
                        We don't just deploy models. We design the <span className="text-white font-medium">specifications</span> and the <span className="text-white font-medium">verification loops</span> so you can trust the system to do real work.
                    </p>
                </div>
            </div>
        </section>
    );
}
