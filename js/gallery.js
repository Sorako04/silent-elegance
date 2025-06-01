document.addEventListener('DOMContentLoaded', function() {
    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    // Reset animation
                    item.style.animation = 'none';
                    item.offsetHeight; // Trigger reflow
                    item.style.animation = 'fadeIn 0.6s ease-out forwards';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Lightbox functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');

    let currentImageIndex = 0;
    const visibleImages = [];

    function updateVisibleImages() {
        visibleImages.length = 0;
        galleryItems.forEach(item => {
            if (window.getComputedStyle(item).display !== 'none') {
                visibleImages.push(item);
            }
        });
    }

    function showImage(index) {
        const item = visibleImages[index];
        const img = item.querySelector('img');
        const title = item.querySelector('h3').textContent;
        const description = item.querySelector('p').textContent;

        lightboxImg.src = img.src;
        lightboxCaption.innerHTML = `<h3>${title}</h3><p>${description}</p>`;
        currentImageIndex = index;

        // Update navigation buttons visibility
        lightboxPrev.style.display = index > 0 ? 'block' : 'none';
        lightboxNext.style.display = index < visibleImages.length - 1 ? 'block' : 'none';
    }

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            updateVisibleImages();
            const index = visibleImages.indexOf(item);
            if (index !== -1) {
                lightbox.classList.add('active');
                showImage(index);
            }
        });
    });

    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    lightboxPrev.addEventListener('click', () => {
        if (currentImageIndex > 0) {
            showImage(currentImageIndex - 1);
        }
    });

    lightboxNext.addEventListener('click', () => {
        if (currentImageIndex < visibleImages.length - 1) {
            showImage(currentImageIndex + 1);
        }
    });

    // Close lightbox with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            lightbox.classList.remove('active');
        } else if (e.key === 'ArrowLeft' && currentImageIndex > 0) {
            showImage(currentImageIndex - 1);
        } else if (e.key === 'ArrowRight' && currentImageIndex < visibleImages.length - 1) {
            showImage(currentImageIndex + 1);
        }
    });

    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });

    // Prevent scrolling when lightbox is open
    lightbox.addEventListener('wheel', (e) => {
        if (lightbox.classList.contains('active')) {
            e.preventDefault();
        }
    });

    // Add touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    lightbox.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = touchEndX - touchStartX;

        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0 && currentImageIndex > 0) {
                // Swipe right - show previous image
                showImage(currentImageIndex - 1);
            } else if (swipeDistance < 0 && currentImageIndex < visibleImages.length - 1) {
                // Swipe left - show next image
                showImage(currentImageIndex + 1);
            }
        }
    }
}); 