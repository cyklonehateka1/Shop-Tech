const UserSchema = require("../models/User.js");
const errorHandler = require("../middlewares/errorHandler.js");
const sendEmail = require("../utils/sendEmail.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
// const verifyEmailTemplate = require("../utils/emailTemplates/verifyEmailTemplate.js");
const CartSchema = require("../models/Cart.js");

const register = async (req, res, next) => {
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
    let user = await UserSchema.findOne({ email }, { maxTimeMS: 30000 });
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
    const url = `https://navy-blue-panther-sari.cyclic.app/auth/verifyemail/user/${user._id}/verify/${token}`;
    // const url = `http://localhost:3000/auth/verifyemail/user/${user._id}/verify/${token}`;
    const emailResponse = await sendEmail(
      user.email,
      "Confirm Account",
      url,
      // verifyEmailTemplate
      token
    )
      .then((data) => {})
      .catch((err) => {
        return next(errorHandler(400, emailResponse));
      });
    if (emailResponse !== "email sent");

    res.status(201).json({
      message:
        "Please click on the link in the email sent to you to verify your account",
      userId: user._id,
      email: user.email,
    });
  } catch (error) {
    return next(error);
  }
};

const confirmAccount = async (req, res, next) => {
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

    const userCart = await CartSchema.findOne({ user: req.params.userId });
    if (userCart)
      return next(
        errorHandler(
          409,
          "An error occured while verifying your account, please try again later"
        )
      );

    const verify = await UserSchema.findByIdAndUpdate(
      req.params.userId,
      {
        $set: { isVerified: true },
      },
      { new: true }
    );
    const creatUserCart = new CartSchema({
      user: req.params.userId,
      quantity: 0,
      total: 0,
    });
    await creatUserCart.save();

    res.status(200).json("Email verified successfully");
  } catch (error) {
    return next(error);
  }
};

const resendConfirmationEmail = async (req, res, next) => {
  try {
    const token = jwt.sign(
      { id: req.params.userId },
      process.env.EMAIL_CON_KEY,
      {
        expiresIn: "1h",
      }
    );
    const user = await UserSchema.findById(req.params.userId);
    if (!user) return next(errorHandler(404, "User not found"));
    if (user.isVerified)
      return next(errorHandler(403, "Email is verified already"));
    const url = `https://navy-blue-panther-sari.cyclic.app/auth/verifyemail/user/${req.params.userId}/verify/${token}`;
    const emailResponse = await sendEmail(
      user.email,
      "Confirm Account",
      url,
      verifyEmailTemplate
    )
      .then((data) => {})
      .catch((err) => {
        return next(errorHandler(400, emailResponse));
      });

    res.status(201).json("email resent");
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  let { email, password } = req.body;

  email = email.trim();

  if (!email || !password)
    return next(errorHandler(400, "All fields are required"));

  if (email === "" || password.trim() === "")
    return next(errorHandler(400, "No field can be left blank"));
  try {
    const user = await UserSchema.findOne({ email });
    if (!user)
      return next(
        errorHandler(
          404,
          "Incorrect username or password, would you like to sign up instead?"
        )
      );

    if (user.fromGoogle)
      return next(
        errorHandler(403, "You already signed in with a different method")
      );

    const checkPassword = bcrypt.compareSync(password, user.password);

    if (!checkPassword) return next(errorHandler(400, "Wrong password"));

    const accessToken = jwt.sign(
      {
        id: user._id,
        fromGoogle: user.fromGoogle,
        accType: user.accountType,
        email: user.email,
      },
      process.env.JWT_SECRET
    );

    const { _id, ...others } = user._doc;

    res.status(200).json({ id: _id, accessToken });
  } catch (error) {
    return next(error);
  }
};

const getCredentials = async (req, res, next) => {
  try {
    const user = await UserSchema.findById(req.user.id);
    if (!user)
      return next(
        errorHandler(403, "An error happened while authenticating your account")
      );
    const credentials = { name: user.name, image: user.profileImage };
    res.status(200).json(credentials);
  } catch (error) {
    return next(error);
  }
};

const logout = async (req, res, next) => {
  res
    .clearCookie("access_token", { sameSite: "none", secure: true, maxAge: 1 })
    .status(200)
    .json("Logged out successfully");
};

module.exports = {
  logout,
  register,
  login,
  confirmAccount,
  resendConfirmationEmail,
  getCredentials,
};
