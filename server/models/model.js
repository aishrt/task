const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  id: { type: String, required: true },
  address: { type: String, required: true },
  school: { type: String, required: true },
  phone: { type: String, required: true },
});

const studentModel = mongoose.model("student", studentSchema);
module.exports = studentModel;

