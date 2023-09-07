const UserSchema = require("../models/User.js");
const errorHandler = require("../middlewares/errorHandler.js");
const sendEmail = require("../utils/sendEmail.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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
    // const url = `https://navy-blue-panther-sari.cyclic.app/auth/verifyemail/user/${user._id}/verify/${token}`;
    const url = `http://localhost:3000/auth/verifyemail/user/${user._id}/verify/${token}`;
    const emailResponse = sendEmail(user.email, "Confirm Account", url);

    if (emailResponse !== "email sent")
      return next(errorHandler(400, emailResponse));

    res
      .status(201)
      .json(
        "Please click on the link in the email sent to you to verify your account"
      );
  } catch (error) {
    return next(error);
  }
};

// const confirmAccount = async (req, res, next) => {
//   try {
//     const user = await UserSchema.findById(req.params.userId);
//     if (!user) return next(errorHandler(401, "Invalid user"));

//     const verifyToken = jwt.verify(
//       req.params.token,
//       process.env.EMAIL_CON_KEY,
//       (error, response) => {
//         if (error) return next(errorHandler(401, "Token has expired"));

//         if (response.id !== req.params.userId)
//           return next(errorHandler(403, "Invalid token"));
//       }
//     );

//     const verify = await UserSchema.findByIdAndUpdate(
//       req.params.userId,
//       {
//         $set: { isVerified: true },
//       },
//       { new: true }
//     );

//     res.status(200).json("Email verified successfully");
//   } catch (error) {
//     return next(error);
//   }
// };

// const login = async (req, res, next) => {
//   let { email, password } = req.body;

//   email = email.trim();

//   if (!email || !password)
//     return next(errorHandler(400, "All fields are required"));

//   if (email.trim() === "" || password.trim() === "")
//     return next(errorHandler(400, "No field can be left blank"));
//   try {
//     const user = await UserSchema.findOne({ email });
//     if (!user)
//       return next(
//         errorHandler(404, "User not found, would you like to sign up instead?")
//       );

//     if (user.fromGoogle)
//       return next(
//         errorHandler(403, "You already signed in with a different method")
//       );

//     const checkPassword = bcrypt.compareSync(password, user.password);

//     if (!checkPassword) return next(errorHandler(400, "Wrong password"));

//     const accessToken = jwt.sign(
//       { id: user._id, fromGoogle: user.fromGoogle, accType: user.accountType },
//       process.env.JWT_SECRET
//     );

//     const { _id, ...others } = user._doc;

//     res.cookie("access_token", accessToken).status(200).json(_id);
//   } catch (error) {
//     return next(error);
//   }
// };

// const logout = async (req, res, next) => {
//   res
//     .clearCookie("access_token", { sameSite: "none", secure: true, maxAge: 1 })
//     .status(200)
//     .json("Logged out successfully");
// };

module.exports = {
  // logout,
  register,
  // login,
  // confirmAccount,
};
