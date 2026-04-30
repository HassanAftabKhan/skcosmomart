import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProductDetailsClient from "@/components/ProductDetailsClient";
import ProductCard from "@/components/ProductCard";
import styles from "./page.module.css";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const product = await prisma.product.findUnique({
    where: { id }
  });

  if (!product) {
    notFound();
  }

  // Fetch related products (same category, excluding current)
  const relatedProducts = await prisma.product.findMany({
    where: {
      category: product.category,
      id: { not: product.id }
    },
    take: 4
  });

  return (
    <div className={styles.productPage}>
      <ProductDetailsClient product={product} />
      
      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
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
