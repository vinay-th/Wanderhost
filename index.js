const express = require("express");
const app = express();
const path = require("path");
const port = 8080;
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const Listing = require("../Wanderhost/models/listing.js");
const ejsMate = require("ejs-mate");

app.listen(port, () => {
  console.log(`Server is running on port : ` + port);
});

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderhost");
}

main()
  .then(() => {
    console.log("Connection successful");
  })
  .catch((err) => {
    console.log("Some error occurred ", err);
  });

app.engine("ejs", ejsMate);

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static("public/css"));
app.use(express.static("public/js"));

// index route
app.get("/", async (req, res) => {
  let allListings = await Listing.find({});
  res.render("index.ejs", { allListings });
});

// listing route
app.get("/listings", async (req, res) => {
  let allListings = await Listing.find({});
  res.render("listings/listings.ejs", { allListings });
});

// New route
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

// create route
app.post("/listings", (req, res) => {
  const newListing = new Listing(req.body.listing);
  newListing.save();
  res.redirect("/listings");
});

// show routes
app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);

  res.render("listings/show.ejs", { listing });
});

// edit route
app.get("/edit/:id", async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
});

// patch of edit
app.patch("/edit/:id", async (req, res) => {
  let { id } = req.params;
  let { listing } = req.body;
  await Listing.findByIdAndUpdate(id, listing);
  console.log("Updated successfully");
  res.redirect(`/listings/${id}`);
});

// delete
app.delete("/edit/:id", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  console.log("Deleted successfully");
  res.redirect(`/listings`);
});

// error handling

app.use((err, req, res, next) => {
  res.send("Some error occurred");
});
