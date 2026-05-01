import styles from './page.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <div className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroContainer}`}>
          <div className={styles.heroSplit}>
            <div className={`${styles.heroContent} animate-fade-in`}>
              <span className="accent-text">Glow effortlessly</span>
              <h1>Radiate Your True Beauty</h1>
              <p>Premium skincare and makeup tailored for the modern Pakistani woman. Experience luxury with every drop.</p>
              <div className={styles.heroActions}>
                <Link href="/shop" className="btn btn-primary">Shop Collection</Link>
                <Link href="/shop?category=Best-Sellers" className="btn btn-secondary">Best Sellers</Link>
              </div>
              <div className={styles.trustBadges}>
                <span>✨ 100% Authentic</span>
                <span>💝 Cash on Delivery</span>
                <span>🚚 Fast Shipping</span>
              </div>
            </div>
            
            <div className={`${styles.heroImageWrapper} animate-fade-in`}>
              <div className={styles.heroImageContainer}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/hero.png" alt="Luxury Cosmetics" className={styles.heroImage} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className={styles.categories}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Shop by Category</h2>
          </div>
          <div className={styles.categoryGrid}>
            <Link href="/shop?category=Skincare" className={styles.categoryCard}>
              <div className={styles.categoryImgPlaceholder} style={{backgroundImage: 'url(/images/skincare.png)'}}></div>
              <div className={styles.categoryOverlay}>
                <h3>Skincare</h3>
              </div>
            </Link>
            <Link href="/shop?category=Makeup" className={styles.categoryCard}>
              <div className={styles.categoryImgPlaceholder} style={{backgroundImage: 'url(/images/makeup.png)'}}></div>
              <div className={styles.categoryOverlay}>
                <h3>Makeup</h3>
              </div>
            </Link>
            <Link href="/shop?category=Fragrance" className={styles.categoryCard}>
              <div className={styles.categoryImgPlaceholder} style={{backgroundImage: 'url(/images/fragrance.png)'}}></div>
              <div className={styles.categoryOverlay}>
                <h3>Fragrances</h3>
              </div>
            </Link>
            <Link href="/shop" className={styles.categoryCard}>
              <div className={styles.categoryImgPlaceholder} style={{backgroundImage: 'url(/images/view-all.png)'}}></div>
              <div className={styles.categoryOverlay}>
                <h3>View All</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
