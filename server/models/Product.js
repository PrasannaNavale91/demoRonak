const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    image: {
      type : [String],
      default : []
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
      type : [String],
      default : []
    },
    color: {
      type : [String],
      default : []
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