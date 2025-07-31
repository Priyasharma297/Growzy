const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Get cart by user ID or guest ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await Cart.findOne({ $or: [{ userId: id }, { guestId: id }] });
    if (!cart) return res.status(200).json({ products: [] });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add product to cart
router.post("/", async (req, res) => {
  try {
    const { productId, quantity, guestId, userId, potSize, sunlight } =
      req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let cart = await Cart.findOne({ $or: [{ userId }, { guestId }] });
    if (!cart) {
      cart = new Cart({
        userId,
        guestId,
        products: [],
      });
    }

    const productIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId
    );

    if (productIndex > -1) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({
        productId,
        name: product.name,
        image: product.images[0].url,
        price: product.price,
        potSize,
        sunlight,
        quantity,
        category: product.category, 
  type: product.type,     
      });
    }
    cart.totalPrice = cart.products.reduce((sum, item) => {
  return sum + Number(item.price) * item.quantity;
}, 0);

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update cart product quantity
router.put("/", async (req, res) => {
  try {
    const { productId, quantity, guestId, userId } = req.body;
    const cart = await Cart.findOne({ $or: [{ userId }, { guestId }] });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const productIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not in cart" });
    }

    cart.products[productIndex].quantity = quantity;
    cart.totalPrice = cart.products.reduce((sum, item) => {
  return sum + Number(item.price) * item.quantity;
}, 0);

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete product from cart
router.delete("/", async (req, res) => {
  try {
    const { productId, guestId, userId } = req.body;
    const cart = await Cart.findOne({ $or: [{ userId }, { guestId }] });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.products = cart.products.filter(
      (p) => p.productId.toString() !== productId
    );
cart.totalPrice = cart.products.reduce((sum, item) => {
  return sum + Number(item.price) * item.quantity;
}, 0);

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Merge guest cart into user cart
router.post("/merge", async (req, res) => {
  try {
    const { guestId, userId } = req.body;
    const guestCart = await Cart.findOne({ guestId });
    if (!guestCart)
      return res.status(404).json({ message: "Guest cart not found" });

    let userCart = await Cart.findOne({ userId });
    if (!userCart) {
      userCart = new Cart({ userId, products: [] });
    }

    guestCart.products.forEach((guestProduct) => {
      const existingProductIndex = userCart.products.findIndex(
        (p) => p.productId.toString() === guestProduct.productId.toString()
      );

      if (existingProductIndex > -1) {
        userCart.products[existingProductIndex].quantity +=
          guestProduct.quantity;
      } else {
        userCart.products.push(guestProduct);
      }
    });

    await userCart.save();
    await Cart.findByIdAndDelete(guestCart._id);

    res.status(200).json(userCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
