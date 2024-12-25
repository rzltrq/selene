const slides = document.querySelectorAll('.slide');
const balloonsContainer = document.getElementById('balloons');
const fireworksCanvas = document.getElementById('fireworks');
const audio = document.getElementById('bgMusic');

let currentSlide = 0;
let balloons = [];
const fireworksCtx = fireworksCanvas.getContext('2d');


function startSlides() {
    showSlide();
    audio.play();
    generateBalloons();
    launchFireworks();
};

}

// Show slides in sequence
function showSlide() {
    if (currentSlide > 0) {
        slides[currentSlide - 1].classList.remove('active');
    }

    if (currentSlide < slides.length) {
        slides[currentSlide].classList.add('active');
        currentSlide++;
        setTimeout(showSlide, 4000); // Switch slides every 4 seconds
    } else {
        slides[currentSlide - 1].classList.add('active'); // Keep last slide active
    }
}

// Replay slides functionality
function replaySlides() {
    slides.forEach(slide => slide.classList.remove('active'));
    currentSlide = 0;
    startSlides();
}

// Balloons generation
function generateBalloons() {
    const balloonColors = ['#ff6f61', '#ffa500', '#87ceeb', '#ff69b4', '#6a5acd', '#32cd32'];

    function createBalloon() {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';

        balloon.style.left = `${Math.random() * 90}%`;
        balloon.style.background = `radial-gradient(circle, ${balloonColors[Math.floor(Math.random() * balloonColors.length)]} 40%, rgba(255, 255, 255, 0.8) 100%)`;
        balloon.style.animationDuration = `${8 + Math.random() * 4}s`;

        balloonsContainer.appendChild(balloon);

        balloon.addEventListener('animationend', () => {
            balloon.remove();
        });
    }

    // Spawn first batch of balloons
    for (let i = 0; i < 10; i++) {
        createBalloon();
    }

    setInterval(createBalloon, 1000); // Continuously spawn balloons
}

// Start generating balloons
generateBalloons();

// Fireworks simulation
function launchFireworks() {
    fireworksCanvas.width = window.innerWidth;
    fireworksCanvas.height = window.innerHeight;
    animateFireworks();
}

function animateFireworks() {
    fireworksCtx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);

    // Simulate fireworks with 3D effects
    for (let i = 0; i < 5; i++) {
        const x = Math.random() * fireworksCanvas.width;
        const y = Math.random() * fireworksCanvas.height / 2;
        const colors = ['#ff6f61', '#ffa500', '#87ceeb', '#ff69b4', '#6a5acd', '#32cd32'];
        for (let j = 0; j < 50; j++) {
            const angle = (Math.PI * 2 / 50) * j;
            const radius = Math.random() * 150;
            const fx = x + Math.cos(angle) * radius;
            const fy = y + Math.sin(angle) * radius;
            const depthEffect = Math.random(); // Simulate 3D depth

            fireworksCtx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
            fireworksCtx.globalAlpha = depthEffect;
            fireworksCtx.beginPath();
            fireworksCtx.arc(fx, fy, 2 + depthEffect * 2, 0, Math.PI * 2);
            fireworksCtx.fill();
        }
    }

    requestAnimationFrame(animateFireworks); // Loop fireworks animation
}
