const slides = document.querySelectorAll('.slide');
const startButton = document.getElementById('start-button');
const balloonsContainer = document.getElementById('balloons');
const fireworksCanvas = document.getElementById('fireworks');
const audio = document.getElementById('bgMusic');

let currentSlide = 0;
let balloons = [];
const fireworksCtx = fireworksCanvas.getContext('2d');

startButton.addEventListener('click', () => {
    startButton.style.display = 'none';
    audio.play();
    showSlide();
});

// Start slides and animations
function startSlides() {
    audio.play();
    showSlide();
    generateBalloons();
    launchFireworks();
}

function showSlide() {
    if (currentSlide > 0) {
        slides[currentSlide - 1].classList.remove('active');
    }

    if (currentSlide < slides.length) {
        slides[currentSlide].classList.add('active');
        currentSlide++;
        setTimeout(showSlide, 4000); // Switch slides every 4 seconds
    } else {
        currentSlide = 0; // Reset for replay
    }
}

// Replay slides functionality
function replaySlides() {
    slides.forEach(slide => slide.classList.remove('active'));
    currentSlide = 0;
    startSlides();
}

// Generate random balloons
function generateBalloons() {
    for (let i = 0; i < 20; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.style.left = `${Math.random() * 100}%`;
        balloon.style.animationDuration = `${4 + Math.random() * 6}s`;
        balloonsContainer.appendChild(balloon);

        // Remove balloon after animation ends
        balloon.addEventListener('animationend', () => balloon.remove());
    }

    // Continue adding balloons periodically
    setInterval(() => {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.style.left = `${Math.random() * 100}%`;
        balloon.style.animationDuration = `${4 + Math.random() * 6}s`;
        balloonsContainer.appendChild(balloon);

        // Remove balloon after animation ends
        balloon.addEventListener('animationend', () => balloon.remove());
    }, 1000);
}

// Fireworks animation
function launchFireworks() {
    fireworksCanvas.width = window.innerWidth;
    fireworksCanvas.height = window.innerHeight;
    animateFireworks();
}

function animateFireworks() {
    fireworksCtx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);

    // Simulate fireworks explosions
    for (let i = 0; i < 5; i++) {
        const x = Math.random() * fireworksCanvas.width;
        const y = Math.random() * fireworksCanvas.height / 2;
        const colors = ['#ff6f61', '#ff9a9e', '#fad0c4', '#ffe29e'];
        for (let j = 0; j < 30; j++) {
            const angle = (Math.PI * 2 / 30) * j;
            const radius = Math.random() * 80;
            const fx = x + Math.cos(angle) * radius;
            const fy = y + Math.sin(angle) * radius;

            fireworksCtx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
            fireworksCtx.beginPath();
            fireworksCtx.arc(fx, fy, 2, 0, Math.PI * 2);
            fireworksCtx.fill();
        }
    }

    requestAnimationFrame(animateFireworks);
}

// Start the show
startSlides();
