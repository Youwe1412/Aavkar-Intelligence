import { create } from 'zustand';

interface UIState {
    backgroundColor: string;
    setBackgroundColor: (color: string) => void;
    hoveredDomain: string | null;
    setHoveredDomain: (domain: string | null) => void;
    scrollProgress: number;
    setScrollProgress: (progress: number) => void;
}

export const useUIStore = create<UIState>((set) => ({
    backgroundColor: '#02040A', // Default midnight
    setBackgroundColor: (color) => set({ backgroundColor: color }),
    hoveredDomain: null,
    setHoveredDomain: (domain) => set({ hoveredDomain: domain }),
    scrollProgress: 0,
    setScrollProgress: (progress) => set({ scrollProgress: progress }),
}));
