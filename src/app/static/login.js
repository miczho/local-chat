$(document).ready(() => {
  $(window).resize(() => {
    const bodyheight = window.innerHeight - 116;
    $("div.login-page").height(bodyheight);
  }).resize();
});
