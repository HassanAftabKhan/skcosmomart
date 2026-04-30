"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./ProductCard.module.css";
import { useStore } from "@/context/StoreProvider";

type ProductCardProps = {
  product: {
    id: string;
    title: string;
    price: number;
    salePrice: number | null;
    images: string;
    category: string;
  };
};

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  
  const isWishlisted = wishlist.includes(product.id);
  const imagesArray = JSON.parse(product.images || '[]');
  const mainImage = imagesArray[0] || "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=400&q=80";
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to product page
    addToCart({
      id: product.id,
      title: product.title,
      price: product.salePrice || product.price,
      image: mainImage,
      quantity: 1
    });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist(product.id);
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        {product.salePrice && (
          <span className={styles.saleBadge}>SALE</span>
        )}
        <button 
          className={`${styles.wishlistBtn} ${isWishlisted ? styles.active : ''}`}
          onClick={handleToggleWishlist}
          aria-label="Toggle Wishlist"
        >
          {isWishlisted ? '♥' : '♡'}
        </button>
        <Link href={`/product/${product.id}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={mainImage} 
            alt={product.title} 
            className={styles.image}
            loading="lazy"
          />
        </Link>
        <button className={styles.quickAddBtn} onClick={handleAddToCart}>
          Quick Add
        </button>
      </div>
      <div className={styles.info}>
        <p className={styles.category}>{product.category}</p>
        <Link href={`/product/${product.id}`} className={styles.title}>
          <h3>{product.title}</h3>
        </Link>
        <div className={styles.priceContainer}>
          {product.salePrice ? (
            <>
              <span className={styles.salePrice}>Rs. {product.salePrice}</span>
              <span className={styles.originalPrice}>Rs. {product.price}</span>
            </>
          ) : (
            <span className={styles.price}>Rs. {product.price}</span>
          )}
        </div>
      </div>
    </div>
  );
}
