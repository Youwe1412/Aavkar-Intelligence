"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";

const navLinks = [
    { href: "#services", label: "Services" },
    { href: "#approach", label: "Approach" },
    { href: "#about", label: "About" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [hasScrolled, setHasScrolled] = React.useState(false);
    const [activeSection, setActiveSection] = React.useState<string>(navLinks[0]?.href ?? "");
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setHasScrolled(latest > 8);
    });

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(`#${entry.target.id}`);
                    }
                });
            },
            {
                rootMargin: "-40% 0px -40% 0px",
                threshold: 0.2,
            }
        );

        navLinks.forEach((link) => {
            const section = document.querySelector(link.href);
            if (section) observer.observe(section);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <motion.nav
            className="fixed top-0 left-0 right-0 z-50"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
        >
            <motion.div
                className="border-b border-white/5 bg-midnight/70 backdrop-blur-md"
                animate={hasScrolled ? { backgroundColor: "rgba(2,4,10,0.9)", borderColor: "rgba(255,255,255,0.08)" } : { backgroundColor: "rgba(2,4,10,0.65)", borderColor: "rgba(255,255,255,0.05)" }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
            >
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-electric-teal to-blue-violet" />
                        <span className="text-xl font-serif font-bold text-white tracking-tight">
                            Aavkar Intelligence
                        </span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="relative text-sm font-medium text-slate-400 transition-colors hover:text-white"
                            >
                                {activeSection === link.href && (
                                    <motion.span
                                        layoutId="nav-active"
                                        className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-electric-teal to-blue-violet"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <motion.span whileHover={{ y: -1 }} transition={{ type: "spring", stiffness: 400, damping: 30 }}>
                                    {link.label}
                                </motion.span>
                            </Link>
                        ))}
                        <Button variant="primary" size="sm" whileHover={{ y: -2, scale: 1.02 }}>
                            Book Strategy Call
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        className="md:hidden text-white"
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle navigation menu"
                    >
                        {isOpen ? <X /> : <Menu />}
                    </motion.button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-b border-white/5 bg-midnight"
                    >
                        <div className="flex flex-col gap-4 p-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-base font-medium text-slate-400 hover:text-white"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <Button variant="primary" className="w-full">
                                Book Strategy Call
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            </motion.div>
        </motion.nav>
    );
}
