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
        message: "User already registered.",
      });
    }

    const user = await User.create(req.body);

    return res.status(200).json({
      status: "200",
      message: "User registered successfully.",
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
    console.log(req.body, "killlllllllllllllll");

    const user = await User.findOne({ email });
    console.log(user, "oooooooooooooooooooooooooo");
    // if (!user || !(await user.isPasswordMatch(password))) {
    //   throw new ApiError(
    //     httpStatus.UNAUTHORIZED,
    //     "Incorrect email or password"
    //   );
    // }

    const tokens = await tokenService.generateAuthTokens(user);
    console.log(tokens, "oppopopopopopopou");
    return res.status(200).json({
      status: "200",
      message: "User logged in successfully.",
      data: user,
      tokens,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "An error occurred while updating state data.",
      error: error.message,
    });
  }
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  register,
  login,
  logout,
};
