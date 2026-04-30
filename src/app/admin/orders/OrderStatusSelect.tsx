"use client";

import { useState } from "react";
import { updateOrderStatus } from "@/app/actions/admin";

export default function OrderStatusSelect({ orderId, currentStatus }: { orderId: string, currentStatus: string }) {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    setLoading(true);
    
    await updateOrderStatus(orderId, newStatus);
    
    setLoading(false);
  };

  const getStatusColor = (s: string) => {
    switch (s) {
      case 'PENDING': return '#856404';
      case 'CONFIRMED': return '#0c5460';
      case 'DISPATCHED': return '#004085';
      case 'DELIVERED': return '#155724';
      case 'CANCELLED': return '#721c24';
      default: return '#333';
    }
  };

  const getStatusBg = (s: string) => {
    switch (s) {
      case 'PENDING': return '#fff3cd';
      case 'CONFIRMED': return '#d1ecf1';
      case 'DISPATCHED': return '#cce5ff';
      case 'DELIVERED': return '#d4edda';
      case 'CANCELLED': return '#f8d7da';
      default: return '#eee';
    }
  };

  return (
    <select 
      value={status} 
      onChange={handleChange}
      disabled={loading}
      style={{
        padding: '6px 12px',
        borderRadius: '20px',
        border: 'none',
        fontWeight: 600,
        fontSize: '0.8rem',
        cursor: 'pointer',
        color: getStatusColor(status),
        backgroundColor: getStatusBg(status),
        outline: 'none',
        opacity: loading ? 0.7 : 1
      }}
    >
      <option value="PENDING">PENDING</option>
      <option value="CONFIRMED">CONFIRMED</option>
      <option value="DISPATCHED">DISPATCHED</option>
      <option value="DELIVERED">DELIVERED</option>
      <option value="CANCELLED">CANCELLED</option>
    </select>
  );
}
