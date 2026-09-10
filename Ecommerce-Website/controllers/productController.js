import Product from '../models/Product.js';

/**
 * @desc    Get all products
 * @route   GET /api/products
 * @access  Public
 */
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json({ products });
  } catch (error) {
    console.error(`Error retrieving products: ${error.message}`);
    return res.status(500).json({
      message: 'Server error while fetching products',
      error: error.message,
    });
  }
};
