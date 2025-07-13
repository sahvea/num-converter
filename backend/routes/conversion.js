const router = require("express").Router();
const {
  convertRomanToArabic,
  convertArabicToRoman,
  getAllConversions,
  removeAllConversions,
} = require("../controllers/conversion");

router.get("/roman/:inputValue", convertRomanToArabic);
router.get("/arabic/:inputValue", convertArabicToRoman);
router.get("/all", getAllConversions);
router.delete("/remove", removeAllConversions);

module.exports = router;
