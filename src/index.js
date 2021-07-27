const http = require("http");
const WebSocket = require("ws");
const app = require("./app/app.js");
const db = require("./app/db.js");
const config = require("./config");

const server = http.createServer(app).listen(config.webapp.port, config.webapp.host, () => {
  console.log(`Webapp listening at http://${config.webapp.host}:${config.webapp.port}`);
});
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("New WS connection detected");

  ws.on("message", async (data) => {
    const parsedData = JSON.parse(data);
    await db.connect();
    const savedData = await db.insertMsg(parsedData.name, parsedData.message);
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) client.send(JSON.stringify(savedData));
    });
  });
});
