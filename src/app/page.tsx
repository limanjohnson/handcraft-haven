import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { getFeaturedProducts, getAllArtisans } from "@/lib/repos";

export default async function Home() {
  const [products, artisans] = await Promise.all([
    getFeaturedProducts(6),
    getAllArtisans(6),
  ]);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {/* render your existing hero ... */}

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Featured products</h2>
            <Link href="/products" className={styles.sectionLink}>Browse products</Link>
          </div>
          <div className={styles.grid}>
            {products.map((p: any) => (
              <div key={p.id} className={styles.card}>
                <div className={styles.cardImage}>
                  <Image src={p.image_url ?? "/file.svg"} alt={p.title} width={320} height={200} />
                </div>
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{p.title}</h3>
                  <div className={styles.cardMeta}>
                    <span className={styles.price}>${Number(p.price).toFixed(2)}</span>
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
            {artisans.map((a: any) => (
              <div key={a.id} className={styles.card}>
                <div className={styles.cardImage}>
                  <Image src={a.avatar_url ?? "/globe.svg"} alt={`${a.name} avatar`} width={160} height={160} />
                </div>
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{a.name}</h3>
                  <div className={styles.cardMeta}>
                    <span className={styles.muted}>{a.specialty ?? "Artisan"}</span>
                    <Link href="/artisans" className={styles.cardAction}>Profile</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}