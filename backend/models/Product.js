const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    scientificName: String,
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discountPrice: Number,
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    sku: {
      type: String,
      required: true,
      unique: true,
    },

    // 🔄 NEW: Plant type (Indoor / Outdoor)
    type: {
      type: String, // e.g., "Indoor", "Outdoor"
      required: true,
    },

    // ✅ Category like "Cactus", "Flowering", "Herbs", etc.
    category: {
      type: String,
      required: true,
    },

    sunlight: String, // e.g., "Full Sun", "Partial Shade"
    watering: String, // e.g., "Twice a week"
    difficulty: String, // e.g., "Easy", "Moderate", "Hard"

    idealFor: [String], // e.g., ["Home", "Office"]
    petFriendly: {
      type: Boolean,
      default: true,
    },
    images: [
      {
        url: { type: String, required: true },
        altText: String,
      },
    ],

    isFeatured: {
      type: Boolean,
      default: false,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    tags: [String], // e.g., ["air purifier", "low light"]

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    metaTitle: String,
    metaKeywords: String,
    dimensions: {
      height: Number,
      width: Number,
      potSize: String,
    },
    weight: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
