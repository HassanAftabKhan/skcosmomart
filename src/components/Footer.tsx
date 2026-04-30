import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerInner}>
          <div className={styles.brandSection}>
            <h2 className={styles.logo}>SK Cosmo Mart</h2>
            <p className={styles.desc}>
              Premium skincare and makeup tailored for the modern Pakistani woman. Elevate your daily routine with our luxurious, authentic products.
            </p>
          </div>
          
          <div className={styles.linksSection}>
            <div className={styles.linkColumn}>
              <h3>Shop</h3>
              <Link href="/shop?category=Skincare">Skincare</Link>
              <Link href="/shop?category=Makeup">Makeup</Link>
              <Link href="/shop?category=Haircare">Haircare</Link>
              <Link href="/shop?sale=true">Special Offers</Link>
            </div>
            
            <div className={styles.linkColumn}>
              <h3>Customer Care</h3>
              <Link href="/contact">Contact Us</Link>
              <Link href="/shipping">Shipping Policy</Link>
              <Link href="/returns">Returns & Exchanges</Link>
              <Link href="/faq">FAQ</Link>
            </div>
          </div>
          
          <div className={styles.newsletterSection}>
            <h3>Stay Radiant</h3>
            <p>Subscribe for exclusive offers and skincare tips.</p>
            <form className={styles.newsletterForm}>
              <input type="email" placeholder="Your email address" required />
              <button type="submit" className="btn btn-primary">Subscribe</button>
            </form>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <p>© {new Date().getFullYear()} SK Cosmo Mart Pakistan. All rights reserved.</p>
          <div className={styles.paymentIcons}>
            <span>Cash on Delivery</span>
            {/* Add more payment icons here if needed */}
          </div>
        </div>
      </div>
    </footer>
  );
}
