import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger to be safe, though it's usually done in the hook or entry point
gsap.registerPlugin(ScrollTrigger);

export const fadeUp = (element: HTMLElement, delay: number = 0) => {
    return gsap.fromTo(
        element,
        { opacity: 0, y: 50 },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            delay,
            ease: 'power3.out',
        }
    );
};

export const staggerReveal = (elements: HTMLElement[], delay: number = 0) => {
    return gsap.fromTo(
        elements,
        { opacity: 0, y: 30 },
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            delay,
            ease: 'power2.out',
        }
    );
};

export const scaleIn = (element: HTMLElement, delay: number = 0) => {
    return gsap.fromTo(
        element,
        { scale: 0.8, opacity: 0 },
        {
            scale: 1,
            opacity: 1,
            duration: 1,
            delay,
            ease: 'expo.out',
        }
    );
};

export const revealText = (element: HTMLElement, delay: number = 0) => {
    // Split text logic could go here if using SplitText plugin (paid), 
    // but for now we'll just do a simple opacity/y reveal
    return gsap.fromTo(element,
        { y: '100%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 1, ease: 'power4.out', delay }
    );
}

export const parallaxScroll = (element: HTMLElement, trigger: HTMLElement, speed: number = 0.5) => {
    gsap.to(element, {
        y: () => -(trigger.offsetHeight * speed),
        ease: 'none',
        scrollTrigger: {
            trigger: trigger,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        }
    });
}
