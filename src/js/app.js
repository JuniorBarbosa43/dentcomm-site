document.addEventListener('DOMContentLoaded', () => {
    const pageContainer = document.getElementById('page-container');

    const seoData = {
        home: { title: 'DentComm - Agência de Marketing para Dentistas com Foco em ROI', description: 'A DentComm transforma dentistas em marcas fortes com marketing, automação, tráfego e gestão.' },
        about: { title: 'Sobre a DentComm | Nossa Missão e Manifesto', description: 'Somos o seu parceiro estratégico para o crescimento.' },
        blog: { title: 'Blog | Conteúdo Estratégico para Dentistas', description: 'Artigos e guias sobre marketing odontológico, captação de pacientes e gestão.' },
        contact: { title: 'Contato | Fale com um Especialista DentComm', description: 'Pronto para transformar sua clínica? Entre em contato para um diagnóstico gratuito.' },
        'product-base': { title: 'DentComm Base | Marketing para Dentistas Iniciantes', description: 'Comece sua presença digital com estrutura, clareza e captação de pacientes.' },
        'product-flow': { title: 'DentComm Flow | Escale sua Clínica com Marketing Automatizado', description: 'Automatize atendimento e captação de pacientes para clínicas em crescimento.' },
        'product-core360': { title: 'DentComm Core360 | Marketing e CRM Integrados', description: 'Solução completa que une tráfego, CRM e automação para uma gestão 360 graus.' },
        'product-fullstack': { title: 'DentComm Fullstack | Operação Digital Completa', description: 'A DentComm assume 100% da sua operação digital. Você foca no atendimento.' }
    };

    const loadPage = async (pageId) => {
        const cleanPageId = pageId.split('#')[0] || 'home';
        
        try {
            const response = await fetch(`./src/pages/${cleanPageId}.html`);
            if (!response.ok) throw new Error(`Página não encontrada: ${cleanPageId}.html`);
            
            const html = await response.text();
            pageContainer.innerHTML = html;
            
            updateSeo(cleanPageId);
            
            // Re-apply scripts and functionalities to the new content
            setLanguage(currentLang); 
            setupScrollAnimations();
            updateProgressBar(cleanPageId);

            // Re-initialize Swiper if on home page
            if (cleanPageId === 'home') {
                new Swiper('.swiper-container', {
                    loop: true, slidesPerView: 1, spaceBetween: 30,
                    pagination: { el: '.swiper-pagination', clickable: true },
                    breakpoints: { 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } },
                    autoplay: { delay: 5000, disableOnInteraction: false },
                });
            }

            // Handle anchor link
            const anchor = pageId.split('#')[1];
            if (anchor) {
                setTimeout(() => {
                    document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            } else {
                window.scrollTo(0, 0);
            }

        } catch (error) {
            console.error("Erro ao carregar a página:", error);
            pageContainer.innerHTML = `<div class="text-center py-20"><h1 class="text-2xl text-red-500">Erro 404: Página não encontrada</h1></div>`;
        }
    };
    
    const updateSeo = (pageId) => {
        const data = seoData[pageId];
        if (data) {
            document.title = data.title;
            document.querySelector('meta[name="description"]').setAttribute('content', data.description);
            document.querySelector('meta[property="og:title"]').setAttribute('content', data.title);
            document.querySelector('meta[property="og:description"]').setAttribute('content', data.description);
        }
    };

    // Event Delegation for Navigation
    document.body.addEventListener('click', (e) => {
        const navLink = e.target.closest('.nav-link');
        if (navLink) {
            e.preventDefault();
            const pageId = navLink.dataset.page;
            if (pageId) {
                loadPage(pageId);
            }
        }
    });

    // Initial Load
    loadPage('home');
});