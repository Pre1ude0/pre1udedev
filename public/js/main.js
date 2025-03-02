const indicator = document.getElementById("indicator");

const copyPopup = document.getElementById("copyPopup");

function changeScreen(screenId) {
    for (i = 0; i < document.getElementsByClassName("screen").length; i++) {
        if (document.getElementsByClassName("screen")[i].id !== screenId) {
            document.getElementsByClassName("screen")[i].style.opacity = "0";
            document.getElementsByClassName("screen")[i].style.visibility = "hidden";
            document.getElementsByClassName("screen")[i].style.zIndex = "0";
        }
        document.getElementById(screenId).style.opacity = "1";
        document.getElementById(screenId).style.visibility = "visible";
        document.getElementById(screenId).style.zIndex = "5";
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
        document
            .getElementsByClassName("tab-selector")[0]
            .classList.add("not-home");
        indicator.style.bottom = "65px";
        changeScreen("screen2");
    } else if (window.location.hash === "#projects") {
        document
            .getElementsByClassName("tab-selector")[0]
            .classList.add("not-home");

        indicator.style.bottom = "15px";
        changeScreen("screen3");
    } else if (window.location.hash === "#home") {
        document.getElementById("indicator").style.bottom = "115px";
        changeScreen("screen1");
    }

    let banners = document.getElementsByClassName("banners")[0].children;
});

function copyItem(item) {
    navigator.clipboard.writeText(item);
    elementY = event.target.getBoundingClientRect().top;
    elementX = event.target.getBoundingClientRect().left;
    targetWidth = event.target.offsetWidth;
    let leftOffset = elementX + targetWidth / 2;
    leftOffset = leftOffset - copyPopup.offsetWidth / 2;
    copyPopup.style.top = `calc(${elementY}px - 40px)`;
    copyPopup.style.left = `${leftOffset}px`;
    copyPopup.classList.add("visible");
    setTimeout(() => {
        copyPopup.classList.remove("visible");
    }, 100);
}

function copyIframe() {
    querySelector = document.querySelector("code");
    navigator.clipboard.writeText(querySelector.innerText);
    window.getSelection().selectAllChildren(querySelector);
}

window.copyIframe = copyIframe;
window.copyItem = copyItem;
