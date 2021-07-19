const express = require("express");
const session = require("express-session");
const path = require("path");
const config = require("../config");

const app = express();

// todo: seperate routes into a routes folder

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: false }));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: "seqwet"
}));

const auth = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  }
  return res.redirect("/login");
};

app.get("/", auth, (req, res) => {
  res.render("home", {
    title: "Local Chat"
  });
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

app.listen(config.express.port, config.express.host, () => {
  console.log(`Webapp listening at http://${config.express.host}:${config.express.port}`);
});

module.exports = app;
