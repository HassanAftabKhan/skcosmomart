"use client";

import { deleteProduct } from "@/app/actions/admin";
import styles from "./page.module.css";
import { useState } from "react";

export default function ProductList({ products }: { products: any[] }) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setLoadingId(id);
      await deleteProduct(id);
      setLoadingId(null);
    }
  };

  return (
    <div className={styles.listContainer}>
      {products.length === 0 ? (
        <p className={styles.emptyState}>No products found.</p>
      ) : (
        <div className={styles.productList}>
          {products.map(product => {
            const images = JSON.parse(product.images || '[]');
            const mainImg = images[0] || '';
            
            return (
              <div key={product.id} className={styles.productListItem}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {mainImg && <img src={mainImg} alt={product.title} className={styles.productThumb} />}
                
                <div className={styles.productInfo}>
                  <h4>{product.title}</h4>
                  <p className={styles.meta}>
                    <span className={styles.category}>{product.category}</span>
                    <span className={styles.stock}>Stock: {product.stock}</span>
                  </p>
                  <p className={styles.price}>
                    Rs. {product.salePrice || product.price} 
                    {product.salePrice && <span className={styles.strike}>Rs. {product.price}</span>}
                  </p>
                </div>
                
                <div className={styles.actions}>
                  <button 
                    onClick={() => handleDelete(product.id)}
                    className={styles.deleteBtn}
                    disabled={loadingId === product.id}
                  >
                    {loadingId === product.id ? "..." : "Delete"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
