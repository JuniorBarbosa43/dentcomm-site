// --- Main Application Logic ---
const pageContainer = document.getElementById('page-container');
const navLinks = document.querySelectorAll('.nav-link');

// --- SEO Data ---
const seoData = {
    home: { title: 'DentComm - Agência de Marketing para Dentistas com Foco em ROI', description: 'A DentComm transforma dentistas em marcas fortes com marketing, automação, tráfego e gestão.' },
    about: { title: 'Sobre a DentComm | Nossa Missão e Manifesto', description: 'Somos o seu parceiro estratégico para o crescimento. Conheça nossa missão, visão e o manifesto que guia nosso trabalho com dentistas.' },
    blog: { title: 'Blog | Conteúdo Estratégico para Dentistas', description: 'Artigos e guias sobre marketing odontológico, captação de pacientes, gestão de clínicas e as últimas tendências do setor.' },
    contact: { title: 'Contato | Fale com um Especialista DentComm', description: 'Pronto para transformar sua clínica? Entre em contato conosco para um diagnóstico gratuito e descubra como podemos ajudar.' },
    'product-base': { title: 'DentComm Base | Marketing para Dentistas Iniciantes', description: 'Comece sua presença digital com estrutura, clareza e captação de pacientes.' },
    'product-flow': { title: 'DentComm Flow | Escale sua Clínica com Marketing Automatizado', description: 'Automatize atendimento, captação e nutrição de pacientes para clínicas em crescimento.' },
    'product-core360': { title: 'DentComm Core360 | Marketing e CRM Integrados para Clínicas', description: 'Solução completa que une tráfego, CRM, automação e nutrição para uma gestão 360 graus.' },
    'product-fullstack': { title: 'DentComm Fullstack | Operação Digital Completa para Clínicas', description: 'A DentComm assume 100% da sua operação digital. Você foca no atendimento.' }
};

// --- Page Loading ---
async function loadPage(pageName) {
    try {
        const response = await fetch(`./src/pages/${pageName}.html`);
        if (!response.ok) throw new Error('Page not found');
        
        const pageHTML = await response.text();
        pageContainer.innerHTML = pageHTML;
        pageContainer.style.animation = 'fadeIn 0.5s ease-in-out';
        
        // Re-apply language and scroll animations for the new content
        setLanguage(currentLang);
        setupScrollAnimations();
        
        // Re-initialize any page-specific components like carousels
        if(pageName === 'home') {
            new Swiper('.swiper-container', {
                loop: true, slidesPerView: 1, spaceBetween: 30,
                pagination: { el: '.swiper-pagination', clickable: true },
                breakpoints: { 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } },
                autoplay: { delay: 5000, disableOnInteraction: false },
            });
        }
    } catch (error) {
        console.error('Failed to load page:', error);
        pageContainer.innerHTML = `<div class="text-center py-20"><h1 class="text-2xl text-red-500">Erro 404: Página não encontrada</h1></div>`;
    }
}


function updateSeo(pageName) {
    const newSeo = seoData[pageName];
    if (newSeo) {
        document.title = newSeo.title;
        document.querySelector('meta[name="description"]').setAttribute('content', newSeo.description);
        document.querySelector('meta[property="og:title"]').setAttribute('content', newSeo.title);
        document.querySelector('meta[property="og:description"]').setAttribute('content', newSeo.description);
    }
}

function handleNavigation(pageId) {
    pageContainer.style.animation = 'none';
    const cleanPageId = pageId.split('#')[0] || 'home';
    
    updateSeo(cleanPageId);
    loadPage(cleanPageId);

    // Handle anchor links
    if (pageId.includes('#')) {
        const anchorId = pageId.split('#')[1];
        setTimeout(() => {
            document.getElementById(anchorId)?.scrollIntoView({ behavior: 'smooth' });
        }, 500); // Wait for page to load
    } else {
        window.scrollTo(0, 0);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Initial page load
    handleNavigation('home');

    // Setup navigation links globally
    document.body.addEventListener('click', function(e) {
        const navLink = e.target.closest('.nav-link');
        if (navLink) {
            e.preventDefault();
            const pageId = navLink.dataset.page;
            handleNavigation(pageId);
        }
    });
});