const socket = new WebSocket(`ws://${window.location.hostname}:${window.location.port}`);

socket.addEventListener("open", () => {
  console.log("Connected to WS server");

  $("form#msgForm").on("submit", async () => {
    socket.send("testing");
  });
});

socket.addEventListener("message", (event) => {
  console.log(event.data);
});
