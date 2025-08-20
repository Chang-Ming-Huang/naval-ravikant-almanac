// Interactive quote animation
export function initializeQuoteInteraction() {
    const quote = document.querySelector('.quote');
    if (quote) {
        quote.addEventListener('mouseenter', () => {
            quote.style.transform = 'scale(1.02)';
        });
        
        quote.addEventListener('mouseleave', () => {
            quote.style.transform = 'scale(1)';
        });
    }
}

// Add hover effects to cards
export function initializeCardHoverEffects() {
    document.querySelectorAll('.card, .happiness-principle, .philosophy-card, .thinking-card').forEach(card => {
        // Store original transform
        const originalTransform = card.style.transform || '';
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = originalTransform + ' translateY(-10px) scale(1.02)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = originalTransform;
        });
    });
}

// Typing effect for hero title
export function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
export function initializeTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 150);
        }, 1000);
    }
}

// Easter egg: Konami code
export function initializeKonamiCode() {
    let konamiCode = [];
    const konamiSequence = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];

    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.code);
        
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            // Easter egg activated
            document.body.style.background = 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ffeaa7, #dda0dd)';
            document.body.style.backgroundSize = '600% 600%';
            document.body.style.animation = 'rainbow 3s ease infinite';
            
            const easterEggStyle = document.createElement('style');
            easterEggStyle.textContent = `
                @keyframes rainbow {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
            `;
            document.head.appendChild(easterEggStyle);
            
            setTimeout(() => {
                document.body.style.background = '';
                document.body.style.backgroundSize = '';
                document.body.style.animation = '';
                easterEggStyle.remove();
            }, 5000);
            
            konamiCode = [];
        }
    });
}

// Initialize all interactions
export function initializeInteractions() {
    initializeQuoteInteraction();
    initializeCardHoverEffects();
    initializeTypingEffect();
    initializeKonamiCode();
}

export default initializeInteractions;