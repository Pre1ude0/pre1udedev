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
    var elems = document.querySelectorAll('.parallax');
    var instances = M.Parallax.init(elems);

    if (window.innerWidth <= 768) {
        // Change the CSS to fit a mobile device
        document.body.classList.add('mobile-view');
    }
});