import UserSchema from "../models/User.js";
import { errorHandler } from "../middlewares/errorHandler.js";

const register = async (req, res, next) => {
  let { name, email, password } = req.body;
  name = name.trim();
  password = password.trim();
  email = email;

  if (!name || !email || password)
    return next(errorHandler(400, "All fields are requried"));
  try {
    const user = await UserSchema.findOne({ email });
    if (user)
      return next(
        errorHandler(
          409,
          "An account with this email already exist, will you like to login instead"
        )
      );
  } catch (error) {}
};
