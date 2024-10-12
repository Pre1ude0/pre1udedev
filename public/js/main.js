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
}

function liftWindow(windowElement) {
    if (windowElement.style.zIndex != 100) {

        let otherWindows = document.getElementsByClassName('window')
        for (let j = 0; j < otherWindows.length; j++) {
            if (otherWindows[j] != windowElement) {
                otherWindows[j].style.zIndex = (parseInt(otherWindows[j].style.zIndex) - 1).toString();
                otherWindows[j].classList.remove('active');
            }
        }
        windowElement.classList.add('active');
        windowElement.style.zIndex = 100;
    }
}

function initIcons() {
    const icons = document.querySelectorAll('.icon');

    let offsetTop = 30;
    let offsetLeft = 30;

    for (let i = 0; i < icons.length; i++) {
        let isDragging = false;
        let offsetX, offsetY;

        icons[i].style.top = `${offsetTop}px`;
        icons[i].style.left = `${offsetLeft}px`;

        offsetLeft += 70;

        if (offsetTop > window.innerHeight - 100) {
            offsetTop += 85;
            offsetLeft = 0;
        }

        icons[i].addEventListener('mousedown', (e) => {
            isDragging = true;
            offsetX = e.clientX - icons[i].offsetLeft;
            offsetY = e.clientY - icons[i].offsetTop;
            let otherIcons = document.getElementsByClassName('icon')
            for (let j = 0; j < otherIcons.length; j++) {
                otherIcons[j].classList.remove('clicked');
            }
            icons[i].classList.add('clicked');
        });

        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                icons[i].style.left = `${e.clientX - offsetX}px`;
                icons[i].style.top = `${e.clientY - offsetY}px`;
            }
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });

        icons[i].addEventListener('dblclick', () => {
            let targetWindow = icons[i].getAttribute('data-target');
            let windowElement = document.querySelector(`.${targetWindow}`);
            if (windowElement.style.display != 'block') {
                liftWindow(windowElement);
                windowElement.style.top = `${Math.random() * (window.innerHeight)/3 + 50}px`;
                windowElement.style.left = `${Math.random() * (window.innerWidth)/3 + 50}px`;
                console.log(windowElement.style.top, windowElement.style.left);
                windowElement.style.display = 'block';
                windowElement.style.animation = 'fadeIn 0.3s';
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initWindows();
    initIcons();
    initializeConsole();

    document.addEventListener('mousedown', (e) => {
        if (!e.target.classList.contains('icon') && !e.target.classList.contains('title-bar')) {
            const icons = document.querySelectorAll('.icon');
            for (let i = 0; i < icons.length; i++) {
                icons[i].classList.remove('clicked');
            }
        }
    });

    let windows = document.getElementsByClassName('window')
    for (let i = 0; i < windows.length; i++) {
        windows[i].addEventListener('mousedown', (e) => {
            liftWindow(windows[i]);
        });
    }

});

