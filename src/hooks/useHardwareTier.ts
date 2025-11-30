import { useState, useEffect } from 'react';

export type HardwareTier = {
    particleCount: number;
    enableBloom: boolean;
    dpr: [number, number];
    isMobile: boolean;
    tierName: 'low' | 'medium' | 'high';
};

export function useHardwareTier(): HardwareTier {
    const [tier, setTier] = useState<HardwareTier>({
        particleCount: 1000, // Safe default
        enableBloom: false,
        dpr: [1, 1],
        isMobile: false,
        tierName: 'low'
    });

    useEffect(() => {
        const detectTier = () => {
            const width = window.innerWidth;
            const isMobile = width < 768;
            const isTablet = width >= 768 && width < 1024;

            // Optional: Check hardware concurrency if available
            // const concurrency = navigator.hardwareConcurrency || 4;

            if (isMobile) {
                return {
                    particleCount: 800,
                    enableBloom: false,
                    dpr: [1, 1.5] as [number, number],
                    isMobile: true,
                    tierName: 'low' as const
                };
            } else if (isTablet) {
                return {
                    particleCount: 1500,
                    enableBloom: true, // Maybe low intensity bloom
                    dpr: [1, 1.5] as [number, number],
                    isMobile: true, // Treat tablet as mobile for interaction purposes usually
                    tierName: 'medium' as const
                };
            } else {
                // Desktop
                return {
                    particleCount: 3000,
                    enableBloom: true,
                    dpr: [1, 2] as [number, number],
                    isMobile: false,
                    tierName: 'high' as const
                };
            }
        };

        setTier(detectTier());

        const handleResize = () => {
            setTier(detectTier());
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return tier;
}
