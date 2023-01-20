import UserSchema from "../models/User.js";
import { errorHandler } from "../middlewares/errorHandler.js";
import { sendEmail } from "../utils/sendEmail.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const register = async (req, res, next) => {
  let { name, email, password } = req.body;
  name = name.trim();
  password = password.trim();
  email = email;

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  if (!name || !email || !password)
    return next(errorHandler(400, "All fields are requried"));
  if (name.trim() === "" || email.trim() === "" || password.trim() === "")
    return next(errorHandler(400, "No field can be made up of spaces only"));
  if (password.length <= 6)
    return next(errorHandler(400, "Password too short"));
  try {
    let user = await UserSchema.findOne({ email });
    if (user)
      return next(
        errorHandler(
          409,
          "An account with this email already exist, will you like to login instead"
        )
      );
    user = new UserSchema({ ...req.body, password: hash });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.EMAIL_CON_KEY, {
      expiresIn: "1h",
    });
    const url = `${process.env.BASE_URL}/api/auth/${user._id}/verify/${token}`;
    sendEmail(user.email, "Confirm Account", url);

    res
      .status(201)
      .json(
        "Please click on the link in the email sent to you to verify your account"
      );
  } catch (error) {
    return next(error);
  }
};

export const confirmAccount = async (req, res, next) => {
  try {
    const user = await UserSchema.findById(req.params.userId);
    if (!user) return next(errorHandler(401, "Invalid user"));

    const verifyToken = jwt.verify(
      req.params.token,
      process.env.EMAIL_CON_KEY,
      (error, response) => {
        if (error) return next(errorHandler(401, "Token has expired"));

        if (response.id !== req.params.userId)
          return next(errorHandler(403, "Invalid token"));
      }
    );

    const verify = await UserSchema.findByIdAndUpdate(
      req.params.userId,
      {
        $set: { isVerified: true },
      },
      { new: true }
    );

    res.status(200).json("Email verified successfully");
  } catch (error) {
    return next(error);
  }
};

export const login = async (req, res, next) => {
  let { email, password } = req.body;

  email = email.trim();

  if (!email || !password)
    return next(errorHandler(400, "All fields are required"));

  if (email.trim() === "" || password.trim() === "")
    return next(errorHandler(400, "No field can be left blank"));
  try {
    const user = await UserSchema.findOne({ email });
    if (!user)
      return next(
        errorHandler(404, "User not found, would you like to sign up instead?")
      );

    if (user.fromGoogle)
      return next(
        errorHandler(403, "You already signed in with a different method")
      );

    if (!user.isVerified) {
      const token = jwt.sign({ id: user._id }, process.env.EMAIL_CON_KEY, {
        expiresIn: "1h",
      });
      const url = `${process.env.BASE_URL}/api/auth/${user._id}/verify/${token}`;
      sendEmail(user.email, "Confirm Account", url);
    }

    const checkPassword = bcrypt.compareSync(req.body.password, user.password); // true

    if (!checkPassword) return next(errorHandler(403, "Incorrect password"));

    const accessToken = jwt.sign(
      { id: user._id, fromGoogle: user.fromGoogle },
      process.env.JWT_SECRET
    );

    const { _id, ...others } = user._doc;

    res
      .cookie("access_token", accessToken, { httpOnly: true })
      .status(200)
      .json(_id);
  } catch (error) {
    return next(error);
  }
};
