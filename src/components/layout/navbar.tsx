"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false);

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        const href = e.currentTarget.href;
        const targetId = href.replace(/.*\#/, "");
        const elem = document.getElementById(targetId);
        elem?.scrollIntoView({
            behavior: "smooth",
        });
        setIsOpen(false);
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-midnight/80 backdrop-blur-md">
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
                        <Link href="#services" onClick={handleScroll} className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
                            Services
                        </Link>
                        <Link href="#approach" onClick={handleScroll} className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
                            Approach
                        </Link>
                        <Link href="#about" onClick={handleScroll} className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
                            About
                        </Link>
                        <MagneticButton>
                            <Button variant="primary" size="sm">
                                Book Strategy Call
                            </Button>
                        </MagneticButton>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-white"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X /> : <Menu />}
                    </button>
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
                            <Link
                                href="#services"
                                className="text-base font-medium text-slate-400 hover:text-white"
                                onClick={handleScroll}
                            >
                                Services
                            </Link>
                            <Link
                                href="#approach"
                                className="text-base font-medium text-slate-400 hover:text-white"
                                onClick={handleScroll}
                            >
                                Approach
                            </Link>
                            <Link
                                href="#about"
                                className="text-base font-medium text-slate-400 hover:text-white"
                                onClick={handleScroll}
                            >
                                About
                            </Link>
                            <MagneticButton className="w-full">
                                <Button variant="primary" className="w-full">
                                    Book Strategy Call
                                </Button>
                            </MagneticButton>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
