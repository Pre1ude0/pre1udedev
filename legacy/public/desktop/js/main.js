document.addEventListener('DOMContentLoaded', () => {
  initWindows();
  initIcons();

  checkMobile();
  window.addEventListener('resize', checkMobile);

  initializeConsole();

  function keydown(event) {
    if (event.code === "NumpadDivide"
      || event.code === "Slash"
      || event.code === "Quote") {
      event.preventDefault();
    }
  }
  window.addEventListener("keydown", keydown, { capture: true });

  setTimeout(() => {
    openWindow('about');
  }, 700);
});
