document.addEventListener('DOMContentLoaded', function () {
    var blogs = document.getElementById('blog-button');
    var home = document.getElementById('home-button');
    var projects = document.getElementById('project-button');
    
    blogs.addEventListener('click', function () {
        window.location.href = '/blogs';
    });

    home.addEventListener('click', function () {
        window.location.href = '/';
    });

    projects.addEventListener('click', function () {
        window.location.href = '/projects';
    });

    // Check current page URL and toggle class for body
    var currentPage = window.location.pathname;
    var body = document.querySelector('body');
    
    if (currentPage === '/blogs') {
        body.classList.add('blog-active');
    } else if (currentPage === '/') {
        body.classList.add('home-active');
    } else if (currentPage === '/projects') {
        body.classList.add('project-active');
    }
});