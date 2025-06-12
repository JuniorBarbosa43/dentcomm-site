// --- Language Management ---
const langButtons = { 
    pt: document.getElementById('lang-pt'), 
    es: document.getElementById('lang-es') 
};
let currentLang = 'pt';

function setLanguage(lang) {
    document.body.style.transition = 'opacity 0.2s ease-in-out';
    document.body.style.opacity = '0';
    setTimeout(() => {
        currentLang = lang;
        document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'es';
        
        document.querySelectorAll('[data-lang-pt]').forEach(el => {
            const translation = el.dataset[`lang-${lang}`];
            if (translation) el.innerHTML = translation;
        });
        
        Object.keys(langButtons).forEach(key => {
            langButtons[key].classList.toggle('font-bold', key === lang);
            langButtons[key].classList.toggle('text-white', key === lang);
            langButtons[key].classList.toggle('text-dim-gray', key !== lang);
        });
        
        document.body.style.opacity = '1';
    }, 200);
}

document.addEventListener('DOMContentLoaded', () => {
    langButtons.pt.addEventListener('click', () => setLanguage('pt'));
    langButtons.es.addEventListener('click', () => setLanguage('es'));
    setLanguage('pt'); // Set initial language
});