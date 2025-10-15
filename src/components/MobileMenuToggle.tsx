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
<<<<<<< HEAD
=======

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white shadow-md">
          <nav className="flex flex-col gap-4 p-4">
            <Link
              href="/"
              className="text-gray-700 hover:text-gray-900 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-gray-700 hover:text-gray-900 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/artisans"
              className="text-gray-700 hover:text-gray-900 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Artisans
            </Link>
>>>>>>> 0ab31d013cb3aa3c6242908d08dff0de4b0861da

            {(userRole === "seller" || userRole === "admin") && (
              <Link
                href="/sellers"
                className="text-gray-700 hover:text-gray-900 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Seller Dashboard
              </Link>
            )}
<<<<<<< HEAD
        </>
    );
=======

            {/* Cart + Auth */}
            <div className="flex items-center gap-4 pt-2 border-t border-gray-200">
              <CartIcon />
              <AuthButtons session={session} />
            </div>
          </nav>
        </div>
      )}
    </>
  );
>>>>>>> 0ab31d013cb3aa3c6242908d08dff0de4b0861da
}
