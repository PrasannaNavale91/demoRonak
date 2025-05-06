const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    image: {
      type : String,
      required : false,
    },
    title: String,
    description: String,
    category: {
      type: String,
      required: true,
    },
    collection: {
      type: String,
      required: true,
    },
    size: {
      type: [String],
      default: [],
      required: true
    },
    color: {
      type: [String],
      default: [],
      required: true
    },
    price: {
      type : Number,
      default : null
    },
    salePrice: {
      type : Number,
      default : null
    },
    totalStock: {
      type : Number,
      default : null
    },
    averageReview: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);