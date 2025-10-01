"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import NavigationMenu from "@/components/NavigationMenu";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-primary shadow-md text-neutral">
      <div className="max-w-7xl mx-auto flex flex-wrap md:flex-nowrap justify-between items-center p-4">
        
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

        {/* Hamburguer Button (mobile) */}
        <button
          className="md:hidden text-neutral ml-auto"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Menu  */}
        <nav className="hidden md:flex md:items-center md:gap-6">
          <NavigationMenu />
        </nav>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-primary border-t border-highlight">
          <NavigationMenu />
        </div>
      )}
    </header>
  );
}
