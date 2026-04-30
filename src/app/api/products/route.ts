import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ids = searchParams.get("ids");

  if (!ids) {
    return NextResponse.json({ error: "No IDs provided" }, { status: 400 });
  }

  const idArray = ids.split(",");

  try {
    const { data: products, error } = await supabase
      .from('products')
      .select('*')
      .in('id', idArray);

    if (error) throw error;

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
