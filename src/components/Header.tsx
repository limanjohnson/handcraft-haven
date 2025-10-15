import Link from "next/link";
import Image from "next/image";
import { auth } from '../../auth';
import AuthButtons, { MobileAuthButtons } from "./AuthButtons";
import MobileMenuToggle from "./MobileMenuToggle";
import CartIcon from "./CartIcon";

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