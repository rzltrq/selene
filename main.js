const slides = document.querySelectorAll('.slide');
const startButton = document.getElementById('start-button');
const balloonsContainer = document.getElementById('balloons');
const fireworksCanvas = document.getElementById('fireworks');
const audio = document.getElementById('bgMusic');

let currentSlide = 0;
let balloons = [];
const fireworksCtx = fireworksCanvas.getContext('2d');

startButton.addEventListener('click', () => {
    startButton.style.display = 'start-button';
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
        // Do nothing; keep the last slide active
        slides[currentSlide - 1].classList.add('active'); // Ensure the last slide remains visible
    }
}


// Replay slides functionality
function replaySlides() {
    slides.forEach(slide => slide.classList.remove('active'));
    currentSlide = 0;
    startSlides();
}

function generateBalloons() {
    const balloonColors = ['#ff6f61', '#ffa500', '#87ceeb', '#ff69b4', '#6a5acd', '#32cd32'];

    for (let i = 0; i < 20; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.style.left = `${Math.random() * 100}%`;
        balloon.style.animationDuration = `${8 + Math.random() * 4}s`; // Randomize float duration
        balloon.style.background = `radial-gradient(circle, ${balloonColors[Math.floor(Math.random() * balloonColors.length)]} 40%, rgba(255, 255, 255, 0.8) 100%)`;
        balloonsContainer.appendChild(balloon);

        // Remove balloon after animation ends
        balloon.addEventListener('animationend', () => balloon.remove());
    }

    // Continue adding balloons periodically
    setInterval(() => {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.style.left = `${Math.random() * 100}%`;
        balloon.style.animationDuration = `${8 + Math.random() * 4}s`;
        balloon.style.background = `radial-gradient(circle, ${balloonColors[Math.floor(Math.random() * balloonColors.length)]} 40%, rgba(255, 255, 255, 0.8) 100%)`;
        balloonsContainer.appendChild(balloon);

        // Remove balloon after animation ends
        balloon.addEventListener('animationend', () => balloon.remove());
    }, 1000);
}


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
            fireworksCtx.globalAlpha = depthEffect; // Vary brightness
            fireworksCtx.beginPath();
            fireworksCtx.arc(fx, fy, 2 + depthEffect * 2, 0, Math.PI * 2); // Vary particle size
            fireworksCtx.fill();
        }
    }

    requestAnimationFrame(animateFireworks);
}


// Start the show
startSlides();
