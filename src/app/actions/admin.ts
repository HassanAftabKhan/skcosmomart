"use server";

import { supabase } from "@/lib/supabase";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function loginAdmin(password: string) {
  if (password === "admin123") {
    (await cookies()).set("admin_token", "authenticated", { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7 // 1 week
    });
    return { success: true };
  }
  return { success: false, error: "Invalid password" };
}

export async function logoutAdmin() {
  (await cookies()).delete("admin_token");
  redirect("/admin/login");
}

export async function updateOrderStatus(orderId: string, status: string) {
  try {
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId);

    if (error) throw error;

    revalidatePath("/admin/orders");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to update status" };
  }
}

export async function deleteProduct(productId: string) {
  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', productId);

    if (error) throw error;

    revalidatePath("/admin/products");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete product. It might be linked to an order." };
  }
}

export async function saveProduct(data: any) {
  try {
    const productData = {
      title: data.title,
      description: data.description,
      price: parseFloat(data.price),
      salePrice: data.salePrice ? parseFloat(data.salePrice) : null,
      stock: parseInt(data.stock),
      category: data.category,
      images: JSON.stringify(data.images),
      benefits: data.benefits,
      ingredients: data.ingredients,
      howToUse: data.howToUse,
    };

    if (data.id) {
      const { error } = await supabase
        .from('products')
        .update(productData)
        .eq('id', data.id);
      if (error) throw error;
    } else {
      const { error } = await supabase
        .from('products')
        .insert(productData);
      if (error) throw error;
    }

    revalidatePath("/admin/products");
    revalidatePath("/shop");
    return { success: true };
  } catch (error) {
    console.error("Save error", error);
    return { success: false, error: "Failed to save product" };
  }
}
