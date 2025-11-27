"use client";

import { useEffect } from "react";

export function MouseFollower() {
    useEffect(() => {
        let x = 0;
        let y = 0;
        let lastX = 0;
        let lastY = 0;

        const handleMouseMove = (e: MouseEvent) => {
            x = e.clientX;
            y = e.clientY;

            const dx = x - lastX;
            const dy = y - lastY;

            document.body.style.setProperty("--mouse-x", `${x}px`);
            document.body.style.setProperty("--mouse-y", `${y}px`);
            document.body.style.setProperty("--mouse-dx", `${dx}`);
            document.body.style.setProperty("--mouse-dy", `${dy}`);

            lastX = x;
            lastY = y;
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return null;
}
