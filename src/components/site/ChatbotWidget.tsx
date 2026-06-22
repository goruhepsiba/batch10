import { useServerFn } from "@tanstack/react-start";
import { useLocation } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { MessageSquare, X, Send, Sparkles, Compass, HelpCircle } from "lucide-react";
import { toast } from "sonner";

import { askAssistant } from "@/lib/chat.functions";

interface Message {
  role: "user" | "assistant";
  content: string;
}

function parseInlineStyles(text: string): (string | React.JSX.Element)[] {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-amber-deep dark:text-amber">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

function formatMessageContent(content: string) {
  const lines = content.split("\n");
  return lines.map((line, idx) => {
    const headerMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (headerMatch) {
      const level = headerMatch[1].length;
      const text = parseInlineStyles(headerMatch[2]);
      if (level === 3 || level === 4) {
        return (
          <h4
            key={idx}
            className="font-display font-semibold text-amber mt-3 mb-1.5 text-sm uppercase tracking-wider"
          >
            {text}
          </h4>
        );
      }
      return (
        <h5
          key={idx}
          className="font-display font-medium text-foreground mt-2 mb-1 text-xs uppercase tracking-wider"
        >
          {text}
        </h5>
      );
    }

    const bulletMatch = line.match(/^[-*]\s+(.*)$/);
    if (bulletMatch) {
      return (
        <li key={idx} className="list-disc ml-4 mt-1 pl-1 text-xs font-light text-foreground/90">
          {parseInlineStyles(bulletMatch[1])}
        </li>
      );
    }

    const numberMatch = line.match(/^(\d+)\.\s+(.*)$/);
    if (numberMatch) {
      return (
        <li key={idx} className="list-decimal ml-4 mt-1 pl-1 text-xs font-light text-foreground/90">
          {parseInlineStyles(numberMatch[2])}
        </li>
      );
    }

    if (!line.trim()) {
      return <div key={idx} className="h-2" />;
    }

    return (
      <p key={idx} className="text-xs font-light leading-relaxed mb-1.5 text-foreground/90">
        {parseInlineStyles(line)}
      </p>
    );
  });
}

const suggestions = [
  "Tell me about Taj Mahal",
  "Itinerary tips for Kyoto",
  "History of Charminar",
  "How does this site work?",
];

export function ChatbotWidget() {
  const ask = useServerFn(askAssistant);
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello traveler! I am your HeritageVerse Travel Concierge. Ask me anything about historical sites, local culture, travel guides, or itinerary details. What is your next destination?",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open, loading]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMessage: Message = { role: "user", content: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // Send the current message and the conversation history
      const response = await ask({
        data: {
          message: textToSend,
          history: messages.slice(-10), // Send last 10 turns for context
          contextPage: location.pathname,
        },
      });

      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
    } catch (err: unknown) {
      console.error("Chatbot request failed", err);
      toast.error("Failed to connect to the assistant.");
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I encountered a connection error. Please try again or ask something else!",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(input);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* CHAT DRAWER */}
      {open && (
        <div className="mb-4 w-[340px] sm:w-[380px] h-[480px] rounded-2xl glass-card shadow-elegant flex flex-col overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-[var(--gradient-amber)] p-4 flex items-center justify-between text-primary-foreground shadow-sm z-10">
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-background/25">
                <Compass className="h-4.5 w-4.5 text-primary-foreground animate-spin-slow" />
              </span>
              <div>
                <h3 className="font-display font-semibold text-sm">Travel Concierge</h3>
                <p className="text-[10px] opacity-90">Powered by HeritageVerse AI</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-primary-foreground/85 hover:text-primary-foreground hover:bg-background/20 p-1.5 rounded-full transition-colors cursor-pointer"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          </div>

          {/* Messages List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[var(--gradient-parchment)]/30">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm font-light leading-relaxed ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground rounded-tr-none shadow-soft"
                      : "glass-card text-foreground rounded-tl-none shadow-soft"
                  }`}
                >
                  {m.role === "user" ? (
                    <p className="whitespace-pre-line text-xs font-light">{m.content}</p>
                  ) : (
                    <div className="space-y-1">{formatMessageContent(m.content)}</div>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="glass-card rounded-2xl rounded-tl-none px-3.5 py-2.5 text-sm text-muted-foreground flex items-center gap-1.5 shadow-xs">
                  <span
                    className="h-2 w-2 bg-amber rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <span
                    className="h-2 w-2 bg-amber rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <span
                    className="h-2 w-2 bg-amber rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions Layer */}
          {messages.length === 1 && (
            <div className="px-4 py-2.5 border-t border-border/40 bg-card/60 backdrop-blur-md">
              <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mb-2 flex items-center gap-1">
                <HelpCircle className="h-3 w-3 text-amber" /> Suggested Prompts
              </p>
              <div className="flex flex-wrap gap-1.5">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSend(s)}
                    className="text-[11px] bg-background/80 border border-border/60 hover:border-amber/55 hover:bg-amber/10 text-muted-foreground hover:text-foreground rounded-full px-2.5 py-1.5 transition-colors cursor-pointer"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Form */}
          <form
            onSubmit={onSubmit}
            className="p-3 border-t border-border/60 bg-card/80 backdrop-blur-md flex gap-2 z-10"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Taj Mahal, Kyoto..."
              className="flex-1 bg-background/60 border border-border rounded-xl px-3 py-2 text-sm outline-none focus:border-amber text-foreground"
              disabled={loading}
              maxLength={1000}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-50 h-9 w-9 rounded-xl grid place-items-center transition cursor-pointer"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      {/* FLOATING ACTION TRIGGER */}
      <button
        onClick={() => setOpen(!open)}
        className="h-14 w-14 rounded-full bg-[var(--gradient-amber)] text-primary-foreground shadow-lg flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300 relative group"
        aria-label="Ask Travel AI"
      >
        {open ? (
          <X className="h-6 w-6" />
        ) : (
          <>
            <MessageSquare className="h-6 w-6 group-hover:scale-115 transition duration-300" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-amber text-[9px] text-primary font-bold items-center justify-center">
                AI
              </span>
            </span>
          </>
        )}
      </button>
    </div>
  );
}
