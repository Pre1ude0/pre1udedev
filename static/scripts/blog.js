var dropdown_options = {
  coverTrigger: false,
  constrainWidth: false,
  alignment: 'right',
  closeOnClick: true,
  hover: false,
  inDuration: 100,
  outDuration: 130,
  click: true,
};

document.addEventListener('DOMContentLoaded', function () {
    if (window.innerWidth <= 768) {
        // Change the CSS to fit a mobile device
        document.body.classList.add('mobile-view');
    }

    const urlParams = new URLSearchParams(window.location.search);

    const passedInfo = urlParams.get('');

    // Display the passed info in the h1 element
    const passedInfoElement = document.getElementById('blog-title');
    passedInfoElement.textContent = passedInfo;
});