window.onload = async () => {
  const msgs = await loadHistory();
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
