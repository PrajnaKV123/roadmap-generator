// components/AuthImage.jsx

export default function AuthImage() {
  return (
    <div className="hidden lg:flex flex-1 flex-col items-center justify-center bg-[#2C1A0E] relative overflow-hidden px-10 py-14 rounded-r-[30px]">

      {/* Background depth circles */}
      <div className="absolute top-[-100px] left-[-100px] w-[350px] h-[350px] rounded-full bg-[#3D2512] opacity-50" />
      <div className="absolute bottom-[-80px] right-[-80px] w-[300px] h-[300px] rounded-full bg-[#3D2512] opacity-40" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full border border-[#8B5E3C] opacity-10" />

      {/* SVG Illustration */}
      <div className="relative z-10 w-full max-w-[320px]">
        <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full drop-shadow-2xl">

          {/* Dashed roadmap spine */}
          <path d="M200 370 L200 60" stroke="#C49A6C" strokeWidth="3" strokeDasharray="10 7" strokeLinecap="round" opacity="0.6" />

          {/* ── Node 1 — Bottom: Foundations ── */}
          <circle cx="200" cy="355" r="16" fill="#C49A6C" opacity="0.2" />
          <circle cx="200" cy="355" r="11" fill="#C49A6C" />
          <circle cx="200" cy="355" r="5" fill="#2C1A0E" />
          <rect x="90" y="345" width="90" height="22" rx="7" fill="#3D2512" />
          <text x="135" y="360" textAnchor="middle" fill="#F5E6D3" fontSize="10" fontFamily="Georgia, serif">Foundations</text>
          <line x1="183" y1="355" x2="180" y2="356" stroke="#C49A6C" strokeWidth="1.5" opacity="0.6" />

          {/* ── Node 2 — Core Skills ── */}
          <circle cx="200" cy="270" r="16" fill="#A0714F" opacity="0.2" />
          <circle cx="200" cy="270" r="11" fill="#A0714F" />
          <circle cx="200" cy="270" r="5" fill="#2C1A0E" />
          <rect x="90" y="260" width="90" height="22" rx="7" fill="#3D2512" />
          <text x="135" y="275" textAnchor="middle" fill="#F5E6D3" fontSize="10" fontFamily="Georgia, serif">Core Skills</text>
          <line x1="183" y1="270" x2="180" y2="271" stroke="#C49A6C" strokeWidth="1.5" opacity="0.6" />

          {/* Right labels */}
          <rect x="220" y="345" width="88" height="22" rx="7" fill="#3D2512" />
          <text x="264" y="360" textAnchor="middle" fill="#C49A6C" fontSize="10" fontFamily="Georgia, serif">Resources</text>
          <line x1="217" y1="355" x2="220" y2="356" stroke="#C49A6C" strokeWidth="1.5" opacity="0.6" />

          <rect x="220" y="260" width="88" height="22" rx="7" fill="#3D2512" />
          <text x="264" y="275" textAnchor="middle" fill="#C49A6C" fontSize="10" fontFamily="Georgia, serif">Projects</text>
          <line x1="217" y1="270" x2="220" y2="271" stroke="#C49A6C" strokeWidth="1.5" opacity="0.6" />

          {/* ── Node 3 — Advanced ── */}
          <circle cx="200" cy="183" r="18" fill="#C49A6C" opacity="0.2" />
          <circle cx="200" cy="183" r="12" fill="#C49A6C" />
          <circle cx="200" cy="183" r="5" fill="#2C1A0E" />
          <rect x="88" y="173" width="92" height="22" rx="7" fill="#3D2512" />
          <text x="134" y="188" textAnchor="middle" fill="#F5E6D3" fontSize="10" fontFamily="Georgia, serif">Advanced</text>
          <line x1="182" y1="183" x2="180" y2="184" stroke="#C49A6C" strokeWidth="1.5" opacity="0.6" />

          <rect x="220" y="173" width="88" height="22" rx="7" fill="#3D2512" />
          <text x="264" y="188" textAnchor="middle" fill="#C49A6C" fontSize="10" fontFamily="Georgia, serif">Mastery</text>
          <line x1="217" y1="183" x2="220" y2="184" stroke="#C49A6C" strokeWidth="1.5" opacity="0.6" />

          {/* ── Top Node — AI Brain ── */}
          <circle cx="200" cy="80" r="42" fill="#C49A6C" opacity="0.08" />
          <circle cx="200" cy="80" r="30" fill="#C49A6C" opacity="0.15" />
          <circle cx="200" cy="80" r="22" fill="#C49A6C" />

          {/* Circuit / brain icon */}
          <path d="M191 74 Q196 68 200 74 Q204 68 209 74 L209 86 Q204 92 200 86 Q196 92 191 86 Z" fill="#2C1A0E" opacity="0.75" />
          <line x1="195" y1="74" x2="195" y2="86" stroke="#F5E6D3" strokeWidth="1.2" opacity="0.6" />
          <line x1="200" y1="71" x2="200" y2="89" stroke="#F5E6D3" strokeWidth="1.2" opacity="0.6" />
          <line x1="205" y1="74" x2="205" y2="86" stroke="#F5E6D3" strokeWidth="1.2" opacity="0.6" />
          <line x1="191" y1="80" x2="209" y2="80" stroke="#F5E6D3" strokeWidth="1.2" opacity="0.6" />

          {/* Floating sparkles */}
          <circle cx="70" cy="120" r="3" fill="#C49A6C" opacity="0.45" />
          <circle cx="330" cy="200" r="2.5" fill="#F5E6D3" opacity="0.35" />
          <circle cx="345" cy="90" r="4" fill="#C49A6C" opacity="0.3" />
          <circle cx="55" cy="230" r="2" fill="#F5E6D3" opacity="0.3" />
          <circle cx="310" cy="330" r="2" fill="#C49A6C" opacity="0.3" />
        </svg>
      </div>

      {/* Text */}
      <div className="relative z-10 text-center mt-4">
        <h2 className="text-[#F5E6D3] text-2xl font-bold" style={{ fontFamily: "Georgia, serif" }}>
          Your Learning, Mapped.
        </h2>
        <p className="text-[#C49A6C] text-sm mt-2 max-w-[260px] mx-auto leading-relaxed">
          AI-powered roadmaps tailored to your goals — from beginner to expert, one step at a time.
        </p>
        <div className="flex justify-center gap-2 mt-5">
          <div className="w-6 h-1.5 rounded-full bg-[#C49A6C]" />
          <div className="w-2 h-1.5 rounded-full bg-[#C49A6C] opacity-40" />
          <div className="w-2 h-1.5 rounded-full bg-[#C49A6C] opacity-40" />
        </div>
      </div>
    </div>
  );
}