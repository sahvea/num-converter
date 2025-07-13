const router = require("express").Router();
const {
  convertRomanToArabic,
  convertArabicToRoman,
  getAllConversions,
  removeAllConversions,
} = require("../controllers/conversion");

router.get("/roman/:inputValue", convertArabicToRoman);
router.get("/arabic/:inputValue", convertRomanToArabic);
router.get("/all", getAllConversions);
router.delete("/remove", removeAllConversions);

module.exports = router;
