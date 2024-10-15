document.addEventListener('DOMContentLoaded', () => {
    initWindows();
    initIcons();
    initializeConsole();
    checkMobile();
    window.addEventListener('resize', checkMobile);
});