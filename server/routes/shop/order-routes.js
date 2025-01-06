const express = require("express");
const { authMiddleware } = require("../../controllers/auth/auth-controller");
const {
  createOrder,
  getAllOrdersByUser,
  getOrderDetails,
  verifyRazorpayPayment,
} = require("../../controllers/shop/order-controller");

const router = express.Router();

router.post("/create", createOrder);
router.post("/verify-payment", authMiddleware, verifyRazorpayPayment);
router.get("/list/:userId", getAllOrdersByUser);
router.get("/details/:id", getOrderDetails);

module.exports = router;