document.addEventListener('DOMContentLoaded', function () {
    // Menu Mobile
    const menuMobile = document.querySelector('.menu-mobile');
    const navLinks = document.querySelector('nav ul');

    if (menuMobile) {
        menuMobile.addEventListener('click', function () {
            navLinks.classList.toggle('active');
            menuMobile.classList.toggle('active');
        });
    }

    // Animação de rolagem suave para links âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });

                // Fechar menu mobile se estiver aberto
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuMobile.classList.remove('active');
                }
            }
        });
    });

    // Inicializar componentes
    initTestimonialSlider();

    // Iniciar animação das estatísticas
    countStats();

    // Accordion para FAQs
    const faqItems = document.querySelectorAll('.faq-item');

    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');

            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                // Fechar todos os itens
                faqItems.forEach(faqItem => {
                    faqItem.classList.remove('active');
                });

                // Abrir o clicado (se não estava aberto)
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });

        // Abrir o primeiro FAQ por padrão
        faqItems[0].classList.add('active');
    }

    // Formulário de contato
    const contactForm = document.getElementById('form-contato');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const formValues = {};

            for (let [key, value] of formData.entries()) {
                formValues[key] = value;
            }

            // Aqui você poderia enviar os dados para um servidor
            // Por enquanto, vamos apenas simular o envio
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            contactForm.reset();

            // Redirecionar para WhatsApp após o envio
            const phone = '5531940504512';
            const message = encodeURIComponent(`Olá! Acabei de enviar um formulário de contato no site. Nome: ${formValues.nome}`);
            window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
        });
    }

    // Animações ao scroll
    const animateElements = document.querySelectorAll('.animate-on-scroll');

    function checkScroll() {
        const triggerBottom = window.innerHeight / 5 * 4;

        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < triggerBottom) {
                element.classList.add('visible');
            }
        });
    }

    // Adicionar classe para animar elementos específicos
    function addAnimationClasses() {
        document.querySelectorAll('.service-card').forEach((card, index) => {
            card.classList.add('animate-on-scroll');
            card.style.animationDelay = (index * 0.1) + 's';
        });

        document.querySelectorAll('.gallery-item').forEach((item, index) => {
            item.classList.add('animate-on-scroll');
            item.style.animationDelay = (index * 0.1) + 's';
        });
    }

    addAnimationClasses();
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Verificar elementos visíveis no carregamento inicial
});

// Função para inicializar o slider de depoimentos
function initTestimonialSlider() {
    const testimonialSlider = document.querySelector('.testimonials-slider');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const indicators = document.querySelectorAll('.testimonials-indicators span');

    if (!testimonialSlider || testimonialCards.length === 0 || indicators.length === 0) {
        console.log("Erro: elementos do slider não encontrados");
        return;
    }

    let currentIndex = 0;
    let slideInterval;

    // Configurar larguras precisas sem margens
    const totalCards = testimonialCards.length;
    testimonialSlider.style.width = `${totalCards * 100}%`;

    testimonialCards.forEach(card => {
        card.style.width = `${100 / totalCards}%`;
    });

    // Função para mostrar um slide específico
    function showSlide(index) {
        if (index >= testimonialCards.length) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = testimonialCards.length - 1;
        } else {
            currentIndex = index;
        }

        // Aplicar transformação exata
        const slideWidth = 100 / totalCards;
        testimonialSlider.style.transform = `translateX(-${currentIndex * slideWidth}%)`;

        // Atualizar indicadores
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === currentIndex);
        });
    }

    // Configurar indicadores para serem clicáveis
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            clearInterval(slideInterval);
            showSlide(index);
            startAutoSlide();
        });
    });

    // Iniciar rotação automática
    function startAutoSlide() {
        slideInterval = setInterval(() => {
            showSlide(currentIndex + 1);
        }, 5000);
    }

    // Mostrar o primeiro slide e iniciar a rotação
    showSlide(0);
    startAutoSlide();
}

// Adicionar classe active nos links do menu quando a seção correspondente estiver visível
window.addEventListener('scroll', function () {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= (sectionTop - 200)) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
});

// Função para verificar se um elemento está visível na viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Função simplificada para animação dos números, sem animações CSS
function countStats() {
    // Selecionar todos os elementos com a classe .stat-number
    const statElements = document.querySelectorAll('.stat-number');

    // Para cada elemento, animar o número
    statElements.forEach(element => {
        const finalValue = parseInt(element.getAttribute('data-value'));
        let currentValue = 0;

        // Definir intervalo de atualização
        const updateInterval = setInterval(() => {
            // Incrementar valor atual
            currentValue += Math.ceil(finalValue / 25);

            // Se atingiu ou ultrapassou o valor final, parar animação
            if (currentValue >= finalValue) {
                clearInterval(updateInterval);
                element.textContent = finalValue;
            } else {
                element.textContent = currentValue;
            }
        }, 80);
    });
} 