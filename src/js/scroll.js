let scrollObserver;
const progressBar = document.getElementById('progress-bar');

function setupScrollAnimations() {
    if (scrollObserver) {
        scrollObserver.disconnect();
    }
    
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

function updateProgressBar(pageId) {
    if (!progressBar) return;

    const isProductPage = pageId && pageId.startsWith('product-');
    progressBar.style.display = isProductPage ? 'block' : 'none';

    if (!isProductPage) {
        progressBar.style.width = '0%';
        return;
    }

    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const scrollPercent = (scrollTop / (scrollHeight - clientHeight)) * 100;
    progressBar.style.width = `${scrollPercent}%`;
}

window.addEventListener('scroll', () => {
    const currentPageId = document.querySelector('#page-container > div')?.id;
    updateProgressBar(currentPageId);
});