const errorHandler = require("../middlewares/errorHandler.js");
const OrderSchema = require("../models/Order.js");
const CartSchema = require("../models/Cart.js");

const newOrder = async (req, res, next) => {
  try {
    if (!req.user.id)
      return next(errorHandler(402, "You are not authenticated"));
    const order = new OrderSchema({ ...req.body, customer: req.user.id });
    await order.save();
    res.status(201).json("Order placed successfully");
  } catch (error) {}
};

module.exports = {
  newOrder,
};
