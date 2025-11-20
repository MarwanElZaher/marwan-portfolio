'use client';

import { useState, useRef, useEffect } from 'react';

type Message = {
    role: 'user' | 'assistant';
    content: string;
};

import { useRouter, usePathname } from 'next/navigation';
import CalendlyModal from './CalendlyModal';

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: 'Hi! I\'m Marwan\'s AI assistant. 🤖\n\nI can help you:\n• 📅 Schedule a meeting\n• ✉️ Send a message to Marwan\n• 💼 Explore his projects\n\nHow can I help you today?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const pathname = usePathname();

    // Placeholder Calendly URL - Replace with user's actual URL
    const CALENDLY_URL = "https://calendly.com/marawanmzaher";

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleQuickAction = (action: string) => {
        const userMessage = { role: 'user' as const, content: action };
        setMessages(prev => [...prev, userMessage]);
        processMessage(action);
    };

    const processMessage = async (messageText: string) => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: [...messages, { role: 'user', content: messageText }] }),
            });

            const data = await response.json();

            if (data.error) throw new Error(data.error);

            let content = data.content;

            // 1. Handle Navigation
            const navMatch = content.match(/\[\[NAVIGATE: (.*?)\]\]/);
            if (navMatch) {
                const target = navMatch[1];
                content = content.replace(navMatch[0], '').trim();
                if (target.startsWith('#')) {
                    if (pathname !== '/') {
                        router.push('/' + target);
                    } else {
                        const element = document.querySelector(target);
                        element?.scrollIntoView({ behavior: 'smooth' });
                    }
                } else {
                    router.push(target);
                }
            }

            // 2. Handle Scheduling
            if (content.includes('[[SCHEDULE_MEETING]]')) {
                content = content.replace('[[SCHEDULE_MEETING]]', '').trim();
                setIsCalendlyOpen(true);
            }

            // 3. Handle Email
            const emailMatch = content.match(/\[\[SEND_EMAIL: (.*?)\]\]/);
            if (emailMatch) {
                try {
                    const emailData = JSON.parse(emailMatch[1]);
                    content = content.replace(emailMatch[0], '').trim();

                    // Send email in background
                    fetch('/api/email', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(emailData),
                    });

                    content += "\n\n(✅ Email sent successfully!)";
                } catch (e) {
                    console.error("Failed to parse email command", e);
                }
            }

            setMessages(prev => [...prev, { role: 'assistant', content: content }]);
        } catch (error) {
            console.error('Chat error:', error);
            setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again later.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = { role: 'user' as const, content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        processMessage(input);
    };

    return (
        <>
            <CalendlyModal
                isOpen={isCalendlyOpen}
                onClose={() => setIsCalendlyOpen(false)}
                url={CALENDLY_URL}
            />

            <div className="fixed bottom-6 right-6 z-[9999] font-sans">
                {/* Chat Window */}
                {isOpen && (
                    <div className="mb-4 w-[350px] h-[500px] bg-background border border-glass-border rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
                        {/* Header */}
                        <div className="p-4 bg-primary text-white flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                <span className="font-semibold">AI Assistant</span>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-white/80 hover:text-white transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-glass-bg/50">
                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[85%] p-3 rounded-2xl text-sm whitespace-pre-wrap ${msg.role === 'user'
                                            ? 'bg-primary text-white rounded-br-none'
                                            : 'bg-glass-bg border border-glass-border text-foreground rounded-bl-none'
                                            }`}
                                    >
                                        {msg.content}
                                    </div>
                                </div>
                            ))}

                            {/* Quick Actions (Only show if last message is from assistant) */}
                            {messages.length > 0 && messages[messages.length - 1].role === 'assistant' && !isLoading && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    <button
                                        onClick={() => handleQuickAction("Schedule a meeting")}
                                        className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full hover:bg-primary/20 transition-colors border border-primary/20"
                                    >
                                        📅 Schedule Meeting
                                    </button>
                                    <button
                                        onClick={() => handleQuickAction("I want to leave a message")}
                                        className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full hover:bg-primary/20 transition-colors border border-primary/20"
                                    >
                                        ✉️ Leave Message
                                    </button>
                                    <button
                                        onClick={() => handleQuickAction("Show me your projects")}
                                        className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full hover:bg-primary/20 transition-colors border border-primary/20"
                                    >
                                        💼 View Projects
                                    </button>
                                </div>
                            )}

                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-glass-bg border border-glass-border p-3 rounded-2xl rounded-bl-none flex gap-1">
                                        <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSubmit} className="p-4 bg-background border-t border-glass-border">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask about Marwan..."
                                    className="flex-grow px-4 py-2 rounded-full bg-glass-bg border border-glass-border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm transition-all"
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading || !input.trim()}
                                    className="p-2 bg-primary text-white rounded-full hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Toggle Button */}
                {!isOpen && (
                    <button
                        onClick={() => setIsOpen(true)}
                        className="w-14 h-14 bg-primary text-white rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center group"
                    >
                        <svg className="w-7 h-7 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
                    </button>
                )}
            </div>
        </>
    );
}
