require("dotenv").config();

const { PORT = 3000, MONGO_URL = "mongodb://localhost:27017/num-converter" } =
  process.env;

const ALLOWED_CORS = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:8080",
];

const CORS_METHODS = ["GET", "POST", "PUT", "DELETE", "PATCH"];
const CORS_HEADERS = ["Content-Type", "Authorization"];

const messages = {
  internalServerError: "An error occurred on the server.",
  incorrectRomanNumeral: "Invalid Roman numeral format.",
  incorrectArabicNumber: "Invalid Arabic number format.",
  notFoundError: "The requested resource was not found.",
  corsErr: "Not allowed by CORS",
  successfulDeletion: "All records deleted successfully.",
};

const codeStatuses = {
  badRequestErr: 400,
  notFoundErr: 404,
  internalServerErr: 500,
};

module.exports = {
  PORT,
  MONGO_URL,
  ALLOWED_CORS,
  CORS_METHODS,
  CORS_HEADERS,
  messages,
  codeStatuses,
};
