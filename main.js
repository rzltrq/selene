// Main functionality updates for birthday celebration
const slides = document.querySelectorAll('.slide');
const balloonsContainer = document.getElementById('balloons');
const fireworksCanvas = document.getElementById('fireworks');
const audio = document.getElementById('bgMusic');
const birthdayDate = new Date('2024-12-31'); // Set her birthday date (YYYY-MM-DD)
const today = new Date();
let currentSlide = 0;
const fireworksCtx = fireworksCanvas.getContext('2d');
fireworksCanvas.width = window.innerWidth;
fireworksCanvas.height = window.innerHeight;

// Locking Mechanism
function isBirthday() {
    if (today < birthdayDate) {
        const daysLeft = Math.ceil((birthdayDate - today) / (1000 * 60 * 60 * 24));
        document.body.innerHTML = `<div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh; background: linear-gradient(120deg, #ff9a9e, #fad0c4); color: white; text-align: center; font-family: Arial, sans-serif;">
            <h1>🎉 It's Not Time Yet! 🎉</h1>
            <p>Come back in <strong>${daysLeft}</strong> day${daysLeft > 1 ? 's' : ''} to celebrate her birthday!</p>
            </div>`;
        return false;
    }
    return true;
}

// Confetti Library Setup
function launchConfetti() {
    const duration = 3000; // 3 seconds
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 10,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
        });
        confetti({
            particleCount: 10,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
}

// Fireworks Animation
function animateFireworks() {
    fireworksCtx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);

    for (let i = 0; i < 5; i++) {
        const x = Math.random() * fireworksCanvas.width;
        const y = Math.random() * fireworksCanvas.height / 2;
        const colors = ['#ff6f61', '#ffa500', '#87ceeb', '#ff69b4', '#6a5acd', '#32cd32'];

        for (let j = 0; j < 50; j++) {
            const angle = (Math.PI * 2 / 50) * j;
            const radius = Math.random() * 150;
            const fx = x + Math.cos(angle) * radius;
            const fy = y + Math.sin(angle) * radius;

            const gradient = fireworksCtx.createRadialGradient(fx, fy, 0, fx, fy, radius / 2);
            gradient.addColorStop(0, colors[Math.floor(Math.random() * colors.length)]);
            gradient.addColorStop(1, 'transparent');

            fireworksCtx.fillStyle = gradient;
            fireworksCtx.beginPath();
            fireworksCtx.arc(fx, fy, 2 + Math.random() * 2, 0, Math.PI * 2);
            fireworksCtx.fill();
        }
    }

    requestAnimationFrame(animateFireworks);
}

// Cursor Particle Effect
function addCursorParticles() {
    document.addEventListener('mousemove', (event) => {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.top = `${event.clientY}px`;
        particle.style.left = `${event.clientX}px`;
        particle.style.width = '5px';
        particle.style.height = '5px';
        particle.style.borderRadius = '50%';
        particle.style.backgroundColor = `rgba(255, 255, 255, ${Math.random()})`;
        particle.style.pointerEvents = 'none';
        particle.style.animation = 'particleFade 1s forwards';

        document.body.appendChild(particle);
        particle.addEventListener('animationend', () => particle.remove());
    });

    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes particleFade {
            to {
                transform: translateY(-30px) scale(0);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Balloons Animation
function generateBalloons() {
    const balloonColors = ['#ff6f61', '#ffa500', '#87ceeb', '#ff69b4', '#6a5acd', '#32cd32'];

    function createBalloon() {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.style.left = `${Math.random() * 90}%`;
        balloon.style.background = `radial-gradient(circle, ${balloonColors[Math.floor(Math.random() * balloonColors.length)]} 40%, rgba(255, 255, 255, 0.8) 100%)`;
        balloon.style.animationDuration = `${8 + Math.random() * 4}s`;
        balloonsContainer.appendChild(balloon);

        balloon.addEventListener('animationend', () => balloon.remove());
    }

    // Continuously spawn balloons
    setInterval(createBalloon, 1000);
}

// Show Slides in Sequence
function showSlide() {
    if (currentSlide > 0) slides[currentSlide - 1].classList.remove('active');
    if (currentSlide < slides.length) {
        slides[currentSlide].classList.add('active');
        currentSlide++;
        setTimeout(showSlide, 4000);
    } else {
        slides[currentSlide - 1].classList.add('active'); // Keep last slide active
    }
}

function startSlides() {
    showSlide();
    audio.play();
    generateBalloons();
    animateFireworks();
    launchConfetti();
    addCursorParticles();
}

function replaySlide() {
    showSlide();
    generateBalloons();
    animateFireworks();
    launchConfetti();
    addCursorParticles();
}

function replaySlides() {
    slides.forEach((slide) => slide.classList.remove('active'));
    currentSlide = 0;
    replaySlide();
}

// Initialize on Load
document.addEventListener('DOMContentLoaded', () => {
    addCursorParticles();
});
