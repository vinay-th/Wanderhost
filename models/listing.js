const mongoose = require("mongoose");
const Schema = mongoose.Schema;

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderhost");
}

main()
  .then(() => {})
  .catch((err) => {
    console.log("Some error occurred ", err);
  });

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    url: {
      type: String,
      default: "https://ibb.co/8jG50Tj",
    },
    filename: {
      type: String,
    },
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
