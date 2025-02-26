// GSAP animations for the cover page
document.addEventListener('DOMContentLoaded', function() {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, TextPlugin);
    
    // Initialize the glitch effect for random intervals
    initGlitchEffect();
    
    // Animate the logo
    animateLogo();
    
    // Animate the title with glitch effect
    animateTitleWithGlitch();
    
    // Animate the counter
    animateCounter();
    
    // Animate the typewriter effect
    animateTypewriter();
    
    // Animate the scroll indicator
    animateScrollIndicator();
    
    // Animate the intro section
    animateIntroSection();
    
    // Setup the 3D tilt effect for the ID card
    setupTiltEffect();
});

// Initialize random glitch effect throughout the page
function initGlitchEffect() {
    const nameWords = document.querySelectorAll('.name-word');
    
    // Function to trigger a random glitch
    function triggerGlitch() {
        // Random glitch duration between 50ms and 200ms
        const duration = Math.random() * 150 + 50;
        
        // Random glitch intensity
        const intensity = Math.random() * 0.3 + 0.1;
        
        // Randomly trigger a more intense name glitch
        if (Math.random() > 0.7) {
            const randomOffset = Math.random() * 10 - 5;
            
            gsap.to(nameWords, {
                x: randomOffset,
                skewX: randomOffset,
                duration: duration / 800,
                onComplete: function() {
                    gsap.to(nameWords, {
                        x: 0,
                        skewX: 0,
                        duration: duration / 500
                    });
                }
            });
        }
        
        // Schedule the next glitch
        const nextDelay = Math.random() * 5000 + 2000; // Between 2 and 7 seconds
        setTimeout(triggerGlitch, nextDelay);
    }
    
    // Start the glitch sequence after a delay
    setTimeout(triggerGlitch, 2000);
}

// Animate the logo
function animateLogo() {
    const tl = gsap.timeline();
    
    // Animate the logo circle
    tl.to('.tva-logo-circle', {
        strokeDashoffset: 0,
        duration: 2,
        ease: "power2.inOut"
    });
    
    // Animate the logo triangle
    tl.to('.tva-logo-triangle', {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: "power2.inOut"
    }, "-=1");
    
    // Subtle pulse animation for the logo
    gsap.to('.tva-logo-svg', {
        scale: 1.05,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
}

// Animate the title with a glitch effect
function animateTitleWithGlitch() {
    // Animate the name words upward
    gsap.fromTo('.name-word', 
        { y: 100, opacity: 0 },
        { 
            y: 0, 
            opacity: 1, 
            duration: 1.5, 
            stagger: 0.3, 
            ease: "power3.out",
            delay: 0.5
        }
    );
    
    // Animate the tagline text
    gsap.fromTo('.tagline-text', 
        { y: 20, opacity: 0 },
        { 
            y: 0, 
            opacity: 0.8, 
            duration: 1, 
            delay: 2,
            ease: "power2.out"
        }
    );
    
    // Animate the designation appearance
    gsap.fromTo('.tva-designation', 
        { opacity: 0, scale: 0.8 },
        { 
            opacity: 1, 
            scale: 1, 
            duration: 0.8, 
            delay: 3,
            ease: "back.out(1.7)"
        }
    );
}

// Animate the counter with random number changes
function animateCounter() {
    const digits = document.querySelectorAll('.digit');
    
    // Function to update a random digit
    function updateRandomDigit() {
        // Choose a random digit
        const randomIndex = Math.floor(Math.random() * digits.length);
        const digit = digits[randomIndex];
        
        // Generate a random number
        const randomNumber = Math.floor(Math.random() * 10);
        
        // Animate the change
        gsap.to(digit, {
            opacity: 0,
            y: -10,
            duration: 0.2,
            onComplete: function() {
                digit.textContent = randomNumber;
                gsap.to(digit, {
                    opacity: 1,
                    y: 0,
                    duration: 0.2
                });
            }
        });
        
        // Schedule the next update
        const nextDelay = Math.random() * 3000 + 1000;
        setTimeout(updateRandomDigit, nextDelay);
    }
    
    // Start with an initial fade-in
    gsap.fromTo('.tva-counter', 
        { opacity: 0 },
        { 
            opacity: 1, 
            duration: 1, 
            delay: 3.5,
            onComplete: function() {
                // Start updating digits
                setTimeout(updateRandomDigit, 2000);
            }
        }
    );
}

// Animate the typewriter text
function animateTypewriter() {
    const typewriterText = document.querySelector('.typewriter-text');
    
    // Set initial state with no text
    typewriterText.textContent = '';
    
    // Animate the text appearing
    gsap.to('.tva-typing', {
        opacity: 1,
        duration: 1,
        delay: 4,
        onComplete: function() {
            const text = "FOR ALL CREATIVITY. ALWAYS.";
            
            // Set empty text first
            typewriterText.textContent = "";
            
            // Create a typing sequence with character by character animation
            let currentIndex = 0;
            
            function typeNextChar() {
                if (currentIndex < text.length) {
                    typewriterText.textContent += text[currentIndex];
                    currentIndex++;
                    
                    // Random typing delay for realistic effect
                    const delay = Math.random() * 100 + 50;
                    setTimeout(typeNextChar, delay);
                }
            }
            
            // Start typing animation
            typeNextChar();
        }
    });
}

// Animate the scroll indicator
function animateScrollIndicator() {
    gsap.fromTo('.scroll-indicator', 
        { opacity: 0, y: 20 },
        { 
            opacity: 1, 
            y: 0, 
            duration: 1, 
            delay: 6,
            ease: "power2.out"
        }
    );
    
    // Add click event to scroll to the intro section
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

// Animate the intro section when scrolled to
function animateIntroSection() {
    // Create scroll trigger animation for the section
    ScrollTrigger.create({
        trigger: '.intro-section',
        start: 'top 80%',
        onEnter: function() {
            // Animate image container
            gsap.fromTo('.intro-image-container', 
                { opacity: 0, rotateY: 30 },
                { 
                    opacity: 1, 
                    rotateY: 8, 
                    duration: 1.2,
                    ease: "power3.out"
                }
            );
            
            // Animate the ID card
            gsap.fromTo('.tva-id-card', 
                { opacity: 0, y: 20 },
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 0.8,
                    delay: 1,
                    ease: "back.out(1.7)"
                }
            );
            
            // Animate section title
            gsap.fromTo('.section-title', 
                { opacity: 0, y: 30 },
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 1,
                    ease: "power3.out"
                }
            );
            
            // Animate each paragraph with a fade-in effect
            gsap.fromTo('.typewriter-paragraph', 
                { opacity: 0, y: 20 },
                { 
                    opacity: 1, 
                    y: 0, 
                    stagger: 0.3,
                    duration: 0.8,
                    delay: 0.5,
                    ease: "power2.out"
                }
            );
            
            // Animate the link button
            gsap.fromTo('.intro-link', 
                { opacity: 0, y: 20 },
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 0.8,
                    delay: 1.5,
                    ease: "back.out(1.5)"
                }
            );
            
            // Animate the continue hint
            gsap.fromTo('.scroll-continue-hint', 
                { opacity: 0, y: 20 },
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 0.8,
                    delay: 2,
                    ease: "power2.out"
                }
            );
        },
        once: true
    });
    
    // Handle continue hint click
    const scrollContinueHint = document.querySelector('.scroll-continue-hint');
    if (scrollContinueHint) {
        scrollContinueHint.addEventListener('click', function() {
            const nextPage = 'projects.html';
            
            // Create and animate transition overlay
            const overlay = document.createElement('div');
            overlay.className = 'page-transition-overlay';
            document.body.appendChild(overlay);
            
            // Execute transition
            gsap.to(overlay, {
                y: '-100%',
                duration: 1.2,
                ease: "power3.inOut",
                onComplete: function() {
                    window.location.href = nextPage;
                }
            });
        });
    }
}

// Setup 3D tilt effect for the ID card
function setupTiltEffect() {
    const imageContainer = document.querySelector('.intro-image-container');
    
    // Update the tilt effect based on mouse position
    document.addEventListener('mousemove', function(e) {
        if (!imageContainer) return;
        
        const containerRect = imageContainer.getBoundingClientRect();
        const containerCenterX = containerRect.left + containerRect.width / 2;
        const containerCenterY = containerRect.top + containerRect.height / 2;
        
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        const maxAngle = 10; // Maximum rotation in degrees
        const distanceThreshold = 400; // Distance threshold for effect
        
        // Calculate distance from mouse to container center
        const distance = Math.sqrt(
            Math.pow(mouseX - containerCenterX, 2) + 
            Math.pow(mouseY - containerCenterY, 2)
        );
        
        // Apply rotation only if mouse is close enough to the container
        if (distance < distanceThreshold) {
            // Calculate angle based on distance from center
            const angleX = (containerCenterY - mouseY) / 30;
            const angleY = (mouseX - containerCenterX) / 30;
            
            // Clamp angles
            const clampedAngleX = Math.max(-maxAngle, Math.min(maxAngle, angleX));
            const clampedAngleY = Math.max(-maxAngle, Math.min(maxAngle, angleY));
            
            // Apply rotation with GSAP
            gsap.to(imageContainer, {
                rotateY: clampedAngleY,
                rotateX: clampedAngleX,
                duration: 0.5,
                ease: "power2.out"
            });
        } else {
            // Reset to default position when mouse is far
            gsap.to(imageContainer, {
                rotateY: 8,
                rotateX: 0,
                duration: 1,
                ease: "power2.out"
            });
        }
    });
}