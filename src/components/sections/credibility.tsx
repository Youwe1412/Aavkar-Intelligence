"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Code2, Film, BrainCircuit } from "lucide-react";

const features = [
    {
        icon: Film,
        title: "Multi-Craft Storytellers",
        description: "Years inside films, YouTube, sound, and performance taught us how attention, emotion, and pacing really work. We bring that creative intuition into every workflow and AI layer we design.",
    },
    {
        icon: Code2,
        title: "Engineering-Literate",
        description: "A computer-engineering backbone means we think in constraints, edge cases, and failure modes. We care about reliability, integration, and real-world limits, not just impressive prototypes.",
    },
    {
        icon: BrainCircuit,
        title: "Learning-Obsessed",
        description: "A long-term obsession with education and how people learn shapes everything we build: tools that strip away rote work, make concepts clearer, and leave more space for human judgement, reflection, and growth.",
    },
];

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
};

export function Credibility() {
    return (
        <section className="py-24 bg-midnight relative overflow-hidden">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20%" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
                        Polymath minds. One applied intelligence studio.
                    </h2>
                    <p className="text-slate-300 text-lg leading-relaxed">
                        Over years we have gone deep in filmmaking and editing, dance and performance, music and sound, computer engineering and AI, and learning and education. That layered path lets us see both the human craft and the system underneath, so we design AI that respects both.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{ delay: index * 0.08, duration: 0.6, ease: "easeOut" }}
                        >
                            <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 240, damping: 18 }}>
                                <Card className="h-full relative overflow-hidden group">
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-electric-teal/10 via-transparent to-blue-violet/10" />
                                    <div className="relative z-10">
                                        <div className="h-12 w-12 rounded-lg bg-white/5 flex items-center justify-center mb-6 group-hover:bg-electric-teal/10 transition-colors">
                                            <feature.icon className="h-6 w-6 text-electric-teal" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                                        <p className="text-slate-300 leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                </Card>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>


            </div>
        </section>
    );
}
