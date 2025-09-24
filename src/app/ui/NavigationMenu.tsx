import styles from "./NavigationMenu.module.css";
import Link from "next/link";


export default function NavigationMenu() {

    return (
        <div className={styles["navigation-menu-container"]}>
            <h2 className={styles["logo"]}>Handcrafted Haven</h2>
            <nav>
                <ul className={styles["menu-list"]}>
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/products">Products</Link></li>
                    <li><Link href="/artisans">Artisans</Link></li>
                    <li><Link href="/sellers">Sellers</Link></li>
                </ul>
            </nav>
            <div className={styles["right-side-menu"]}>
                <button className={styles["login-button"]}>Login</button>
            </div>
        </div>
    )
}