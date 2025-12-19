const Order = require("../models/Order");
const Product = require("../models/Product");
const Review = require("../models/Review");

const addProductReview = async (req, res) => {
  try {
    const { productId, userId, userName, reviewMessage, reviewValue } =
      req.body;
    const order = await Order.findOne({
      userId,
      "cartItems.productId": productId,
      orderStatus: "confirmed",
    });
    if (!order) {
      res.status(403).json({
        success: false,
        message: "You need to purchase in order to review it",
      });
    }
    const existingReview = await Review.findOne({ productId, userId });
    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You already reviewd this product",
      });
    }
    const newReview = new Review({
      productId,
      userId,
      userName,
      reviewMessage,
      reviewValue,
    });
    await newReview.save();
    const reviews = await Review.find({ productId });
    const totalReviewsLength = reviews.length;
    const averageReview =
      reviews.reduce((sum, item) => sum + item.reviewValue, 0) /
      totalReviewsLength;
    await Product.findByIdAndUpdate(productId, { averageReview });
    res.status(201).json({
      success: true,
      data: newReview,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ productId });
    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

module.exports = { addProductReview, getProductReviews };
