"use client";

export function About() {
    return (
        <section className="py-24 bg-midnight relative overflow-hidden" data-animate="fade-up" id="about">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
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

                        <div className="grid md:grid-cols-2 gap-12 my-12">
                            <div className="p-6 border-l-2 border-electric-teal/30 bg-white/5 rounded-r-xl">
                                <h4 className="text-lg font-bold text-white mb-2">The Mission</h4>
                                <p className="text-slate-400 text-base">
                                    To move people away from rote work and rote learning toward understanding, creativity, and applied intelligence. We use AI to take over the repetitive parts of work so humans can focus on thinking, judgement, and craft across media, education, healthcare, and business.
                                </p>
                            </div>
                            <div className="p-6 border-l-2 border-blue-violet/30 bg-white/5 rounded-r-xl">
                                <h4 className="text-lg font-bold text-white mb-2">The Approach</h4>
                                <p className="text-slate-400 text-base">
                                    We believe AI shouldn’t replace human judgement. It should liberate it.
                                </p>
                            </div>
                        </div>

                        <p className="text-slate-400">
                            We saw that most “AI agencies” were just wrapping generic tools. We wanted to build systems that actually understand the context of the work, whether that’s editing a film, training a new hire, or teaching a student. That requires more than just code; it requires a deep respect for the human craft.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
