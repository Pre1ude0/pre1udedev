const indicator = document.getElementById("indicator");
const unknownPage = document.getElementById("unknownPage");
const copyPopup = document.getElementById("copyPopup");

function changeScreen() {
    screenId = window.location.hash.substring(1);
    unknownPage.classList.add("hidden");
    indicator.classList.remove("hidden");
    switch (window.location.hash) {
        case "#connections":
            indicator.style.bottom = "65px";
            break;
        case "#projects":
            indicator.style.bottom = "15px";
            break;
        case "#home":
            indicator.style.bottom = "115px";
            break;
        case "#hireme":
            indicator.style.bottom = "calc(100% - 100px)";
            indicator.classList.add("hidden");
            break;
        default:
            indicator.style.opacity = "0";
            unknownPage.classList.remove("hidden");
            break;
    }
    for (i = 0; i < document.getElementsByClassName("screen").length; i++) {
        if (document.getElementsByClassName("screen")[i].id !== screenId) {
            document.getElementsByClassName("screen")[i].style.opacity = "0";
            document.getElementsByClassName("screen")[i].style.visibility = "hidden";
            document.getElementsByClassName("screen")[i].style.zIndex = "0";
        } else {
            document.getElementById(screenId).style.opacity = "1";
            document.getElementById(screenId).style.visibility = "visible";
            document.getElementById(screenId).style.zIndex = "5";
        }
    }
}

window.addEventListener("hashchange", changeScreen);
window.addEventListener("load", function () {
    if (window.location.hash === "" || window.location.hash === "#" || window.location.hash === "#home") {
        window.location.hash = "#home";
    } else {
        document.getElementsByClassName("tab-selector")[0].classList.add("not-home");
    }
    changeScreen();
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

// function showGlowingLights() {
//     const lights = document.getElementsByClassName("glowing-light");
//     for (let i = 0; i < lights.length; i++) {
//         lights[i].classList.add("glow");
//     }
// }

function handleFirstTab(e) {
    if (e.keyCode === 9) { // tab key
        document.body.classList.add('user-is-tabbing');
        window.removeEventListener('keydown', handleFirstTab);
    }
}
window.addEventListener('keydown', handleFirstTab);