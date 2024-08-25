import mongoose from "mongoose";
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      default: "Fashion",
      enum: [
        "Electronics",
        "Fashion",
        "Home & Kitchen",
        "Books",
        "Health & Beauty",
        "Sports & Outdoors",
        "Toys & Games",
        "Automotive",
        "Music & Movies",
        "Groceries",
        "Pet Supplies",
        "Baby Products",
        "Office Supplies",
        "Tools & Home Improvement",
        "Garden & Outdoor",
        "Jewelry & Watches",
        "Handmade",
        "Appliances",
        "Furniture",
        "Stationery",
        "Art & Craft Supplies",
        "Video Games",
        "Luggage & Travel Gear",
        "Musical Instruments",
        "Software",
      ],
      required: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);
export const categoryModels = mongoose.model("category", categorySchema);
