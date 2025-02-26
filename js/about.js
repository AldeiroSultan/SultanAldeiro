// About page animations 
document.addEventListener('DOMContentLoaded', function() {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate the about section
    animateAboutSection();
    
    // Animate the timeline section
    animateTimelineSection();
    
    // Initialize horizontal scrolling behavior
    initHorizontalScroll();
});

// Animate the about section
function animateAboutSection() {
    const aboutSection = document.querySelector('.about-section');
    
    if (aboutSection) {
        // Create a timeline for the about section animations
        const tl = gsap.timeline({
            defaults: {
                ease: "power3.out"
            }
        });
        
        // Animate section header
        tl.fromTo('.about-section .section-header', 
            { opacity: 0, y: 30 },
            { 
                opacity: 1, 
                y: 0, 
                duration: 1
            }
        );
        
        // Animate section line
        tl.fromTo('.about-section .section-line', 
            { width: '0%', opacity: 0 },
            { 
                width: '80px', 
                opacity: 0.7, 
                duration: 1
            },
            "-=0.5"
        );
        
        // Animate the image container
        tl.fromTo('.about-image-container', 
            { opacity: 0, rotateY: 30 },
            { 
                opacity: 1, 
                rotateY: 8, 
                duration: 1.2
            },
            "-=0.7"
        );
        
        // Animate the ID card
        tl.fromTo('.tva-id-card', 
            { opacity: 0, y: 20 },
            { 
                opacity: 1, 
                y: 0, 
                duration: 0.8
            },
            "-=0.5"
        );
        
        // Animate file heading
        tl.fromTo('.file-heading', 
            { opacity: 0, x: -30 },
            { 
                opacity: 1, 
                x: 0, 
                duration: 0.8
            },
            "-=0.6"
        );
        
        // Animate data rows
        tl.fromTo('.data-row', 
            { opacity: 0, y: 20 },
            { 
                opacity: 1, 
                y: 0, 
                duration: 0.8,
                stagger: 0.2
            },
            "-=0.5"
        );
        
        // Animate description text
        tl.fromTo('.description-text', 
            { opacity: 0, y: 20 },
            { 
                opacity: 1, 
                y: 0, 
                duration: 0.8,
                stagger: 0.3
            },
            "-=0.5"
        );
        
        // Animate scroll hint
        tl.fromTo('.horizontal-scroll-hint', 
            { opacity: 0, x: 20 },
            { 
                opacity: 1, 
                x: 0, 
                duration: 0.8
            },
            "-=0.3"
        );
        
        // Setup tilt effect for the image container
        setupTiltEffect();
    }
}

// Animate the timeline section when scrolled to
function animateTimelineSection() {
    const timelineSection = document.querySelector('.timeline-section');
    
    if (timelineSection) {
        // Create a function to handle the animation when the section is visible
        function animateTimeline() {
            // Create a timeline for the timeline section animations
            const tl = gsap.timeline({
                defaults: {
                    ease: "power3.out"
                }
            });
            
            // Animate section header
            tl.fromTo('.timeline-section .section-header', 
                { opacity: 0, y: 30 },
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 1
                }
            );
            
            // Animate section line
            tl.fromTo('.timeline-section .section-line', 
                { width: '0%', opacity: 0 },
                { 
                    width: '80px', 
                    opacity: 0.7, 
                    duration: 1
                },
                "-=0.5"
            );
            
            // Animate the timeline axis
            tl.fromTo('.timeline-axis', 
                { scaleX: 0, opacity: 0 },
                { 
                    scaleX: 1, 
                    opacity: 0.5, 
                    duration: 1.5,
                    ease: "power2.inOut",
                    transformOrigin: "left center"
                },
                "-=0.5"
            );
            
            // Animate timeline items one by one
            tl.fromTo('.timeline-item', 
                { opacity: 0, y: 30 },
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 1,
                    stagger: 0.3
                },
                "-=1"
            );
            
            // Animate timeline end
            tl.fromTo('.timeline-end', 
                { opacity: 0, x: -30 },
                { 
                    opacity: 1, 
                    x: 0, 
                    duration: 0.8,
                    ease: "back.out(1.5)"
                },
                "-=0.5"
            );
        }
        
        // Set up an Intersection Observer to detect when the timeline section is visible
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateTimeline();
                // Stop observing after animation is triggered
                observer.disconnect();
            }
        }, { threshold: 0.2 });
        
        // Start observing the timeline section
        observer.observe(timelineSection);
    }
}

// Initialize horizontal scrolling behavior
function initHorizontalScroll() {
    const container = document.querySelector('.horizontal-scroll-container');
    const sections = document.querySelectorAll('.horizontal-section');
    
    if (container && sections.length > 0) {
        // Add click event to the scroll hint
        const scrollHint = document.querySelector('.horizontal-scroll-hint');
        if (scrollHint) {
            scrollHint.addEventListener('click', function() {
                // Scroll to the timeline section
                container.scrollTo({
                    left: sections[1].offsetLeft,
                    behavior: 'smooth'
                });
            });
        }
        
        // Add click event to timeline end
        const timelineEnd = document.querySelector('.timeline-end');
        if (timelineEnd) {
            timelineEnd.addEventListener('click', function() {
                // Create and animate transition overlay
                const overlay = document.createElement('div');
                overlay.className = 'page-transition-overlay';
                document.body.appendChild(overlay);
                
                // Execute transition to the projects page
                gsap.to(overlay, {
                    y: '-100%',
                    duration: 1.2,
                    ease: "power3.inOut",
                    onComplete: function() {
                        window.location.href = 'projects.html';
                    }
                });
            });
        }
        
        // Handle scroll to determine which section is visible
        container.addEventListener('scroll', function() {
            const scrollLeft = container.scrollLeft;
            const containerWidth = container.clientWidth;
            
            // Check each section to see if it's in view
            sections.forEach((section, index) => {
                const sectionLeft = section.offsetLeft;
                const sectionWidth = section.offsetWidth;
                
                // If section is mostly visible, consider it active
                if (scrollLeft >= sectionLeft - containerWidth / 2 && 
                    scrollLeft < sectionLeft + sectionWidth - containerWidth / 2) {
                    // This section is most visible
                    highlightCurrentSection(index);
                }
            });
        });
        
        // Smooth horizontal scrolling with mouse wheel
        container.addEventListener('wheel', function(e) {
            e.preventDefault();
            const delta = e.deltaY || e.deltaX;
            container.scrollLeft += delta;
            
            // Check if we're at the end of horizontal content
            const isAtEnd = (container.scrollLeft + container.clientWidth) >= 
                           (container.scrollWidth - 50);
            
            // When we reach the end and still trying to scroll, prepare for page transition
            if (isAtEnd && delta > 0) {
                const nextPage = document.querySelector('.page-transition-indicator.next');
                if (nextPage) nextPage.click();
            }
            
            // When at the beginning and scrolling up, go back to previous page
            if (container.scrollLeft <= 10 && delta < 0) {
                const prevPage = document.querySelector('.page-transition-indicator.prev');
                if (prevPage) prevPage.click();
            }
        }, { passive: false });
    }
}

// Highlight the current section
function highlightCurrentSection(index) {
    // Could be expanded to add visual indicators for which section is active
    console.log("Current section:", index);
}

// Setup 3D tilt effect for image container
function setupTiltEffect() {
    const imageContainer = document.querySelector('.about-image-container');
    
    if (imageContainer) {
        // Update the tilt effect based on mouse position
        document.addEventListener('mousemove', function(e) {
            const containerRect = imageContainer.getBoundingClientRect();
            const containerCenterX = containerRect.left + containerRect.width / 2;
            const containerCenterY = containerRect.top + containerRect.height / 2;
            
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            const maxAngle = 12; // Maximum rotation angle
            const distanceThreshold = 400; // Distance threshold
            
            // Calculate distance from mouse to container center
            const distance = Math.sqrt(
                Math.pow(mouseX - containerCenterX, 2) + 
                Math.pow(mouseY - containerCenterY, 2)
            );
            
            // Apply tilt only if mouse is relatively close to the container
            if (distance < distanceThreshold) {
                // Calculate angles based on mouse position
                const angleY = (mouseX - containerCenterX) / 30;
                const angleX = (containerCenterY - mouseY) / 30;
                
                // Limit angles to max values
                const clampedX = Math.max(-maxAngle, Math.min(maxAngle, angleX));
                const clampedY = Math.max(-maxAngle, Math.min(maxAngle, angleY));
                
                // Apply the tilt effect
                gsap.to(imageContainer, {
                    rotateY: clampedY,
                    rotateX: clampedX,
                    duration: 0.5,
                    ease: "power2.out"
                });
            } else {
                // Reset to default tilt when mouse is far
                gsap.to(imageContainer, {
                    rotateY: 8,
                    rotateX: 0,
                    duration: 1,
                    ease: "power2.out"
                });
            }
        });
    }
}