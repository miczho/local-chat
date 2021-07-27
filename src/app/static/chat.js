// async function add_messages(msg, scroll) {
//   if (typeof msg.name !== "undefined") {
//     var date = dateNow();

//     if (typeof msg.time !== "undefined") {
//       var n = msg.time;
//     } else {
//       var n = date;
//     }
//     var global_name = await loadName();

//     let content =
//       '<div class="container">' +
//       '<b style="color:#000" class="right">' +
//       msg.name +
//       "</b><p>" +
//       msg.message +
//       '</p><span class="time-right">' +
//       n +
//       "</span></div>";
//     if (global_name == msg.name) {
//       content =
//         '<div class="container darker">' +
//         '<b style="color:#000" class="left">' +
//         msg.name +
//         "</b><p>" +
//         msg.message +
//         '</p><span class="time-left">' +
//         n +
//         "</span></div>";
//     }
//     // update div
//     var messageDiv = document.getElementById("messages");
//     messageDiv.innerHTML += content;
//   }

//   if (scroll) {
//     scrollSmoothToBottom("messages");
//   }
// }

$(document).ready(() => {
  $(window).resize(() => {
    const bodyheight = window.innerHeight - 222;
    $("#messages").height(bodyheight);
  }).resize();
});

async function loadName() {
  return fetch("/get_name")
    .then(async (response) => response.json())
    .then((text) => text.name);
}

const socket = new WebSocket(`ws://${window.location.hostname}:${window.location.port}`);
socket.addEventListener("open", () => {
  console.log("Connected to WS server");

  $("#msgForm").on("submit", async (e) => {
    e.preventDefault();

    const userName = await loadName();
    const msgInput = document.getElementById("msg");
    const userInput = msgInput.value;

    msgInput.value = "";

    socket.send(JSON.stringify({ name: userName, message: userInput }));
  });
});

socket.addEventListener("message", (event) => {
  const data = JSON.parse(event.data);
  console.log(data);
});
