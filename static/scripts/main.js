
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.parallax');
    var instances = M.Parallax.init(elems);

    if (window.innerWidth <= 768) {
        // Change the CSS to fit a mobile device
        document.body.classList.add('mobile-view');
    }
});