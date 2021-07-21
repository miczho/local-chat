const http = require("http");
const WebSocketServer = require("ws").Server;
const app = require("./app/app.js");
const config = require("./config");

const server = http.createServer(app).listen(config.webapp.port, config.webapp.host, () => {
  console.log(`Webapp listening at http://${config.webapp.host}:${config.webapp.port}`);
});
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  // ...
  console.log("a connection.");
});
