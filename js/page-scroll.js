// Advanced page scrolling functionality
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
    const scrollThreshold = 400; // Adjusted threshold for better control
    const transitionDuration = 1200; // 1.2 seconds transition
    
    // Add fade-in effect when page loads
    document.body.style.opacity = '0';
    document.body.style.transition = `opacity ${transitionDuration/1000}s ease`;
    
    setTimeout(function() {
        document.body.style.opacity = '1';
    }, 100);
    
    // ===== HOME PAGE SPECIFIC FUNCTIONALITY =====
    if (currentPage === 'index.html' || currentPage === '') {
        // Track scroll position to detect when we reach the bottom
        let reachedBottom = false;
        let scrollTimer;
        
        // Function to check if we've reached the bottom
        function checkForBottom() {
            const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
            const windowHeight = window.innerHeight;
            const documentHeight = Math.max(
                document.body.scrollHeight,
                document.body.offsetHeight,
                document.documentElement.scrollHeight,
                document.documentElement.offsetHeight
            );
            
            // Check if we're at or very near the bottom
            if (scrollPosition + windowHeight >= documentHeight - 20) {
                if (!reachedBottom && !isScrolling && !cooldown) {
                    reachedBottom = true;
                    
                    // Wait a moment to let user see the bottom, then transition
                    setTimeout(() => {
                        performSwipeUpTransition();
                    }, 800);
                }
            } else {
                reachedBottom = false;
            }
        }
        
        // Listen for scroll events with debounce
        window.addEventListener('scroll', function() {
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(checkForBottom, 150);
        });
        
        // Handle scroll indicator click
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', function() {
                const introSection = document.getElementById('intro-section');
                if (introSection) {
                    introSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    }
    
    // ===== ABOUT PAGE HORIZONTAL SCROLLING =====
    if (currentPage === 'about.html') {
        const horizontalContainer = document.querySelector('.horizontal-scroll-container');
        
        if (horizontalContainer) {
            // Handle horizontal scrolling with mouse wheel
            horizontalContainer.addEventListener('wheel', function(e) {
                e.preventDefault();
                
                // More controlled, slower horizontal scrolling
                horizontalContainer.scrollLeft += e.deltaY * 0.3;
                
                // Check if we're at the end of the horizontal content
                const isAtEnd = (horizontalContainer.scrollLeft + horizontalContainer.clientWidth) >= 
                               (horizontalContainer.scrollWidth - 30);
                
                // When we reach the end and are still trying to scroll down, prepare for page transition
                if (isAtEnd && e.deltaY > 0) {
                    scrollAccumulator += e.deltaY;
                    if (scrollAccumulator > scrollThreshold) {
                        navigateToNextPage();
                        scrollAccumulator = 0;
                    }
                }
                
                // When at the beginning and scrolling up, go back to previous page
                if (horizontalContainer.scrollLeft <= 10 && e.deltaY < 0) {
                    scrollAccumulator -= e.deltaY;
                    if (scrollAccumulator > scrollThreshold) {
                        navigateToPreviousPage();
                        scrollAccumulator = 0;
                    }
                }
            }, { passive: false });
            
            // Support keyboard arrow keys for horizontal scrolling
            document.addEventListener('keydown', function(e) {
                if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    horizontalContainer.scrollBy({
                        left: 100,
                        behavior: 'smooth'
                    });
                    
                    // Check if we're at the end
                    const isAtEnd = (horizontalContainer.scrollLeft + horizontalContainer.clientWidth) >= 
                                   (horizontalContainer.scrollWidth - 130);
                    
                    if (isAtEnd) {
                        setTimeout(() => {
                            navigateToNextPage();
                        }, 500);
                    }
                } else if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    horizontalContainer.scrollBy({
                        left: -100,
                        behavior: 'smooth'
                    });
                    
                    // Check if we're at the beginning
                    if (horizontalContainer.scrollLeft <= 100) {
                        setTimeout(() => {
                            navigateToPreviousPage();
                        }, 500);
                    }
                }
            });
        }
    }
    
    // ===== PROJECTS PAGE SCROLLING =====
    if (currentPage === 'projects.html') {
        window.addEventListener('wheel', function(e) {
            // At bottom scrolling down: go to next
            if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 50 && e.deltaY > 0) {
                scrollAccumulator += e.deltaY;
                if (scrollAccumulator > scrollThreshold) {
                    navigateToNextPage();
                    scrollAccumulator = 0;
                }
            } 
            // At top scrolling up: go to previous
            else if (window.pageYOffset <= 10 && e.deltaY < 0) {
                scrollAccumulator -= e.deltaY;
                if (scrollAccumulator > scrollThreshold) {
                    navigateToPreviousPage();
                    scrollAccumulator = 0;
                }
            } else {
                scrollAccumulator = 0; // Reset when just scrolling the page
            }
        });
        
        // Support keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowDown' && window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 50) {
                navigateToNextPage();
            } else if (e.key === 'ArrowUp' && window.pageYOffset <= 10) {
                navigateToPreviousPage();
            }
        });
    }
    
    // ===== UNIVERSAL NAVIGATION FUNCTIONS =====
    
    // Perform swipe up transition (used for home page)
    function performSwipeUpTransition() {
        if (isScrolling || cooldown) return;
        
        isScrolling = true;
        cooldown = true;
        
        // Create a swipe up transition overlay
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '100%';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'var(--color-accent)';
        overlay.style.zIndex = '9999';
        overlay.style.transition = 'transform 1.2s cubic-bezier(0.76, 0, 0.24, 1)';
        document.body.appendChild(overlay);
        
        // Animate the overlay to swipe up
        setTimeout(() => {
            overlay.style.transform = 'translateY(-100%)';
        }, 100);
        
        // After animation completes, navigate to next page
        setTimeout(() => {
            window.location.href = pageSequence[currentIndex + 1];
        }, 1000);
    }
    
    // Navigate to the next page with fade transition
    function navigateToNextPage() {
        if (currentIndex < pageSequence.length - 1 && !isScrolling && !cooldown) {
            isScrolling = true;
            cooldown = true;
            
            // Fade out current page
            document.body.style.opacity = '0';
            
            // Navigate to next page with delay
            setTimeout(function() {
                window.location.href = pageSequence[currentIndex + 1];
            }, transitionDuration);
        }
    }
    
    // Navigate to the previous page with fade transition
    function navigateToPreviousPage() {
        if (currentIndex > 0 && !isScrolling && !cooldown) {
            isScrolling = true;
            cooldown = true;
            
            // Fade out current page
            document.body.style.opacity = '0';
            
            // Navigate to previous page with delay
            setTimeout(function() {
                window.location.href = pageSequence[currentIndex - 1];
            }, transitionDuration);
        }
    }
    
    // Set cooldown to prevent accidental transitions
    function setCooldown() {
        cooldown = true;
        setTimeout(function() {
            cooldown = false;
        }, transitionDuration + 500);
    }
    
    // ===== PAGE NAVIGATION ELEMENTS =====
    
    // Set up click handlers for transitioning between pages
    
    // Handle timeline end click (for about page)
    const timelineEnd = document.querySelector('.timeline-end');
    if (timelineEnd) {
        timelineEnd.addEventListener('click', function() {
            navigateToNextPage();
        });
    }
    
    // Handle next link click (for projects page)
    const nextLink = document.querySelector('.next-link');
    if (nextLink) {
        nextLink.addEventListener('click', function(e) {
            e.preventDefault();
            navigateToNextPage();
        });
    }
    
    // Handle continue hint click
    const scrollContinueHint = document.querySelector('.scroll-continue-hint');
    if (scrollContinueHint) {
        scrollContinueHint.addEventListener('click', function() {
            navigateToNextPage();
        });
    }
    
    // Set up page transition indicators
    const nextIndicator = document.querySelector('.page-transition-indicator.next');
    const prevIndicator = document.querySelector('.page-transition-indicator.prev');
    
    if (nextIndicator) {
        nextIndicator.addEventListener('click', function() {
            if (!isScrolling && !cooldown) {
                // Animate button for feedback
                this.style.transform = 'translateY(-50%) scale(1.2)';
                setTimeout(() => {
                    this.style.transform = 'translateY(-50%) scale(1)';
                }, 200);
                
                // Use swipe animation for home page
                if (currentPage === 'index.html' || currentPage === '') {
                    performSwipeUpTransition();
                } else {
                    navigateToNextPage();
                }
            }
        });
    }
    
    if (prevIndicator) {
        prevIndicator.addEventListener('click', function() {
            if (!isScrolling && !cooldown) {
                // Animate button for feedback
                this.style.transform = 'translateY(-50%) scale(1.2)';
                setTimeout(() => {
                    this.style.transform = 'translateY(-50%) scale(1)';
                }, 200);
                
                navigateToPreviousPage();
            }
        });
    }
    
    // Hide indicators if we're at the beginning or end of sequence
    if (currentIndex === 0 && prevIndicator) {
        prevIndicator.style.display = 'none';
    }
    
    if (currentIndex === pageSequence.length - 1 && nextIndicator) {
        nextIndicator.style.display = 'none';
    }
    
    // Support keyboard navigation for all pages
    document.addEventListener('keydown', function(e) {
        // Skip if we're in the about page (handled separately)
        if (currentPage === 'about.html') return;
        
        // Down or Right arrow key for next page
        if ((e.key === 'ArrowDown' || e.key === 'ArrowRight') && !isScrolling && !cooldown) {
            if (currentPage === 'index.html' || currentPage === '') {
                performSwipeUpTransition();
            } else {
                navigateToNextPage();
            }
        }
        // Up or Left arrow key for previous page
        else if ((e.key === 'ArrowUp' || e.key === 'ArrowLeft') && !isScrolling && !cooldown) {
            navigateToPreviousPage();
        }
    });
});