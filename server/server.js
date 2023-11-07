const express = require("express");
const { json } = require("body-parser");

app.use(express.json());
const app = express();

const port = "4004";
app.listen(port, (req, res) => {
  console.log(`Server is listening at http://localhost:${port}`);
});
