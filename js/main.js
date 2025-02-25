// Main JavaScript for Sultan Aldeiro's portfolio

document.addEventListener('DOMContentLoaded', function() {
    // Initialize menu
    const menuButton = document.querySelector('.menu-button');
    const body = document.body;
    
    menuButton.addEventListener('click', function() {
        body.classList.toggle('menu-open');
    });
    
    // Basic animations for cover page
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
    
    // Close menu when clicking on menu links
    const menuLinks = document.querySelectorAll('.menu-link');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            // If it's not the current page, handle the navigation
            if (link.getAttribute('href') !== window.location.pathname.split('/').pop()) {
                // Just close the menu - no fancy animations yet until we get the basics working
                body.classList.remove('menu-open');
            }
        });
    });
});