document.addEventListener('DOMContentLoaded', () => {
    initWindows();
    initIcons();

    checkMobile();
    window.addEventListener('resize', checkMobile);

    initializeConsole();
});