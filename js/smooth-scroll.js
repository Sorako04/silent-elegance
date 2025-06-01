document.addEventListener('DOMContentLoaded', () => {
    // Get all links that hash
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Skip if it's just "#"
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return; // Skip if target element doesn't exist
            
            // Get the target's position
            const targetPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = targetPosition + window.pageYOffset - 80; // Adjust for header
            
            // Smooth scroll to target
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });
    
    // Add scroll reveal animation
    const revealElements = document.querySelectorAll('.smooth-transition');
    
    const revealOnScroll = () => {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150; // Adjust this value to change when elements become visible
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };
    
    // Initial check
    revealOnScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', revealOnScroll);
}); 