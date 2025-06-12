document.addEventListener('DOMContentLoaded', function() {
    // Get all experience items and headers
    const experienceItems = document.querySelectorAll('.experience-item');
    const experienceHeaders = document.querySelectorAll('.experience-header');
    
    // Track currently expanded item
    let currentlyExpanded = null;
    
    // Function to close all expanded panels
    function closeAllPanels() {
        experienceItems.forEach(item => {
            item.classList.remove('expanded', 'expanding');
            const panel = item.querySelector('.experience-panel');
            if (panel) {
                panel.style.maxHeight = '0';
            }
        });
        currentlyExpanded = null;
    }
    
    // Function to expand a panel
    function expandPanel(item) {
        // Add expanding class for immediate feedback
        item.classList.add('expanding');
        
        // Small delay for smooth transition
        setTimeout(() => {
            item.classList.remove('expanding');
            item.classList.add('expanded');
            
            const panel = item.querySelector('.experience-panel');
            if (panel) {
                // Calculate the required height
                const content = panel.querySelector('.panel-content');
                const contentHeight = content.scrollHeight;
                panel.style.maxHeight = (contentHeight + 64) + 'px'; // 64px for padding
            }
            
            currentlyExpanded = item;
        }, 50);
    }
    
    // Function to toggle panel
    function togglePanel(clickedItem) {
        // If clicking the currently expanded item, close it
        if (currentlyExpanded === clickedItem) {
            closeAllPanels();
            return;
        }
        
        // Close any currently open panel
        if (currentlyExpanded) {
            closeAllPanels();
            // Wait for close animation to complete before opening new one
            setTimeout(() => {
                expandPanel(clickedItem);
            }, 200);
        } else {
            // No panel currently open, expand immediately
            expandPanel(clickedItem);
        }
    }
    
    // Add click event listeners to experience headers
    experienceHeaders.forEach((header, index) => {
        header.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const parentItem = header.closest('.experience-item');
            togglePanel(parentItem);
        });
        
        // Add pointer cursor to indicate clickability
        header.style.cursor = 'pointer';
    });
    
    // Enhanced hover effects for mouse tracking
    const postsList = document.querySelector('.posts-list');
    
    if (postsList) {
        // Update CSS custom properties for mouse position
        const updateMousePosition = ({ clientX: x, clientY: y }) => {
            document.documentElement.style.setProperty('--x', x);
            document.documentElement.style.setProperty('--y', y);
        };
        
        postsList.addEventListener('pointermove', updateMousePosition);
        
        // Enhanced hover effects for each item
        experienceItems.forEach(item => {
            const hoverImage = item.querySelector('.hover-image');
            
            item.addEventListener('mouseenter', () => {
                // Don't show hover image if item is expanded
                if (!item.classList.contains('expanded')) {
                    item.style.setProperty('--active', '1');
                    if (hoverImage) {
                        hoverImage.style.opacity = '1';
                    }
                }
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.setProperty('--active', '0');
                if (hoverImage) {
                    hoverImage.style.opacity = '0';
                }
            });
        });
    }
    
    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && currentlyExpanded) {
            closeAllPanels();
        }
    });
    
    // Handle window resize to recalculate panel heights
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (currentlyExpanded) {
                const panel = currentlyExpanded.querySelector('.experience-panel');
                const content = panel.querySelector('.panel-content');
                const contentHeight = content.scrollHeight;
                panel.style.maxHeight = (contentHeight + 64) + 'px';
            }
        }, 250);
    });
    
    // Add smooth scroll behavior when panels expand
    function scrollToItem(item) {
        const headerHeight = 120; // Approximate header height
        const itemTop = item.getBoundingClientRect().top + window.pageYOffset;
        const scrollToPosition = itemTop - headerHeight;
        
        window.scrollTo({
            top: scrollToPosition,
            behavior: 'smooth'
        });
    }
    
    // Observer to handle scroll into view for expanded items
    const observerOptions = {
        root: null,
        rootMargin: '-120px 0px 0px 0px', // Account for sticky header
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting && entry.target.classList.contains('expanded')) {
                // If expanded item goes out of view, optionally auto-scroll
                // Uncomment the line below if you want auto-scroll behavior
                // scrollToItem(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all experience items
    experienceItems.forEach(item => {
        observer.observe(item);
    });
    
    // Add touch support for mobile devices
    let touchStartY = 0;
    let touchEndY = 0;
    
    experienceItems.forEach(item => {
        item.addEventListener('touchstart', function(e) {
            touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });
        
        item.addEventListener('touchend', function(e) {
            touchEndY = e.changedTouches[0].screenY;
            const touchDiff = Math.abs(touchStartY - touchEndY);
            
            // Only trigger if it's a tap (not a scroll)
            if (touchDiff < 10) {
                togglePanel(item);
            }
        }, { passive: true });
    });
    
    // Smooth panel animations with intersection observer
    const panelObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const panelContent = entry.target.querySelector('.panel-content');
            if (entry.isIntersecting && panelContent) {
                panelContent.style.animationPlayState = 'running';
            }
        });
    }, {
        threshold: 0.2
    });
    
    // Observe all panels
    const panels = document.querySelectorAll('.experience-panel');
    panels.forEach(panel => {
        panelObserver.observe(panel);
    });
    
    console.log('Experience section enhanced with dropdown functionality');
});