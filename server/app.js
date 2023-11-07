const express = require("express");
const { json } = require("body-parser");
const routes = require("./routes");

let cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();


const app = express();
app.use(express.json());

app.use(cors());

const port = "4000";
app.listen(port, (req, res) => {
  console.log(`Server is listening at http://localhost:${port}`);
});

require("./config/config");
require("./routes/router")(app);

app.use("/v1", routes);
