document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.sdg-slider-track');
    const slides = document.querySelectorAll('.sdg-slide');
    const prevBtn = document.querySelector('.sdg-prev-btn');
    const nextBtn = document.querySelector('.sdg-next-btn');
    const dotsContainer = document.querySelector('.sdg-slider-dots');
    
    if (!track || !slides.length || !prevBtn || !nextBtn || !dotsContainer) return;
    
    let currentIndex = 0;
    const slidesPerView = 2;
    const totalSlides = slides.length;
    const totalGroups = Math.ceil(totalSlides / slidesPerView);
    
    // Create dots
    for (let i = 0; i < totalGroups; i++) {
      const dot = document.createElement('div');
      dot.classList.add('sdg-dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i * slidesPerView));
      dotsContainer.appendChild(dot);
    }
    
    // Auto slide
    let autoSlideInterval = setInterval(nextSlide, 5000);
    
    function updateSliderPosition() {
      const slideWidth = slides[0].offsetWidth + 32; // Including margin
      track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
      
      // Update dots
      document.querySelectorAll('.sdg-dot').forEach((dot, index) => {
        dot.classList.toggle('active', Math.floor(currentIndex / slidesPerView) === index);
      });
    }
    
    function nextSlide() {
      currentIndex = (currentIndex + slidesPerView >= totalSlides) 
        ? 0 
        : currentIndex + slidesPerView;
      updateSliderPosition();
    }
    
    function prevSlide() {
      currentIndex = (currentIndex - slidesPerView < 0) 
        ? totalSlides - slidesPerView 
        : currentIndex - slidesPerView;
      updateSliderPosition();
    }
    
    function goToSlide(index) {
      currentIndex = index;
      updateSliderPosition();
      resetAutoSlide();
    }
    
    function resetAutoSlide() {
      clearInterval(autoSlideInterval);
      autoSlideInterval = setInterval(nextSlide, 5000);
    }
    
    // Event Listeners
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoSlide();
    });
    
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoSlide();
    });
    
    // Pause auto-slide on hover
    track.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    track.addEventListener('mouseleave', () => autoSlideInterval = setInterval(nextSlide, 5000));
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateSliderPosition, 100);
    });
  });