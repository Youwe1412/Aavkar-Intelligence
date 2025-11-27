"use client";
import { useEffect, useRef } from "react";
// import { useScrollSync } from "@/hooks/useScrollSync";
import "locomotive-scroll/dist/locomotive-scroll.css";
import { useUIStore } from "@/store/uiStore";

export function SmoothScrollWrapper({ children }: { children: React.ReactNode }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const setScrollReady = useUIStore((state) => state.setScrollReady);

    useEffect(() => {
        // Fallback to native scroll for now to fix crash
        setScrollReady(true);
    }, [setScrollReady]);

    // const options = {
    //     smooth: true,
    //     multiplier: 1,
    //     smartphone: {
    //         smooth: true,
    //     },
    //     tablet: {
    //         smooth: true,
    //         breakpoint: 1024,
    //     },
    // };

    // useScrollSync(containerRef, options);

    return (
        <div ref={containerRef} data-scroll-container className="min-h-screen flex flex-col">
            {children}
        </div>
    );
}
