const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { User } = require("../models");
const ApiError = require("../utils/ApiError");
const { tokenService } = require("../services");

const register = catchAsync(async (req, res) => {
  try {
    if (await User.isEmailTaken(req.body.email)) {
      return res.status(201).json({
        status: "201",
        message: `Email already registered.`,
      });
    }

    const user = await User.create(req.body);

    return res.status(200).json({
      status: "200",
      message: `${req.body.role} registered successfully.`,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "An error occurred while registering the user.",
      error: error.message,
    });
  }
});

const login = catchAsync(async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(200).json({
        status: "400",
        message: "User not found",
      });
    }
    if (!(await user.isPasswordMatch(password))) {
      return res.status(200).json({
        status: "400",
        message: "Incorrect password",
      });
    }
    const tokens = await tokenService.generateAuthTokens(user);
    return res.status(200).json({
      status: "200",
      message: "User logged in successfully.",
      data: user,
      tokens,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "An error occurred while login.",
      error: error.message,
    });
  }
});

module.exports = {
  register,
  login,
};
