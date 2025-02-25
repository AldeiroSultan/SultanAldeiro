// Main JavaScript for Sultan Aldeiro's portfolio
document.addEventListener('DOMContentLoaded', function() {
    // Initialize menu
    const menuButton = document.querySelector('.menu-button');
    const body = document.body;
    
    menuButton.addEventListener('click', function() {
        body.classList.toggle('menu-open');
    });
    
    // Basic animations for the current page
    initPageAnimations();
    
    // Handle menu links navigation properly
    const menuLinks = document.querySelectorAll('.menu-link');
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Always close the menu when a link is clicked
            body.classList.remove('menu-open');
        });
    });
    
    // Initialize transition indicators
    initTransitionIndicators();
});

// Initialize page-specific animations
function initPageAnimations() {
    // Cover page animations
    if (document.querySelector('.name-word')) {
        gsap.from('.name-word', { 
            y: 50, 
            opacity: 0, 
            duration: 1,
            stagger: 0.2,
            ease: "power3.out"
        });
        
        gsap.from('.tagline-text', { 
            y: 30, 
            opacity: 0, 
            duration: 1,
            delay: 0.8,
            ease: "power3.out"
        });
    }
    
    // About page animations
    if (document.querySelector('.about-title')) {
        gsap.from('.about-title', {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
        
        gsap.from('.about-description p', {
            y: 20,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            delay: 0.5,
            ease: "power3.out"
        });
    }
    
    // Projects page animations
    if (document.querySelector('.projects-title')) {
        gsap.from('.projects-title', {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
        
        gsap.from('.accordion-item', {
            y: 30,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            delay: 0.5,
            ease: "power3.out"
        });
    }
    
    // Contact page animations
    if (document.querySelector('.contact-title')) {
        gsap.from('.contact-title', {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
        
        gsap.from('.contact-card', {
            y: 30,
            opacity: 0,
            duration: 1,
            stagger: 0.15,
            delay: 0.5,
            ease: "power3.out"
        });
    }
}

// Initialize the page transition indicators
function initTransitionIndicators() {
    // Determine current page
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';
    
    // Define the page sequence
    const pageSequence = ['index.html', 'about.html', 'projects.html', 'contact.html'];
    
    // Find current position in sequence
    const currentIndex = pageSequence.indexOf(currentPage);
    
    // Get transition indicators
    const prevIndicator = document.querySelector('.page-transition-indicator.prev');
    const nextIndicator = document.querySelector('.page-transition-indicator.next');
    
    // Hide prev indicator if we're on the first page
    if (currentIndex === 0) {
        prevIndicator.style.display = 'none';
    }
    
    // Hide next indicator if we're on the last page
    if (currentIndex === pageSequence.length - 1) {
        nextIndicator.style.display = 'none';
    }
    
    // Add click event to next indicator
    nextIndicator.addEventListener('click', function() {
        if (currentIndex < pageSequence.length - 1) {
            document.body.style.opacity = '0';
            setTimeout(function() {
                window.location.href = pageSequence[currentIndex + 1];
            }, 300);
        }
    });
    
    // Add click event to prev indicator
    prevIndicator.addEventListener('click', function() {
        if (currentIndex > 0) {
            document.body.style.opacity = '0';
            setTimeout(function() {
                window.location.href = pageSequence[currentIndex - 1];
            }, 300);
        }
    });
}