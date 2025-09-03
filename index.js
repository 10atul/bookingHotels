const express = require("express");
const connectToDB = require("./src/db/db");
require("dotenv").config();
const port = process.env.PORT || 3000;

const app = express();

connectToDB();

app.get("/", (req, res) => {
  res.send("Ready to cook");
});

app.listen(port, () => {
  console.log("Server is listing succesfully", port);
});
