"use client";

import { useState } from "react";
import Link from "next/link";
import CartIcon from "@/components/CartIcon";
import AuthButtons from "./AuthButtons";
import { Menu, X } from "lucide-react"; // or react-icons if you prefer

interface MobileMenuToggleProps {
  session: any;
}

export default function MobileMenuToggle({ session }: MobileMenuToggleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const userRole = session?.user?.role;

  return (
    <>
      {/* Hamburger / Close button */}
      <button
        className="md:hidden text-gray-700"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Menu"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="fixed inset-0 top-[72px] z-50 md:hidden bg-white border-t border-gray-200">
                    <nav className="flex flex-col gap-4 p-4">
                        <Link
                            href="/"
                            className="text-gray-700 hover:text-gray-900 transition-colors py-2"
                            onClick={() => setIsOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href="/products"
                            className="text-gray-700 hover:text-gray-900 transition-colors py-2"
                            onClick={() => setIsOpen(false)}
                        >
                            Products
                        </Link>
                        <Link
                            href="/artisans"
                            className="text-gray-700 hover:text-gray-900 transition-colors py-2"
                            onClick={() => setIsOpen(false)}
                        >
                            Artisans
                        </Link>
                    </nav>

                    <MobileAuthButtons session={session} />
                </div>
            )}
        </>
    );
}
