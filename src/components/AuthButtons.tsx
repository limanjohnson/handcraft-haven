'use client';
import Link from 'next/link';
import { signOut } from  'next-auth/react';

interface AuthButtonsProps {
    session: {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            role: 'buyer' | 'seller' | 'admin';
        };
    } | null;
}

export default function AuthButtons({ session }: AuthButtonsProps) {
    if (session?.user) {
        return (
            <div className='flex items-center gap-4'>
                <div className='text-sm'>
                    <p className='font-medium text-gray-800'>
                        {session.user.name || session.user.email}
                    </p>
                    <p className='text-xs text-xs text-gray-500 capitalize'>
                        {session.user.role}
                    </p>
                </div>
                <button
                    onClick={() => signOut({ callbackUrl: '/'})}
                    className='px-4 py-2 border-2 border-red-600 rounded-md bg-white text-red-600 transition duration-200 hover:bg-red-600 hover:text-white focus:outline-none focus:bg-red-600 focus:text-white'
                >
                    Logout
                </button>
            </div>
        );
    }

    return (
        <div className='flex gap-3'>
            <Link href='/login'>
                <button className='px-4 py-2 border-2 border-[#003049] rounded-md bg-white text-[#003049] transition duration-200 hover:bg-[#003049] hover:text-white focus:outline-none focus:bg-[#003049] focus:text-white'>
                    Login
                </button>
            </Link>
            <Link href='/signup'>
                <button className='px-4 py-2 rounded-md bg-[#003049] text-white transition duration-200 hover:bg-[#002a3d] focus:outline-none'>
                    Sign Up
                </button>
            </Link>
        </div>
    );
}

export function MobileAuthButtons({ session }: AuthButtonsProps) {
    if (session?.user) {
        return (
            <div className="p-4 border-t border-gray-200">
                <div className="space-y-3">
                    <div className="text-sm">
                        <p className="font-medium text-gray-800">
                            {session.user.name || session.user.email}
                        </p>
                        <p className="text-xs text-gray-500 capitalize">
                            {session.user.role}
                        </p>
                    </div>
                    <button
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className="w-full px-4 py-2 border-2 border-red-600 rounded-md bg-white text-red-600 transition duration-200 hover:bg-red-600 hover:text-white"
                    >
                        Logout
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 border-t border-gray-200">
            <div className="flex flex-col gap-2">
                <Link href="/login">
                    <button className="w-full px-4 py-2 border-2 border-[#003049] rounded-md bg-white text-[#003049] transition duration-200 hover:bg-[#003049] hover:text-white">
                        Login
                    </button>
                </Link>
                <Link href="/signup">
                    <button className="w-full px-4 py-2 rounded-md bg-[#003049] text-white transition duration-200 hover:bg-[#002a3d]">
                        Sign Up
                    </button>
                </Link>
            </div>
        </div>
    );
}