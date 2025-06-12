let currentLang = 'pt'; // Default language

function setLanguage(lang) {
    if (!['pt', 'es'].includes(lang)) return;

    currentLang = lang;
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'es';

    document.querySelectorAll('[data-lang-pt]').forEach(el => {
        const translation = el.dataset[`lang-${lang}`];
        if (translation) {
            el.innerHTML = translation;
        }
    });

    const langButtons = { 
        pt: document.getElementById('lang-pt'), 
        es: document.getElementById('lang-es') 
    };
    
    if (langButtons.pt && langButtons.es) {
        langButtons.pt.classList.toggle('text-white', lang === 'pt');
        langButtons.pt.classList.toggle('text-dim-gray', lang !== 'pt');
        langButtons.es.classList.toggle('text-white', lang === 'es');
        langButtons.es.classList.toggle('text-dim-gray', lang !== 'es');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const langPtButton = document.getElementById('lang-pt');
    const langEsButton = document.getElementById('lang-es');

    if (langPtButton) {
        langPtButton.addEventListener('click', () => setLanguage('pt'));
    }
    if (langEsButton) {
        langEsButton.addEventListener('click', () => setLanguage('es'));
    }

    // Set initial language after a short delay to ensure content is present
    setTimeout(() => setLanguage('pt'), 100);
});