-- Run this inside the Supabase SQL Editor to create your tables

-- 1. Create Products Table
CREATE TABLE IF NOT EXISTS public.products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    price REAL NOT NULL,
    "salePrice" REAL,
    category TEXT NOT NULL,
    images TEXT NOT NULL,
    benefits TEXT,
    ingredients TEXT,
    "howToUse" TEXT,
    stock INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    "customerName" TEXT NOT NULL,
    "customerPhone" TEXT NOT NULL,
    "customerCity" TEXT NOT NULL,
    address TEXT NOT NULL,
    "totalAmount" REAL NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create OrderItems Table
CREATE TABLE IF NOT EXISTS public."orderItems" (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    "orderId" UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    "productId" UUID NOT NULL REFERENCES public.products(id) ON DELETE RESTRICT,
    quantity INTEGER NOT NULL,
    price REAL NOT NULL
);

-- Enable Row Level Security (RLS) but allow anonymous access since we are using publishable keys
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."orderItems" ENABLE ROW LEVEL SECURITY;

-- Allow public read access to products
CREATE POLICY "Allow public read access to products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Allow public insert to products" ON public.products FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update to products" ON public.products FOR UPDATE USING (true);
CREATE POLICY "Allow public delete to products" ON public.products FOR DELETE USING (true);

-- Allow public access to orders
CREATE POLICY "Allow public read access to orders" ON public.orders FOR SELECT USING (true);
CREATE POLICY "Allow public insert access to orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access to orders" ON public.orders FOR UPDATE USING (true);

-- Allow public access to orderItems
CREATE POLICY "Allow public read access to orderItems" ON public."orderItems" FOR SELECT USING (true);
CREATE POLICY "Allow public insert access to orderItems" ON public."orderItems" FOR INSERT WITH CHECK (true);
