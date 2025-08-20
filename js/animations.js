// Intersection Observer for fade-in animations
export function initializeFadeInAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Add fade-in animation to cards and sections
    const animatedElements = document.querySelectorAll('.card, .guide-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
}

// Stagger animations for grid items
export function initializeStaggerAnimations() {
    // Add stagger delay to grid items
    document.querySelectorAll('.grid-container .card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    document.querySelectorAll('.happiness-grid .card').forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.15}s`;
    });

    document.querySelectorAll('.philosophy-grid .card').forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.2}s`;
    });

    document.querySelectorAll('.glossary-grid .card').forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
    });

    document.querySelectorAll('.thinking-grid .card').forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
    });

    // Add stagger animations for Q&A items
    document.querySelectorAll('.qa-grid .card').forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
    });

    document.querySelectorAll('.qa-guide .guide-item').forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.2}s`;
    });
}

// Subtle parallax effect for hero section
export function initializeParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero) {
            const heroHeight = hero.offsetHeight;
            const heroRect = hero.getBoundingClientRect();
            
            // Only apply subtle parallax when hero section is still visible
            if (heroRect.bottom > 0 && scrolled < heroHeight) {
                const parallaxSpeed = 0.3;
                hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            } else {
                // Ensure hero stays in place when scrolled past
                hero.style.transform = `translateY(${heroHeight * 0.3}px)`;
            }
        }
    });
}

// Scroll progress indicator
export function initializeScrollProgressIndicator() {
    const indicator = document.createElement('div');
    indicator.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #667eea, #764ba2);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(indicator);
    
    window.addEventListener('scroll', () => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / scrollHeight) * 100;
        indicator.style.width = scrolled + '%';
    });
}

// Initialize all animations
export function initializeAnimations() {
    initializeFadeInAnimations();
    initializeStaggerAnimations();
    initializeParallaxEffect();
    initializeScrollProgressIndicator();
}

export default initializeAnimations;