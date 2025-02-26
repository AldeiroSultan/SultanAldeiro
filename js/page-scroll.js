// Page scrolling functionality with smooth transitions
document.addEventListener('DOMContentLoaded', function() {
    // Determine current page
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';
    
    // Define the page sequence
    const pageSequence = ['index.html', 'about.html', 'projects.html', 'contact.html'];
    
    // Find current position in sequence
    const currentIndex = pageSequence.indexOf(currentPage);
    
    // Variables for scroll detection
    let isScrolling = false;
    let cooldown = false;
    let scrollAccumulator = 0;
    const scrollThreshold = 600; // Higher threshold for less sensitivity
    const transitionDuration = 1200; // 1.2 seconds transition
    
    // ===== HOME PAGE SPECIFIC FUNCTIONALITY =====
    if (currentPage === 'index.html' || currentPage === '') {
        // Track scroll position to detect when we reach the bottom
        let hasReachedBottom = false;
        
        // Function to check if we've reached the bottom
        function checkForBottom() {
            // Get current scroll position
            const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
            const windowHeight = window.innerHeight;
            const documentHeight = Math.max(
                document.body.scrollHeight,
                document.body.offsetHeight,
                document.documentElement.scrollHeight,
                document.documentElement.offsetHeight
            );
            
            // Check if we're at or very near the bottom
            if (scrollPosition + windowHeight >= documentHeight - 50) {
                if (!hasReachedBottom && !isScrolling && !cooldown) {
                    hasReachedBottom = true;
                    
                    // Wait a moment to let user see the bottom, then transition
                    setTimeout(() => {
                        performTransitionToNextPage('up');
                    }, 500);
                }
            } else {
                hasReachedBottom = false;
            }
        }
        
        // Listen for scroll events
        window.addEventListener('scroll', function() {
            checkForBottom();
        });
    }
    
    // ===== ABOUT PAGE HORIZONTAL SCROLLING =====
    if (currentPage === 'about.html') {
        const horizontalContainer = document.querySelector('.horizontal-scroll-container');
        
        if (horizontalContainer) {
            // Handle horizontal scrolling with mouse wheel
            horizontalContainer.addEventListener('wheel', function(e) {
                e.preventDefault();
                
                // More controlled, slower horizontal scrolling
                horizontalContainer.scrollLeft += e.deltaY * 0.5;
                
                // Check if we're at the end of the horizontal content
                const isAtEnd = (horizontalContainer.scrollLeft + horizontalContainer.clientWidth) >= 
                               (horizontalContainer.scrollWidth - 50);
                
                // When we reach the end and are still trying to scroll down, prepare for page transition
                if (isAtEnd && e.deltaY > 0) {
                    scrollAccumulator += e.deltaY;
                    if (scrollAccumulator > scrollThreshold) {
                        performTransitionToNextPage('up');
                        scrollAccumulator = 0;
                    }
                }
                
                // When at the beginning and scrolling up, go back to previous page
                if (horizontalContainer.scrollLeft <= 10 && e.deltaY < 0) {
                    scrollAccumulator -= e.deltaY;
                    if (scrollAccumulator > scrollThreshold) {
                        performTransitionToPrevPage('down');
                        scrollAccumulator = 0;
                    }
                }
            }, { passive: false });
            
            // Support keyboard arrow keys for horizontal scrolling
            document.addEventListener('keydown', function(e) {
                if (e.key === 'ArrowRight') {
                    horizontalContainer.scrollBy({
                        left: 100,
                        behavior: 'smooth'
                    });
                    
                    // Check if we're at the end
                    const isAtEnd = (horizontalContainer.scrollLeft + horizontalContainer.clientWidth) >= 
                                   (horizontalContainer.scrollWidth - 150);
                    
                    if (isAtEnd) {
                        performTransitionToNextPage('up');
                    }
                } else if (e.key === 'ArrowLeft') {
                    horizontalContainer.scrollBy({
                        left: -100,
                        behavior: 'smooth'
                    });
                    
                    // Check if we're at the beginning
                    if (horizontalContainer.scrollLeft <= 100) {
                        performTransitionToPrevPage('down');
                    }
                }
            });
        }
    }
    
    // ===== UNIVERSAL NAVIGATION FUNCTIONS =====
    
    // Transition to next page with smooth animation
    function performTransitionToNextPage(direction) {
        if (isScrolling || cooldown) return;
        
        isScrolling = true;
        cooldown = true;
        
        // Create a transition overlay element
        const overlay = document.createElement('div');
        overlay.className = 'page-transition-overlay';
        
        if (direction === 'up') {
            // Coming from bottom
            overlay.style.top = '100%';
            overlay.style.transform = 'translateY(0)';
        } else {
            // Default side animation
            overlay.style.transform = 'translateY(100%)';
        }
        
        document.body.appendChild(overlay);
        
        // Animate transition
        if (direction === 'up') {
            gsap.to(overlay, {
                top: '0%',
                duration: 1.2,
                ease: "power3.inOut",
                onComplete: function() {
                    navigateToNextPage();
                }
            });
        } else {
            gsap.to(overlay, {
                y: '-100%',
                duration: 1.2,
                ease: "power3.inOut",
                onComplete: function() {
                    navigateToNextPage();
                }
            });
        }
    }
    
    // Transition to previous page
    function performTransitionToPrevPage(direction) {
        if (isScrolling || cooldown) return;
        
        isScrolling = true;
        cooldown = true;
        
        // Create transition overlay
        const overlay = document.createElement('div');
        overlay.className = 'page-transition-overlay';
        
        if (direction === 'down') {
            // Coming from top
            overlay.style.bottom = '100%';
            overlay.style.top = 'auto';
            overlay.style.transform = 'translateY(0)';
        } else {
            // Default side animation
            overlay.style.transform = 'translateY(-100%)';
        }
        
        document.body.appendChild(overlay);
        
        // Animate transition
        if (direction === 'down') {
            gsap.to(overlay, {
                bottom: '0%',
                duration: 1.2,
                ease: "power3.inOut",
                onComplete: function() {
                    navigateToPrevPage();
                }
            });
        } else {
            gsap.to(overlay, {
                y: '100%',
                duration: 1.2,
                ease: "power3.inOut",
                onComplete: function() {
                    navigateToPrevPage();
                }
            });
        }
    }
    
    // Navigate to the next page in sequence
    function navigateToNextPage() {
        if (currentIndex < pageSequence.length - 1) {
            window.location.href = pageSequence[currentIndex + 1];
        }
    }
    
    // Navigate to the previous page in sequence
    function navigateToPrevPage() {
        if (currentIndex > 0) {
            window.location.href = pageSequence[currentIndex - 1];
        }
    }
    
    // Set cooldown to prevent accidental transitions
    function setCooldown() {
        cooldown = true;
        setTimeout(function() {
            cooldown = false;
        }, transitionDuration + 500);
    }
    
    // Initialize cooldown after page load
    setCooldown();
});