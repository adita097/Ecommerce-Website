import mongoose from 'mongoose';

/**
 * Connects to MongoDB using the connection string from environment variables.
 * Includes error handling for failed connection attempts.
 */
const connectDB = async () => {
  try {
    const connUri = process.env.MONGO_URI;

    if (!connUri) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }

    const conn = await mongoose.connect(connUri);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
