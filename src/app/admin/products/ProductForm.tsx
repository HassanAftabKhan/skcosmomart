"use client";

import { useState } from "react";
import { saveProduct } from "@/app/actions/admin";
import styles from "./page.module.css";

export default function ProductForm({ productToEdit = null }: { productToEdit?: any }) {
  const [formData, setFormData] = useState({
    id: productToEdit?.id || "",
    title: productToEdit?.title || "",
    category: productToEdit?.category || "Skincare",
    price: productToEdit?.price || "",
    salePrice: productToEdit?.salePrice || "",
    stock: productToEdit?.stock || 0,
    imageUrls: productToEdit?.images ? JSON.parse(productToEdit.images).join("\n") : "",
    description: productToEdit?.description || "",
    benefits: productToEdit?.benefits || "",
    ingredients: productToEdit?.ingredients || "",
    howToUse: productToEdit?.howToUse || ""
  });
  
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg({ type: "", text: "" });
    
    // Parse images
    const images = formData.imageUrls.split('\n').map((url: string) => url.trim()).filter(Boolean);
    
    const result = await saveProduct({
      ...formData,
      images
    });
    
    if (result.success) {
      setMsg({ type: "success", text: formData.id ? "Product updated!" : "Product added!" });
      if (!formData.id) {
        // Reset form if it was a new product
        setFormData({
          id: "", title: "", category: "Skincare", price: "", salePrice: "", stock: 0,
          imageUrls: "", description: "", benefits: "", ingredients: "", howToUse: ""
        });
      }
    } else {
      setMsg({ type: "error", text: result.error || "Failed to save product" });
    }
    
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {msg.text && (
        <div className={`${styles.message} ${styles[msg.type]}`}>{msg.text}</div>
      )}
      
      <div className={styles.formGroup}>
        <label>Product Title</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />
      </div>
      
      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label>Category</label>
          <select name="category" value={formData.category} onChange={handleChange}>
            <option value="Skincare">Skincare</option>
            <option value="Makeup">Makeup</option>
            <option value="Haircare">Haircare</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Stock Quantity</label>
          <input type="number" name="stock" value={formData.stock} onChange={handleChange} required />
        </div>
      </div>
      
      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label>Regular Price (Rs)</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} required />
        </div>
        <div className={styles.formGroup}>
          <label>Sale Price (Optional)</label>
          <input type="number" name="salePrice" value={formData.salePrice} onChange={handleChange} />
        </div>
      </div>
      
      <div className={styles.formGroup}>
        <label>Image URLs (One per line)</label>
        <textarea 
          name="imageUrls" 
          value={formData.imageUrls} 
          onChange={handleChange} 
          rows={3} 
          placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
          required
        />
        <small>Paste direct image links here.</small>
      </div>
      
      <div className={styles.formGroup}>
        <label>Description</label>
        <textarea name="description" value={formData.description} onChange={handleChange} rows={3} required />
      </div>
      
      <div className={styles.formGroup}>
        <label>Benefits (Optional)</label>
        <textarea name="benefits" value={formData.benefits} onChange={handleChange} rows={2} />
      </div>
      
      <div className={styles.formGroup}>
        <label>Ingredients (Optional)</label>
        <textarea name="ingredients" value={formData.ingredients} onChange={handleChange} rows={2} />
      </div>
      
      <div className={styles.formGroup}>
        <label>How to Use (Optional)</label>
        <textarea name="howToUse" value={formData.howToUse} onChange={handleChange} rows={2} />
      </div>
      
      <button type="submit" className={styles.submitBtn} disabled={loading}>
        {loading ? "Saving..." : formData.id ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
}
