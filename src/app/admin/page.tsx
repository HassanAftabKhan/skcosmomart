import prisma from "@/lib/prisma";
import styles from "./page.module.css";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const [totalOrders, totalRevenue, totalProducts, recentOrders] = await Promise.all([
    prisma.order.count(),
    prisma.order.aggregate({
      _sum: { totalAmount: true },
      where: { status: { not: 'CANCELLED' } }
    }),
    prisma.product.count(),
    prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' }
    })
  ]);

  const revenue = totalRevenue._sum.totalAmount || 0;

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1>Dashboard Overview</h1>
        <p>Welcome back to SK Cosmo Mart Admin</p>
      </header>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>Total Revenue</h3>
          <p className={styles.statValue}>Rs. {revenue.toLocaleString()}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Total Orders</h3>
          <p className={styles.statValue}>{totalOrders}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Products</h3>
          <p className={styles.statValue}>{totalProducts}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Conversion Rate</h3>
          <p className={styles.statValue}>4.2%</p>
        </div>
      </div>

      <div className={styles.recentOrdersSection}>
        <div className={styles.sectionHeader}>
          <h2>Recent Orders</h2>
          <Link href="/admin/orders" className={styles.viewAll}>View All Orders</Link>
        </div>
        
        {recentOrders.length === 0 ? (
          <div className={styles.emptyState}>No orders yet.</div>
        ) : (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>City</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(order => (
                  <tr key={order.id}>
                    <td>#{order.id.slice(-6).toUpperCase()}</td>
                    <td>{order.customerName}</td>
                    <td>{order.customerCity}</td>
                    <td>Rs. {order.totalAmount}</td>
                    <td>
                      <span className={`${styles.statusBadge} ${styles[order.status.toLowerCase()]}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
