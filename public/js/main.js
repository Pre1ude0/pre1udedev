
function initParticles() {

    if (window.innerWidth < 700) {
        Particles.init({
            selector: '.background',
            maxParticles: 150,
            sizeVariations: 2,
            speed: 0.5,
            color: ['#f54542', '#f57e42', '#f5c842'],
            connectParticles: true,
            minDistance: 50
        });
    } else if (window.innerWidth < 1000) {
        Particles.init({
            selector: '.background',
            maxParticles: 80,
            sizeVariations: 3,
            speed: 0.5,
            color: ['#f54542', '#f57e42', '#f5c842'],
            connectParticles: true,
            minDistance: 100
        });
    } else {
        Particles.init({
            selector: '.background',
            maxParticles: 100,
            sizeVariations: 3,
            speed: 0.5,
            color: ['#f54542', '#f57e42', '#f5c842'],
            connectParticles: true,
            minDistance: 100
        });
    }
}

window.onload = () => initParticles();

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.parallax');
    var instances = M.Parallax.init(elems);
});