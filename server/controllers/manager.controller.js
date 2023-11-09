const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { User } = require("../models");
const ApiError = require("../utils/ApiError");
const { tokenService } = require("../services");

const getEmployee = catchAsync(async (req, res) => {
  try {
    const perPage = 10;
    const page = req.query.page ? parseInt(req.query.page, 10) : 1;
    const totalCount = await User.countDocuments();

    const sortField = req.query.sortField || "location";
    const sortOrder = req.query.sortOrder;
    const sortOptions = { [sortField]: sortOrder };
    const user = await User.find({ role: "Employee" })
      .sort(sortOptions)
      .skip(perPage * (page - 1))
      .limit(perPage);
    return res.status(200).json({
      status: "200",
      message: `Employee list fetched successfully.`,
      data: user,
      count: totalCount,
      page: page,
      totalPages: Math.ceil(totalCount / perPage),
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "An error occurred while fetching employee list.",
      error: error.message,
    });
  }
});
const getManagers = catchAsync(async (req, res) => {
  try {
    const perPage = 10;
    const page = req.query.page ? parseInt(req.query.page, 10) : 1;
    const totalCount = await User.countDocuments();

    const sortField = req.query.sortField || "location";
    const sortOrder = req.query.sortOrder;
    const sortOptions = { [sortField]: sortOrder };
    const user = await User.find({ role: "Manager" })
      .sort(sortOptions)
      .skip(perPage * (page - 1))
      .limit(perPage);
    return res.status(200).json({
      status: "200",
      message: `Manager list fetched successfully.`,
      data: user,
      count: totalCount,
      page: page,
      totalPages: Math.ceil(totalCount / perPage),
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "An error occurred while fetching manager list.",
      error: error.message,
    });
  }
});

const getOneEmployee = catchAsync(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    return res.status(200).json({
      status: "200",
      message: `User detail fetched successfully.`,
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

const login = catchAsync(async (req, res) => {});
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
  getEmployee,
  login,
  updateEmployeeDepartment,
  getOneEmployee,
  getManagers,
};
