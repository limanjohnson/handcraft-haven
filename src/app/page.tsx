
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";

function Main({ children, className }: { children: React.ReactNode; className?: string }) {
  return <main className={className}>{children}</main>;
}

export default function Home() {
  return (
    <div className={styles.page}>
      <Main className={styles.main}>
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
      </Main>
    </div>
  );
}