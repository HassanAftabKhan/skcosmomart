"use client";

import Link from "next/link";
import styles from "./Navbar.module.css";
import { useStore } from "@/context/StoreProvider";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { cart, wishlist } = useStore();
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.headerInner}>
          <Link href="/" className={styles.logo}>SK Cosmo Mart</Link>
          
          <nav className={styles.nav}>
            <Link href="/shop">Shop All</Link>
            <Link href="/shop?category=Skincare">Skincare</Link>
            <Link href="/shop?category=Makeup">Makeup</Link>
          </nav>
          
          <div className={styles.headerActions}>
            <form onSubmit={handleSearch} className={styles.searchForm}>
              <input 
                type="text" 
                placeholder="Search products..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
              <button type="submit" aria-label="Search" className={styles.iconBtn}>🔍</button>
            </form>
            
            <Link href="/wishlist" aria-label="Wishlist" className={styles.iconBtn}>
              🤍 {wishlist.length > 0 && <span className={styles.badge}>{wishlist.length}</span>}
            </Link>
            <Link href="/cart" aria-label="Cart" className={styles.iconBtn}>
              🛍️ {cartItemsCount > 0 && <span className={styles.badge}>{cartItemsCount}</span>}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
