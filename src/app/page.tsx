import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

function Main({ children, className }: { children: React.ReactNode; className?: string }) {
  return <main className={className}>{children}</main>;
}

const categories = [
  "Jewelry",
  "Textiles",
  "Ceramics",
  "Woodwork",
  "Leather",
  "Art & Prints",
];

const featuredProducts = [
  { id: 1, title: "Woven Basket", price: 45, image: "/window.svg" },
  { id: 2, title: "Clay Mug", price: 28, image: "/file.svg" },
  { id: 3, title: "Hand‑stamped Ring", price: 35, image: "/globe.svg" },
  { id: 4, title: "Carved Spoon", price: 18, image: "/next.svg" },
  { id: 5, title: "Leather Pouch", price: 22, image: "/vercel.svg" },
  { id: 6, title: "Block Print", price: 30, image: "/window.svg" },
];

const artisans = [
  { id: "a1", name: "Ama K.", specialty: "Textiles", avatar: "/globe.svg" },
  { id: "a2", name: "Jon D.", specialty: "Woodwork", avatar: "/file.svg" },
  { id: "a3", name: "Mina R.", specialty: "Ceramics", avatar: "/window.svg" },
];

export default function Home() {
  return (
    <div className={styles.page}>
      <Main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Discover handcrafted goods from local artisans</h1>
            <p className={styles.heroSubtitle}>
              Shop unique, sustainable pieces made with care. Every purchase supports a maker.
            </p>
            <div className={`${styles.ctas} ${styles.heroCtas}`}>
              <Link className="primary" href="/products">Shop now</Link>
              <Link className="secondary" href="/artisans">Meet the artisans</Link>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Shop by category</h2>
            <Link href="/products" className={styles.sectionLink}>View all</Link>
          </div>
          <div className={styles.chipGroup}>
            {categories.map((c) => (
              <Link key={c} href={`/products?category=${encodeURIComponent(c)}`} className={styles.chip}>
                {c}
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Featured products</h2>
            <Link href="/products" className={styles.sectionLink}>Browse products</Link>
          </div>
          <div className={styles.grid}>
            {featuredProducts.map((p) => (
              <div key={p.id} className={styles.card}>
                <div className={styles.cardImage}>
                  <Image src={p.image} alt={p.title} width={320} height={200} />
                </div>
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{p.title}</h3>
                  <div className={styles.cardMeta}>
                    <span className={styles.price}>${p.price.toFixed(2)}</span>
                    <Link href="/products" className={styles.cardAction}>View</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Meet our artisans</h2>
            <Link href="/artisans" className={styles.sectionLink}>Explore artisans</Link>
          </div>
          <div className={styles.grid}>
            {artisans.map((a) => (
              <div key={a.id} className={styles.card}>
                <div className={styles.cardImage}>
                  <Image src={a.avatar} alt={`${a.name} avatar`} width={160} height={160} />
                </div>
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{a.name}</h3>
                  <div className={styles.cardMeta}>
                    <span className={styles.muted}>{a.specialty}</span>
                    <Link href="/artisans" className={styles.cardAction}>Profile</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionCta}>
            <h2>Sell your craft on Handcrafted Haven</h2>
            <p>Join our community of makers and reach customers who value quality and story.</p>
            <div className={styles.ctas}>
              <Link className="primary" href="/sellers">Become a seller</Link>
              <Link className="secondary" href="/artisans">See success stories</Link>
            </div>
          </div>
        </section>
      </Main>
    </div>
  );
}