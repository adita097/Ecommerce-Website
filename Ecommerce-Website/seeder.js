import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Product from './models/Product.js';
import products from './data/products.js';

// Load environment variables
dotenv.config();

/**
 * Import sample products into the database.
 * Clears existing products first to prevent accidental duplicates.
 */
const importData = async () => {
  try {
    await connectDB();

    await Product.deleteMany();
    console.log('Existing products cleared from database.');

    const createdProducts = await Product.insertMany(products);
    console.log(`Successfully seeded ${createdProducts.length} sample products!`);

    await mongoose.connection.close();
    console.log('MongoDB connection closed.');
    process.exit(0);
  } catch (error) {
    console.error(`Error importing seed data: ${error.message}`);
    await mongoose.connection.close();
    process.exit(1);
  }
};

/**
 * Destroy all products from the database.
 */
const destroyData = async () => {
  try {
    await connectDB();

    await Product.deleteMany();
    console.log('All products successfully removed from database.');

    await mongoose.connection.close();
    console.log('MongoDB connection closed.');
    process.exit(0);
  } catch (error) {
    console.error(`Error destroying data: ${error.message}`);
    await mongoose.connection.close();
    process.exit(1);
  }
};

// Handle CLI arguments: node seeder.js -d / --destroy
if (process.argv[2] === '-d' || process.argv[2] === '--destroy') {
  destroyData();
} else {
  importData();
}
