import { supabase } from "@/lib/supabase";
import ProductCard from "@/components/ProductCard";
import styles from "./page.module.css";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function ShopPage({ searchParams }: { searchParams: Promise<{ category?: string, q?: string }> }) {
  const { category, q } = await searchParams;

  let query = supabase.from('products').select('*');

  if (category && category !== 'Best-Sellers') {
    query = query.eq('category', category);
  }
  
  if (q) {
    query = query.ilike('title', `%${q}%`);
  }

  const { data: products, error } = await query.order('createdAt', { ascending: false });

  return (
    <div className={styles.shopContainer}>
      <div className={`container ${styles.layout}`}>
        
        {/* Sidebar Filters */}
        <aside className={styles.sidebar}>
          <h3>Categories</h3>
          <ul className={styles.filterList}>
            <li><Link href="/shop" className={!category ? styles.active : ''}>All Products</Link></li>
            <li><Link href="/shop?category=Skincare" className={category === 'Skincare' ? styles.active : ''}>Skincare</Link></li>
            <li><Link href="/shop?category=Makeup" className={category === 'Makeup' ? styles.active : ''}>Makeup</Link></li>
            <li><Link href="/shop?category=Haircare" className={category === 'Haircare' ? styles.active : ''}>Haircare</Link></li>
          </ul>
        </aside>

        {/* Main Content */}
        <div className={styles.mainContent}>
          <div className={styles.header}>
            <h1>{category ? category : q ? `Search Results for "${q}"` : 'All Products'}</h1>
            <p>Showing {products?.length || 0} result{products?.length !== 1 ? 's' : ''}</p>
          </div>

          <div className={styles.productGrid}>
            {products && products.length > 0 ? (
              products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className={styles.emptyState}>
                <p>No products found matching your criteria.</p>
                <Link href="/shop" className="btn btn-outline">Clear Filters</Link>
              </div>
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
}
