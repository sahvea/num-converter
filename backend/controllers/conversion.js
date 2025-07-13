const Conversion = require("../models/conversion");
const { romanToArabic, arabicToRoman } = require("../utils/converter");
const IncorrectDataError = require("../errors/incorrect-data-err");
const { messages, codeStatuses } = require("../utils/constants");

const convertRomanToArabic = async (req, res, next) => {
  try {
    const { inputValue } = req.params;
    const numValue = parseInt(inputValue, 10);

    if (isNaN(numValue)) {
      throw new IncorrectDataError(messages.incorrectArabicNumber);
    }

    const existingConversion = await Conversion.findOne({
      inputValue: inputValue.toString(),
      conversionType: "arabic-to-roman",
    });

    if (existingConversion) {
      return res.json({
        inputValue: numValue,
        convertedValue: existingConversion.convertedValue,
      });
    }

    const romanResult = arabicToRoman(numValue);
    if (!romanResult) {
      throw new IncorrectDataError(messages.incorrectArabicNumber);
    }

    await Conversion.create({
      inputValue: inputValue.toString(),
      convertedValue: romanResult,
      conversionType: "arabic-to-roman",
    });

    res.json({
      inputValue: numValue,
      convertedValue: romanResult,
    });
  } catch (err) {
    if (err.name === "IncorrectDataError") {
      next(err);
    } else {
      next(err);
    }
  }
};

const convertArabicToRoman = async (req, res, next) => {
  try {
    const { inputValue } = req.params;

    const existingConversion = await Conversion.findOne({
      inputValue: inputValue.toUpperCase(),
      conversionType: "roman-to-arabic",
    });

    if (existingConversion) {
      return res.json({
        inputValue: inputValue,
        convertedValue: parseInt(existingConversion.convertedValue, 10),
      });
    }

    const arabicResult = romanToArabic(inputValue);
    if (!arabicResult) {
      throw new IncorrectDataError(messages.incorrectRomanNumeral);
    }

    await Conversion.create({
      inputValue: inputValue.toUpperCase(),
      convertedValue: arabicResult.toString(),
      conversionType: "roman-to-arabic",
    });

    res.json({
      inputValue: inputValue,
      convertedValue: arabicResult,
    });
  } catch (err) {
    if (err.name === "IncorrectDataError") {
      next(err);
    } else {
      next(err);
    }
  }
};

const getAllConversions = async (req, res, next) => {
  try {
    const conversions = await Conversion.find({}).sort({ createdAt: -1 });
    res.json(conversions);
  } catch (err) {
    next(err);
  }
};

const removeAllConversions = async (req, res, next) => {
  try {
    const result = await Conversion.deleteMany({});
    res.json({
      message: messages.successfulDeletion,
      deletedCount: result.deletedCount,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  convertRomanToArabic,
  convertArabicToRoman,
  getAllConversions,
  removeAllConversions,
};
