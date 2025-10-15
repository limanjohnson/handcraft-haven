"use client";

import Link from "next/link";
import Image from "next/image";
import CartIcon from "@/components/CartIcon";
// import { auth } from "../../auth"; // ❌ comment out if next-auth not installed
import AuthButtons from "./AuthButtons";
import MobileMenuToggle from "./MobileMenuToggle";

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
  // Comment out session if next-auth not installed
  // const session = await auth();
  const session = null;
  const userRole = session?.user?.role;

  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between p-4">
        {/* Logo and site name */}
        <Link
          href="/"
          className="flex items-center gap-2 bg-white p-2 rounded-md"
        >
          <Logo />
          <span className="text-2xl font-bold text-gray-800">
            Handcrafted Haven
          </span>
        </Link>

        {/* Mobile menu toggle */}
        <MobileMenuToggle session={session} />

        {/* Desktop navigation */}
        <nav className="hidden md:flex md:items-center md:gap-6">
          <Link
            href="/"
            className="text-gray-700 hover:text-gray-900 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/products"
            className="text-gray-700 hover:text-gray-900 transition-colors"
          >
            Products
          </Link>
          <Link
            href="/artisans"
            className="text-gray-700 hover:text-gray-900 transition-colors"
          >
            Artisans
          </Link>

          {/* Seller Dashboard visible only for sellers/admins */}
          {(userRole === "seller" || userRole === "admin") && (
            <Link
              href="/sellers"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Seller Dashboard
            </Link>
          )}

          {/* Cart and Auth buttons */}
          <CartIcon />
          <AuthButtons session={session} />
        </nav>
      </div>
    </header>
  );
}
