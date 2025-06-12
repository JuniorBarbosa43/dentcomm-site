// --- Scroll Animations & Progress Bar ---
let scrollObserver;
const progressBar = document.getElementById('progress-bar');

function setupScrollAnimations() {
    scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.classList.contains('animated-bar')) {
                    entry.target.style.width = entry.target.dataset.width;
                }
                scrollObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-reveal').forEach(el => scrollObserver.observe(el));
    document.querySelectorAll('.animated-bar').forEach(bar => scrollObserver.observe(bar));
}

function updateProgressBar() {
    if (!progressBar || progressBar.style.display === 'none') {
        if(progressBar) progressBar.style.width = '0%';
        return;
    }
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const scrollPercent = (scrollTop / (scrollHeight - clientHeight)) * 100;
    progressBar.style.width = `${scrollPercent}%`;
}

window.addEventListener('scroll', updateProgressBar);