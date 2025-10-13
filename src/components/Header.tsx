<<<<<<< HEAD
=======
//file updated Oct 12//
"use client";
>>>>>>> 6a13270 (Updated files checkout form, cart details and number of items in the cart)
import Link from "next/link";
import Image from "next/image";
<<<<<<< HEAD
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

export default async function Header() {
    const session = await auth();
    const userRole = session?.user?.role;

    return (
        <header className="bg-white">
            <div className="flex items-center justify-between p-4">
                {/* Logo + Name */}
                <Link href="/" className="flex items-center gap-2 bg-white p-2 rounded-md">
                    <Logo />
                    <span className="text-2xl font-bold dark:text-gray-800">Handcrafted Haven</span>
                </Link>

<<<<<<< HEAD
                {/* Mobile Menu Toggle */}
                <MobileMenuToggle session={session} />

                {/* Desktop Menu */}
                <nav className="hidden md:flex md:items-center md:gap-6">
                    <Link href="/">  <span className="relative text-gray-700 hover:text-gray-900
                            after:absolute after:left-1/2 after:bottom-0 after:h-0.5 after:w-0
                            after:bg-[#7a603e] after:transition-all after:duration-300
                            hover:after:left-0 hover:after:w-full">
                        Home</span>
                    </Link>
                    <Link href="/products"> <span className="relative text-gray-700 hover:text-gray-900
                            after:absolute after:left-1/2 after:bottom-0 after:h-0.5 after:w-0
                            after:bg-[#7a603e] after:transition-all after:duration-300
                            hover:after:left-0 hover:after:w-full">
                        Products</span>
                    </Link>
                    <Link href="/artisans"><span className="relative text-gray-700 hover:text-gray-900
                            after:absolute after:left-1/2 after:bottom-0 after:h-0.5 after:w-0
                            after:bg-[#7a603e] after:transition-all after:duration-300
                            hover:after:left-0 hover:after:w-full">
                        Artisans</span>
                    </Link>

                    {/* Seller Dashboard. Visible only to users with the role seller or admin */}
                    {
                        (userRole === 'seller' || userRole === 'admin') && (
                            <Link href='/sellers'><span className="relative text-gray-700 hover:text-gray-900
                            after:absolute after:left-1/2 after:bottom-0 after:h-0.5 after:w-0
                            after:bg-[#7a603e] after:transition-all after:duration-300
                            hover:after:left-0 hover:after:w-full">
                                Seller Dashboard </span>
                            </Link>
                        )
                    }

                    <CartIcon />

                    <AuthButtons session={session} />
                </nav>
            </div>
        </header>
    );
}
=======
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
>>>>>>> d080a4f (Checkout form, Cart Details and Number of Items on cart)
