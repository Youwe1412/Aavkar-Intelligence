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

export function Credibility() {
    return (
        <section className="py-24 bg-midnight relative overflow-hidden" data-animate="fade-up">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
                        Polymath minds. One applied intelligence studio.
                    </h2>
                    <p className="text-slate-400 text-lg">
                        Over years we have gone deep in filmmaking and editing, dance and performance, music and sound, computer engineering and AI, and learning and education. That layered path lets us see both the human craft and the system underneath, so we design AI that respects both.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="h-full hover:bg-white/5 transition-colors group">
                                <div className="h-12 w-12 rounded-lg bg-white/5 flex items-center justify-center mb-6 group-hover:bg-electric-teal/10 transition-colors">
                                    <feature.icon className="h-6 w-6 text-electric-teal" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                                <p className="text-slate-400 leading-relaxed">
                                    {feature.description}
                                </p>
                            </Card>
                        </motion.div>
                    ))}
                </div>


            </div>
        </section>
    );
}
