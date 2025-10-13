"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import NavigationMenu from "@/components/NavigationMenu";
import Image from "next/image";
import CartIcon from "@/components/CartIcon"; 

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
    <header className="bg-white">
      <div className="flex items-center justify-between p-4">
        {/* Logo + Name */}
        <Link href="/" className="flex items-center gap-2 bg-white p-2 rounded-md">
          <Logo />
          <span className="text-2xl font-bold dark:text-gray-800">Handcrafted Haven</span>
        </Link>

        {/* Hamburguer menu button (mobile) */}
        <button
          className="md:hidden text-neutral ml-auto"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Menu Desktop */}
        <nav className="hidden md:flex md:items-center md:gap-6">
          <NavigationMenu className="m-4" />
          
          {/* Cart Icon */}
          <CartIcon />

          <Link href="/login">
            <button className="px-2.5 py-1.5 border-2 border-[#003049] rounded-md bg-white text-[#003049] transition duration-200 hover:bg-[#003049] hover:text-white focus:outline-none focus:bg-[#003049] focus:text-white">
              Login
            </button>
          </Link>
        </nav>
      </div>

      {/* Menu Mobile */}
      {isOpen && (
        <div className="md:hidden border-t border-highlight" style={{ backgroundColor: '#fff' }}>
          <NavigationMenu className="flex flex-col gap-4 p-4" />
          
          {/* Cart Icon (mobile) */}
          <div className="p-4 flex items-center gap-4">
            <CartIcon />
            <Link href="/login" className="flex-1">
              <button className="w-full flex justify-center px-4 py-1.5 border-2 border-[#003049] rounded-md bg-white text-[#003049] transition duration-200 hover:bg-[#003049] hover:text-white focus:outline-none focus:bg-[#003049] focus:text-white">
                Login
              </button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
