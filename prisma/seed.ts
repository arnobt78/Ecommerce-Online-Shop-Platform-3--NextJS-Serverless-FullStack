/**
 * Database Seed Script for next-store
 *
 * This script migrates data from CSV files to PostgreSQL database.
 *
 * Migration Status: ✅ COMPLETED (December 21, 2025)
 * - All data successfully migrated to Hetzner VPS PostgreSQL database
 *
 * Usage:
 *   npm run db:seed
 *
 * Note: This script uses upsert, so it's safe to run multiple times.
 * It will update existing records or create new ones.
 */

import { PrismaClient } from "@prisma/client";
import { parse } from "csv-parse/sync";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();

// CSV file paths
const CSV_DIR = "/Users/arnob_t78/Papers/Project Doc/db-migration/next-store";

interface ProductRow {
  id: string;
  name: string;
  company: string;
  description: string;
  featured: string; // "true" or "false"
  image: string;
  price: string; // number as string
  createdAt: string;
  updatedAt: string;
  clerkId: string;
}

interface CartRow {
  id: string;
  clerkId: string;
  numItemsInCart: string; // number as string
  cartTotal: string; // number as string
  shipping: string; // number as string
  tax: string; // number as string
  taxRate: string; // number as string
  orderTotal: string; // number as string
  createdAt: string;
  updatedAt: string;
}

interface CartItemRow {
  id: string;
  productId: string;
  cartId: string;
  amount: string; // number as string
  createdAt: string;
  updatedAt: string;
}

interface FavoriteRow {
  id?: string;
  clerkId?: string;
  productId?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface OrderRow {
  id: string;
  clerkId: string;
  products: string; // number as string
  orderTotal: string; // number as string
  tax: string; // number as string
  shipping: string; // number as string
  email: string;
  isPaid: string; // "true" or "false"
  createdAt: string;
  updatedAt: string;
}

interface ReviewRow {
  id: string;
  clerkId: string;
  rating: string; // number as string
  comment: string;
  authorName: string;
  authorImageUrl: string;
  createdAt: string;
  updatedAt: string;
  productId: string;
}

async function parseCSV<T>(filePath: string): Promise<T[]> {
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️  CSV file not found: ${filePath}`);
    return [];
  }

  const content = fs.readFileSync(filePath, "utf-8");
  
  // Skip empty files (only headers or whitespace)
  if (!content.trim() || content.trim().split("\n").length <= 1) {
    console.warn(`⚠️  CSV file is empty: ${filePath}`);
    return [];
  }

  const records = parse(content, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });
  return records as T[];
}

function parseBoolean(value: string): boolean {
  return value === "true" || value === "1" || value === "t" || value === "True";
}

function parseIntValue(value: string): number {
  const parsed = parseInt(value, 10);
  if (isNaN(parsed)) {
    console.warn(`⚠️  Failed to parse integer: ${value}, defaulting to 0`);
    return 0;
  }
  return parsed;
}

function parseFloatValue(value: string): number {
  const parsed = parseFloat(value);
  if (isNaN(parsed)) {
    console.warn(`⚠️  Failed to parse float: ${value}, defaulting to 0`);
    return 0;
  }
  return parsed;
}

async function seedProducts() {
  console.log("🌱 Seeding products...");
  const products = await parseCSV<ProductRow>(
    path.join(CSV_DIR, "Product.csv")
  );

  if (products.length === 0) {
    console.log("⚠️  No products to seed");
    return;
  }

  for (const product of products) {
    try {
      await prisma.product.upsert({
        where: { id: product.id },
        update: {
          name: product.name,
          company: product.company,
          description: product.description,
          featured: parseBoolean(product.featured),
          image: product.image,
          price: parseIntValue(product.price),
          clerkId: product.clerkId,
          createdAt: new Date(product.createdAt),
          updatedAt: new Date(product.updatedAt),
        },
        create: {
          id: product.id,
          name: product.name,
          company: product.company,
          description: product.description,
          featured: parseBoolean(product.featured),
          image: product.image,
          price: parseIntValue(product.price),
          clerkId: product.clerkId,
          createdAt: new Date(product.createdAt),
          updatedAt: new Date(product.updatedAt),
        },
      });
    } catch (error) {
      console.error(`❌ Error seeding product ${product.id}:`, error);
    }
  }
  console.log(`✅ Seeded ${products.length} products`);
}

async function seedCarts() {
  console.log("🌱 Seeding carts...");
  const carts = await parseCSV<CartRow>(path.join(CSV_DIR, "Cart.csv"));

  if (carts.length === 0) {
    console.log("⚠️  No carts to seed");
    return;
  }

  for (const cart of carts) {
    try {
      await prisma.cart.upsert({
        where: { id: cart.id },
        update: {
          clerkId: cart.clerkId,
          numItemsInCart: parseIntValue(cart.numItemsInCart),
          cartTotal: parseIntValue(cart.cartTotal),
          shipping: parseIntValue(cart.shipping),
          tax: parseIntValue(cart.tax),
          taxRate: parseFloatValue(cart.taxRate),
          orderTotal: parseIntValue(cart.orderTotal),
          createdAt: new Date(cart.createdAt),
          updatedAt: new Date(cart.updatedAt),
        },
        create: {
          id: cart.id,
          clerkId: cart.clerkId,
          numItemsInCart: parseIntValue(cart.numItemsInCart),
          cartTotal: parseIntValue(cart.cartTotal),
          shipping: parseIntValue(cart.shipping),
          tax: parseIntValue(cart.tax),
          taxRate: parseFloatValue(cart.taxRate),
          orderTotal: parseIntValue(cart.orderTotal),
          createdAt: new Date(cart.createdAt),
          updatedAt: new Date(cart.updatedAt),
        },
      });
    } catch (error) {
      console.error(`❌ Error seeding cart ${cart.id}:`, error);
    }
  }
  console.log(`✅ Seeded ${carts.length} carts`);
}

async function seedCartItems() {
  console.log("🌱 Seeding cart items...");
  const cartItems = await parseCSV<CartItemRow>(
    path.join(CSV_DIR, "CartItem.csv")
  );

  if (cartItems.length === 0) {
    console.log("⚠️  No cart items to seed");
    return;
  }

  for (const cartItem of cartItems) {
    try {
      await prisma.cartItem.upsert({
        where: { id: cartItem.id },
        update: {
          productId: cartItem.productId,
          cartId: cartItem.cartId,
          amount: parseIntValue(cartItem.amount),
          createdAt: new Date(cartItem.createdAt),
          updatedAt: new Date(cartItem.updatedAt),
        },
        create: {
          id: cartItem.id,
          productId: cartItem.productId,
          cartId: cartItem.cartId,
          amount: parseIntValue(cartItem.amount),
          createdAt: new Date(cartItem.createdAt),
          updatedAt: new Date(cartItem.updatedAt),
        },
      });
    } catch (error) {
      console.error(`❌ Error seeding cart item ${cartItem.id}:`, error);
    }
  }
  console.log(`✅ Seeded ${cartItems.length} cart items`);
}

async function seedFavorites() {
  console.log("🌱 Seeding favorites...");
  const favorites = await parseCSV<FavoriteRow>(
    path.join(CSV_DIR, "Favorite.csv")
  );

  if (favorites.length === 0) {
    console.log("⚠️  No favorites to seed (file is empty)");
    return;
  }

  for (const favorite of favorites) {
    if (!favorite.id || !favorite.clerkId || !favorite.productId) {
      continue; // Skip invalid rows
    }
    try {
      await prisma.favorite.upsert({
        where: { id: favorite.id },
        update: {
          clerkId: favorite.clerkId,
          productId: favorite.productId,
          createdAt: favorite.createdAt
            ? new Date(favorite.createdAt)
            : new Date(),
          updatedAt: favorite.updatedAt
            ? new Date(favorite.updatedAt)
            : new Date(),
        },
        create: {
          id: favorite.id,
          clerkId: favorite.clerkId,
          productId: favorite.productId,
          createdAt: favorite.createdAt
            ? new Date(favorite.createdAt)
            : new Date(),
          updatedAt: favorite.updatedAt
            ? new Date(favorite.updatedAt)
            : new Date(),
        },
      });
    } catch (error) {
      console.error(`❌ Error seeding favorite ${favorite.id}:`, error);
    }
  }
  console.log(`✅ Seeded ${favorites.length} favorites`);
}

async function seedOrders() {
  console.log("🌱 Seeding orders...");
  const orders = await parseCSV<OrderRow>(path.join(CSV_DIR, "Order.csv"));

  if (orders.length === 0) {
    console.log("⚠️  No orders to seed");
    return;
  }

  for (const order of orders) {
    try {
      await prisma.order.upsert({
        where: { id: order.id },
        update: {
          clerkId: order.clerkId,
          products: parseIntValue(order.products),
          orderTotal: parseIntValue(order.orderTotal),
          tax: parseIntValue(order.tax),
          shipping: parseIntValue(order.shipping),
          email: order.email,
          isPaid: parseBoolean(order.isPaid),
          createdAt: new Date(order.createdAt),
          updatedAt: new Date(order.updatedAt),
        },
        create: {
          id: order.id,
          clerkId: order.clerkId,
          products: parseIntValue(order.products),
          orderTotal: parseIntValue(order.orderTotal),
          tax: parseIntValue(order.tax),
          shipping: parseIntValue(order.shipping),
          email: order.email,
          isPaid: parseBoolean(order.isPaid),
          createdAt: new Date(order.createdAt),
          updatedAt: new Date(order.updatedAt),
        },
      });
    } catch (error) {
      console.error(`❌ Error seeding order ${order.id}:`, error);
    }
  }
  console.log(`✅ Seeded ${orders.length} orders`);
}

async function seedReviews() {
  console.log("🌱 Seeding reviews...");
  const reviews = await parseCSV<ReviewRow>(path.join(CSV_DIR, "Review.csv"));

  if (reviews.length === 0) {
    console.log("⚠️  No reviews to seed");
    return;
  }

  for (const review of reviews) {
    try {
      await prisma.review.upsert({
        where: { id: review.id },
        update: {
          clerkId: review.clerkId,
          rating: parseIntValue(review.rating),
          comment: review.comment,
          authorName: review.authorName,
          authorImageUrl: review.authorImageUrl,
          productId: review.productId,
          createdAt: new Date(review.createdAt),
          updatedAt: new Date(review.updatedAt),
        },
        create: {
          id: review.id,
          clerkId: review.clerkId,
          rating: parseIntValue(review.rating),
          comment: review.comment,
          authorName: review.authorName,
          authorImageUrl: review.authorImageUrl,
          productId: review.productId,
          createdAt: new Date(review.createdAt),
          updatedAt: new Date(review.updatedAt),
        },
      });
    } catch (error) {
      console.error(`❌ Error seeding review ${review.id}:`, error);
    }
  }
  console.log(`✅ Seeded ${reviews.length} reviews`);
}

async function main() {
  console.log("🚀 Starting database seed...\n");
  console.log(`📂 CSV Directory: ${CSV_DIR}\n`);

  try {
    // Seed in order to maintain foreign key relationships
    // Products first (no dependencies)
    await seedProducts();
    
    // Carts (no dependencies on other tables)
    await seedCarts();
    
    // CartItems (depends on Product and Cart)
    await seedCartItems();
    
    // Favorites (depends on Product)
    await seedFavorites();
    
    // Orders (no dependencies)
    await seedOrders();
    
    // Reviews (depends on Product)
    await seedReviews();

    console.log("\n✨ Database seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

