const express = require("express");
const path = require("path");

const app = express();

// app config
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

require("./router.js")(app);

module.exports = app;
