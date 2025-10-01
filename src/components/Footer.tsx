"use client";
import { Youtube, X, Instagram, Facebook } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  const socialLinks = [
    { href: "https://youtube.com", icon: <Youtube size={24} /> },
    { href: "https://x.com", icon: <X size={24} /> },
    { href: "https://instagram.com", icon: <Instagram size={24} /> },
    { href: "https://facebook.com", icon: <Facebook size={24} /> },
  ];

  return (
    <footer className="bg-secondary text-neutral mt-10">
      <div className="max-w-7xl mx-auto py-6 px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm font-light mb-4 md:mb-0">
          © {new Date().getFullYear()} Handcrafted Haven.
        </p>
        <div className="flex space-x-4">
          {socialLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-highlight transition-colors"
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
