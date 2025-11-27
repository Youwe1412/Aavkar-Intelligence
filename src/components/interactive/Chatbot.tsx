"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "ai/react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useUIStore } from "@/store/uiStore";

export function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const { messages, input, handleInputChange, handleSubmit, isLoading, append } = useChat();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const scrollProgress = useUIStore((state) => state.scrollProgress);
    const [hasTriggered, setHasTriggered] = useState(false);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    // useEffect(() => {
    //     if (scrollProgress > 0.7 && !hasTriggered && messages.length === 0) {
    //         setHasTriggered(true);
    //         setIsOpen(true);
    //         append({ role: 'assistant', content: "I noticed you're exploring our approach. Is there a specific domain (Media, Education, Health, Ops) you'd like to dive deeper into?" });
    //     }
    // }, [scrollProgress, hasTriggered, messages.length, append]);

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-24 right-6 w-[350px] md:w-[400px] h-[500px] bg-midnight/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-electric-teal animate-pulse" />
                                <span className="font-medium text-white">Aavkar AI Assistant</span>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8 hover:bg-white/10">
                                <X className="h-4 w-4" />
                            </Button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.length === 0 && (
                                <div className="text-center text-slate-400 mt-10">
                                    <Sparkles className="h-8 w-8 mx-auto mb-4 text-electric-teal/50" />
                                    <p className="text-sm">How can I help you explore Aavkar Intelligence?</p>
                                </div>
                            )}
                            {messages.map((m: any) => (
                                <div
                                    key={m.id}
                                    className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[80%] p-3 rounded-2xl text-sm ${m.role === 'user'
                                            ? 'bg-electric-teal/20 text-white rounded-tr-none'
                                            : 'bg-white/10 text-slate-200 rounded-tl-none'
                                            }`}
                                    >
                                        {m.content}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-white/10 p-3 rounded-2xl rounded-tl-none flex gap-1">
                                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSubmit} className="p-4 border-t border-white/10 bg-white/5">
                            <div className="flex gap-2">
                                <Input
                                    value={input}
                                    onChange={handleInputChange}
                                    placeholder="Ask about our services..."
                                    className="bg-transparent border-white/10 focus-visible:ring-electric-teal"
                                />
                                <Button type="submit" size="icon" disabled={isLoading || !input.trim()} className="bg-electric-teal hover:bg-electric-teal/80 text-midnight">
                                    <Send className="h-4 w-4" />
                                </Button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-r from-electric-teal to-blue-violet flex items-center justify-center shadow-lg shadow-electric-teal/20 z-50"
            >
                {isOpen ? <X className="h-6 w-6 text-midnight" /> : <MessageCircle className="h-6 w-6 text-midnight" />}
            </motion.button>
        </>
    );
}
