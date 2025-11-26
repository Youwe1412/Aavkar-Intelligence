"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const SmoothScrollContext = createContext<HTMLDivElement | null>(null);

export function useSmoothScrollContainer() {
  return useContext(SmoothScrollContext);
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    setContainer(container);
    let current = 0;
    let target = 0;
    let rafId = 0;

    const setBodyHeight = () => {
      const height = container.getBoundingClientRect().height;
      document.body.style.height = `${height}px`;
    };

    const updateScroll = () => {
      target = window.scrollY || window.pageYOffset;
      current += (target - current) * 0.12;
      const rounded = Math.round(current * 100) / 100;
      gsap.set(container, { y: -rounded });
      ScrollTrigger.update();
      rafId = requestAnimationFrame(updateScroll);
    };

    ScrollTrigger.scrollerProxy(container, {
      scrollTop(value) {
        if (typeof value === "number") {
          target = value;
          window.scrollTo(0, value);
        }
        return target;
      },
      getBoundingClientRect: () => ({
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      }),
    });

    ScrollTrigger.defaults({ scroller: container });
    setBodyHeight();
    updateScroll();
    window.addEventListener("resize", setBodyHeight);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", setBodyHeight);
      ScrollTrigger.killAll();
      document.body.style.height = "";
      gsap.set(container, { clearProps: "all" });
    };
  }, []);

  return (
    <SmoothScrollContext.Provider value={container}>
      <div
        ref={containerRef}
        data-scroll-container
        className="smooth-scroll-container will-change-transform"
      >
        {children}
      </div>
    </SmoothScrollContext.Provider>
  );
}
