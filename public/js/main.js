const indicator = document.getElementById("indicator");

function changeScreen(screenId) {
  for (i = 0; i < document.getElementsByClassName("screen").length; i++) {
    if (document.getElementsByClassName("screen")[i].id !== screenId) {
      document.getElementsByClassName("screen")[i].style.opacity = "0";
    }
    document.getElementById(screenId).style.opacity = "1";
  }
}

window.addEventListener("hashchange", function () {
  if (window.location.hash === "#connections") {
    indicator.style.bottom = "65px";
    changeScreen("screen2");
  } else if (window.location.hash === "#projects") {
    indicator.style.bottom = "15px";
    changeScreen("screen3");
  } else if (window.location.hash === "#home") {
    indicator.style.bottom = "115px";
    changeScreen("screen1");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  if (window.location.hash === "#connections") {
    indicator.style.bottom = "65px";
    changeScreen("screen2");
  } else if (window.location.hash === "#projects") {
    indicator.style.bottom = "15px";
    changeScreen("screen3");
  } else if (window.location.hash === "#home") {
    return;
  }
});
