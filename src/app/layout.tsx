import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/context/StoreProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "SK Cosmo Mart | Premium Beauty Store Pakistan",
  description: "Discover luxury skincare and makeup tailored for you. Enjoy Cash on Delivery across Pakistan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <Navbar />
          <main style={{ minHeight: "80vh" }}>
            {children}
          </main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
