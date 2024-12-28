document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.video-slider-track');
    const slides = document.querySelectorAll('.video-slide');
    const videos = document.querySelectorAll('.video-slide video');
    const prevBtn = document.querySelector('.video-prev-btn');
    const nextBtn = document.querySelector('.video-next-btn');
    const dotsContainer = document.querySelector('.video-slider-dots');
    
    let currentIndex = 0;
    const slidesPerView = window.innerWidth > 768 ? 2 : 1;
    const totalSlides = slides.length;
    const totalGroups = Math.ceil(totalSlides / slidesPerView);
    
    // Create dots
    for (let i = 0; i < totalGroups; i++) {
      const dot = document.createElement('div');
      dot.classList.add('video-dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i * slidesPerView));
      dotsContainer.appendChild(dot);
    }
    
    function updateSliderPosition() {
      const slideWidth = slides[0].offsetWidth + 32; // Including margin
      track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
      
      // Update active states
      slides.forEach((slide, index) => {
        slide.classList.toggle('active', 
          index >= currentIndex && index < currentIndex + slidesPerView);
      });
      
      // Update dots
      document.querySelectorAll('.video-dot').forEach((dot, index) => {
        dot.classList.toggle('active', 
          Math.floor(currentIndex / slidesPerView) === index);
      });
      
      // Handle videos
      videos.forEach((video, index) => {
        if (index >= currentIndex && index < currentIndex + slidesPerView) {
          video.play();
        } else {
          video.pause();
          video.currentTime = 0;
        }
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
    }
    
    // Event Listeners
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // Initialize first videos
    videos.forEach((video, index) => {
      if (index < slidesPerView) {
        video.play();
      }
    });
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const newSlidesPerView = window.innerWidth > 768 ? 2 : 1;
        if (newSlidesPerView !== slidesPerView) {
          location.reload(); // Refresh page on breakpoint change
        }
        updateSliderPosition();
      }, 100);
    });
    
    // Initial position
    updateSliderPosition();
  });