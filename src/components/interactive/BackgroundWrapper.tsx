"use client";

import dynamic from "next/dynamic";

const FluidBackground = dynamic(() => import("@/components/interactive/FluidBackground").then(mod => mod.FluidBackground), { ssr: false });

export function BackgroundWrapper() {
    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none">
            <FluidBackground />
        </div>
    );
}
