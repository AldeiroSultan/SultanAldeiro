// Menu functionality for Sultan Aldeiro's portfolio

document.addEventListener('DOMContentLoaded', () => {
    // Background animation
    initBackgroundAnimation();
    
    // Menu functionality
    initMenu();
});

// Initialize the background animation
function initBackgroundAnimation() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    let width, height;
    let particles = [];
    const particleCount = 30;
    
    // Set canvas size
    function resizeCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        
        // Recreate particles
        createParticles();
    }
    
    // Create particles
    function createParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 3 + 1,
                color: `rgba(${Math.floor(Math.random() * 30 + 225)}, ${Math.floor(Math.random() * 30 + 225)}, ${Math.floor(Math.random() * 30 + 225)}, 0.05)`,
                speedX: Math.random() * 0.2 - 0.1,
                speedY: Math.random() * 0.2 - 0.1
            });
        }
    }
    
    // Animate particles
    function animateParticles() {
        ctx.clearRect(0, 0, width, height);
        
        // Draw particles
        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
            
            // Move particles
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > height) particle.speedY *= -1;
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    // Initialize
    resizeCanvas();
    animateParticles();
    
    // Handle resize
    window.addEventListener('resize', resizeCanvas);
}

// Initialize menu functionality
function initMenu() {
    const menuButton = document.querySelector('.menu-button');
    const body = document.body;
    
    menuButton.addEventListener('click', () => {
        body.classList.toggle('menu-open');
        
        // Animate menu items with GSAP if menu is open
        if (body.classList.contains('menu-open')) {
            gsap.fromTo('.menu-link', 
                { y: 50, opacity: 0 },
                { 
                    y: 0, 
                    opacity: 1, 
                    stagger: 0.1, 
                    duration: 0.8, 
                    ease: "power3.out",
                    delay: 0.2
                }
            );
        }
    });
    
    // Close menu when clicking on menu links
    const menuLinks = document.querySelectorAll('.menu-link');
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.getAttribute('href') !== window.location.pathname) {
                e.preventDefault();
                
                // Animate out current page
                gsap.to('main', {
                    opacity: 0,
                    y: 20,
                    duration: 0.6,
                    ease: "power2.in",
                    onComplete: () => {
                        window.location.href = link.getAttribute('href');
                    }
                });
            } else {
                body.classList.remove('menu-open');
            }
        });
    });
}