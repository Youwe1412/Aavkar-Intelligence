"use client";

import { useEffect, useMemo } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useSmoothScrollContainer } from "@/components/layout/SmoothScrollProvider";

export function ScrollOrchestrator() {
  const scroller = useSmoothScrollContainer();

  const scope = useMemo(() => scroller ?? undefined, [scroller]);

  useEffect(() => {
    if (!scroller) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTl
        .from(".hero-kicker", { opacity: 0, y: 20, duration: 0.6 })
        .from(
          ".hero-line",
          { opacity: 0, y: 30, duration: 0.8, stagger: 0.15 },
          "<0.1"
        )
        .from(
          ".hero-cta button",
          { opacity: 0, y: 20, stagger: 0.1, duration: 0.5 },
          "<"
        );

      gsap.utils.toArray<HTMLElement>("[data-animate=fade-up]").forEach((el, i) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            delay: i * 0.05,
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              scroller,
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-animate=parallax]").forEach((el) => {
        gsap.to(el, {
          yPercent: -15,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scroller,
            scrub: true,
          },
        });
      });
    }, scope);

    return () => ctx.revert();
  }, [scroller, scope]);

  return null;
}
