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

        // Dynamic import LocomotiveScroll to avoid SSR issues
        import('locomotive-scroll').then((LocomotiveScrollModule) => {
            const LocomotiveScroll = LocomotiveScrollModule.default;
            const scrollEl = containerRef.current;
            if (!scrollEl) return;

            const locoScroll = new LocomotiveScroll({
                el: scrollEl,
                smooth: true,
                multiplier: 1,
                class: 'is-revealed',
                ...options,
            } as any);
            scrollRef.current = locoScroll;

            // Sync ScrollTrigger with Locomotive Scroll
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
                if (args.limit.y > 0) {
                    const progress = args.scroll.y / args.limit.y;
                    useUIStore.getState().setScrollProgress(progress);
                }
            });

            // Refresh ScrollTrigger when window updates
            ScrollTrigger.addEventListener('refresh', () => { locoScroll.update(); });
            ScrollTrigger.refresh();
        });

        return () => {
            if (scrollRef.current) {
                ScrollTrigger.removeEventListener('refresh', () => { scrollRef.current?.update(); });
                scrollRef.current.destroy();
                scrollRef.current = null;
            }
        };
    }, [containerRef, options]);

    return scrollRef;
};
