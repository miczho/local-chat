const express = require("express");
const session = require("express-session");
const path = require("path");
const config = require("../config");

const app = express();

// todo: seperate routes into a routes folder

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: false }))
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: "seqwet"
}));

app.get("/", (req, res) => {
  res.render("home", {
    title: "Local Chat"
  });
});

app.get("/login", (req, res) => {
  res.render("login", {
    title: "Local Chat - Login"
  })
});

app.listen(config.express.port, config.express.host, () => {
  console.log(`Webapp listening at http://${config.express.host}:${config.express.port}`);
});

module.exports = app;
