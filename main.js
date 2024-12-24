const slides = document.querySelectorAll('.message');
const startButton = document.getElementById('start-button');
const audio = document.getElementById('birthday-song');

let currentSlide = 0;

startButton.addEventListener('click', () => {
    startButton.style.display = 'none';
    audio.play();
    showSlide();
});

function showSlide() {
    if (currentSlide > 0) {
        slides[currentSlide - 1].classList.remove('show');
        slides[currentSlide - 1].classList.add('hidden');
    }

    if (currentSlide < slides.length) {
        slides[currentSlide].classList.remove('hidden');
        slides[currentSlide].classList.add('show');
        currentSlide++;

        setTimeout(showSlide, 3000); // Ganti slide setiap 3 detik
    }
}
