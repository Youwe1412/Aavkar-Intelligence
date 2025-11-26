"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageSquare, Send, X } from "lucide-react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Hi! I'm the Aavkar Intelligence assistant. Ask me anything about our AI-native workflows or services.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight, behavior: "smooth" });
    });
  };

  useEffect(() => {
    if (open) scrollToBottom();
  }, [open]);

  const systemPrompt = useMemo(
    () =>
      "You are an AI assistant for Aavkar Intelligence. Keep answers concise, confident, and focused on how Aavkar builds AI-native workflows, copilots, and digital employees.",
    []
  );

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage: ChatMessage = { role: "user", content: input.trim() };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages, systemPrompt }),
      });
      const data = await response.json();
      if (data?.message) {
        setMessages([...nextMessages, { role: "assistant", content: data.message }]);
      } else {
        throw new Error("No message returned");
      }
    } catch {
      setMessages([
        ...nextMessages,
        { role: "assistant", content: "Sorry, I’m having trouble right now. Please try again soon." },
      ]);
    } finally {
      setLoading(false);
      scrollToBottom();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-electric-teal to-blue-violet text-white shadow-xl shadow-blue-violet/30 focus:outline-none"
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? <X /> : <MessageSquare />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-3 w-80 rounded-2xl border border-white/10 bg-midnight/95 p-4 shadow-2xl backdrop-blur-xl"
          >
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-white">Aavkar Copilot</p>
                <p className="text-xs text-slate-400">Ask about services, workflows, or AI strategy.</p>
              </div>
            </div>

            <div
              ref={containerRef}
              className="mb-3 max-h-60 space-y-2 overflow-y-auto pr-1 text-sm text-slate-100"
            >
              {messages.map((msg, idx) => (
                <div
                  key={`${msg.role}-${idx}`}
                  className={`rounded-xl px-3 py-2 ${
                    msg.role === "assistant" ? "bg-white/5 text-slate-100" : "bg-electric-teal/20 text-white"
                  }`}
                >
                  {msg.content}
                </div>
              ))}
              {loading && <p className="text-xs text-slate-400">Thinking...</p>}
            </div>

            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Ask about automations, copilots..."
                className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-electric-teal focus:outline-none"
              />
              <button
                onClick={sendMessage}
                disabled={loading}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-electric-teal to-blue-violet text-white disabled:opacity-60"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
