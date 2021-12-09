const path = require("path");

// set custom environment variables with .env file
require("dotenv").config({ path: path.join(__dirname, ".env") });

const config = module.exports;

// default values are set if the variables are not defined in .env
config.webapp = {
  port: process.env.PORT || 8080,
  host: process.env.HOST || "0.0.0.0"
};

config.mongo = {
  port: process.env.MONGO_PORT || 27017,
  host: process.env.EXPRESS_HOST || "127.0.0.1"
};
