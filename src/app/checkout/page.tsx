"use client";

import { useState } from "react";
import { useStore } from "@/context/StoreProvider";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { createOrder } from "../actions/order";

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useStore();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    city: "Karachi",
    address: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (cart.length === 0 && !success) {
    router.push("/cart");
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = await createOrder({
      customerName: `${formData.firstName} ${formData.lastName}`,
      customerPhone: formData.phone,
      customerCity: formData.city,
      address: formData.address,
      totalAmount: cartTotal,
      items: cart.map(item => ({ id: item.id, quantity: item.quantity, price: item.price }))
    });

    if (result.success) {
      clearCart();
      setSuccess(true);
    } else {
      alert("Something went wrong. Please try again.");
    }
    
    setLoading(false);
  };

  if (success) {
    return (
      <div className={`container ${styles.successContainer}`}>
        <div className={styles.successIcon}>✓</div>
        <h1>Order Confirmed!</h1>
        <p>Thank you for shopping with SK Cosmo Mart.</p>
        <p className={styles.successDetails}>
          Your order will be delivered to <strong>{formData.address}, {formData.city}</strong> within 3-5 business days. 
          Payment will be collected via <strong>Cash on Delivery</strong>.
        </p>
        <button onClick={() => router.push("/")} className="btn btn-primary">
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className={`container ${styles.checkoutContainer}`}>
      <h1 className={styles.title}>Checkout</h1>
      
      <div className={styles.checkoutLayout}>
        <form className={styles.formSection} onSubmit={handleSubmit}>
          <h2>Shipping Details</h2>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>First Name</label>
              <input type="text" name="firstName" required onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label>Last Name</label>
              <input type="text" name="lastName" required onChange={handleChange} />
            </div>
          </div>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Phone Number (WhatsApp preferred)</label>
              <input type="tel" name="phone" placeholder="03XXXXXXXXX" required onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label>City</label>
              <select name="city" required onChange={handleChange} value={formData.city}>
                <option value="Karachi">Karachi</option>
                <option value="Lahore">Lahore</option>
                <option value="Islamabad">Islamabad</option>
                <option value="Rawalpindi">Rawalpindi</option>
                <option value="Faisalabad">Faisalabad</option>
                <option value="Multan">Multan</option>
                <option value="Peshawar">Peshawar</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          
          <div className={styles.formGroup}>
            <label>Complete Delivery Address</label>
            <textarea name="address" rows={3} required onChange={handleChange}></textarea>
          </div>
          
          <div className={styles.paymentMethod}>
            <h3>Payment Method</h3>
            <div className={styles.radioGroup}>
              <input type="radio" id="cod" name="payment" checked readOnly />
              <label htmlFor="cod">
                <strong>Cash on Delivery (COD)</strong>
                <p>Pay when you receive your order.</p>
              </label>
            </div>
          </div>
          
          <button type="submit" className={`btn btn-primary ${styles.submitBtn}`} disabled={loading}>
            {loading ? "Processing..." : "Complete Order"}
          </button>
        </form>
        
        <div className={styles.summarySection}>
          <h2>Order Summary</h2>
          <div className={styles.cartItems}>
            {cart.map(item => (
              <div key={item.id} className={styles.summaryItem}>
                <div className={styles.itemImageWrapper}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} alt={item.title} />
                  <span className={styles.itemBadge}>{item.quantity}</span>
                </div>
                <span className={styles.itemName}>{item.title}</span>
                <span className={styles.itemPrice}>Rs. {item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          
          <div className={styles.totals}>
            <div className={styles.totalRow}>
              <span>Subtotal</span>
              <span>Rs. {cartTotal}</span>
            </div>
            <div className={styles.totalRow}>
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className={`${styles.totalRow} ${styles.finalTotal}`}>
              <span>Total</span>
              <span>Rs. {cartTotal}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
