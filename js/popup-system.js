import popupData from './popup-data.js';

// Popup System Implementation
export function initializePopupSystem() {
    const popupOverlay = document.getElementById('popup-overlay');
    const popupTitle = document.querySelector('.popup-title');
    const popupOverview = document.querySelector('.popup-overview');
    const popupAnalysis = document.querySelector('.popup-analysis');
    const popupApplication = document.querySelector('.popup-application');
    const popupKeypoints = document.querySelector('.popup-keypoints');
    const popupClose = document.querySelector('.popup-close');

    // Check if popup elements exist
    if (!popupOverlay || !popupTitle || !popupOverview || !popupAnalysis || !popupApplication || !popupKeypoints || !popupClose) {
        console.warn('Popup system elements not found. Popup functionality disabled.');
        return;
    }

    // Add click/touch event listeners to all cards with data-popup attribute
    document.querySelectorAll('[data-popup]').forEach(card => {
        // Click events
        card.addEventListener('click', function() {
            const popupId = this.getAttribute('data-popup');
            const data = popupData[popupId];
            
            if (data) {
                showPopup(data);
            }
        });
        
        // Touch events for better mobile interaction
        let touchStarted = false;
        let touchMoved = false;
        
        card.addEventListener('touchstart', function(e) {
            touchStarted = true;
            touchMoved = false;
        });
        
        card.addEventListener('touchmove', function(e) {
            touchMoved = true;
        });
        
        card.addEventListener('touchend', function(e) {
            e.preventDefault();
            
            if (touchStarted && !touchMoved) {
                // Only trigger popup if touch didn't move significantly (true tap)
                const popupId = this.getAttribute('data-popup');
                const data = popupData[popupId];
                
                if (data) {
                    showPopup(data);
                }
            }
            touchStarted = false;
            touchMoved = false;
        });
    });

    // Close popup events with touch support
    popupClose.addEventListener('click', hidePopup);
    popupClose.addEventListener('touchend', function(e) {
        e.preventDefault();
        hidePopup();
    });
    
    popupOverlay.addEventListener('click', function(e) {
        if (e.target === popupOverlay) {
            hidePopup();
        }
    });
    
    popupOverlay.addEventListener('touchend', function(e) {
        if (e.target === popupOverlay) {
            e.preventDefault();
            hidePopup();
        }
    });
    
    // Keyboard events
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && popupOverlay.classList.contains('active')) {
            hidePopup();
        }
    });
    
    // Prevent scroll on body when popup is open (better mobile experience)
    let scrollY = 0;
    
    function disableScroll() {
        scrollY = window.scrollY;
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = '100%';
    }
    
    function enableScroll() {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        // Use instant scrolling to prevent animation
        try {
            window.scrollTo({
                top: scrollY,
                left: 0,
                behavior: 'instant'
            });
        } catch (e) {
            // Fallback for older browsers
            window.scrollTo(0, scrollY);
        }
    }
    
    function showPopup(data) {
        popupTitle.textContent = data.title;
        popupOverview.innerHTML = `<p>${data.overview}</p>`;
        popupAnalysis.innerHTML = data.analysis;
        popupApplication.innerHTML = data.application;
        popupKeypoints.innerHTML = data.keypoints;

        // Reset popup scroll position to top
        const popupContent = document.querySelector('.popup-content');
        if (popupContent) {
            popupContent.scrollTop = 0;
        }

        disableScroll();
        popupOverlay.classList.add('active');
        
        // Focus on popup for accessibility
        popupOverlay.focus();
    }
    
    function hidePopup() {
        popupOverlay.classList.remove('active');
        enableScroll();
    }
}

// Export popup functions for external use if needed
export { initializePopupSystem as default };