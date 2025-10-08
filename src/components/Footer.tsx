"use client";

import { useEffect, useState } from "react";
import { Youtube, X, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  const [year, setYear] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setYear(new Date().getFullYear());
    setMounted(true);
  }, []);

  const socialLinks = [
    { href: "https://youtube.com", icon: <Youtube size={24} />, label: "YouTube" },
    { href: "https://x.com", icon: <X size={24} />, label: "X (Twitter)" },
    { href: "https://instagram.com", icon: <Instagram size={24} />, label: "Instagram" },
    { href: "https://facebook.com", icon: <Facebook size={24} />, label: "Facebook" },
  ];

  if (!mounted) return null;

  return (
    <footer style={{ backgroundColor: "#5C4A3A", color: "#fff" }} className="mt-10">
      <div className="max-w-7xl mx-auto py-8 px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm font-light mb-4 md:mb-0 md:ml-20" style={{ color: "#D4C5A9" }}>
          © {year} Handcrafted Haven. All rights reserved.
        </p>
        <div className="flex space-x-6 md:mr-20">
          {socialLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all duration-300 hover:scale-110"
              style={{ color: "#D4C5A9" }}
              aria-label={link.label}
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
