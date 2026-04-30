"use client";

import Link from "next/link";
import { useStore } from "@/context/StoreProvider";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useStore();
  const router = useRouter();

  if (cart.length === 0) {
    return (
      <div className={`container ${styles.emptyCart}`}>
        <h1>Your Cart is Empty</h1>
        <p>Looks like you haven't added any luxury items to your cart yet.</p>
        <Link href="/shop" className="btn btn-primary">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className={`container ${styles.cartContainer}`}>
      <h1 className={styles.title}>Your Shopping Cart</h1>
      
      <div className={styles.cartLayout}>
        <div className={styles.cartItems}>
          {cart.map(item => (
            <div key={item.id} className={styles.cartItem}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.image} alt={item.title} className={styles.itemImage} />
              
              <div className={styles.itemInfo}>
                <Link href={`/product/${item.id}`} className={styles.itemTitle}>{item.title}</Link>
                <div className={styles.itemPrice}>Rs. {item.price}</div>
              </div>
              
              <div className={styles.itemControls}>
                <div className={styles.quantitySelector}>
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
                
                <div className={styles.itemTotal}>
                  Rs. {item.price * item.quantity}
                </div>
                
                <button 
                  className={styles.removeBtn} 
                  onClick={() => removeFromCart(item.id)}
                  aria-label="Remove item"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className={styles.cartSummary}>
          <h2>Order Summary</h2>
          
          <div className={styles.summaryRow}>
            <span>Subtotal</span>
            <span>Rs. {cartTotal}</span>
          </div>
          
          <div className={styles.summaryRow}>
            <span>Shipping</span>
            <span>Calculated at checkout</span>
          </div>
          
          <div className={`${styles.summaryRow} ${styles.totalRow}`}>
            <span>Total</span>
            <span>Rs. {cartTotal}</span>
          </div>
          
          <button 
            className={`btn btn-primary ${styles.checkoutBtn}`}
            onClick={() => router.push('/checkout')}
          >
            Proceed to Checkout
          </button>
          
          <div className={styles.secureCheckout}>
            <span className={styles.lockIcon}>🔒</span> Secure Checkout
          </div>
        </div>
      </div>
    </div>
  );
}
