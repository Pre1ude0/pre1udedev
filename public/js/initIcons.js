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
        if (parseInt(otherIcons[j].style.zIndex) > 25) {
          otherIcons[j].style.zIndex = (parseInt(otherIcons[j].style.zIndex) - 1).toString();
        }
      }
      icons[i].classList.add('clicked');
      icons[i].style.zIndex = "100";
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
      openWindow(targetWindow)
    });
  }

  document.addEventListener('mousedown', (e) => {
    if (!e.target.classList.contains('icon') && !e.target.classList.contains('title-bar')) {
      const icons = document.querySelectorAll('.icon');
      for (let i = 0; i < icons.length; i++) {
        icons[i].classList.remove('clicked');
      }
    }
  });
}

window.initIcons = initIcons;
