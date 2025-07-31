const express = require("express");
const Product = require("../models/Product");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// @route POST /api/products
router.post("/", protect, admin, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      tags,
      dimensions,
      weight,
      sku,
      images,
      isFeatured,
      isPublished,
    } = req.body;

    const product = new Product({
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      tags,
      dimensions,
      weight,
      sku,
      images,
      isFeatured,
      isPublished,
      user: req.user._id,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error!");
  }
});

// @route PUT /api/products/:id
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      tags,
      dimensions,
      weight,
      sku,
      images,
      isFeatured,
      isPublished,
    } = req.body;

    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.discountPrice = discountPrice || product.discountPrice;
      product.countInStock = countInStock || product.countInStock;
      product.category = category || product.category;
      product.tags = tags || product.tags;
      product.dimensions = dimensions || product.dimensions;
      product.weight = weight || product.weight;
      product.sku = sku || product.sku;
      product.images = images || product.images;
      product.isFeatured =
        isFeatured !== undefined ? isFeatured : product.isFeatured;
      product.isPublished =
        isPublished !== undefined ? isPublished : product.isPublished;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @route DELETE /api/products/:id
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.deleteOne();
      res.json({ message: "Product removed" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @route GET /api/products (filters)
router.get("/", async (req, res) => {
  try {
    const {
      category,
      type,
      minPrice,
      maxPrice,
      sortBy,
      search,
      tags,
      sunlight,
      watering,
      limit,
    } = req.query;

    let query = {};

    if (category && category.toLowerCase() !== "all") {
      query.category = category;
    }
    if (type && type.toLowerCase() !== "all") {
      query.type = type;
    }

    if (tags) {
      query.tags = { $in: tags.split(",") };
    }

    if (sunlight) {
      query.sunlight = sunlight;
    }

    if (watering) {
      query.watering = watering;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    let sort = {};
    if (sortBy) {
      switch (sortBy) {
        case "priceAsc":
          sort = { price: 1 };
          break;
        case "priceDesc":
          sort = { price: -1 };
          break;
        case "popularity":
          sort = { rating: -1 };
          break;
        default:
          break;
      }
    }

    const products = await Product.find(query)
      .sort(sort)
      .limit(Number(limit) || 0);
      
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});


// @route GET /api/products/best-seller
// routes/productRoutes.js or similar
router.get('/best-seller', async (req, res) => {
  try {
    const bestSeller = await Product.findOne({ isFeatured: true }); // returns one
    if (!bestSeller) {
      return res.status(404).json({ message: "No best seller product found" });
    }
    res.status(200).json(bestSeller);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch best seller" });
  }
});



// @route GET /api/products/new-arrivals
router.get("/new-arrivals", async (req, res) => {
  try {
    const newArrivals = await Product.find().sort({ createdAt: -1 }).limit(8);
    res.json(newArrivals);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.get("/weather-suggested", async (req, res) => {
  try {
    const { temp, humidity, weather } = req.query;

    const tempNum = parseFloat(temp);
    const humidityNum = parseFloat(humidity);
    const filters = [];

    // Match your categories
    if (tempNum > 30) filters.push({ category: { $in: ["Cactus", "Succulent"] } });
    else if (tempNum < 20) filters.push({ category: { $in: ["Fern", "Peace Lily"] } });

    // Adjust watering field based on your actual data values
    if (humidityNum > 70) filters.push({ watering: { $in: ["Daily", "Twice a week"] } });

    // Match sunlight values (adjust as per your DB entries)
    if (weather === "Rain") filters.push({ sunlight: { $in: ["Partial Shade", "Indirect Light"] } });

    const query = filters.length > 0 ? { $and: filters } : {};

    const suggestedPlants = await Product.find(query).limit(8);
    res.json(suggestedPlants);
  } catch (error) {
    console.error("Weather Suggestions Error:", error);
    res.status(500).send("Server Error");
  }
});


// @route GET /api/products/:id
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product Not Found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @route GET /api/products/similar/:id
router.get("/similar/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product Not Found" });
    }

    const similarProducts = await Product.find({
      _id: { $ne: product._id },
      category: product.category,
    }).limit(4);

    res.json(similarProducts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});


module.exports = router;
