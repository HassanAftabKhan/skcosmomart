import prisma from "@/lib/prisma";
import styles from "./page.module.css";
import OrderStatusSelect from "./OrderStatusSelect";

export const dynamic = 'force-dynamic';

export default async function AdminOrders() {
  const orders = await prisma.order.findMany({
    include: {
      orderItems: {
        include: {
          product: true
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className={styles.ordersPage}>
      <header className={styles.header}>
        <h1>Manage Orders</h1>
        <p>View and update the status of customer orders.</p>
      </header>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Order Details</th>
              <th>Customer Info</th>
              <th>Items</th>
              <th>Total (COD)</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>
                  <strong>#{order.id.slice(-6).toUpperCase()}</strong>
                </td>
                <td>
                  <div className={styles.customerInfo}>
                    <span>{order.customerName}</span>
                    <span className={styles.phone}>{order.customerPhone}</span>
                    <span className={styles.address}>{order.address}, {order.customerCity}</span>
                  </div>
                </td>
                <td>
                  <ul className={styles.itemList}>
                    {order.orderItems.map(item => (
                      <li key={item.id}>
                        {item.quantity}x {item.product.title}
                      </li>
                    ))}
                  </ul>
                </td>
                <td><strong>Rs. {order.totalAmount}</strong></td>
                <td>
                  <OrderStatusSelect orderId={order.id} currentStatus={order.status} />
                </td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={6} className={styles.emptyState}>No orders found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
