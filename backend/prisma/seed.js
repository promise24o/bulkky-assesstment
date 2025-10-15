import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@ecommerce.com' },
    update: {},
    create: {
      email: 'admin@ecommerce.com',
      password: adminPassword,
      name: 'Admin User',
      role: 'ADMIN',
    },
  });
  console.log('✅ Admin user created:', admin.email);

  // Create regular user
  const userPassword = await bcrypt.hash('user123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      password: userPassword,
      name: 'John Doe',
      role: 'USER',
    },
  });
  console.log('✅ Regular user created:', user.email);

  // Create sample products with realistic Naira pricing
  const products = [
    {
      name: 'Wireless Headphones',
      description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
      price: 285000,
      stock: 50,
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    },
    {
      name: 'Smart Watch',
      description: 'Feature-packed smartwatch with fitness tracking, heart rate monitor, and GPS.',
      price: 425000,
      stock: 30,
      imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
    },
    {
      name: 'Laptop Stand',
      description: 'Ergonomic aluminum laptop stand with adjustable height and angle.',
      price: 45000,
      stock: 100,
      imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop',
    },
    {
      name: 'Mechanical Keyboard',
      description: 'RGB mechanical keyboard with Cherry MX switches and programmable keys.',
      price: 185000,
      stock: 45,
      imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=500&fit=crop',
    },
    {
      name: 'Wireless Mouse',
      description: 'Precision wireless mouse with ergonomic design and long battery life.',
      price: 35000,
      stock: 75,
      imageUrl: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop',
    },
    {
      name: 'USB-C Hub',
      description: '7-in-1 USB-C hub with HDMI, USB 3.0, SD card reader, and power delivery.',
      price: 65000,
      stock: 60,
      imageUrl: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=500&fit=crop',
    },
    {
      name: 'Portable SSD',
      description: '1TB portable SSD with blazing fast read/write speeds and compact design.',
      price: 175000,
      stock: 40,
      imageUrl: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&h=500&fit=crop',
    },
    {
      name: 'Webcam HD',
      description: '1080p HD webcam with auto-focus and built-in microphone for video calls.',
      price: 95000,
      stock: 55,
      imageUrl: 'https://images.unsplash.com/photo-1588508065123-287b28e013da?w=500&h=500&fit=crop',
    },
    {
      name: 'Phone Case',
      description: 'Durable protective phone case with shock absorption and slim profile.',
      price: 15000,
      stock: 150,
      imageUrl: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500&h=500&fit=crop',
    },
    {
      name: 'Bluetooth Speaker',
      description: 'Portable Bluetooth speaker with 360° sound and waterproof design.',
      price: 125000,
      stock: 65,
      imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop',
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { id: product.name.toLowerCase().replace(/\s+/g, '-') },
      update: {},
      create: product,
    });
  }
  console.log(`✅ Created ${products.length} products`);

  console.log('🎉 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
