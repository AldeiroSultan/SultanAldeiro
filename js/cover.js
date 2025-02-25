// Cover page animations for Sultan Aldeiro's portfolio

document.addEventListener('DOMContentLoaded', () => {
    // Initialize cover page animations
    initCoverAnimations();
});

// Initialize cover page animations with GSAP
function initCoverAnimations() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Initial animation timeline
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    // Animate name words
    tl.to('.name-word', { 
        y: 0, 
        opacity: 1, 
        duration: 1.2, 
        stagger: 0.2 
    });
    
    // Animate tagline
    tl.to('.tagline-text', { 
        y: 0, 
        opacity: 1, 
        duration: 1, 
    }, "-=0.5");
    
    // Create smooth scroll down animation
    document.querySelector('.scroll-indicator').addEventListener('click', () => {
        gsap.to(window, {
            duration: 1.5,
            scrollTo: window.innerHeight,
            ease: "power2.inOut"
        });
    });
    
    // Page transition when leaving
    const links = document.querySelectorAll('a:not(.menu-link)');
    links.forEach(link => {
        link.addEventListener('click', e => {
            if (link.getAttribute('href').startsWith('#')) return;
            if (link.getAttribute('href') !== window.location.pathname && 
                link.getAttribute('target') !== '_blank') {
                
                e.preventDefault();
                
                const href = link.getAttribute('href');
                
                // Animate out
                gsap.to('main', {
                    opacity: 0,
                    y: 20,
                    duration: 0.6,
                    ease: "power2.in",
                    onComplete: () => {
                        window.location.href = href;
                    }
                });
            }
        });
    });
    
    // Create a dynamic effect with mouse movement
    const nameContainer = document.querySelector('.name-container');
    window.addEventListener('mousemove', e => {
        const x = (window.innerWidth / 2 - e.clientX) / 50;
        const y = (window.innerHeight / 2 - e.clientY) / 50;
        
        gsap.to(nameContainer, {
            x: x,
            y: y,
            duration: 1,
            ease: "power2.out"
        });
    });
    
    // Animate out when scrolling down
    gsap.to('.name-container', {
        scrollTrigger: {
            trigger: '.cover-container',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        },
        opacity: 0,
        y: -100
    });
    
    // Animate scroll indicator
    gsap.to('.scroll-indicator', {
        scrollTrigger: {
            trigger: '.cover-container',
            start: 'top top',
            end: '10% top',
            scrub: true
        },
        opacity: 0,
        y: 20
    });
}