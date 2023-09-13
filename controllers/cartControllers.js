const errorHandler = require("../middlewares/errorHandler.js");
const CartSchema = require("../models/Cart.js");

const getUserCart = async (req, res, next) => {
  try {
    let cart = await CartSchema.findOne({ user: req.params.userId });
    if (!cart) return next(errorHandler(400, "Cart not found"));
    res.status(200).json(cart);
    console.log("object");
  } catch (error) {
    return next(error);
  }
};

const addToCart = async (req, res, next) => {
  try {
    const cart = await CartSchema.findOne({ user: req.params.userId });
    if (!cart) return next(errorHandler(401, "Cart not found"));

    const product = cart.products.findIndex(
      (item) => item.product.toString() === req.body.productId
    );

    if (product === -1) {
      cart.products.push({
        product: req.body.productId,
        quantity: req.body.quantity || 1,
        color: req.body.color,
      });
    } else {
      cart.products[product].quantity += req.body.quantity || 1;
    }
    await cart.save();
    res.status(200).json("Product added successfully");
  } catch (error) {
    return next(error);
  }
};

const removeFromCart = async (req, res, next) => {
  try {
    const cart = await CartSchema.findOne({ user: req.params.userId });
    if (!cart) return next(errorHandler(401, "Cart not found"));

    const itemIndex = cart.products.findIndex(
      (item) => item.product.toString() === req.body.productId
    );

    if (itemIndex === -1) return next(errorHandler(404, "Product not found"));
    cart.products.splice(itemIndex, 1);

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  addToCart,
  removeFromCart,
  getUserCart,
};
