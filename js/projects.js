// Projects page functionality

document.addEventListener('DOMContentLoaded', function() {
    // Setup accordion functionality
    const accordionItems = document.querySelectorAll('.accordion-item');
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    // Add click event to accordion headers
    accordionHeaders.forEach((header, index) => {
        header.addEventListener('click', () => {
            const item = accordionItems[index];
            
            // Toggle active class
            const isActive = item.classList.contains('active');
            
            // Close all accordions
            accordionItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current accordion
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });
});