// components/AuthForm.jsx

"use client";

import Link from "next/link";
import AuthImage from "@/components/AuthImage";

export function Logo() {
  return (
    <div className="flex items-center gap-2.5 mb-8">
      <div className="w-9 h-9 flex-shrink-0">
        <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <circle cx="18" cy="18" r="17" stroke="#C49A6C" strokeWidth="1.5" />
          <line x1="18" y1="29" x2="18" y2="10" stroke="#C49A6C" strokeWidth="2" strokeDasharray="3 2" strokeLinecap="round" />
          <circle cx="18" cy="29" r="3" fill="#C49A6C" />
          <circle cx="18" cy="19" r="3" fill="#A0714F" />
          <circle cx="18" cy="10" r="4.5" fill="#C49A6C" />
          <circle cx="18" cy="10" r="2" fill="#1F1B18" />
          <path d="M15 7 L18 4 L21 7" stroke="#C49A6C" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      </div>
      <div className="leading-tight">
        <span className="block text-[#F5E6D3] text-lg font-bold tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
          PathMind
        </span>
       
      </div>
    </div>
  );
}

export default function AuthForm({
  title,
  fields,
  buttonText,
  bottomText,
  bottomLinkText,
  bottomLinkHref,
  formData,
  handleChange,
  handleSubmit,
}) {
  const isLogin = fields.length === 2;

  return (
    <div className="min-h-screen bg-[#F5EFE6] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-6xl bg-[#5a2f0d] rounded-[30px] overflow-hidden shadow-2xl flex flex-col lg:flex-row">

        {/* ── Left: Form Panel ── */}
        <div className="flex-1 p-8 sm:p-10 md:p-14 text-white flex flex-col justify-center">

          <Logo />

          <h1
            className="text-3xl sm:text-4xl font-bold text-[#F5E6D3] mb-2"
            style={{ fontFamily: "Georgia, serif" }}
          >
            {title}
          </h1>
          <p className="text-[#A0714F] text-sm mb-8">
            {bottomText}{" "}
            <Link href={bottomLinkHref} className="text-[#C49A6C] font-semibold hover:text-[#F5E6D3] transition-colors underline underline-offset-2">
              {bottomLinkText}
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map((field) => (
              <div key={field.name} className="flex flex-col gap-1.5">
                <label className="text-[#A0714F] text-xs uppercase tracking-widest font-semibold">
                  {field.name}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
                  className="
                    w-full px-4 py-3.5 rounded-xl
                    bg-[#ddcfc3] border border-[#3D3028]
                    text-[#363432] placeholder-[#6B5040]
                    text-sm
                    focus:outline-none focus:ring-2 focus:ring-[#C49A6C] focus:border-transparent
                    hover:border-[#C49A6C]
                    transition-all duration-200
                  "
                />
              </div>
            ))}

            

            <button
              type="submit"
              className="
                w-full py-4 rounded-xl mt-2
                bg-[#C49A6C] text-[#1F1B18]
                font-bold text-sm tracking-wide
                hover:bg-[#D8B48A] active:scale-[0.98]
                transition-all duration-200
                shadow-lg
              "
            >
              {buttonText}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-[#cea890]" />
            <span className="text-[#f6e9e2] text-xs tracking-widest">PathMind</span>
            <div className="flex-1 h-px bg-[#cea890]" />
          </div>

         
        </div>

        {/* ── Right: Image Panel ── */}
        <AuthImage />
      </div>
    </div>
  );
}