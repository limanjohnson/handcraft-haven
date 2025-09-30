import styles from "./page.module.css";


function Main({ children, className }: { children: React.ReactNode; className?: string }) {
  return <main className={className}>{children}</main>;
}

export default function Home() {
  return (
    <div className={styles.page}>
        <Main>
            <h1>main page</h1>
            <p>This will be the main landing page.</p>
        </Main>
    </div>
  );
}
