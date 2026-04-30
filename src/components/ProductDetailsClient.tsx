"use client";

import { useState } from "react";
import { useStore } from "@/context/StoreProvider";
import styles from "./ProductDetailsClient.module.css";
import { useRouter } from "next/navigation";

export default function ProductDetailsClient({ product }: { product: any }) {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const router = useRouter();

  const isWishlisted = wishlist.includes(product.id);
  const imagesArray = JSON.parse(product.images || '[]');
  const [mainImage, setMainImage] = useState(imagesArray[0] || "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=800&q=80");

  const currentPrice = product.salePrice || product.price;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: currentPrice,
      image: mainImage,
      quantity
    });
    // Could show a toast here
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/checkout");
  };

  const handleWhatsAppOrder = () => {
    const text = encodeURIComponent(`Hi SK Cosmo Mart! I want to order:\n\n*${product.title}*\nQuantity: ${quantity}\nPrice: Rs. ${currentPrice * quantity}\n\nPlease let me know the next steps for delivery.`);
    window.open(`https://wa.me/923000000000?text=${text}`, '_blank');
  };

  return (
    <div className={`container ${styles.productContainer}`}>
      <div className={styles.productGrid}>
        
        {/* Images Gallery */}
        <div className={styles.imageSection}>
          <div className={styles.mainImageWrapper}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={mainImage} alt={product.title} className={styles.mainImage} />
            {product.salePrice && <span className={styles.saleBadge}>SALE</span>}
          </div>
          <div className={styles.thumbnailList}>
            {imagesArray.map((img: string, idx: number) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img 
                key={idx} 
                src={img} 
                alt={`${product.title} thumbnail ${idx + 1}`} 
                className={`${styles.thumbnail} ${mainImage === img ? styles.activeThumb : ''}`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className={styles.infoSection}>
          <p className={styles.category}>{product.category}</p>
          <h1 className={styles.title}>{product.title}</h1>
          
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

          <div className={styles.actions}>
            <div className={styles.quantitySelector}>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
            
            <button className={`btn btn-primary ${styles.addToCartBtn}`} onClick={handleAddToCart}>
              Add to Cart
            </button>
            
            <button 
              className={`${styles.wishlistBtn} ${isWishlisted ? styles.activeWishlist : ''}`}
              onClick={() => toggleWishlist(product.id)}
            >
              {isWishlisted ? '♥' : '♡'}
            </button>
          </div>

          <div className={styles.actionButtonsCol}>
            <button className={`btn btn-outline ${styles.fullWidthBtn}`} onClick={handleBuyNow}>
              Buy It Now (COD Available)
            </button>
            
            <button className={`btn ${styles.whatsappBtn}`} onClick={handleWhatsAppOrder}>
              <span className={styles.waIcon}>💬</span> Order via WhatsApp
            </button>
          </div>

          <div className={styles.trustHighlights}>
            <div className={styles.highlight}><span className={styles.icon}>🚚</span> Fast Delivery in Pakistan</div>
            <div className={styles.highlight}><span className={styles.icon}>💸</span> Cash on Delivery</div>
            <div className={styles.highlight}><span className={styles.icon}>✨</span> 100% Authentic</div>
          </div>

          {/* Accordion / Tabs for Details */}
          <div className={styles.tabsContainer}>
            <div className={styles.tabHeaders}>
              <button className={activeTab === 'description' ? styles.activeTab : ''} onClick={() => setActiveTab('description')}>Description</button>
              <button className={activeTab === 'benefits' ? styles.activeTab : ''} onClick={() => setActiveTab('benefits')}>Benefits</button>
              <button className={activeTab === 'ingredients' ? styles.activeTab : ''} onClick={() => setActiveTab('ingredients')}>Ingredients</button>
              <button className={activeTab === 'howToUse' ? styles.activeTab : ''} onClick={() => setActiveTab('howToUse')}>How to Use</button>
            </div>
            
            <div className={styles.tabContent}>
              {activeTab === 'description' && <p>{product.description}</p>}
              {activeTab === 'benefits' && <p>{product.benefits || 'No benefits listed.'}</p>}
              {activeTab === 'ingredients' && <p>{product.ingredients || 'No ingredients listed.'}</p>}
              {activeTab === 'howToUse' && <p>{product.howToUse || 'No usage instructions listed.'}</p>}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
