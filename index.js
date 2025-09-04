const express = require("express");
require("dotenv").config();
const app = express();
const connectToDB = require("./src/db/db");
const Listing = require("./src/models/listing");
const port = process.env.PORT || 3000;
const path = require("path");
const methodOverride = require("method-override");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

connectToDB();

app.get("/", (req, res) => {
  res.send("Ready to cook");
});

//Index route
app.get("/listings", async (req, res) => {
  let allListings = await Listing.find({});
  res.render("listings/index", { allListings });
});

//New Route
app.get("/listings/new", (req, res) => {
  res.render("listings/new");
});

//CREATE ROUTE
app.post("/listings", async (req, res) => {
  // let {title, desciption, price, location, country} = req.body;
  let newListings = new Listing(req.body.listing);
  await newListings.save();
  res.redirect("/listings");
});

//EDIT ROUTE
app.get("/listings/:id/edit", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit", { listing });
});

//UPDATE ROUTE
app.put("/listings/:id", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect("/listings");
});

// DELETE ROUTE
app.delete("/listings/:id", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
});

//Show Route
app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show", { listing });
});

app.listen(port, () => {
  console.log("Server is listing succesfully", port);
});
