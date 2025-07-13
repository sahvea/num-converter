const mongoose = require("mongoose");

const conversionSchema = new mongoose.Schema({
  inputValue: {
    type: String,
    required: true,
  },
  convertedValue: {
    type: String,
    required: true,
  },
  conversionType: {
    type: String,
    enum: ["roman-to-arabic", "arabic-to-roman"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

conversionSchema.index({ inputValue: 1, conversionType: 1 }, { unique: true });

module.exports = mongoose.model("conversion", conversionSchema);
