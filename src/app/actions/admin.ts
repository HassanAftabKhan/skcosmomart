"use server";

import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function loginAdmin(password: string) {
  // Simple hardcoded password for now: "admin123"
  // In a real app, hash and check against User table
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
    await prisma.order.update({
      where: { id: orderId },
      data: { status }
    });
    revalidatePath("/admin/orders");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to update status" };
  }
}

export async function deleteProduct(productId: string) {
  try {
    await prisma.product.delete({
      where: { id: productId }
    });
    revalidatePath("/admin/products");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete product. It might be linked to an order." };
  }
}

// In a real app with file uploads, we'd handle FormData.
// For this MVP, we will accept a base64 string or an array of image URLs.
export async function saveProduct(data: any) {
  try {
    if (data.id) {
      await prisma.product.update({
        where: { id: data.id },
        data: {
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
        }
      });
    } else {
      await prisma.product.create({
        data: {
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
        }
      });
    }
    revalidatePath("/admin/products");
    revalidatePath("/shop");
    return { success: true };
  } catch (error) {
    console.error("Save error", error);
    return { success: false, error: "Failed to save product" };
  }
}
