const mongoose = require("mongoose");

// CartItem Schema for Plants
const CartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plant",
    required: true,
  },
  name: String,
  image: String,
  price: String,
  potSize: String,
  sunlight: String,
  category: String,  // ✅ Add this
  type: String,      // ✅ And this
  quantity: {
    type: Number,
    default: 1,
  },
}, { _id: false });


// Main Cart Schema
const CartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    guestId: {
      type: String,
    },
    products: [CartItemSchema],
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cart", CartSchema);
