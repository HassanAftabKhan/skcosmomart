import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ids = searchParams.get("ids");

  if (!ids) {
    return NextResponse.json({ error: "No IDs provided" }, { status: 400 });
  }

  const idArray = ids.split(",");

  try {
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: idArray
        }
      }
    });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
