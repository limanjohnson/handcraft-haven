"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import NavigationMenu from "@/components/NavigationMenu";
import Image from "next/image";

function Logo() {
  return (
    <Image
      src="/logo.png"
      alt="Handcrafted Haven Logo"
      width={50}
      height={50}
      priority 
      suppressHydrationWarning
    />
  );
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header style={{ backgroundColor: "#5C4A3A", color: "#fff" }} className="mt-10">
      <div className="flex items-center justify-between p-4">
        {/* Logo + Name */}
        <Link href="/" className="flex items-center gap-2 bg-white p-2 rounded-md">
          <Logo />
          <span className="text-2xl font-bold dark:text-gray-800">Handcrafted Haven</span>
        </Link>


        {/* Hamburger Button (mobile) */}
        <button
          className="md:hidden text-neutral ml-auto"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Menu */}
        <nav className="hidden md:flex md:items-center md:gap-6">
          <NavigationMenu className="m-4" />
          <Link href="/login">
            <button className="px-2.5 py-1.5 border-2 border-[#003049] rounded-md bg-white text-[#003049] transition duration-200 hover:bg-[#003049] hover:text-white focus:outline-none focus:bg-[#003049] focus:text-white">
              Login
            </button>
          </Link>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-highlight" style={{ backgroundColor: '#fff' }}>
          <NavigationMenu className="flex flex-col gap-4 p-4"/>
          <Link href="/login" className="p-4">
            <button className="m-4 flex px-4 py-1.5 border-2 border-[#003049] rounded-md bg-white text-[#003049] transition duration-200 hover:bg-[#003049] hover:text-white focus:outline-none focus:bg-[#003049] focus:text-white">
              Login
            </button>
          </Link>
        </div>
      )}
    </header>
  );
}