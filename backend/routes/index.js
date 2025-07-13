const router = require("express").Router();
const conversionRoutes = require("./conversion");
const NotFoundError = require("../errors/not-found-err");
const { messages } = require("../utils/constants");

router.use("/", conversionRoutes);

router.all("*", () => {
  throw new NotFoundError(messages.notFoundError);
});

module.exports = router;
