"use server";

import { supabase } from "@/lib/supabase";

export async function createOrder(data: {
  customerName: string;
  customerPhone: string;
  customerCity: string;
  address: string;
  totalAmount: number;
  items: { id: string; quantity: number; price: number }[];
}) {
  try {
    // 1. Insert Order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        customerName: data.customerName,
        customerPhone: data.customerPhone,
        customerCity: data.customerCity,
        address: data.address,
        totalAmount: data.totalAmount,
        paymentMethod: "COD",
        status: "PENDING"
      })
      .select()
      .single();

    if (orderError || !order) {
      console.error(orderError);
      throw new Error("Failed to create order");
    }

    // 2. Insert Order Items
    const orderItems = data.items.map(item => ({
      orderId: order.id,
      productId: item.id,
      quantity: item.quantity,
      price: item.price
    }));

    const { error: itemsError } = await supabase
      .from('orderItems')
      .insert(orderItems);

    if (itemsError) {
      console.error(itemsError);
      throw new Error("Failed to create order items");
    }

    // 3. Decrement Product Stock
    for (const item of data.items) {
      // Fetch current stock
      const { data: product } = await supabase
        .from('products')
        .select('stock')
        .eq('id', item.id)
        .single();
        
      if (product) {
        const newStock = Math.max(0, product.stock - item.quantity);
        await supabase
          .from('products')
          .update({ stock: newStock })
          .eq('id', item.id);
      }
    }
    
    return { success: true, orderId: order.id };
  } catch (error) {
    console.error("Failed to create order:", error);
    return { success: false, error: "Failed to process order" };
  }
}
