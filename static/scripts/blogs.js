
document.addEventListener('DOMContentLoaded', function () {
    if (window.innerWidth <= 768) {
        // Change the CSS to fit a mobile device
        document.body.classList.add('mobile-view');
    }

});

function redirect(url) {
    window.location.href = url;
}