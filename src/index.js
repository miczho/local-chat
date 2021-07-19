const WebSocketServer = require("ws").Server;
const app = require("./app/app.js");

const wss = new WebSocketServer({ server: app });

wss.on("connection", (ws) => {
  // ...
  console.log("a connection.");
});
