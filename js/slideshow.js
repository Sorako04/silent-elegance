let slideIndex = 1;
let slideInterval;

// Initialize the slideshow
document.addEventListener('DOMContentLoaded', function() {
    showSlides(slideIndex);
    startAutoSlide();
});

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
    resetAutoSlide();
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
    resetAutoSlide();
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");
    
    // Loop back to first slide
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    
    // Hide all slides
    for (i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }
    
    // Remove active state from all dots
    for (i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }
    
    // Show current slide and activate corresponding dot
    slides[slideIndex-1].classList.add("active");
    dots[slideIndex-1].classList.add("active");
}

function startAutoSlide() {
    // Change slide every 5 seconds
    slideInterval = setInterval(function() {
        plusSlides(1);
    }, 5000);
}

function resetAutoSlide() {
    clearInterval(slideInterval);
    startAutoSlide();
}

// Pause slideshow on hover
document.querySelector('.slideshow-container').addEventListener('mouseenter', function() {
    clearInterval(slideInterval);
});

// Resume slideshow when mouse leaves
document.querySelector('.slideshow-container').addEventListener('mouseleave', function() {
    startAutoSlide();
}); 