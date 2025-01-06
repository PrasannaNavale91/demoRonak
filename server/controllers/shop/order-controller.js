const Order = require("../../models/Order");
// const Cart = require("../../models/Cart");
const Product = require("../../models/Product");
const sendEmail = require("../../helpers/email");
const Razorpay = require("razorpay");
const crypto = require("crypto");

require("dotenv").config();

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      paymentMethod,
      totalAmount,
    } = req.body;

    if (paymentMethod === "razorpay") {
      const razorpayOrder = await razorpayInstance.orders.create({
        amount: totalAmount * 100,
        currency: "INR",
        receipt: `order_rcptid_${Math.random().toString(36).substring(7)}`,
      });

      const newOrder = new Order({
        userId,
        cartItems,
        addressInfo,
        paymentMethod,
        paymentStatus: "pending",
        totalAmount,
        orderStatus: "pending",
        razorpayOrderId: razorpayOrder.id,
      });

      await newOrder.save();

      return res.status(201).json({
        success: true,
        orderId: newOrder._id,
        razorpayOrderId: razorpayOrder.id,
      });
    } else if (paymentMethod === "cod") {
      // COD Order Creation
      const newOrder = new Order({
        userId,
        cartItems,
        addressInfo,
        paymentMethod,
        paymentStatus: "pending",
        totalAmount,
        orderStatus: "confirmed",
      });

      await newOrder.save();

      return res.status(201).json({
        success: true,
        message: "Order placed successfully with COD.",
        orderId: newOrder._id,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid payment method.",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

const verifyRazorpayPayment = async (req, res) => {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, orderId } = req.body;

    const expectedSignature = crypto
      .createHmac("trendcrave", razorpayInstance)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest("hex");

    if (expectedSignature === razorpaySignature) {
      const order = await Order.findById(orderId);

      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found.",
        });
      }

      order.paymentStatus = "paid";
      order.orderStatus = "confirmed";
      order.razorpayPaymentId = razorpayPaymentId;

      for (let item of order.cartItems) {
        const product = await Product.findById(item.productId);

        if (product.totalStock < item.quantity) {
          return res.status(400).json({
            success: false,
            message: `Not enough stock for ${product.title}.`,
          });
        }

        product.totalStock -= item.quantity;
        await product.save();
      }

      await order.save();
      
      await sendEmail({
        to: req.user.email,
        html: `<h3>Thank you for your payment!</h3><p>Your order has been confirmed.</p>`,
        subject: "Order Confirmation",
      });

      res.status(200).json({
        success: true,
        message: "Payment verified and order confirmed.",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid payment signature.",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

const getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId });

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found!",
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

module.exports = {
  createOrder,
  verifyRazorpayPayment,
  getAllOrdersByUser,
  getOrderDetails,
};
