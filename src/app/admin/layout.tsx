"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import styles from "./layout.module.css";
import { logoutAdmin } from "@/app/actions/admin";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // Don't show sidebar on login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await logoutAdmin();
  };

  return (
    <div className={styles.adminLayout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2>SK Cosmo Mart Admin</h2>
        </div>
        
        <nav className={styles.nav}>
          <Link 
            href="/admin" 
            className={`${styles.navLink} ${pathname === '/admin' ? styles.active : ''}`}
          >
            📊 Dashboard
          </Link>
          <Link 
            href="/admin/orders" 
            className={`${styles.navLink} ${pathname.includes('/admin/orders') ? styles.active : ''}`}
          >
            📦 Orders
          </Link>
          <Link 
            href="/admin/products" 
            className={`${styles.navLink} ${pathname.includes('/admin/products') ? styles.active : ''}`}
          >
            💄 Products
          </Link>
          <Link 
            href="/admin/customers" 
            className={`${styles.navLink} ${pathname.includes('/admin/customers') ? styles.active : ''}`}
          >
            👥 Customers
          </Link>
        </nav>
        
        <div className={styles.sidebarFooter}>
          <Link href="/" target="_blank" className={styles.storeLink}>View Store ↗</Link>
          <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
        </div>
      </aside>
      
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}
