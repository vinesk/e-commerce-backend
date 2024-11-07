const mongoose = require("mongoose");
const Product = require("./models/Product");
const Feature = require("./models/Feature");
const User = require("./models/User");
const Review = require("./models/Review");
const products = require("./data/products");
const features = require("./data/features");
const users = require("./data/users");
require("dotenv").config();

const seedDatabase = async () => {
  try {
    // Connexion à MongoDB
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");

    // Suppression des données existantes
    await Product.deleteMany({});
    await Feature.deleteMany({});
    await User.deleteMany({});
    await Review.deleteMany({});

    // Insertion des nouvelles données
    const createdUsers = await User.insertMany(users);
    const createdProducts = await Product.insertMany(products);
    await Feature.insertMany(features);

    // Création des reviews
    const reviews = [];
    createdProducts.forEach((product) => {
      // 2-3 reviews par produit
      const numberOfReviews = Math.floor(Math.random() * 2) + 2; // 2-3 reviews

      for (let i = 0; i < numberOfReviews; i++) {
        const randomUser =
          createdUsers[Math.floor(Math.random() * createdUsers.length)];

        reviews.push({
          productId: product._id,
          userId: randomUser._id,
          userName: randomUser.userName,
          reviewMessage: getRandomReview(),
          reviewValue: Math.floor(Math.random() * 2) + 4, // Notes entre 4 et 5
        });
      }
    });

    await Review.insertMany(reviews);

    console.log("Data successfully imported!");
    process.exit();
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

const getRandomReview = () => {
  const reviews = [
    "Excellent product, really satisfied with my purchase!",
    "Great quality for the price, would recommend.",
    "Exactly what I was looking for!",
    "Very comfortable and stylish.",
    "Good product but shipping took a while.",
    "Perfect fit and great design.",
    "Amazing quality, will buy again!",
    "Exceeded my expectations.",
    "Really happy with this purchase.",
    "Great value for money!",
  ];
  return reviews[Math.floor(Math.random() * reviews.length)];
};

seedDatabase();
