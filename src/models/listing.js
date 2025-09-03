const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: {
    type: String,
    set: (v) => (v === "" ? "" : v),
  },
  price: Number,
  location: String,
  country: String,
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
