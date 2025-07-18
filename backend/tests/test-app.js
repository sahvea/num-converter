require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const { errors } = require("celebrate");
const cors = require("cors");

const {
  CORS_METHODS,
  CORS_HEADERS,
  ALLOWED_CORS,
  messages,
} = require("../utils/constants");
const { requestLogger, errorLogger } = require("../middlewares/logger");
const router = require("../routes/index");
const errorHandler = require("../middlewares/error-handler");
const limiter = require("../middlewares/limiter");

const app = express();

app.use(requestLogger);
app.use(limiter);
app.use(helmet());

app.use(
  cors({
    origin(origin, callback) {
      if (ALLOWED_CORS.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error(messages.corsErr));
      }
    },
    methods: CORS_METHODS,
    allowedHeaders: CORS_HEADERS,
    credentials: true,
  })
);
app.options("*", cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

module.exports = app;
