"use server";

import prisma from "@/lib/prisma";

export async function createOrder(data: {
  customerName: string;
  customerPhone: string;
  customerCity: string;
  address: string;
  totalAmount: number;
  items: { id: string; quantity: number; price: number }[];
}) {
  try {
    const order = await prisma.order.create({
      data: {
        customerName: data.customerName,
        customerPhone: data.customerPhone,
        customerCity: data.customerCity,
        address: data.address,
        totalAmount: data.totalAmount,
        paymentMethod: "COD",
        status: "PENDING",
        orderItems: {
          create: data.items.map(item => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price
          }))
        }
      }
    });
    
    return { success: true, orderId: order.id };
  } catch (error) {
    console.error("Failed to create order:", error);
    return { success: false, error: "Failed to process order" };
  }
}
