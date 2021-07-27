const path = require("path");

require("dotenv").config({ path: path.join(__dirname, ".env") });

const config = module.exports;

config.webapp = {
  port: process.env.WEBAPP_PORT || 8080,
  host: process.env.WEBAPP_HOST || "0.0.0.0"
};

config.mongo = {
  port: process.env.MONGO_PORT || 27017,
  host: process.env.EXPRESS_HOST || "127.0.0.1"
};
