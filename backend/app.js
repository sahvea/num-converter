require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const { errors } = require("celebrate");
const cors = require("cors");

const {
  MONGO_URL,
  PORT,
  CORS_METHODS,
  CORS_HEADERS,
  ALLOWED_CORS,
  messages,
} = require("./utils/constants");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const router = require("./routes/index");
const errorHandler = require("./middlewares/error-handler");
const limiter = require("./middlewares/limiter");

const app = express();

app.set("trust proxy", 1);

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(requestLogger);
app.use(limiter);
app.use(helmet());

app.use(
  cors({
    origin(origin, callback) {
      if (
        !origin ||
        ALLOWED_CORS.includes(origin) ||
        origin.startsWith("http://localhost") ||
        origin.startsWith("http://frontend") ||
        origin.startsWith("http://nginx")
      ) {
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

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

module.exports = app;
