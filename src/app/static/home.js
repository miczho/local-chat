window.onload = async () => {
  const msgs = await loadAllMsgs();
  for (let i = 0; i < msgs.length; i += 1) {
    const scroll = i === msgs.length - 1;
    await addMsg(msgs[i], scroll);
  }
};

$(document).ready(() => {
  $(window).resize(() => {
    const bodyheight = window.innerHeight - 222;
    $("#messages").height(bodyheight);
  }).resize();
});

const socket = new WebSocket(`wss://${window.location.hostname}:${window.location.port}`);
socket.addEventListener("open", () => {
  console.log("Connected to WS server");

  $("#msgForm").on("submit", async (e) => {
    e.preventDefault();

    const msgInput = document.getElementById("msg");
    const userInput = msgInput.value;
    if (userInput !== "") {
      const userName = await loadName();

      msgInput.value = "";

      socket.send(JSON.stringify({ name: userName, message: userInput }));
    }
  });
});

socket.addEventListener("message", (event) => {
  const data = JSON.parse(event.data);
  addMsg(data, true);
});
