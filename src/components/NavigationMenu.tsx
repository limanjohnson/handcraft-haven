"use client";
import Link from "next/link";
import styles from "@/app/ui/NavigationMenu.module.css";

export default function NavigationMenu() {
  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Artisans", href: "/artisans" },
    { label: "Sellers", href: "/sellers" },
  ];

  return (
    <nav className={styles["navigation-menu-container"]}>
      <ul className={styles["menu-list"]}>
        {menuItems.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
      <div className={styles["right-side-menu"]}>
        <button className={styles["login-button"]}>Login</button>
      </div>
    </nav>
  );
}
