import { useEffect, useState } from "react";

export type Recommendation = {
  title: string;
  description: string;
  cta: string;
};

export function usePersonalizedRecommendation(targetId: string) {
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);

  useEffect(() => {
    let lastY = window.scrollY;
    let lastTime = performance.now();
    let timeout: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      const now = performance.now();
      const deltaY = Math.abs(window.scrollY - lastY);
      const deltaTime = now - lastTime;
      const speed = deltaY / (deltaTime || 1);
      lastY = window.scrollY;
      lastTime = now;

      if (speed > 1.4) {
        const target = document.getElementById(targetId);
        if (target) {
          const rect = target.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.75) {
            if (!timeout) {
              timeout = setTimeout(() => {
                setRecommendation({
                  title: "Recommended: Operations Copilot",
                  description:
                    "You sped through our services—teams with high operational tempo love our AI copilot that automates routine tasks and surfaces insights in the flow of work.",
                  cta: "See how we orchestrate automation",
                });
              }, 200);
            }
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeout) clearTimeout(timeout);
    };
  }, [targetId]);

  return recommendation;
}
