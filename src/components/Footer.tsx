"use client";

import { Youtube, X, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  const socialLinks = [
    { href: "https://youtube.com", icon: <Youtube size={24} />, color: "#FF0000" },
    { href: "https://x.com", icon: <X size={24} />, color: "#000000" },
    { href: "https://instagram.com", icon: <Instagram size={24} />, color: "#E1306C" },
    { href: "https://facebook.com", icon: <Facebook size={24} />, color: "#1877F2" },
  ];

  return (
    <footer style={{ backgroundColor: '#D4C5A9' }} className="text-neutral mt-10">
      <div className="max-w-7xl mx-auto py-8 px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm font-light mb-4 md:mb-0 md:ml-20">
          © {new Date().getFullYear()} Handcrafted Haven.
        </p>
        <div className="flex space-x-6 md:mr-20">
          {socialLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all duration-300 hover:scale-110"
              style={{ color: link.color }}
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}