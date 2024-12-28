document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoSlideInterval;
    
    function showSlide(index) {
      slides.forEach(slide => {
        slide.classList.remove('active');
      });
      
      slides[index].classList.add('active');
    }
    
    function nextSlide() {
      currentSlide = (currentSlide + 1) % totalSlides;
      showSlide(currentSlide);
    }
    
    function prevSlide() {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      showSlide(currentSlide);
    }
    
    // Event listeners for navigation buttons
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoSlide();
    });
    
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoSlide();
    });
    
    // Auto slide functionality
    function startAutoSlide() {
      autoSlideInterval = setInterval(nextSlide, 9000);
    }
    
    function resetAutoSlide() {
      clearInterval(autoSlideInterval);
      startAutoSlide();
    }
    
    // Initialize auto slide
    startAutoSlide();
    
    // Pause auto slide on hover
    const heroSlider = document.querySelector('.hero-slider');
    heroSlider.addEventListener('mouseenter', () => {
      clearInterval(autoSlideInterval);
    });
    
    heroSlider.addEventListener('mouseleave', () => {
      startAutoSlide();
    });
    
    // Handle keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
        resetAutoSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
        resetAutoSlide();
      }
    });
  });