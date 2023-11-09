const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { User } = require("../models");
const { tokenService } = require("../services");

const getProfileData = catchAsync(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    return res.status(200).json({
      status: "200",
      message: `Employee detail fetched successfully.`,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "An error occurred while fetching employee list.",
      error: error.message,
    });
  }
});

const updateEmployeeDepartment = catchAsync(async (req, res) => {
  let role = "";
  try {
    const department = req.body.department;
    const result = await User.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    result.save();
    role = result?.role;
    return res.status(200).json({
      status: "200",
      message: `${role} updated successfully.`,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: `An error occurred while updating ${role} data.`,
      error: error.message,
    });
  }
});

module.exports = {
  updateEmployeeDepartment,
  getProfileData,
};
