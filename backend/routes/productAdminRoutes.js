const express= require("express");
const Product =require("../models/Product");
const { protect, admin} = require("../middleware/authMiddleware");
const router=express.Router();

// @route GET/api/admin/products
// Get all products (Admin only)
router.get("/", protect, admin, async (req, res) => {

try { 
    const products =await Product.find({}); 
    res.json(products);
} catch (error) 
{ console.error(error); 
    res.status(500).json({message: "Server Error" }); 
} });

// ✅ @desc Add a new product (Admin only)
router.post("/", protect, admin, async (req, res) => {
  try {
    const {
      name,
      scientificName,
      description,
      price,
      discountPrice,
      countInStock,
      sku,
      type,
      category,
      sunlight,
      watering,
      difficulty,
      idealFor,
      petFriendly,
      images,
      isFeatured,
      isPublished,
      tags,
      metaTitle,
      metaKeywords,
      dimensions,
      weight,
    } = req.body;

    // Basic check
    if (!name || !description || !price || !sku || !type || !category) {
      return res.status(400).json({ message: "Please fill all required fields." });
    }

    const newProduct = new Product({
      name,
      scientificName,
      description,
      price,
      discountPrice,
      countInStock,
      sku,
      type,
      category,
      sunlight,
      watering,
      difficulty,
      idealFor,
      petFriendly,
      images,
      isFeatured,
      isPublished,
      tags,
      metaTitle,
      metaKeywords,
      dimensions,
      weight,
      user: req.user._id, // Logged-in admin
    });

    const createdProduct = await newProduct.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error("Error in creating product:", error);
    res.status(500).json({ message: "Server Error" });
  }
});





module.exports = router;