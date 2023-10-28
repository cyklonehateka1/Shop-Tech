const errorHandler = require("../middlewares/errorHandler.js");
const CartSchema = require("../models/Cart.js");

const getUserCart = async (req, res, next) => {
  let userCart;
  try {
    let cart = await CartSchema.findOne({ user: req.user.id });
    if (!cart) {
      userCart = await new CartSchema({
        user: req.params.userId,
        quantity: 0,
        total: 0,
      }).save();
    } else {
      userCart = cart;
    }
    res.status(200).json({
      products: userCart.products,
      quantity: userCart.quantity,
      total: userCart.total,
    });
  } catch (error) {
    return next(error);
  }
};

const addToCart = async (req, res, next) => {
  try {
    const cart = await CartSchema.findOne({ user: req.params.userId });
    if (!cart) return next(errorHandler(401, "Cart not found"));

    const product = cart.products.findIndex(
      (item) => item._id.toString() === req.body.product._id.toString()
    );

    if (product === -1) {
      cart.products.push(req.body.product);
      cart.quantity = cart.quantity + req.body.product.quantity;
      cart.total =
        cart.total + req.body.product.quantity * req.body.product.price;
    } else {
      cart.products[product].quantity += req.body.product.quantity || 1;
      cart.quantity = cart.quantity + req.body.product.quantity;
      cart.total =
        cart.total + req.body.product.quantity * req.body.product.price;
    }
    console.log(cart);
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
