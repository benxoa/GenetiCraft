const mongoose = require("mongoose");

const geneticraftpricingSchema =new mongoose.Schema(
  {
    plan: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const GenetiCraftPricing = mongoose.model(
  "GenetiCraftPricing",
  geneticraftpricingSchema
);

module.exports = GenetiCraftPricing;
