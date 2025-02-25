// Contact page animations for Sultan Aldeiro's portfolio

document.addEventListener('DOMContentLoaded', () => {
    // Initialize contact page animations
    initContactAnimations();
});

// Initialize contact page animations with GSAP
function initContactAnimations() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Initial animation timeline
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    // Animate contact title
    tl.to('.contact-title', { 
        y: 0, 
        opacity: 1, 
        duration: 1 
    });
    
    // Animate text rows with stagger effect
    tl.to('.text-row', { 
        y: 0, 
        opacity: 1, 
        duration: 1, 
        stagger: 0.15 
    }, "-=0.5");
    
    // Set up different speeds and directions for running text
    setupRunningText();
    
    // Set up hover effects for text rows
    setupTextRowHoverEffects();
}

// Setup running text animations with different speeds and directions
function setupRunningText() {
    // Get all running text rows except the static one
    const textRows = document.querySelectorAll('.text-row:not(.contact-static-row)');
    
    // Set different speeds and directions for each row
    textRows.forEach((row, index) => {
        const runningTexts = row.querySelectorAll('.running-text');
        const isEven = index % 2 === 0;
        const speedFactor = 0.8 + (index * 0.2); // Different speed for each row
        
        // Set animation duration based on content length and speed factor
        const duration = 20 / speedFactor;
        
        // Animate first running text
        gsap.to(runningTexts[0], {
            x: isEven ? '-50%' : '0%',
            duration: duration,
            repeat: -1,
            ease: "none",
            repeatRefresh: true
        });
        
        // Animate second running text (if exists) in opposite direction
        if (runningTexts[1]) {
            gsap.fromTo(runningTexts[1], 
                { x: isEven ? '0%' : '-50%' },
                {
                    x: isEven ? '-50%' : '0%',
                    duration: duration,
                    repeat: -1,
                    ease: "none",
                    repeatRefresh: true
                }
            );
        }
    });
}

// Setup hover effects for text rows
function setupTextRowHoverEffects() {
    const textRows = document.querySelectorAll('.text-row:not(.contact-static-row)');
    
    textRows.forEach(row => {
        const runningTexts = row.querySelectorAll('.running-text');
        const platform = row.getAttribute('data-platform');
        
        row.addEventListener('mouseenter', () => {
            // Pause animation
            runningTexts.forEach(text => {
                gsap.to(text.querySelectorAll('span'), {
                    scale: 1.1,
                    letterSpacing: "3px",
                    color: "#e63946",
                    duration: 0.3,
                    stagger: 0.02
                });
            });
            
            // Show platform icon
            gsap.to(row, {
                backgroundSize: "120px 120px",
                backgroundPosition: "95% center",
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                duration: 0.5,
                ease: "power2.out"
            });
            
            // Add platform-specific effects
            switch(platform) {
                case 'linkedin':
                    gsap.to(row, { 
                        borderLeft: "4px solid #0077B5",
                        duration: 0.3
                    });
                    break;
                    
                case 'github':
                    gsap.to(row, { 
                        borderLeft: "4px solid #2b3137",
                        duration: 0.3
                    });
                    break;
                    
                case 'gmail':
                    gsap.to(row, { 
                        borderLeft: "4px solid #D14836",
                        duration: 0.3
                    });
                    break;
                    
                case 'instagram':
                    gsap.to(row, { 
                        borderLeft: "4px solid #C13584",
                        duration: 0.3
                    });
                    break;
            }
        });
        
        row.addEventListener('mouseleave', () => {
            // Resume animation
            runningTexts.forEach(text => {
                gsap.to(text.querySelectorAll('span'), {
                    scale: 1,
                    letterSpacing: "0px",
                    color: "white",
                    duration: 0.3,
                    stagger: 0.01
                });
            });
            
            // Hide platform icon
            gsap.to(row, {
                backgroundSize: "30px 30px",
                backgroundPosition: "center",
                backgroundColor: "rgba(255, 255, 255, 0.03)",
                borderLeft: "0px solid transparent",
                duration: 0.5,
                ease: "power2.out"
            });
        });
    });
    
    // Create a ripple effect when clicking on contact rows
    textRows.forEach(row => {
        row.addEventListener('click', (e) => {
            // Create ripple element
            const ripple = document.createElement('div');
            ripple.classList.add('ripple');
            
            // Position ripple at click coordinates
            const rect = row.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Set ripple styling with GSAP
            gsap.set(ripple, {
                position: 'absolute',
                top: y + 'px',
                left: x + 'px',
                width: '0',
                height: '0',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                zIndex: 0
            });
            
            // Add ripple to row
            row.appendChild(ripple);
            
            // Animate ripple
            gsap.to(ripple, {
                width: '500px',
                height: '500px',
                top: y - 250 + 'px',
                left: x - 250 + 'px',
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out',
                onComplete: () => {
                    ripple.remove();
                }
            });
        });
    });
}