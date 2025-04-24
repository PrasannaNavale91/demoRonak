const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    image: {
      type : Array,
      default : []
    },
    title: String,
    description: String,
    category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
      },
    ],
    collection: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "collection",
      },
    ],
    size: {
      type : String,
      default : ""
    },
    color: {
      type : String,
      default : ""
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