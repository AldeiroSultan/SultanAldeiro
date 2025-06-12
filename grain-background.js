// Film Grain Background Script - Replace grid-background.js with this
document.addEventListener('DOMContentLoaded', function() {
    // Create background container and elements
    const backgroundContainer = document.createElement('div');
    backgroundContainer.className = 'grain-background-container';
    backgroundContainer.innerHTML = `
        <div class="spotlight"></div>
        <canvas id="noise"></canvas>
        <canvas id="scratch"></canvas>
        <svg style="display: none;">
            <filter id="disp-1">
                <feTurbulence id="seed" type="fractalNoise" baseFrequency="0.015" numOctaves="2" seed="0"></feTurbulence>
                <feDisplacementMap in="SourceGraphic" scale="15"></feDisplacementMap>
            </filter>  
        </svg>
    `;
    
    // Add to document before all other content
    document.body.insertBefore(backgroundContainer, document.body.firstChild);
    
    // Configuration
    const n = 80; // Time interval in milliseconds for grain updates
    
    // Get canvas elements
    const noise = document.getElementById("noise");
    const scratch = document.getElementById("scratch");
    const ctx = noise.getContext("2d");
    const scratchCtx = scratch.getContext("2d");
    const seed = document.getElementById("seed");
    
    // Spotlight element
    const spotlight = document.querySelector('.spotlight');
    
    // Draw vertical scratches
    const drawVerticalLine = (xPosition, lineHeight) => {
        scratchCtx.strokeStyle = Math.random() > 0.7 ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.3)";
        scratchCtx.lineWidth = Math.floor(Math.random() * 2) + 1;
        scratchCtx.beginPath();
        scratchCtx.moveTo(xPosition, 0);
        scratchCtx.lineTo(xPosition, lineHeight);
        scratchCtx.stroke();
    };
    
    // Resize canvases to match window
    function resizeCanvas() {
        const width = window.innerWidth || 1920;
        const height = window.innerHeight || 1080;
        
        noise.width = width;
        noise.height = height;
        scratch.width = width;
        scratch.height = height;
        
        // Only generate noise if dimensions are valid
        if (width > 0 && height > 0) {
            generateNoise();
        }
    }
    
    // Generate realistic film grain
    function generateNoise() {
        const width = noise.width;
        const height = noise.height;
        
        // Safety check for valid dimensions
        if (width <= 0 || height <= 0) {
            console.warn('Invalid canvas dimensions:', width, height);
            return;
        }
        
        try {
            const imageData = ctx.createImageData(width, height);
            const data = imageData.data;
            
            for (let i = 0; i < data.length; i += 4) {
                const color = Math.random() * 120; // Reduce intensity for subtlety
                data[i] = color; // Red
                data[i + 1] = color; // Green
                data[i + 2] = color; // Blue
                data[i + 3] = 40; // Alpha - more subtle
            }
            
            ctx.putImageData(imageData, 0, 0);
        } catch (error) {
            console.error('Error generating noise:', error);
        }
    }
    
    // Creative spotlight movement based on scroll and time
    function updateSpotlight() {
        const scrollPercent = window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight);
        const time = Date.now() * 0.001; // Current time in seconds
        
        // Creative movement pattern - figure-8 with scroll progression
        const baseX = 20 + (scrollPercent * 60); // 20% to 80% as we scroll
        const baseY = 30 + (scrollPercent * 40); // 30% to 70% as we scroll
        
        // Add organic movement patterns
        const spiralX = Math.sin(scrollPercent * Math.PI * 2 + time * 0.5) * 15;
        const spiralY = Math.cos(scrollPercent * Math.PI * 3 + time * 0.3) * 12;
        
        // Add breathing effect
        const breathX = Math.sin(time * 0.8) * 8;
        const breathY = Math.cos(time * 0.6) * 6;
        
        // Combine all movements
        const finalX = Math.max(10, Math.min(90, baseX + spiralX + breathX));
        const finalY = Math.max(15, Math.min(85, baseY + spiralY + breathY));
        
        spotlight.style.setProperty('--x', `${finalX}%`);
        spotlight.style.setProperty('--y', `${finalY}%`);
    }
    
    // Mouse interaction - subtle attraction to cursor
    let mouseX = 50;
    let mouseY = 50;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 100;
        mouseY = (e.clientY / window.innerHeight) * 100;
    });
    
    // Enhanced spotlight update with mouse attraction
    function updateSpotlightWithMouse() {
        const scrollPercent = window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight);
        const time = Date.now() * 0.001;
        
        // Base movement
        const baseX = 20 + (scrollPercent * 60);
        const baseY = 30 + (scrollPercent * 40);
        
        // Organic patterns
        const waveX = Math.sin(scrollPercent * Math.PI * 2 + time * 0.4) * 12;
        const waveY = Math.cos(scrollPercent * Math.PI * 1.5 + time * 0.3) * 10;
        
        // Subtle mouse attraction (only 10% influence)
        const mouseInfluenceX = (mouseX - baseX) * 0.1;
        const mouseInfluenceY = (mouseY - baseY) * 0.1;
        
        // Section-based movement - different patterns for each section
        const sectionOffset = Math.floor(scrollPercent * 6); // Assuming 6 sections
        let sectionModifierX = 0;
        let sectionModifierY = 0;
        
        switch(sectionOffset) {
            case 0: // Cover section - circular movement
                sectionModifierX = Math.cos(time * 0.3) * 8;
                sectionModifierY = Math.sin(time * 0.3) * 8;
                break;
            case 1: // Split view - left-right sweep
                sectionModifierX = Math.sin(time * 0.5) * 15;
                sectionModifierY = Math.cos(time * 0.8) * 5;
                break;
            case 2: // Experience - up-down movement
                sectionModifierX = Math.sin(time * 0.4) * 6;
                sectionModifierY = Math.sin(time * 0.6) * 12;
                break;
            case 3: // Projects - figure-8
                sectionModifierX = Math.sin(time * 0.4) * 10;
                sectionModifierY = Math.sin(time * 0.8) * 8;
                break;
            case 4: // Stories - random walk
                sectionModifierX = Math.sin(time * 0.7 + scrollPercent * 5) * 12;
                sectionModifierY = Math.cos(time * 0.5 + scrollPercent * 3) * 10;
                break;
            default: // Contact - gentle breathing
                sectionModifierX = Math.sin(time * 0.3) * 5;
                sectionModifierY = Math.cos(time * 0.4) * 5;
        }
        
        // Combine all movements
        const finalX = Math.max(5, Math.min(95, 
            baseX + waveX + mouseInfluenceX + sectionModifierX
        ));
        const finalY = Math.max(5, Math.min(95, 
            baseY + waveY + mouseInfluenceY + sectionModifierY
        ));
        
        spotlight.style.setProperty('--x', `${finalX}%`);
        spotlight.style.setProperty('--y', `${finalY}%`);
    }
    
    // Initial setup
    window.addEventListener("resize", resizeCanvas);
    
    // Initialize after a short delay
    setTimeout(() => {
        resizeCanvas();
    }, 100);
    
    // Generate grain and scratches at intervals
    setInterval(() => {
        if (noise.width > 0 && noise.height > 0) {
            generateNoise();
            seed.setAttribute("seed", Math.floor(Math.random() * 1000));
            
            // Clear scratch canvas
            scratchCtx.clearRect(0, 0, scratch.width, scratch.height);
            
            // Add random dust spots
            const numberOfSpots = Math.floor(Math.random() * 6) + 2;
            for (let i = 0; i < numberOfSpots; i++) {
                const x = Math.random() * scratch.width;
                const y = Math.random() * scratch.height;
                const radius = Math.floor(Math.random() * 2) + 1;
                scratchCtx.beginPath();
                scratchCtx.arc(x, y, radius, 0, Math.PI * 2);
                scratchCtx.fillStyle = Math.random() > 0.5 ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.3)";
                scratchCtx.fill();
            }
        }
    }, n);
    
    // Add occasional vertical scratches
    setInterval(() => {
        if (Math.random() > 0.8 && noise.width > 0) {
            drawVerticalLine(Math.random() * noise.width, noise.height);
        }
    }, n * 4);
    
    // Smooth animation loop for spotlight
    function animateSpotlight() {
        updateSpotlightWithMouse();
        requestAnimationFrame(animateSpotlight);
    }
    
    // Start animation
    animateSpotlight();
});