
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "./Authform";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("generatedRoadmap");
    localStorage.removeItem("selectedSkill");
    router.push("/");
  };

  const navClass =
    "relative hover:text-[#C49A6C] after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-[#C49A6C] after:transition-all after:duration-300 hover:after:w-full";

  return (
    <header className="relative z-50 bg-[#75511a] px-6 shadow-md border-b border-[#D8C3A5]">

      {/* Top Bar */}
      <div className="flex justify-between items-center">

        {/* Left Side Logo */}
        <div className="flex items-center mt-5">
          <Logo />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 items-center text-[18px] text-[#f0e9e6] font-medium">
          <Link href="/generated-roadmap" className={navClass}>
            My Roadmaps
          </Link>

         <Link href="/dashboard" className={navClass}>
            Dashboard
          </Link>

          <Link href="/profile" className={navClass}>
            Profile
          </Link>

          <button
            onClick={handleLogout}
            className="ml-4 px-5 py-2 rounded-xl bg-[#C49A6C] text-[#1F1B18] font-bold text-sm hover:bg-[#D8B48A] transition-all duration-200"
          >
            Logout
          </button>
        </nav>

        {/* Hamburger Button */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden text-2xl p-2 text-[#ecd9d0]"
        >
          {menuOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 bg-white rounded-xl shadow-lg p-4 flex flex-col gap-4 text-[16px] text-[#2D1B12] border border-[#D8C3A5]">

          <Link
            href="/generated-roadmap"
            onClick={() => setMenuOpen(false)}
            className="hover:text-[#C49A6C]"
          >
            My Roadmaps
          </Link>

          <Link
            href="/dashboard"
            onClick={() => setMenuOpen(false)}
            className="hover:text-[#C49A6C]"
          >
            Dashboard
          </Link>

          <Link
            href="/profile"
            onClick={() => setMenuOpen(false)}
            className="hover:text-[#C49A6C]"
          >
            Profile
          </Link>

          <button
            onClick={() => {
              setMenuOpen(false);
              handleLogout();
            }}
            className="text-left text-red-600 font-semibold hover:text-red-800"
          >
            Logout
          </button>

        </div>
      )}
    </header>
  );
}