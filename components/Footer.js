import Link from "next/link";
import { Logo } from "./Authform";
import { Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#3A1F0D] text-[#D8C3A5] border-t border-[#5a2f0d]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">

          {/* Brand */}
          <div>
            <Logo />
            <p className="text-[#A0714F] text-sm leading-relaxed mt-[-12px]">
              Discover personalized AI-powered learning roadmaps tailored to
              your goals. Learn smarter, stay focused, and achieve more.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#F5E6D3] font-bold text-sm uppercase tracking-widest mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Dashboard", href: "/dashboard" },
                { label: "My Roadmaps", href: "/generated-roadmap" },
                { label: "Profile", href: "/profile" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#A0714F] hover:text-[#C49A6C] transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / Socials placeholder */}
          <div>
            <h4 className="text-[#F5E6D3] font-bold text-sm uppercase tracking-widest mb-4">
              Get In Touch
            </h4>
            <p className="text-[#A0714F] text-sm leading-relaxed">
              Have questions or feedback?
            </p>
            <a
              href="mailto:prajnakv584@gmail.com"
              className="inline-block mt-2 text-[#C49A6C] hover:text-[#F5E6D3] transition-colors text-sm font-semibold"
            >
              support@pathmind.app
            </a>
          </div>

        </div>

        {/* Divider */}
        <div className="mt-10 pt-6 border-t border-[#5a2f0d]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[#6B5040] text-xs">
              © {currentYear} PathMind. All rights reserved.
            </p>
            <p className="text-[#6B5040] text-xs">
              Crafted with ♥ for learners everywhere
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}