"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import NavigationMenu from "@/components/NavigationMenu";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-[#EAE2B7]">
          <div className="flex items-center justify-between p-4">

            {/* Logo + Name */}
            <Link href="/" className="flex items-center gap-2 bg-white p-2 rounded-md">
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
              <NavigationMenu className="m-4"/>
                <button
                    className="px-2.5 py-1.5 border-2 border-[#003049] rounded-md bg-white text-[#003049] transition duration-200 hover:bg-[#003049] hover:text-white focus:outline-none focus:bg-[#003049] focus:text-white"
                >
                    Login
                </button>
            </nav>
          </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div style={{ backgroundColor: '#EAE2B7' }} className="md:hidden border-t border-highlight">
          <NavigationMenu />
            <button
                className="px-2.5 py-1.5 border-2 border-[#003049] rounded-md bg-white text-[#003049] transition duration-200 hover:bg-[#003049] hover:text-white focus:outline-none focus:bg-[#003049] focus:text-white"
            >
                Login
            </button>
        </div>
      )}
    </header>
  );
}