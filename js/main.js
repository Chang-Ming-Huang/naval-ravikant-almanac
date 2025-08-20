// Main initialization file - imports and initializes all modules
import { initializeAnimations } from './animations.js';
import { initializePopupSystem } from './popup-system.js';
import { initializeNavigation } from './navigation.js';
import { initializeInteractions } from './interactions.js';

// Initialize all modules when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Naval Ravikant Almanac - Initializing modules 🚀');
    
    // Initialize animations first (for fade-in effects)
    initializeAnimations();
    
    // Initialize popup system
    initializePopupSystem();
    
    // Initialize navigation
    initializeNavigation();
    
    // Initialize interactions
    initializeInteractions();
    
    console.log('All modules loaded successfully ✅');
});

console.log('Naval Ravikant Almanac - Wisdom for Life 🚀');