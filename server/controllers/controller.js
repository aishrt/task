//-------------------------- CREATE ------------------------------------------------
const stuData = require("../models/model");

module.exports.register = async (req, res) => {
  const data = new stuData(req.body);
  const user = await stuData.findOne({ id: data.id });
  if (user) {
    res.send({ status: "failed", message: "Id already exists" });
  } else {
    try {
      const result = await data.save();
      res.send({
        result,
        status: "success",
        message: "Student Registered successfully",
      });
    } catch (error) {
      res.send({
        status: "failed",
        message: error.message,
      });
    }
  }
};

module.exports.home = (req, res) => {
  res.send("Home");
};

module.exports.about = (req, res) => {
  res.send("About");
};

//-------------------------- READ ------------------------------------------------
module.exports.data = async (req, res) => {
  const result = await stuData.find().select({ _id: 0, __v: 0 });
  res.send(result);
};

module.exports.onedata = async (req, res) => {
  const result = await stuData.findOne({ id: req.body.id });

  if (result !== null) {
    res.send({
      result,
      status: "success",
      message: "Student record found Successfully",
    });
  } else {
    res.send({
      result,
      status: "failed",
      message: "Student data not found",
    });
  }
};

//-------------------------- UPDATE ------------------------------------------------

module.exports.updateData = async (req, res) => {
  const updateMongo = await stuData.findOne({ id: req.body.id });
  if (updateMongo == null) {
    return res.status(401).send({
      status: "Failed",
      message: "Enter valid id ",
    });
  } else {
    const updateRecord = await stuData.updateOne(
      { id: req.body.id },
      {
        name: req.body.name ? req.body.name : updateMongo.name,
        address: req.body.address ? req.body.address : updateMongo.address,
        phone: req.body.phone ? req.body.phone : updateMongo.phone,
        school: req.body.school ? req.body.school : updateMongo.school,
      }
    );

    const getupdateData = await stuData.find({ id: req.body.id });

    return res.status(200).send({
      status: "success",
      message: "update data successfully",
      result: getupdateData,
    });
  }
};

//-------------------------- DELETE---------------------------

module.exports.delete = async (req, res) => {
  const result = await stuData.deleteOne({ id: req.body.id });
  const respond = result.deletedCount;
  console.log(respond);
  if (respond !== 0) {
    res.send({
      status: "success",
      message: "Record deleted successfully !",
    });
  } else {
    res.send({
      status: "failed",
      message: "Record not found!",
    });
  }
};
