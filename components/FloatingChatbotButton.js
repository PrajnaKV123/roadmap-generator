"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";

export default function FloatingChatbotButton() {
  return (
    <Link
      href="/ai-mentor"
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="AI Mentor Chatbot"
    >
      <div className="relative">
        {/* Pulse animation ring */}
        <div className="absolute inset-0 rounded-full bg-[#C49A6C] opacity-20 animate-ping group-hover:opacity-30 transition-opacity"></div>

        {/* Main button */}
        <div className="relative bg-[#C49A6C] hover:bg-[#B08556] text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border-2 border-[#F5E6D3]">
          <MessageCircle size={24} className="drop-shadow-sm" />

          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-[#2C1810] text-[#F5E6D3] text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap shadow-lg">
            Ask AI Mentor
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#2C1810]"></div>
          </div>
        </div>
      </div>
    </Link>
  );
}