async function loadName() { // eslint-disable-line no-unused-vars
  return fetch("/get_name")
    .then(async (response) => response.json())
    .then((text) => text.name);
}

async function loadAllMsgs() { // eslint-disable-line no-unused-vars
  return fetch("/get_all_messages")
    .then(async (response) => response.json())
    .then((text) => text);
}

async function loadHistory() { // eslint-disable-line no-unused-vars
  return fetch("/get_history")
    .then(async (response) => response.json())
    .then((text) => text);
}

function scrollSmoothToBottom(id) {
  const div = document.getElementById(id);
  $(`#${id}`).animate({ scrollTop: div.scrollHeight - div.clientHeight }, 500);
}

async function addMsg(msg, scroll) { // eslint-disable-line no-unused-vars
  const currUser = await loadName();

  let content = `<div class="container-fluid chat-box">
                  <div class="row chat-content" style="font-weight: bold;">${msg.user}</div>
                  <div class="row chat-content" style="padding-bottom: 10px;">${msg.message}</div>
                  <div class="row chat-content" style="color: #aaa; font-size: 13px;">${msg.timestamp}</div>
                </div>`;
  if (currUser === msg.user) {
    content = `<div class="container-fluid chat-box darker">
                <div class="row chat-content" style="font-weight: bold;">${msg.user}</div>
                <div class="row chat-content" style="padding-bottom: 10px;">${msg.message}</div>
                <div class="row chat-content" style="color: #aaa; font-size: 13px;">${msg.timestamp}</div>
              </div>`;
  }
  const messageDiv = document.getElementById("messages");
  messageDiv.innerHTML += content;

  if (scroll) scrollSmoothToBottom("messages");
}
