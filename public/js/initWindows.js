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
            windowElements[i].style.top = `${Math.max(10, parseInt(windowElements[i].style.top))}px`;
            windowElements[i].style.top = `${Math.min(window.innerHeight - windowElements[i].getBoundingClientRect().height - 10, parseInt(windowElements[i].style.top))}px`;
            windowElements[i].style.left = `${Math.max(10, parseInt(windowElements[i].style.left))}px`;
            windowElements[i].style.left = `${Math.min(window.innerWidth - windowElements[i].getBoundingClientRect().width - 10, parseInt(windowElements[i].style.left))}px`;
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

        addEventListener('resize', () => {
            windows[i].style.top = `${Math.min(window.innerHeight - windows[i].getBoundingClientRect().height - 10, parseInt(windows[i].style.top))}px`;
            windows[i].style.left = `${Math.min(window.innerWidth - windows[i].getBoundingClientRect().width - 10, parseInt(windows[i].style.left))}px`;
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