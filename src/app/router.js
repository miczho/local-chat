const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");
const db = require("./db.js");

module.exports = (app) => {
  // app middleware
  app.use(express.static(path.join(__dirname, "static")));
  app.use(express.urlencoded({ extended: false }));
  app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: "super sequet"
  }));
  app.use(flash());

  const auth = (req, res, next) => {
    if (req.session && req.session.user) return next();
    return res.redirect("/login");
  };

  app.get("/", auth, (req, res) => {
    res.render("home", {
      title: "Local Chat",
      hideNavOptions: false,
      user: req.session.user
    });
  });

  app.post("/");

  app.get("/history", auth, (req, res) => {
    res.render("history", {
      title: "Local Chat",
      hideNavOptions: false
    });
  });

  app.get("/login", (req, res) => {
    if (req.session.user) {
      res.redirect("/");
    } else {
      res.render("login", {
        title: "Local Chat - Login",
        hideNavOptions: true,
        notification: undefined
      });
    }
  });

  app.post("/login", (req, res) => {
    req.flash("error", "Please enter a name.");
    if (req.body.username) {
      req.session.user = req.body.username;
      res.redirect("/");
    } else {
      res.render("login", {
        title: "Local Chat - Login",
        hideNavOptions: true,
        notification: req.flash("error")
      });
    }
  });

  app.get("/logout", (req, res) => {
    req.session.destroy(() => {
      res.redirect("/login");
    });
  });

  app.get("/get_name", auth, (req, res) => {
    res.send({ name: req.session.user });
  });

  app.get("/get_all_messages", auth, async (req, res) => {
    await db.connect();
    const msgs = await db.getAllMsgs(100);
    res.send(msgs);
  });

  app.get("/get_history", auth, async (req, res) => {
    await db.connect();
    const msgs = await db.getHistory(req.session.user, 100);
    res.send(msgs);
  });
};
