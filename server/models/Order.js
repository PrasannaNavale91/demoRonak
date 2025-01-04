const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  cartId: String,
  cartItems: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  addressInfo: {
    type: Object,
    required: true,
  },
  amount: {
    type: Number,
    required: true
  },
  paymentMethod: { type: String, enum: ["razorpay", "cod"], required: true },
  paymentStatus: { type: String, enum: ["pending", "paid"], default: "pending" },
  orderStatus: { type: String, enum: ["pending", "confirmed"], default: "pending" },
  totalAmount: { type: Number, required: true },
  razorpayOrderId: { type: String },
  razorpayPaymentId: { type: String },
});

module.exports = mongoose.model("Order", OrderSchema);