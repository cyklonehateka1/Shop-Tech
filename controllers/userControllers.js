const { errorHandler } = require("../middlewares/errorHandler.js");
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

module.exports = {
  getUser,
};
