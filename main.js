// Event listener for Start Button
window.addEventListener('load', () => {
    // Selecting the start button and slides container
    const startButton = document.getElementById('start-button');
    const replayButton = document.querySelector('.replay-button');
    const slides = document.querySelectorAll('.slide');
    const audio = document.getElementById('bgMusic');

    let currentSlide = 0;

    // Ensure the start button is correctly found and has the event listener attached
    if (startButton) {
        console.log('Start Button is loaded!');
        startButton.addEventListener('click', () => {
            console.log('Start button clicked');
            startButton.style.display = 'none';  // Hide the start button after clicked
            startSlides();                      // Call the function to start animations
            audio.play();                        // Play background music
            generateBalloons();                  // Start generating balloons
            launchFireworks();                   // Start fireworks animation
        });
    } else {
        console.error("Start button not found.");
    }

    // Function to show slides
    function startSlides() {
        showSlide();
        generateBalloons();
        launchFireworks();
    }

    // Slide switching logic
    function showSlide() {
        if (currentSlide > 0) {
            slides[currentSlide - 1].classList.remove('active');
        }

        if (currentSlide < slides.length) {
            slides[currentSlide].classList.add('active');
            currentSlide++;
            setTimeout(showSlide, 4000); // Switch slides every 4 seconds
        } else {
            slides[currentSlide - 1].classList.add('active'); // Keep the last slide active
        }
    }

    // Replay slides functionality
    replayButton.addEventListener('click', () => {
        replaySlides();
    });

    function replaySlides() {
        slides.forEach(slide => slide.classList.remove('active'));
        currentSlide = 0;
        startSlides(); // Restart the animation
    }

    // Function for generating balloons
    function generateBalloons() {
        const balloonColors = ['#ff6f61', '#ffa500', '#87ceeb', '#ff69b4', '#6a5acd', '#32cd32'];

        function createBalloon() {
            const balloon = document.createElement('div');
            balloon.className = 'balloon';

            balloon.style.left = `${Math.random() * 90}%`;
            balloon.style.background = `radial-gradient(circle, ${balloonColors[Math.floor(Math.random() * balloonColors.length)]} 40%, rgba(255, 255, 255, 0.8) 100%)`;
            balloon.style.animationDuration = `${8 + Math.random() * 4}s`;

            document.getElementById('balloons').appendChild(balloon);

            balloon.addEventListener('animationend', () => {
                balloon.remove();
            });
        }

        for (let i = 0; i < 10; i++) {
            createBalloon(); // Create balloons initially
        }

        setInterval(createBalloon, 1000); // Keep generating balloons
    }

    // Fireworks animation logic
    function launchFireworks() {
        const fireworksCanvas = document.getElementById('fireworks');
        const fireworksCtx = fireworksCanvas.getContext('2d');
        fireworksCanvas.width = window.innerWidth;
        fireworksCanvas.height = window.innerHeight;
        animateFireworks(fireworksCtx, fireworksCanvas);
    }

    function animateFireworks(ctx, canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Simulate fireworks using random values for x, y, and colors
        for (let i = 0; i < 5; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height / 2;
            const colors = ['#ff6f61', '#ffa500', '#87ceeb', '#ff69b4', '#6a5acd', '#32cd32'];

            for (let j = 0; j < 50; j++) {
                const angle = (Math.PI * 2 / 50) * j;
                const radius = Math.random() * 150;
                const fx = x + Math.cos(angle) * radius;
                const fy = y + Math.sin(angle) * radius;
                const depthEffect = Math.random();

                ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
                ctx.globalAlpha = depthEffect;
                ctx.beginPath();
                ctx.arc(fx, fy, 2 + depthEffect * 2, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        requestAnimationFrame(() => animateFireworks(ctx, canvas)); // Loop fireworks animation
    }

});
