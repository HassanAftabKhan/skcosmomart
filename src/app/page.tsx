import styles from './page.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <div className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroContainer}`}>
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
        </div>
      </section>

      {/* Categories */}
      <section className={styles.categories}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Shop by Category</h2>
            <Link href="/shop" className={styles.viewAll}>View All</Link>
          </div>
          <div className={styles.categoryGrid}>
            <Link href="/shop?category=Skincare" className={styles.categoryCard}>
              <div className={styles.categoryImgPlaceholder} style={{backgroundColor: '#F9E4E5', backgroundImage: 'url(https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=800&auto=format&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
              <h3>Skincare</h3>
            </Link>
            <Link href="/shop?category=Makeup" className={styles.categoryCard}>
              <div className={styles.categoryImgPlaceholder} style={{backgroundColor: '#EADFD7', backgroundImage: 'url(https://images.unsplash.com/photo-1596462502278-27bf85033e5a?q=80&w=800&auto=format&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
              <h3>Makeup</h3>
            </Link>
            <Link href="/shop?category=Haircare" className={styles.categoryCard}>
              <div className={styles.categoryImgPlaceholder} style={{backgroundColor: '#F3E5D8', backgroundImage: 'url(https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=800&auto=format&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
              <h3>Haircare</h3>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
