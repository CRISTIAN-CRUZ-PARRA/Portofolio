// Navegación suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animación del header al hacer scroll
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scroll Down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scroll Up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Formulario de contacto
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Aquí puedes agregar la lógica para enviar el formulario
    const formData = new FormData(this);
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    
    // Simulación de envío exitoso
    alert('¡Gracias por tu mensaje! Te contactaré pronto.');
    this.reset();
});

// Animación de aparición de elementos al hacer scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar elementos para animación
document.querySelectorAll('.project-card, .skill-category').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Añadir estilos CSS para las animaciones
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    
    .fade-in.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .scroll-down {
        transform: translateY(-100%);
        transition: transform 0.3s ease-in-out;
    }
    
    .scroll-up {
        transform: translateY(0);
        transition: transform 0.3s ease-in-out;
    }
`;
document.head.appendChild(style);

// Carrusel de imágenes para proyecto
(function() {
    // Esperar a que todo el DOM y recursos estén cargados
    window.addEventListener('load', function() {
        const carousels = document.querySelectorAll('.carousel');
        carousels.forEach(carousel => {
            const images = carousel.querySelectorAll('.carousel-img');
            const prevBtn = carousel.querySelector('.carousel-btn.prev');
            const nextBtn = carousel.querySelector('.carousel-btn.next');
            let current = 0;

            function showImage(idx) {
                images.forEach((img, i) => {
                    img.classList.toggle('active', i === idx);
                    img.style.zIndex = i === idx ? 2 : 1;
                });
            }

            if (prevBtn && nextBtn && images.length > 0) {
                prevBtn.addEventListener('click', () => {
                    current = (current - 1 + images.length) % images.length;
                    showImage(current);
                });
                nextBtn.addEventListener('click', () => {
                    current = (current + 1) % images.length;
                    showImage(current);
                });
                showImage(current);
            }
        });
    });
})();