// Simple navigation test script for Naval Ravikant website
// This script can be run in the browser console to test navigation

console.log('🧪 Testing Naval Ravikant Website Navigation...');

// Wait for page to load
setTimeout(() => {
    console.log('📋 Starting navigation tests...');
    
    // Test 1: Check if all navigation links exist
    const navLinks = [
        { text: '首頁', href: '#hero' },
        { text: '致富', href: '#wealth' },
        { text: '快樂', href: '#happiness' },
        { text: '思考', href: '#thinking' },
        { text: '哲學', href: '#philosophy' }
    ];
    
    console.log('🔍 Test 1: Checking navigation links existence...');
    navLinks.forEach(link => {
        const element = document.querySelector(`a[href="${link.href}"]`);
        if (element) {
            console.log(`✅ ${link.text} link found`);
        } else {
            console.log(`❌ ${link.text} link NOT found`);
        }
    });
    
    // Test 2: Check if target sections exist
    console.log('🔍 Test 2: Checking target sections existence...');
    navLinks.forEach(link => {
        const section = document.querySelector(link.href);
        if (section) {
            console.log(`✅ ${link.text} section found`);
        } else {
            console.log(`❌ ${link.text} section NOT found`);
        }
    });
    
    // Test 3: Test navigation functionality
    console.log('🔍 Test 3: Testing navigation clicks...');
    
    async function testNavigation() {
        for (const link of navLinks.slice(1)) { // Skip home, start with 致富
            console.log(`🖱️  Testing ${link.text} navigation...`);
            
            const navElement = document.querySelector(`a[href="${link.href}"]`);
            const targetSection = document.querySelector(link.href);
            
            if (navElement && targetSection) {
                // Click the navigation link
                navElement.click();
                
                // Wait for smooth scrolling
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Check if section is in viewport
                const rect = targetSection.getBoundingClientRect();
                const isInViewport = rect.top >= 0 && rect.top <= window.innerHeight;
                
                if (isInViewport) {
                    console.log(`✅ ${link.text} navigation successful - section in viewport`);
                } else {
                    console.log(`⚠️  ${link.text} navigation - section not fully in viewport (top: ${rect.top}px)`);
                }
            } else {
                console.log(`❌ ${link.text} navigation failed - missing elements`);
            }
        }
        
        console.log('🎉 Navigation testing completed!');
        
        // Test 4: Test hero buttons
        console.log('🔍 Test 4: Testing hero section buttons...');
        
        const primaryBtn = document.querySelector('.btn-primary');
        const secondaryBtn = document.querySelector('.btn-secondary');
        
        if (primaryBtn) {
            console.log('🖱️  Testing primary CTA button...');
            primaryBtn.click();
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const wealthSection = document.querySelector('#wealth');
            const wealthRect = wealthSection?.getBoundingClientRect();
            if (wealthRect && wealthRect.top <= window.innerHeight) {
                console.log('✅ Primary button works - navigated to wealth section');
            } else {
                console.log('❌ Primary button failed to navigate properly');
            }
        }
        
        // Scroll back to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (secondaryBtn) {
            console.log('🖱️  Testing secondary CTA button...');
            secondaryBtn.click();
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const philosophySection = document.querySelector('#philosophy');
            const philosophyRect = philosophySection?.getBoundingClientRect();
            if (philosophyRect && philosophyRect.top <= window.innerHeight) {
                console.log('✅ Secondary button works - navigated to philosophy section');
            } else {
                console.log('❌ Secondary button failed to navigate properly');
            }
        }
        
        // Test 5: Mobile navigation (if applicable)
        console.log('🔍 Test 5: Testing mobile navigation...');
        
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            console.log('🖱️  Testing hamburger menu...');
            
            // Set mobile viewport size for testing
            const originalWidth = window.innerWidth;
            
            // Simulate click
            hamburger.click();
            
            setTimeout(() => {
                if (navMenu.classList.contains('active')) {
                    console.log('✅ Mobile menu opens correctly');
                    
                    // Close menu
                    hamburger.click();
                    setTimeout(() => {
                        if (!navMenu.classList.contains('active')) {
                            console.log('✅ Mobile menu closes correctly');
                        } else {
                            console.log('❌ Mobile menu failed to close');
                        }
                    }, 300);
                } else {
                    console.log('❌ Mobile menu failed to open');
                }
            }, 300);
        } else {
            console.log('ℹ️  Mobile navigation elements not found (may be hidden on desktop)');
        }
        
        console.log('🏁 All navigation tests completed!');
    }
    
    testNavigation().catch(console.error);
    
}, 1000);

// Export for console use
if (typeof window !== 'undefined') {
    window.testNavigation = () => {
        console.log('🔄 Running navigation tests manually...');
        // Re-run tests
        location.reload();
    };
}

console.log('💡 To manually test navigation, run: testNavigation()');