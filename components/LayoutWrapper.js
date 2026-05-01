// components/LayoutWrapper.jsx

"use client";

import { usePathname } from "next/navigation";
import FloatingChatbotButton from "./FloatingChatbotButton";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  // Hide chatbot on signup and login pages
  const hideChatbot =
    pathname === "/" || pathname === "/login";

  return (
    <>
      {children}

      {!hideChatbot && <FloatingChatbotButton />}
    </>
  );
}