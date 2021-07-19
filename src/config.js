const path = require("path");

require("dotenv").config({ path: path.join(__dirname, ".env") });

const config = module.exports;

config.express = {
  port: process.env.EXPRESS_PORT || 8080,
  host: process.env.EXPRESS_HOST || "127.0.0.1"
};
