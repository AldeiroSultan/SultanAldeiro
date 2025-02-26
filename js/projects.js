// Projects page functionality with parallax accordion
document.addEventListener('DOMContentLoaded', function() {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);
    
    // Initialize the page animations
    animateProjectsPage();
    
    // Initialize the accordion functionality
    initAccordion();
    
    // Initialize parallax effects
    initParallaxEffects();
});

// Animate the projects page elements
function animateProjectsPage() {
    // Animate the page header
    gsap.fromTo('.page-header', 
        { opacity: 0, y: -30 },
        { 
            opacity: 1, 
            y: 0, 
            duration: 1, 
            ease: "power3.out"
        }
    );
    
    // Staggered animation for project panels
    gsap.fromTo('.project-panel', 
        { opacity: 0, y: 50 },
        { 
            opacity: 1, 
            y: 0, 
            duration: 1, 
            stagger: 0.2, 
            ease: "power3.out",
            delay: 0.5
        }
    );
}

// Initialize accordion functionality
function initAccordion() {
    const panels = document.querySelectorAll('.project-panel');
    
    // Add click event to each panel header
    panels.forEach((panel) => {
        const header = panel.querySelector('.panel-header');
        const content = panel.querySelector('.panel-content');
        
        if (header && content) {
            header.addEventListener('click', () => {
                // Check if this panel is already active
                const isActive = panel.classList.contains('active');
                
                // Close all panels
                panels.forEach((p) => {
                    const pContent = p.querySelector('.panel-content');
                    if (p !== panel) {
                        p.classList.remove('active');
                        
                        // Animate panel closing with GSAP
                        gsap.to(pContent, {
                            height: 0,
                            duration: 0.5,
                            ease: "power3.out"
                        });
                    }
                });
                
                // Toggle the clicked panel
                if (isActive) {
                    panel.classList.remove('active');
                    
                    // Animate panel closing
                    gsap.to(content, {
                        height: 0,
                        duration: 0.5,
                        ease: "power3.out"
                    });
                } else {
                    panel.classList.add('active');
                    
                    // Get natural height of the content
                    content.style.height = 'auto';
                    const height = content.offsetHeight;
                    content.style.height = '0px';
                    
                    // Animate panel opening
                    gsap.to(content, {
                        height: height,
                        duration: 0.5,
                        ease: "power3.out",
                        onComplete: function() {
                            // Set height to auto after animation completes
                            content.style.height = 'auto';
                            
                            // Animate the project details with staggered effect
                            const details = content.querySelectorAll('.project-image-container, .project-desc p, .meta-title, .tech-tags, .role-text, .year-text, .project-link');
                            
                            gsap.fromTo(details, 
                                { opacity: 0, y: 20 },
                                { 
                                    opacity: 1, 
                                    y: 0, 
                                    duration: 0.6, 
                                    stagger: 0.1, 
                                    ease: "power3.out"
                                }
                            );
                        }
                    });
                    
                    // Scroll the panel into view if needed
                    const panelTop = panel.getBoundingClientRect().top;
                    const windowHeight = window.innerHeight;
                    
                    if (panelTop < 100) {
                        // If panel is too close to the top, scroll it down a bit
                        window.scrollTo({
                            top: window.pageYOffset + panelTop - 100,
                            behavior: 'smooth'
                        });
                    } else if (panelTop > windowHeight - 200) {
                        // If panel is too far down, scroll it up
                        window.scrollTo({
                            top: window.pageYOffset + panelTop - 200,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        }
    });
}

// Initialize parallax effects
function initParallaxEffects() {
    // Create parallax effect for project panels when scrolling
    const panels = document.querySelectorAll('.project-panel');
    
    panels.forEach((panel, index) => {
        // Create scroll-based animation for each panel
        ScrollTrigger.create({
            trigger: panel,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            onUpdate: function(self) {
                // Calculate parallax offset based on scroll progress
                const yOffset = (self.progress - 0.5) * 50;
                
                // Apply parallax effect with different intensities for each panel
                gsap.to(panel, {
                    y: yOffset * (index % 2 ? 1 : -1) * 0.5,
                    duration: 0.1,
                    ease: "none"
                });
            }
        });
        
        // Create hover effects for images
        const image = panel.querySelector('.project-image');
        if (image) {
            panel.addEventListener('mouseenter', () => {
                gsap.to(image, {
                    scale: 1.05,
                    duration: 0.5,
                    ease: "power2.out"
                });
            });
            
            panel.addEventListener('mouseleave', () => {
                gsap.to(image, {
                    scale: 1,
                    duration: 0.5,
                    ease: "power2.out"
                });
            });
        }
        
        // Animate project links on hover
        const link = panel.querySelector('.project-link');
        if (link) {
            link.addEventListener('mouseenter', () => {
                gsap.to(link.querySelector('.link-arrow'), {
                    x: 5,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
            
            link.addEventListener('mouseleave', () => {
                gsap.to(link.querySelector('.link-arrow'), {
                    x: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        }
    });
    
    // Create a subtle movement effect on mouse move
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        // Calculate normalized mouse position (-1 to 1)
        const normalizedX = (mouseX / windowWidth) * 2 - 1;
        const normalizedY = (mouseY / windowHeight) * 2 - 1;
        
        // Apply subtle movement to panels based on mouse position
        panels.forEach((panel, index) => {
            // Different movement intensity for each panel
            const intensity = 5 * (index % 3 + 1) * 0.5;
            
            gsap.to(panel, {
                x: normalizedX * intensity,
                y: normalizedY * intensity,
                rotation: normalizedX * 0.5,
                duration: 1,
                ease: "power2.out"
            });
        });
    });
}