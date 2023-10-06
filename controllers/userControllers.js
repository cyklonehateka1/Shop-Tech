const errorHandler = require("../middlewares/errorHandler.js");
const UserSchema = require("../models/User.js");

const getUser = async (req, res, next) => {
  try {
    if (req.user.accType !== "admin" || req.user.id !== req.params.id)
      return next(errorHandler(400, "You're not authorized"));
    const user = await UserSchema.findById(req.params.id);
    if (!user) return next(errorHandler(404, "User not found"));
    res.status(200).json(user);
  } catch (error) {}
};

const getTotalCustomerCount = async (req, res, next) => {
  if (req.user.accType !== "admin")
    return next(errorHandler(403, "You're not authorized"));

  try {
    const customerQuantity = await UserSchema.countDocuments({
      accountType: "customer",
    });
    if (!customerQuantity) return next(errorHandler(404, "No user found"));
    res.status(200).json(customerQuantity);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getUser,
  getTotalCustomerCount,
};
