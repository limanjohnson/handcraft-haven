import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import { getFeaturedProducts, getAllArtisans } from "../../lib/repos";

export default async function Home() {
  const [products, artisans] = await Promise.all([
    getFeaturedProducts(6),
    getAllArtisans(6),
  ]);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {/* Hero Section - Full Width */}
        <section className={styles.hero}>
          {/* Background Image */}
          <div className={styles.heroImageBackground}>
            <Image
              src="/hero-image.jpg"
              alt="Handcrafted products"
              fill
              className={styles.heroBackgroundImg}
              style={{ objectFit: 'cover' }}
              priority
            />
            {/* Dark overlay for better text readability */}
            <div className={styles.heroOverlay}></div>
          </div>

          {/* Content on top of image */}
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Discover Unique Handcrafted Treasures
            </h1>
            <p className={styles.heroSubtitle}>
              Connect with talented artisans and find one-of-a-kind pieces that tell a story. 
              From handmade jewelry to custom furniture, every item is crafted with passion.
            </p>
            <div className={styles.heroCtas}>
              <Link href="/products" className={styles.ctaPrimary}>
                <span>Explore Products</span>
              </Link>
              <Link href="/artisans" className={styles.ctaSecondary}>
                <span>Meet Artisans</span>
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Featured products</h2>
            <Link href="/products" className={styles.sectionLink}>Browse products</Link>
          </div>
          <div className={styles.grid}>
            {products.map((p: any) => (
              <div key={p.id} className={styles.card}>
                <div className={styles.cardImage}>
                  <Image src={p.image_url} alt={p.title} width={320} height={200} />
                </div>
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{p.title}</h3>
                  <div className={styles.cardMeta}>
                    <span className={styles.price}>${Number(p.price).toFixed(2)}</span>
                    <Link href={`/products/${p.id}`} className={styles.cardAction}>View</Link>
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
                  <Image src={a.image_url} alt={`${a.name} avatar`} width={160} height={160} />
                </div>
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{a.name}</h3>
                  <div className={styles.cardMeta}>
                    <span className={styles.muted}>{a.bio ? a.bio.substring(0, 50) + '...' : "Artisan"}</span>
                    <Link href={`/artisans/${a.id}`} className={styles.cardAction}>Profile</Link>
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