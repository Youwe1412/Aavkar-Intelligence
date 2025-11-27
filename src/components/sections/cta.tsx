"use client";

import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { motion } from "framer-motion";

export function CTA() {
    return (
        <section className="py-32 bg-midnight relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-electric-teal/5" />

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto"
                >
                    <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8">
                        Ready to work with <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-teal to-blue-violet">
                            Applied Intelligence?
                        </span>
                    </h2>
                    <p className="text-xl text-slate-400 mb-12">
                        If you’re serious about working with AI—not just playing with prompts—let’s talk.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <MagneticButton>
                            <Button size="lg" className="w-full sm:w-auto">
                                Book an AI Strategy Call
                            </Button>
                        </MagneticButton>
                        <MagneticButton>
                            <Button variant="outline" size="lg" className="w-full sm:w-auto">
                                Tell us about your work
                            </Button>
                        </MagneticButton>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
