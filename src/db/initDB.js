const mongoose = require("mongoose");
require("dotenv").config();
const Listing = require("../models/listing");
const initData = require("./data");

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");
  })
  .catch((err) => {
    console.error("Seeding error:", err);
  });
