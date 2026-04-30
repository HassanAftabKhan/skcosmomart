import { supabase } from "@/lib/supabase";
import styles from "./page.module.css";

export const dynamic = 'force-dynamic';

export default async function AdminCustomers() {
  const { data: orders } = await supabase
    .from('orders')
    .select('customerName, customerPhone, customerCity, totalAmount, createdAt')
    .order('createdAt', { ascending: false });

  // Group by phone number
  const customersMap = new Map();
  
  if (orders) {
    orders.forEach((order: any) => {
      if (!customersMap.has(order.customerPhone)) {
        customersMap.set(order.customerPhone, {
          name: order.customerName,
          phone: order.customerPhone,
          city: order.customerCity,
          totalOrders: 1,
          totalSpent: order.totalAmount,
          lastOrder: order.createdAt
        });
      } else {
        const c = customersMap.get(order.customerPhone);
        c.totalOrders += 1;
        c.totalSpent += order.totalAmount;
        if (order.createdAt > c.lastOrder) {
          c.lastOrder = order.createdAt;
        }
      }
    });
  }

  const customers = Array.from(customersMap.values());

  return (
    <div className={styles.customersPage}>
      <header className={styles.header}>
        <h1>Customer Database</h1>
        <p>View your customers and their lifetime value.</p>
      </header>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone (WhatsApp)</th>
              <th>City</th>
              <th>Total Orders</th>
              <th>Total Spent</th>
              <th>Last Order</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c, idx) => (
              <tr key={idx}>
                <td><strong>{c.name}</strong></td>
                <td>{c.phone}</td>
                <td>{c.city}</td>
                <td>{c.totalOrders}</td>
                <td><strong>Rs. {c.totalSpent}</strong></td>
                <td>{new Date(c.lastOrder).toLocaleDateString()}</td>
              </tr>
            ))}
            {customers.length === 0 && (
              <tr>
                <td colSpan={6} className={styles.emptyState}>No customers found yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
