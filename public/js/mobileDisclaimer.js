let disclaimer = document.getElementsByClassName('mobile-disclaimer')[0]

function checkMobile() {
    if (window.innerWidth < 950) {
        disclaimer.style.zIndex = '5000';
        disclaimer.style.opacity = '1';
    } else {
        disclaimer.style.opacity = '0';
        disclaimer.style.zIndex = '-1';
    }
}

window.checkMobile = checkMobile;