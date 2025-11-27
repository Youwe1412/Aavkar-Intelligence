"use client";

import { useRef } from "react";
import { useScrollSync } from "@/hooks/useScrollSync";
import "locomotive-scroll/dist/locomotive-scroll.css";

export function SmoothScrollWrapper({ children }: { children: React.ReactNode }) {
    const containerRef = useRef<HTMLDivElement>(null);

    useScrollSync(containerRef, {
        smooth: true,
        multiplier: 1,
        smartphone: {
            smooth: true,
        },
        tablet: {
            smooth: true,
            breakpoint: 1024,
        },
    });

    return (
        <div ref={containerRef} data-scroll-container className="min-h-screen flex flex-col">
            {children}
        </div>
    );
}
