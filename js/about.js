// About page animations for Sultan Aldeiro's portfolio

document.addEventListener('DOMContentLoaded', () => {
    // Initialize about page animations
    initAboutAnimations();
});

// Initialize about page animations with GSAP
function initAboutAnimations() {
    // Register ScrollTrigger and ScrollToPlugin plugins
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    
    // Initial animation timeline
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    // Animate about content
    tl.to('.about-title', { 
        y: 0, 
        opacity: 1, 
        duration: 1 
    });
    
    tl.to('.about-description', { 
        y: 0, 
        opacity: 1, 
        duration: 1 
    }, "-=0.7");
    
    tl.to('.timeline-hint', { 
        y: 0, 
        opacity: 1, 
        duration: 0.8 
    }, "-=0.7");
    
    // Animate timeline items with a stagger effect
    gsap.to('.timeline-item', {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        delay: 0.5
    });
    
    gsap.to('.timeline-end', {
        x: 0,
        opacity: 1,
        duration: 1,
        delay: 1.5
    });
    
    // Horizontal scroll for timeline
    const timeline = document.querySelector('.timeline');
    const timelineContainer = document.querySelector('.timeline-container');
    
    if (window.innerWidth > 992) { // Only for desktop
        // Enable horizontal scrolling with mouse wheel
        timelineContainer.addEventListener('wheel', (e) => {
            e.preventDefault();
            timelineContainer.scrollLeft += e.deltaY;
        });
        
        // Drag to scroll on timeline
        let isDragging = false;
        let startX, scrollLeft;
        
        timelineContainer.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.pageX - timelineContainer.offsetLeft;
            scrollLeft = timelineContainer.scrollLeft;
            timelineContainer.style.cursor = 'grabbing';
        });
        
        timelineContainer.addEventListener('mouseleave', () => {
            isDragging = false;
            timelineContainer.style.cursor = 'grab';
        });
        
        timelineContainer.addEventListener('mouseup', () => {
            isDragging = false;
            timelineContainer.style.cursor = 'grab';
        });
        
        timelineContainer.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - timelineContainer.offsetLeft;
            const walk = (x - startX) * 1.5; // Scroll speed multiplier
            timelineContainer.scrollLeft = scrollLeft - walk;
        });
        
        // Set initial cursor style
        timelineContainer.style.cursor = 'grab';
        
        // Animate timeline items on scroll
        ScrollTrigger.create({
            trigger: '.timeline-container',
            start: 'top bottom',
            end: 'bottom top',
            onUpdate: (self) => {
                const progress = self.progress;
                gsap.to(timeline, {
                    x: () => -progress * (timeline.offsetWidth - timelineContainer.offsetWidth),
                    ease: "none",
                    duration: 0.1
                });
            }
        });
    }
    
    // Timeline end button click event
    document.querySelector('.timeline-end').addEventListener('click', () => {
        // Navigate to projects page with animation
        gsap.to('main', {
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: "power2.in",
            onComplete: () => {
                window.location.href = 'projects.html';
            }
        });
    });
    
    // GSAP animations for timeline items on hover
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            // Additional GSAP animations on hover
            gsap.to(item.querySelector('.timeline-year'), {
                scale: 1.1,
                duration: 0.4,
                ease: "power2.out"
            });
        });
        
        item.addEventListener('mouseleave', () => {
            // Reset animations
            gsap.to(item.querySelector('.timeline-year'), {
                scale: 1,
                duration: 0.4,
                ease: "power2.out"
            });
        });
    });
}