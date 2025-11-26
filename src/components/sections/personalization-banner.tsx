"use client";

import { usePersonalizedRecommendation } from "@/lib/usePersonalizedRecommendation";
import { ArrowRight } from "lucide-react";

export function PersonalizationBanner() {
  const recommendation = usePersonalizedRecommendation("services");

  if (!recommendation) return null;

  return (
    <div
      className="mx-auto mt-10 max-w-5xl rounded-3xl border border-electric-teal/30 bg-electric-teal/5 p-6 shadow-lg shadow-electric-teal/10"
      data-animate="fade-up"
    >
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-electric-teal">Personalized for you</p>
          <h3 className="text-2xl font-semibold text-white">{recommendation.title}</h3>
          <p className="mt-2 max-w-3xl text-sm text-slate-200">{recommendation.description}</p>
        </div>
        <button className="group inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20">
          {recommendation.cta}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}
