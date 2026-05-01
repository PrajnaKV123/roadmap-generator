"use client";

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/Footer";
import { Send, Bot, User, Sparkles } from "lucide-react";

export default function AIMentorPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai",
      content: "Hello! I'm your AI Career Mentor. I'm here to help you with:\n\n• Learning path guidance\n• Roadmap recommendations\n• Interview preparation\n• Project suggestions\n• Career advice\n• Skill gap analysis\n\nWhat would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/login");
      return;
    }
  }, [router]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:5000/api/chatbot/ask", {
        question: userMessage.content,
      });

      const aiMessage = {
        id: Date.now() + 1,
        type: "ai",
        content: response.data.response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Chatbot error:", error);
      console.error("Chatbot error response:", error.response?.data || error.message || error);
      const errorMessage = {
        id: Date.now() + 1,
        type: "ai",
        content: error.response?.data?.message || "Sorry, I'm having trouble connecting right now. Please try again later.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const suggestedQuestions = [
    "What should I learn after React?",
    "How do I prepare for frontend interviews?",
    "Suggest projects for my resume",
    "What's the best way to learn Node.js?",
    "How to build a portfolio website?",
  ];

  return (
    <div className="min-h-screen bg-[#F5EFE6]">
      <Header />

      <main className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-[#C49A6C] rounded-full">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-[#632709]" style={{ fontFamily: "serif" }}>
                  AI Career Mentor
                </h1>
                <p className="text-[#8B6F60] mt-1">Your personal learning guide</p>
              </div>
            </div>
            <p className="text-[#5C4435] max-w-2xl mx-auto leading-relaxed">
              Get intelligent guidance on your learning journey. Ask me anything about skills,
              projects, interviews, or career development.
            </p>
          </div>

          {/* Chat Container */}
          <div className="bg-white border border-[#E2C9A0] rounded-[32px] shadow-lg overflow-hidden">
            {/* Chat Messages */}
            <div className="h-[500px] sm:h-[600px] overflow-y-auto p-4 sm:p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.type === "ai" && (
                    <div className="flex-shrink-0 w-8 h-8 bg-[#C49A6C] rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}

                  <div
                    className={`max-w-[80%] sm:max-w-[70%] rounded-2xl px-4 py-3 ${
                      message.type === "user"
                        ? "bg-[#C49A6C] text-white"
                        : "bg-[#FDF6EE] border border-[#E2C9A0] text-[#2C1810]"
                    }`}
                  >
                    <p className="whitespace-pre-wrap leading-relaxed">
                      {message.content}
                    </p>
                    <p className={`text-xs mt-2 ${
                      message.type === "user" ? "text-[#F5E6D3]" : "text-[#8B6F60]"
                    }`}>
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>

                  {message.type === "user" && (
                    <div className="flex-shrink-0 w-8 h-8 bg-[#8C4A36] rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#C49A6C] rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-[#FDF6EE] border border-[#E2C9A0] rounded-2xl px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-[#C49A6C] rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-[#C49A6C] rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                        <div className="w-2 h-2 bg-[#C49A6C] rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      </div>
                      <span className="text-[#8B6F60] text-sm">AI Mentor is typing...</span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            {messages.length === 1 && !isLoading && (
              <div className="px-4 sm:px-6 pb-4 border-t border-[#E2C9A0]">
                <p className="text-sm text-[#8B6F60] mb-3 mt-3">Try asking:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => setInput(question)}
                      className="px-3 py-2 bg-[#FDF6EE] border border-[#E2C9A0] rounded-full text-sm text-[#5C4435] hover:bg-[#F9F4ED] hover:border-[#C49A6C] transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Form */}
            <div className="border-t border-[#E2C9A0] p-4 sm:p-6">
              <form onSubmit={handleSubmit} className="flex gap-3">
                <div className="flex-1 relative">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about your learning journey..."
                    className="w-full px-4 py-3 pr-12 border border-[#E2C9A0] rounded-2xl bg-[#FDF6EE] text-[#2C1810] placeholder-[#8B6F60] focus:outline-none focus:ring-2 focus:ring-[#C49A6C] focus:border-transparent resize-none"
                    rows="1"
                    disabled={isLoading}
                  />
                  <Sparkles className="absolute right-3 top-3 w-5 h-5 text-[#C49A6C]" />
                </div>
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="px-4 py-3 bg-[#C49A6C] hover:bg-[#B08556] disabled:bg-[#D8C3A5] text-white rounded-2xl transition-colors flex items-center justify-center disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
              <p className="text-xs text-[#8B6F60] mt-2 text-center">
                Press Enter to send • AI responses powered by Google Gemini
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}