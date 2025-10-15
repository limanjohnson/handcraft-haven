//file updated Oct 12//
"use client";
import Link from "next/link";
import Image from "next/image";
import CartIcon from "@/components/CartIcon"; 
import { auth } from '../../auth';
import AuthButtons, { MobileAuthButtons } from "./AuthButtons";
import MobileMenuToggle from "./MobileMenuToggle";
import CartIcon from "./CartIcon";
=======
import CartIcon from "@/components/CartIcon"; 
>>>>>>> d080a4f (Checkout form, Cart Details and Number of Items on cart)

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

        {/* Hamburguer menu button (mobile) */}
        <button
          className="md:hidden text-neutral ml-auto"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex md:items-center md:gap-6">
          <Link
            href="/"
            className="text-gray-700 hover:text-gray-900 transition-colors"
          >
            Home
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
                {/* Mobile Menu Toggle */}
                <MobileMenuToggle session={session} />

                {/* Desktop Menu */}
                <nav className="hidden md:flex md:items-center md:gap-6">
                    <Link href="/" className="text-gray-700 hover:text-gray-900 transition-colors">
                        Home
                    </Link>
                    <Link href="/products" className="text-gray-700 hover:text-gray-900 transition-colors">
                        Products
                    </Link>
                    <Link href="/artisans" className="text-gray-700 hover:text-gray-900 transition-colors">
                        Artisans
                    </Link>

                    {/* Seller Dashboard. Visible only to users with the role seller or admin */}
                    {
                        (userRole === 'seller' || userRole === 'admin') && (
                            <Link href='/sellers' className="text-gray-700 hover:text-gray-900 transition-colors">
                                Seller Dashboard
                            </Link>
                        )
                    }

                    <AuthButtons session={session} />
                </nav>
            </div>
        </header>
    );
}
