"use client";
import Link from "next/link";

export default function NavigationMenu({ className = "" }: { className?: string }) {
  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Artisans", href: "/artisans" },
    { label: "Sellers", href: "/sellers" },
  ];

  return (
      <ul className={`flex list-none ${className}`}>
        {menuItems.map((item) => (
          <li key={item.href} className="mx-4 md:mx-6 dark:text-gray-800">
            <Link href={item.href} className="p-4">{item.label}</Link>
          </li>
        ))}
      </ul>
  );
}
