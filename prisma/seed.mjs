import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database with sample products...');

  // Clear existing
  await prisma.product.deleteMany();

  const products = [
    {
      title: "Radiance Vitamin C Serum",
      description: "A potent 15% Vitamin C serum that visibly brightens, firms, and evens skin tone. Lightweight and fast-absorbing.",
      price: 2500,
      salePrice: 1999,
      stock: 50,
      category: "Skincare",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ]),
      benefits: "Brightens dark spots, evens skin tone, provides antioxidant protection.",
      ingredients: "Water, L-Ascorbic Acid (Vitamin C), Glycerin, Ferulic Acid, Hyaluronic Acid.",
      howToUse: "Apply 3-4 drops to clean, dry face morning and night. Follow with moisturizer and sunscreen."
    },
    {
      title: "Luminous Silk Foundation",
      description: "A lightweight, buildable foundation that delivers a flawless, natural-looking finish with a luminous glow.",
      price: 3500,
      salePrice: null,
      stock: 30,
      category: "Makeup",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1599305090598-fe179d501227?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ]),
      benefits: "Buildable coverage, 24-hour wear, hydrating formula.",
      ingredients: "Water, Cyclopentasiloxane, Glycerin, Titanium Dioxide.",
      howToUse: "Apply with a foundation brush or damp sponge, blending outward from the center of the face."
    },
    {
      title: "Hydrating Rosewater Toner",
      description: "A refreshing, alcohol-free toner infused with pure rosewater to hydrate, soothe, and balance your skin.",
      price: 1500,
      salePrice: 1200,
      stock: 100,
      category: "Skincare",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ]),
      benefits: "Balances pH, soothes redness, preps skin for serums.",
      ingredients: "Rosa Damascena Flower Water, Aloe Barbadensis Leaf Juice, Glycerin.",
      howToUse: "Mist directly onto face or apply with a cotton pad after cleansing."
    }
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product
    });
  }

  console.log('Seeding finished!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
