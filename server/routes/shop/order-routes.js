const express = require("express");
const {
  createOrder,
  getAllOrdersByUser,
  getOrderDetails,
  verifyPayment,
  updatePaymentStatus
} = require("../../controllers/shop/order-controller");

const router = express.Router();

router.post("/create", createOrder);
router.post("/capture", verifyPayment);
router.get("/list/:userId", getAllOrdersByUser);
router.get("/details/:id", getOrderDetails);
router.patch("/update/:orderId", updatePaymentStatus);

module.exports = router;