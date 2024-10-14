function insertTopBar() {
    const topBar = document.getElementById("top-bar-div");
    fetch("../elems/top-bar.html")
    .then((response) => response.text())
    .then((data) => {
        topBar.innerHTML = data;
        initButtons();
        initCurHighlight();
        insertCurLink();
    }
  );
}

function initButtons() {
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
}

function initCurHighlight() {
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
}

function insertCurLink() {
    var currentPage = document.getElementsByClassName('current-page')[0];
    var currentLink = window.location.pathname;
    currentPage.innerHTML = currentLink;
}

document.addEventListener('DOMContentLoaded', function () {
    insertTopBar();
});