const slides = document.querySelectorAll('.slide');
const balloonsContainer = document.getElementById('balloons');
const fireworksCanvas = document.getElementById('fireworks');
const audio = document.getElementById('bgMusic');

let currentSlide = 0;
const fireworksCtx = fireworksCanvas.getContext('2d');

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
        if (currentSlide < slides.length) {
            setTimeout(showSlide, 4000); // Switch slides every 4 seconds
        } else {
            // Stop after the last slide
            stopEffects();
        }
    }
}

function stopEffects() {
    // Optional: Stop audio or other animations if needed
    console.log('Slides finished!');
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

// Start the slideshow and effects
startSlides();
