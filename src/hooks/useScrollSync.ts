import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useUIStore } from '@/store/uiStore';

// Don't register plugin globally at top level if it causes SSR issues
// gsap.registerPlugin(ScrollTrigger);

interface ScrollSyncOptions {
    smooth?: boolean;
    multiplier?: number;
    smartphone?: {
        smooth: boolean;
        breakpoint?: number;
    };
    tablet?: {
        smooth: boolean;
        breakpoint?: number;
    };
}

export const useScrollSync = (containerRef: React.RefObject<HTMLElement | null>, options?: ScrollSyncOptions) => {
    const scrollRef = useRef<any>(null);

    useEffect(() => {
        if (!containerRef.current || typeof window === 'undefined') return;

        gsap.registerPlugin(ScrollTrigger);

        let locoScroll: any = null;

        // Dynamic import LocomotiveScroll to avoid SSR issues
        import('locomotive-scroll').then((LocomotiveScrollModule) => {
            const LocomotiveScroll = LocomotiveScrollModule.default;
            const scrollEl = containerRef.current;
            if (!scrollEl) return;

            locoScroll = new LocomotiveScroll({
                el: scrollEl,
                smooth: true,
                multiplier: 1,
                class: 'is-revealed',
                ...options,
            } as any);
            scrollRef.current = locoScroll;

            // Sync ScrollTrigger with Locomotive Scroll
            try {
                ScrollTrigger.scrollerProxy(scrollEl, {
                    scrollTop(value) {
                        return arguments.length
                            ? locoScroll.scrollTo(value as any, { duration: 0, disableLerp: true })
                            : (locoScroll as any).scroll.instance.scroll.y;
                    },
                    getBoundingClientRect() {
                        return {
                            top: 0,
                            left: 0,
                            width: window.innerWidth,
                            height: window.innerHeight,
                        };
                    },
                    pinType: scrollEl.style.transform ? 'transform' : 'fixed',
                });

                // Update ScrollTrigger on Locomotive Scroll update
                locoScroll.on('scroll', (args: any) => {
                    ScrollTrigger.update();
                    // Performance optimization: Only update store if value changed significantly or throttle it
                    if (args.limit.y > 0) {
                        const progress = args.scroll.y / args.limit.y;
                        useUIStore.getState().setScrollProgress(progress);
                    }
                });

                // Refresh ScrollTrigger when window updates
                ScrollTrigger.addEventListener('refresh', () => { locoScroll.update(); });
                ScrollTrigger.refresh();

                console.log("Locomotive Scroll initialized successfully");
            } catch (e) {
                console.error("Failed to initialize ScrollTrigger proxy:", e);
            }

            // Signal that scroll is ready (even if proxy failed, we want content to show)
            useUIStore.getState().setScrollReady(true);
        });

        return () => {
            if (locoScroll) {
                ScrollTrigger.removeEventListener('refresh', () => { locoScroll.update(); });
                locoScroll.destroy();
                locoScroll = null;
                scrollRef.current = null;
            }
            // Kill all ScrollTriggers created by this component to avoid memory leaks
            ScrollTrigger.getAll().forEach(t => t.kill());
            ScrollTrigger.clearScrollMemory();
        };
    }, [containerRef, options]);

    return scrollRef;
};
