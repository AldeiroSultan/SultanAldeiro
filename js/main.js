// Main JavaScript for Sultan Aldeiro's portfolio
document.addEventListener('DOMContentLoaded', function() {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, TextPlugin);
    
    // Initialize menu functionality
    initMenu();
    
    // Initialize global effects
    initGlobalEffects();
    
    // Initialize the page transitions
    initPageTransitions();
});

// Initialize menu functionality with animations
function initMenu() {
    const menuButton = document.querySelector('.menu-button');
    const body = document.body;
    
    if (menuButton) {
        menuButton.addEventListener('click', function() {
            body.classList.toggle('menu-open');
            
            // Animate menu items when opened
            if (body.classList.contains('menu-open')) {
                // Animate menu header
                gsap.fromTo('.menu-logo', 
                    { opacity: 0, y: -30 },
                    { 
                        opacity: 1, 
                        y: 0, 
                        duration: 0.8, 
                        ease: "back.out(1.7)"
                    }
                );
                
                gsap.fromTo('.menu-title', 
                    { opacity: 0 },
                    { 
                        opacity: 1, 
                        duration: 0.8, 
                        delay: 0.2,
                        ease: "power2.out"
                    }
                );
                
                // Animate menu links
                gsap.fromTo('.menu-link', 
                    { y: 30, opacity: 0 },
                    { 
                        y: 0, 
                        opacity: 1, 
                        stagger: 0.1, 
                        duration: 0.6, 
                        ease: "power3.out",
                        delay: 0.3
                    }
                );
                
                // Animate menu footer
                gsap.fromTo('.menu-timeline', 
                    { opacity: 0 },
                    { 
                        opacity: 0.5, 
                        duration: 0.8, 
                        delay: 0.8,
                        ease: "power2.out"
                    }
                );
            }
        });
    }
}

// Initialize global visual effects and animations
function initGlobalEffects() {
    // Random glitch/flicker effect
    function createRandomGlitch() {
        // Random glitch targets
        const glitchTargets = [
            '.menu-icon span',
            '.page-transition-indicator',
            '.menu-icon-box'
        ];
        
        // Select random elements to glitch
        const targetIndex = Math.floor(Math.random() * glitchTargets.length);
        const targetSelector = glitchTargets[targetIndex];
        const targets = document.querySelectorAll(targetSelector);
        
        if (targets.length > 0 && Math.random() > 0.7) {
            // Random values for glitch effect
            const duration = Math.random() * 100 + 50; // 50-150ms
            const offsetX = (Math.random() * 4 - 2);
            const offsetY = (Math.random() * 4 - 2);
            
            gsap.to(targets, {
                x: offsetX,
                y: offsetY,
                duration: duration / 1000,
                ease: "steps(1)",
                onComplete: function() {
                    gsap.to(targets, {
                        x: 0,
                        y: 0,
                        duration: duration / 1000,
                        ease: "steps(1)"
                    });
                }
            });
        }
        
        // Schedule next glitch
        const nextDelay = Math.random() * 6000 + 2000; // 2-8 seconds
        setTimeout(createRandomGlitch, nextDelay);
    }
    
    // Start glitch sequence after initial delay
    setTimeout(createRandomGlitch, 4000);
}

// Initialize page transition effects
function initPageTransitions() {
    // Get current page information
    const currentPath = window.location.pathname;
    const pageName = currentPath.split('/').pop() || 'index.html';
    
    // Define the page sequence
    const pageSequence = ['index.html', 'about.html', 'projects.html', 'contact.html'];
    
    // Find current position in sequence
    const currentIndex = pageSequence.indexOf(pageName);
    
    // Variables for transition state
    let isTransitioning = false;
    
    // Add click events for page transition indicators
    const nextIndicator = document.querySelector('.page-transition-indicator.next');
    const prevIndicator = document.querySelector('.page-transition-indicator.prev');
    
    if (nextIndicator && currentIndex < pageSequence.length - 1) {
        nextIndicator.addEventListener('click', function() {
            if (!isTransitioning) {
                isTransitioning = true;
                
                // Create and animate transition overlay
                const overlay = document.createElement('div');
                overlay.className = 'page-transition-overlay';
                document.body.appendChild(overlay);
                
                // Visual feedback on click
                gsap.to(this, {
                    scale: 1.1,
                    duration: 0.2,
                    ease: "power2.out",
                    onComplete: function() {
                        gsap.to(this, {
                            scale: 1,
                            duration: 0.2
                        });
                    }
                });
                
                // Execute transition
                gsap.to(overlay, {
                    y: '-100%',
                    duration: 1.2,
                    ease: "power3.inOut",
                    onComplete: function() {
                        window.location.href = pageSequence[currentIndex + 1];
                    }
                });
            }
        });
    } else if (nextIndicator) {
        // Hide next indicator if we're on the last page
        nextIndicator.style.display = 'none';
    }
    
    if (prevIndicator && currentIndex > 0) {
        prevIndicator.addEventListener('click', function() {
            if (!isTransitioning) {
                isTransitioning = true;
                
                // Create and animate transition overlay from bottom
                const overlay = document.createElement('div');
                overlay.className = 'page-transition-overlay';
                overlay.style.transform = 'translateY(-100%)';
                document.body.appendChild(overlay);
                
                // Visual feedback on click
                gsap.to(this, {
                    scale: 1.1,
                    duration: 0.2,
                    ease: "power2.out",
                    onComplete: function() {
                        gsap.to(this, {
                            scale: 1,
                            duration: 0.2
                        });
                    }
                });
                
                // Execute transition
                gsap.to(overlay, {
                    y: '0%',
                    duration: 1.2,
                    ease: "power3.inOut",
                    onComplete: function() {
                        window.location.href = pageSequence[currentIndex - 1];
                    }
                });
            }
        });
    } else if (prevIndicator) {
        // Hide prev indicator if we're on the first page
        prevIndicator.style.display = 'none';
    }
    
    // Handle keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Arrow key navigation
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            if (nextIndicator && !isTransitioning && currentIndex < pageSequence.length - 1) {
                nextIndicator.click();
            }
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            if (prevIndicator && !isTransitioning && currentIndex > 0) {
                prevIndicator.click();
            }
        }
    });
    
    // Initial page entrance animation
    gsap.from('body', {
        opacity: 0,
        duration: 1,
        ease: "power2.inOut"
    });
}