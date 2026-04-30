import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import ProductDetailsClient from "@/components/ProductDetailsClient";
import ProductCard from "@/components/ProductCard";
import styles from "./page.module.css";

export const dynamic = 'force-dynamic';

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (!product || error) {
    notFound();
  }

  // Fetch related products (same category, excluding current)
  const { data: relatedProducts } = await supabase
    .from('products')
    .select('*')
    .eq('category', product.category)
    .neq('id', product.id)
    .limit(4);

  return (
    <div className={styles.productPage}>
      <ProductDetailsClient product={product} />
      
      {/* Related Products Section */}
      {relatedProducts && relatedProducts.length > 0 && (
        <section className={`container ${styles.relatedSection}`}>
          <h2 className={styles.sectionTitle}>You May Also Like</h2>
          <div className={styles.relatedGrid}>
            {relatedProducts.map(rp => (
              <ProductCard key={rp.id} product={rp} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
