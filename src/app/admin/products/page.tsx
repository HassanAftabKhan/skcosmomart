import prisma from "@/lib/prisma";
import styles from "./page.module.css";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";

export const dynamic = 'force-dynamic';

export default async function AdminProducts() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className={styles.productsPage}>
      <header className={styles.header}>
        <div>
          <h1>Manage Products</h1>
          <p>Add, edit, or remove products from your catalog.</p>
        </div>
      </header>

      <div className={styles.layout}>
        <div className={styles.formColumn}>
          <div className={styles.card}>
            <h2>Add / Edit Product</h2>
            <ProductForm />
          </div>
        </div>
        
        <div className={styles.listColumn}>
          <div className={styles.card}>
            <h2>Product Catalog ({products.length})</h2>
            <ProductList products={products} />
          </div>
        </div>
      </div>
    </div>
  );
}
