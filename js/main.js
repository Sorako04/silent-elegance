// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add scroll event listener for header
    const header = document.querySelector('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }

        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            // Scroll Down
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            // Scroll Up
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });

    // Collection card interactions
    const collectionCards = document.querySelectorAll('.collection-card');
    collectionCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            const img = this.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1.05)';
            }
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            const img = this.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1)';
            }
        });
    });

    // View Collection button interactions
    const viewCollectionButtons = document.querySelectorAll('.view-collection');
    viewCollectionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const collectionTitle = this.closest('.collection-card').querySelector('h3').textContent;
            // Here you can implement the collection view logic
            console.log(`Đang xem bộ sưu tập: ${collectionTitle}`);
        });
    });

    // Search functionality with debounce and Vietnamese support
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');
    let searchTimeout;

    function normalizeVietnamese(str) {
        return str.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase();
    }

    function debounceSearch(func, wait) {
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(searchTimeout);
                func(...args);
            };
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(later, wait);
        };
    }

    const performSearch = debounceSearch((query) => {
        const normalizedQuery = normalizeVietnamese(query);
        console.log('Đang tìm kiếm:', query);
    }, 300);

    searchInput?.addEventListener('input', function() {
        performSearch(this.value);
    });

    searchButton?.addEventListener('click', function() {
        performSearch(searchInput.value);
    });

    // Improved Intersection Observer for smooth animations
    const animateElements = document.querySelectorAll('.collection-card, .gallery-item, .service-card, .section-divider');
    
    const animationOptions = {
        threshold: 0.1,
        rootMargin: '20px'
    };

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, animationOptions);

    animateElements.forEach(element => {
        element.classList.add('animate-on-scroll');
        animationObserver.observe(element);
    });

    // Additional Vietnamese language support
    document.querySelectorAll('input[type="text"], textarea').forEach(input => {
        input.setAttribute('lang', 'vi');
        input.setAttribute('spellcheck', 'true');
    });
}); 