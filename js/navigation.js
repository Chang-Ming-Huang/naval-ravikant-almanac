// Mobile Navigation Toggle
export function initializeMobileNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (!hamburger || !navMenu) {
        console.warn('Navigation elements not found. Mobile navigation disabled.');
        return;
    }

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

// Smooth scrolling for navigation links
export function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Navbar scroll effect
export function initializeNavbarScrollEffect() {
    const navbar = document.querySelector('.navbar');
    
    if (!navbar) {
        console.warn('Navbar element not found. Scroll effects disabled.');
        return;
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
        }
    });
}

// Add active state to navigation based on scroll position
export function initializeActiveNavLink() {
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Add CSS for active nav link
    const style = document.createElement('style');
    style.textContent = `
        .nav-link.active {
            color: #2563eb !important;
        }
        .nav-link.active::after {
            width: 100% !important;
        }
    `;
    document.head.appendChild(style);

    window.addEventListener('scroll', updateActiveNavLink);
}

// Add floating action button for quick navigation
export function initializeFloatingNav() {
    const fab = document.createElement('div');
    fab.innerHTML = '↑';
    fab.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;
        box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
        z-index: 1000;
        transition: all 0.3s ease;
        opacity: 0;
        transform: translateY(100px);
    `;
    
    fab.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    fab.addEventListener('mouseenter', () => {
        fab.style.transform = 'translateY(0) scale(1.1)';
        fab.style.boxShadow = '0 6px 25px rgba(102, 126, 234, 0.4)';
    });
    
    fab.addEventListener('mouseleave', () => {
        fab.style.transform = 'translateY(0) scale(1)';
        fab.style.boxShadow = '0 4px 20px rgba(102, 126, 234, 0.3)';
    });
    
    document.body.appendChild(fab);
    
    // Show/hide FAB based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            fab.style.opacity = '1';
            fab.style.transform = 'translateY(0)';
        } else {
            fab.style.opacity = '0';
            fab.style.transform = 'translateY(100px)';
        }
    });
}

// Initialize all navigation features
export function initializeNavigation() {
    initializeMobileNavigation();
    initializeSmoothScrolling();
    initializeNavbarScrollEffect();
    initializeActiveNavLink();
    initializeFloatingNav();
}

export default initializeNavigation;