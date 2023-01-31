import { errorHandler } from "../middlewares/errorHandler.js";
import CartSchema from "../models/Cart.js";

export const createCart = async (req, res, next) => {
  try {
    let cart = await CartSchema.findOne({ user: req.params.userId });
    if (cart) return errorHandler(400, "User already has a cart");

    cart = new CartSchema({ user: req.params.userId });
    await cart.save();
  } catch (error) {
    return next(error);
  }
};
