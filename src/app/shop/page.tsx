import prisma from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";
import styles from "./page.module.css";

// This is a Server Component, so we can fetch directly from the database
export const dynamic = 'force-dynamic';

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams;
  const category = params.category as string | undefined;
  const search = params.search as string | undefined;

  let whereClause = {};
  
  if (category && category !== 'Best-Sellers') {
    whereClause = { ...whereClause, category };
  }
  
  if (search) {
    whereClause = {
      ...whereClause,
      title: {
        contains: search,
      }
    };
  }

  const products = await prisma.product.findMany({
    where: whereClause,
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className={styles.shopContainer}>
      <div className={styles.shopHeader}>
        <div className="container">
          <h1>{category ? category.replace('-', ' ') : search ? `Search Results for "${search}"` : "All Products"}</h1>
          <p>Discover our curated collection of premium beauty essentials.</p>
        </div>
      </div>
      
      <div className={`container ${styles.shopLayout}`}>
        <aside className={styles.sidebar}>
          <h3>Categories</h3>
          <ul className={styles.categoryList}>
            <li><a href="/shop" className={!category ? styles.active : ''}>All Products</a></li>
            <li><a href="/shop?category=Skincare" className={category === 'Skincare' ? styles.active : ''}>Skincare</a></li>
            <li><a href="/shop?category=Makeup" className={category === 'Makeup' ? styles.active : ''}>Makeup</a></li>
            <li><a href="/shop?category=Haircare" className={category === 'Haircare' ? styles.active : ''}>Haircare</a></li>
            <li><a href="/shop?category=Best-Sellers" className={category === 'Best-Sellers' ? styles.active : ''}>Best Sellers</a></li>
          </ul>
        </aside>
        
        <main className={styles.mainContent}>
          <div className={styles.controls}>
            <span>Showing {products.length} products</span>
            <select className={styles.sortSelect} defaultValue="newest">
              <option value="newest">Newest Arrivals</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
          
          {products.length > 0 ? (
            <div className={styles.productGrid}>
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <h2>No products found</h2>
              <p>Try adjusting your search or filter criteria.</p>
              <a href="/shop" className="btn btn-primary" style={{marginTop: '1rem'}}>Clear Filters</a>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
