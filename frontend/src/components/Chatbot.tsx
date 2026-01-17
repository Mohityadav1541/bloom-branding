
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area"; // Assuming you have this or standard div
import axios from "axios";

interface Message {
    id: string;
    text: string;
    sender: "user" | "bot";
    timestamp: Date;
}

export const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            text: "Hello! I'm Bloom's AI Assistant. How can I help you today?",
            sender: "bot",
            timestamp: new Date(),
        },
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSendMessage = async (e?: React.FormEvent) => {
        e?.preventDefault();

        if (!inputValue.trim()) return;

        const newUserMessage: Message = {
            id: Date.now().toString(),
            text: inputValue,
            sender: "user",
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, newUserMessage]);
        setInputValue("");
        setIsLoading(true);

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await axios.post(`${apiUrl}/api/chat`, {
                message: newUserMessage.text,
            });

            const botResponse: Message = {
                id: (Date.now() + 1).toString(),
                text: response.data.reply || "I didn't catch that. Could you say it again?",
                sender: "bot",
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, botResponse]);
        } catch (error) {
            console.error("Chat error:", error);
            const errorMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: "Sorry, I'm having trouble connecting right now. Please try again later.",
                sender: "bot",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMsg]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-24 right-6 w-[90vw] md:w-[380px] h-[500px] bg-card border border-border rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-4 bg-primary text-primary-foreground flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 bg-white/10 rounded-full">
                                    <Sparkles className="w-4 h-4" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-sm">Bloom Assistant</h3>
                                    <p className="text-[10px] opacity-80 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                                        Online
                                    </p>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 hover:bg-white/20 text-primary-foreground"
                                onClick={() => setIsOpen(false)}
                            >
                                <X className="w-5 h-5" />
                            </Button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30">
                            {messages.map((message) => (
                                <motion.div
                                    key={message.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"
                                        }`}
                                >
                                    <div
                                        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${message.sender === "user"
                                                ? "bg-primary text-primary-foreground rounded-tr-none"
                                                : "bg-card border border-border/50 shadow-sm rounded-tl-none"
                                            }`}
                                    >
                                        {message.text}
                                    </div>
                                </motion.div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-card border border-border/50 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
                                        <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 bg-card border-t border-border">
                            <form
                                onSubmit={handleSendMessage}
                                className="flex items-center gap-2"
                            >
                                <Input
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Ask about our services..."
                                    className="flex-1 bg-muted/50 border-input/50 focus-visible:ring-primary/20"
                                />
                                <Button
                                    type="submit"
                                    size="icon"
                                    disabled={isLoading || !inputValue.trim()}
                                    className="shrink-0"
                                >
                                    <Send className="w-4 h-4" />
                                </Button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center z-50 hover:shadow-xl hover:shadow-primary/20 transition-shadow"
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <X className="w-6 h-6" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="chat"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <MessageCircle className="w-6 h-6" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
        </>
    );
};
