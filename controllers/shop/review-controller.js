const Review = require("../../models/Review");
const Order = require("../../models/Order");
const Product = require("../../models/Product");

const addReview = async (req, res) => {
  try {
    const { productId, userId, userName, reviewMessage, reviewValue } =
      req.body;

    const order = await Order.findOne({
      userId,
      "cartItems.productId": productId,
      orderStatus: "confirmed",
    });

    if (!order) {
      return res.status(403).json({
        success: false,
        message: "You need to purchase this product first!",
      });
    }

    const existingReview = await Review.findOne({
      productId,
      userId,
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this product!",
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
    const totalReviews = reviews.length;
    const averageRating =
      reviews.reduce((sum, review) => sum + review.reviewValue, 0) /
      totalReviews;

    await Product.findByIdAndUpdate(productId, {
      averageRating,
    });

    res.status(201).json({
      success: true,
      data: newReview,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Some error occurred!" });
  }
};

const getReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ productId });
    res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Some error occurred!" });
  }
};

module.exports = { addReview, getReviews };
