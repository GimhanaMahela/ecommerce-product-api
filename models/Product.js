const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a product name"],
    trim: true,
    maxlength: [100, "Name cannot be more than 100 characters"],
  },
  description: {
    type: String,
    required: [true, "Please add a description"],
    maxlength: [500, "Description cannot be more than 500 characters"],
  },
  price: {
    type: Number,
    required: [true, "Please add a price"],
    maxlength: [8, "Price cannot be more than 8 characters"],
  },
  discountPrice: {
    type: Number,
    maxlength: [8, "Discount price cannot be more than 8 characters"],
  },
  color: {
    type: String,
  },
  size: {
    type: [String],
    required: true,
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please add a category"],
    enum: [
      "Electronics",
      "Cameras",
      "Laptops",
      "Accessories",
      "Headphones",
      "Food",
      "Books",
      "Clothes/Shoes",
      "Beauty/Health",
      "Sports",
      "Outdoor",
      "Home",
    ],
  },
  stock: {
    type: Number,
    required: [true, "Please add stock quantity"],
    maxlength: [4, "Stock cannot exceed 4 characters"],
    default: 1,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
