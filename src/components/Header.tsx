"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import NavigationMenu from "@/components/NavigationMenu";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header style={{ backgroundColor: '#EAE2B7' }} className="shadow-md text-neutral">
      <div className="max-w-[1400px] mx-auto flex justify-between items-center p-4 px-8">
        {/* Logo + Name */}
        <Link href="/" className="flex items-center space-x-3">
          <Image
            src="/logo.png"
            alt="Handcrafted Haven Logo"
            width={50}
            height={50}
            priority
          />
          <span className="text-2xl font-bold">Handcrafted Haven</span>
        </Link>

        {/* Desktop Menu with Login Button */}
        <nav className="hidden md:flex md:items-center md:gap-6 flex-1 justify-end">
          <NavigationMenu />
        </nav>

        {/* Hamburger Button (mobile) */}
        <button
          className="md:hidden text-neutral"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div style={{ backgroundColor: '#EAE2B7' }} className="md:hidden border-t border-highlight">
          <NavigationMenu />
        </div>
      )}
    </header>
  );
}