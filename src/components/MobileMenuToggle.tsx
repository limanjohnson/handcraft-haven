"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { MobileAuthButtons } from "./AuthButtons";

interface MobileMenuToggleProps {
    session: {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            role: 'buyer' | 'seller' | 'admin';
        };
    } | null;
}

export default function MobileMenuToggle({ session }: MobileMenuToggleProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Hamburger Button */}
            <button
                className="md:hidden text-neutral ml-auto"
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
                        <Link
                            href="/cart"
                            className="text-gray-700 hover:text-gray-900 transition-colors py-2"
                            onClick={() => setIsOpen(false)}
                        >
                            🛒 Cart
                        </Link>
                    </nav>

                    <MobileAuthButtons session={session} />
                </div>
            )}
        </>
    );
}