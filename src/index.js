// setting environment variables
require("dotenv").config({ path: __dirname + "/.env" });

const WebSocketServer = require("ws").Server;
const app = require("./app/app.js");

var wss = new WebSocketServer({server: app});

wss.on("connection", (ws) => {
  // ...
  console.log("a connection.");
});
