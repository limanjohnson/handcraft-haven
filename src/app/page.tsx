import styles from "./page.module.css";
import Link from "next/link";


function Main({ children, className }: { children: React.ReactNode; className?: string }) {
  return <main className={className}>{children}</main>;
}

export default function Home() {
  return (
    <div className={styles.page}>
        <Main>
            <h1>main page</h1>
            <p>This will be the main landing page.</p>
            <div>
                <Link
                    href="/login"

                >
                    <span>Log In</span>
                </Link>
            </div>
        </Main>
    </div>
  );
}
