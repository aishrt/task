const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/project", {
    useNewUrlParser: true,
  })
  .then(() => console.log("DB Connected successfully !"))
  .catch((err) => console.log("Something Went Wrong", err));
