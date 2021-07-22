const express = require("express");
const session = require("express-session");
const path = require("path");
const db = require("./db.js");

const app = express();

// todo: seperate routes into a routes folder

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "static")));
app.use(express.urlencoded({ extended: false }));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: "super sequet"
}));

const auth = (req, res, next) => {
  if (req.session && req.session.user) return next();
  return res.redirect("/login");
};

app.get("/", auth, async (req, res) => {
  await db.connect();
  res.render("home", {
    title: "Local Chat",
    messages: []
  });
});

app.post("/", (req, res) => {
  
});

app.get("/login", (req, res) => {
  if (req.session.user) {
    res.redirect("/");
  } else {
    res.render("login", {
      title: "Local Chat - Login"
    });
  }
});

app.post("/login", (req, res) => {
  if (req.body.username) {
    req.session.user = req.body.username;
    res.redirect("/");
  } else {
    res.send("Please enter a name.");
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

module.exports = app;
