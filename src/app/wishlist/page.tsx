"use client";

import { useEffect, useState } from "react";
import { useStore } from "@/context/StoreProvider";
import Link from "next/link";
import styles from "./page.module.css";
import ProductCard from "@/components/ProductCard";

export default function WishlistPage() {
  const { wishlist } = useStore();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWishlistProducts() {
      if (wishlist.length === 0) {
        setProducts([]);
        setLoading(false);
        return;
      }
      
      try {
        const res = await fetch(`/api/products?ids=${wishlist.join(',')}`);
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        }
      } catch (error) {
        console.error("Failed to fetch wishlist products", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchWishlistProducts();
  }, [wishlist]);

  if (loading) {
    return <div className="container" style={{ padding: '5rem 0', textAlign: 'center' }}>Loading your wishlist...</div>;
  }

  if (wishlist.length === 0) {
    return (
      <div className={`container ${styles.emptyWishlist}`}>
        <h1>Your Wishlist is Empty</h1>
        <p>Save your favorite items here to shop them later.</p>
        <Link href="/shop" className="btn btn-primary">Discover Products</Link>
      </div>
    );
  }

  return (
    <div className={`container ${styles.wishlistContainer}`}>
      <h1 className={styles.title}>Your Wishlist</h1>
      <p className={styles.subtitle}>You have {wishlist.length} item{wishlist.length !== 1 ? 's' : ''} saved.</p>
      
      <div className={styles.productGrid}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
