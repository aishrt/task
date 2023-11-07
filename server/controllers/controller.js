//-------------------------- CREATE ------------------------------------------------
const stuData = require("../models/model");

module.exports.register = async (req, res) => {
  const data = new stuData(req.body);
  const user = await stuData.findOne({ id: data.id });
  if (user) {
    res.send({ status: "failed", message: "Id already exists" });
    console.log("Id already exists");
  } else {
    try {
      const result = await data.save();
      res.send({
        result,
        status: "success",
        message: "Student Registered successfully",
      });
      console.log(result);
    } catch (error) {
      console.log(error);
      res.send({
        status: "failed",
        message: error.message,
        // message: "All fields are required.",
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
//Here using data you cann access the whole colletion of data
module.exports.data = async (req, res) => {
  const result = await stuData.find().select({ _id: 0, __v: 0 });
  res.send(result);

  // const result = await stuData.find().select({ name: 1 }).limit(1);
  // const result = await stuData.findOne({ id: req.body.id });
  // console.log(result);
};

//Here using onedata you cann search the single entry from the whole colletion of data

// module.exports.onedata = async (req, res) => {
//   const result = await stuData.findOne({ id: req.body.id });
//   res.send(result);
// };

module.exports.onedata = async (req, res) => {
  const result = await stuData.findOne({ id: req.body.id });

  if (result !== null) {
    console.log("Data found ===> ", result);
    res.send({
      result,
      status: "success",
      message: "Student record found Successfully",
    });
  } else {
    console.log("Student data not found ");
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
    console.log("Status of Updated record ===>", updateRecord);

    const getupdateData = await stuData.find({ id: req.body.id });
    console.log("Updates data  is ==>>", getupdateData);

    return res.status(200).send({
      status: "success",
      message: "update data successfully",
      result: getupdateData,
    });
  }

  // console.log(updateMongo);
  // console.log("name",req.body.name)
};

// if (stuData.id == req.body.id) {
//   // console.log("name",req.body.name)
//   const updateRecord = await stuData.updateOne(
//     { id: req.body.id },
//     {
//       name: req.body.name ? req.body.name : updateMongo.name,
//       address: req.body.address ? req.body.address : updateMongo.address,
//       phone: req.body.phone ? req.body.phone : updateMongo.phone,
//       school: req.body.school ? req.body.school : updateMongo.school,
//     }
//   );
//   console.log("Status of Updated record ===>", updateRecord);

//   const getupdateData = await stuData.find({ id: req.body.id });
//   console.log("Updates data  is ==>>", getupdateData);

//   return res.status(200).send({
//     status: "success",
//     message: "update data successfully",
//     result: getupdateData,
//   });
// } else {
//   return res.status(401).send({
//     status: "failed",
//     message: "User not found",
//   });
// }
// };

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
