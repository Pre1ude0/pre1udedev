window.onload = function() {
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
    } else {
        Particles.init({
            selector: '.background',
            maxParticles: 80,
            sizeVariations: 3,
            speed: 0.5,
            color: ['#f54542', '#f57e42', '#f5c842'],
            connectParticles: true,
            minDistance: 100
        });
    }
};

