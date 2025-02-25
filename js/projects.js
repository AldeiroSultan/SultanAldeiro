// Projects page animations for Sultan Aldeiro's portfolio

document.addEventListener('DOMContentLoaded', () => {
    // Initialize projects page animations
    initProjectsAnimations();
});

// Initialize projects page animations with GSAP
function initProjectsAnimations() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Initial animation timeline
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    // Animate projects title
    tl.to('.projects-title', { 
        y: 0, 
        opacity: 1, 
        duration: 1 
    });
    
    // Animate accordion items with stagger
    tl.to('.accordion-item', { 
        y: 0, 
        opacity: 1, 
        duration: 1, 
        stagger: 0.15 
    }, "-=0.5");
    
    // Animate navigation
    tl.to('.projects-nav', { 
        y: 0, 
        opacity: 1, 
        duration: 0.8 
    }, "-=0.5");
    
    // Setup accordion functionality
    setupAccordion();
    
    // Parallax effect for project images
    gsap.utils.toArray('.project-image-container').forEach(container => {
        gsap.to(container.querySelector('.project-image'), {
            y: 20,
            ease: "none",
            scrollTrigger: {
                trigger: container,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    });
}

// Setup accordion functionality
function setupAccordion() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    // Add click event to accordion headers
    accordionHeaders.forEach((header, index) => {
        header.addEventListener('click', () => {
            const item = accordionItems[index];
            const content = item.querySelector('.accordion-content');
            
            // Toggle active class
            const isActive = item.classList.contains('active');
            
            // Close all accordions
            accordionItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    gsap.to(otherItem.querySelector('.accordion-content'), {
                        maxHeight: 0,
                        duration: 0.5,
                        ease: "power2.out"
                    });
                }
            });
            
            // Toggle current accordion with GSAP animations
            if (isActive) {
                // Close accordion
                item.classList.remove('active');
                gsap.to(content, {
                    maxHeight: 0,
                    duration: 0.5,
                    ease: "power2.out"
                });
            } else {
                // Open accordion
                item.classList.add('active');
                
                // Reset max-height to allow measuring
                content.style.maxHeight = 'none';
                const height = content.offsetHeight;
                content.style.maxHeight = '0px';
                
                // Animate opening
                gsap.to(content, {
                    maxHeight: height,
                    duration: 0.8,
                    ease: "power3.out",
                    onComplete: () => {
                        // For smoother height changes while open
                        content.style.maxHeight = 'none';
                    }
                });
                
                // Animate project details
                const projectImage = content.querySelector('.project-image-container');
                const projectInfo = content.querySelector('.project-info');
                
                gsap.timeline()
                    .to(projectImage, {
                        opacity: 1,
                        y: 0,
                        duration: 0.7,
                        delay: 0.2
                    })
                    .to(projectInfo, {
                        opacity: 1,
                        y: 0,
                        duration: 0.7
                    }, "-=0.4");
            }
        });
    });
    
    // Add hover effects with GSAP
    accordionHeaders.forEach(header => {
        header.addEventListener('mouseenter', () => {
            gsap.to(header.querySelector('.project-title'), {
                x: 10,
                duration: 0.3,
                ease: "power2.out"
            });
            
            gsap.to(header.querySelector('.accordion-icon'), {
                rotation: 90,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        header.addEventListener('mouseleave', () => {
            gsap.to(header.querySelector('.project-title'), {
                x: 0,
                duration: 0.3,
                ease: "power2.out"
            });
            
            // Only reset rotation if not active
            if (!header.parentElement.classList.contains('active')) {
                gsap.to(header.querySelector('.accordion-icon'), {
                    rotation: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        });
    });
}