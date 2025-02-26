// Contact page animations
document.addEventListener('DOMContentLoaded', function() {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);
    
    // Initialize page fade-in
    initPageFadeIn();
    
    // Initialize contact card animations
    initContactCards();
    
    // Initialize contact info animations
    initContactInfo();
});

// Initialize page fade-in animation
function initPageFadeIn() {
    // Fade in the page header
    gsap.fromTo('.page-header', 
        { opacity: 0, y: -30 },
        { 
            opacity: 1, 
            y: 0, 
            duration: 1, 
            ease: "power3.out"
        }
    );
}

// Initialize contact card animations
function initContactCards() {
    // Staggered animation for contact cards
    gsap.fromTo('.contact-card', 
        { opacity: 0, y: 30 },
        { 
            opacity: 1, 
            y: 0, 
            duration: 0.8, 
            stagger: 0.15, 
            ease: "power3.out",
            delay: 0.5
        }
    );
    
    // Set up hover animations for contact cards
    const contactCards = document.querySelectorAll('.contact-card:not(.static)');
    
    contactCards.forEach(card => {
        // Store the original animation speed
        const cardText = card.querySelector('.card-text');
        const cardIcon = card.querySelector('.card-icon');
        
        // Set the card text attribute for the scrolling text effect
        if (cardText && cardText.textContent) {
            card.setAttribute('data-text', cardText.textContent.repeat(10));
        }
        
        // Hover effects
        card.addEventListener('mouseenter', () => {
            // Pause the scrolling animation
            gsap.to(card, {
                borderLeftWidth: '4px',
                duration: 0.3,
                ease: "power2.out"
            });
            
            // Animate the icon
            if (cardIcon) {
                gsap.to(cardIcon, {
                    scale: 1.2,
                    duration: 0.5,
                    ease: "back.out(1.7)"
                });
            }
            
            // Animate the text
            if (cardText) {
                gsap.to(cardText, {
                    x: 10,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        });
        
        card.addEventListener('mouseleave', () => {
            // Resume the scrolling animation
            gsap.to(card, {
                borderLeftWidth: '0px',
                duration: 0.3,
                ease: "power2.out"
            });
            
            // Reset the icon
            if (cardIcon) {
                gsap.to(cardIcon, {
                    scale: 1,
                    duration: 0.5,
                    ease: "power2.out"
                });
            }
            
            // Reset the text
            if (cardText) {
                gsap.to(cardText, {
                    x: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        });
        
        // Click effect for better feedback
        card.addEventListener('click', () => {
            gsap.to(card, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                ease: "power2.inOut"
            });
        });
    });
    
    // Special animation for the static card
    const staticCard = document.querySelector('.contact-card.static');
    if (staticCard) {
        // Subtle pulsing animation
        gsap.to(staticCard, {
            scale: 1.02,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }
}

// Initialize contact info section animations
function initContactInfo() {
    const infoSections = document.querySelectorAll('.info-section');
    
    // Create staggered animation for info sections
    gsap.fromTo(infoSections, 
        { opacity: 0, y: 30 },
        { 
            opacity: 1, 
            y: 0, 
            duration: 0.8, 
            stagger: 0.2, 
            ease: "power3.out",
            delay: 1
        }
    );
    
    // Animate the underlines on titles
    infoSections.forEach(section => {
        const title = section.querySelector('.info-title');
        
        if (title) {
            // Create a timeline for the title animation
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: title,
                    start: "top 80%",
                    once: true
                }
            });
            
            // Animate the underline
            tl.fromTo(title, 
                { "--underline-width": "0%" },
                { 
                    "--underline-width": "50px", 
                    duration: 0.8, 
                    ease: "power3.out"
                }
            );
        }
    });
    
    // Animate info text elements with staggered fade-in
    infoSections.forEach(section => {
        const textElements = section.querySelectorAll('.info-text, .info-email');
        
        gsap.fromTo(textElements, 
            { opacity: 0, y: 20 },
            { 
                opacity: 1, 
                y: 0, 
                duration: 0.6, 
                stagger: 0.15, 
                ease: "power3.out",
                delay: 1.2
            }
        );
    });
    
    // Add hover animation for email link
    const emailLink = document.querySelector('.info-email');
    if (emailLink) {
        emailLink.addEventListener('mouseenter', () => {
            gsap.to(emailLink, {
                color: '#fff',
                duration: 0.3
            });
        });
        
        emailLink.addEventListener('mouseleave', () => {
            gsap.to(emailLink, {
                color: 'var(--color-accent)',
                duration: 0.3
            });
        });
    }
}