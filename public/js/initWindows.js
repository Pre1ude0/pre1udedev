function initWindows() {
    const titleBars = document.getElementsByClassName('title-bar');
    const windowElements = document.getElementsByClassName('window');
    const closeButtons = document.getElementsByClassName('close');
    console.log(titleBars);

    for (let i = 0; i < titleBars.length; i++) {
        let isDragging = false;
        let offsetX, offsetY;

        titleBars[i].addEventListener('mousedown', (e) => {
            isDragging = true;
            offsetX = e.clientX - windowElements[i].offsetLeft;
            offsetY = e.clientY - windowElements[i].offsetTop;
        });

        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                windowElements[i].style.left = `${e.clientX - offsetX}px`;
                windowElements[i].style.top = `${e.clientY - offsetY}px`;
            }
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });

        closeButtons[i].addEventListener('click', () => {
            windowElements[i].style.animation = 'fadeOut 0.2s';
            setTimeout(() => {
                windowElements[i].style.display = 'none';
            }, 200);
        });
    }

    let windows = document.getElementsByClassName('window')
    for (let i = 0; i < windows.length; i++) {
        windows[i].addEventListener('mousedown', (e) => {
            liftWindow(windows[i]);
        });
    }
}

function liftWindow(windowElement) {
    if (windowElement.style.zIndex != 1000) {

        let otherWindows = document.getElementsByClassName('window')
        for (let j = 0; j < otherWindows.length; j++) {
            if (otherWindows[j] != windowElement) {

                otherWindows[j].style.zIndex = (parseInt(otherWindows[j].style.zIndex) - 1).toString();
                otherWindows[j].classList.remove('active');
            }
        }
        windowElement.classList.add('active');
        windowElement.style.zIndex = "1000"
    }
}



window.initWindows = initWindows;
window.liftWindow = liftWindow;