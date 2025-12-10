document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  const nextButton = document.querySelector('.carousel-button--right');
  const prevButton = document.querySelector('.carousel-button--left');
  const dotsNav = document.querySelector('.carousel-nav');
  const dots = Array.from(dotsNav.children);

  const slideWidth = slides[0].getBoundingClientRect().width;

  // Arrange the slides next to one another
  // slides[0].style.left = slideWidth * 0 + 'px'
  // slides[1].style.left = slideWidth * 1 + 'px' etc...
  const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
  };
  // We don't strictly need absolute positioning if using flex, 
  // but for the transform logic let's just assume flex layout handles width 
  // and we slide the UL track. 
  // Actually, standard carousel usually uses transform X on the track.

  // Update: Since .carousel-track is flex, we just need to move the track
  // based on slide index * 100% or width.

  const moveToSlide = (track, currentSlide, targetSlide) => {
    // Find index of target slide
    const targetIndex = slides.findIndex(slide => slide === targetSlide);

    // Move track to that index
    // track.style.transform = 'translateX(-' + targetSlide.style.left + ')'; 
    // Easier approach with flexbox: translateX(-index * 100%)
    track.style.transform = `translateX(-${targetIndex * 100}%)`;

    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
  }

  const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
  }

  // Next Button
  nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    let nextSlide = currentSlide.nextElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    let nextDot = currentDot.nextElementSibling;

    // Loop back to start
    if (!nextSlide) {
      nextSlide = slides[0];
      nextDot = dots[0];
    }

    moveToSlide(track, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);
  });

  // Prev Button
  prevButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    let prevSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    let prevDot = currentDot.previousElementSibling;

    // Loop to end
    if (!prevSlide) {
      prevSlide = slides[slides.length - 1];
      prevDot = dots[dots.length - 1];
    }

    moveToSlide(track, currentSlide, prevSlide);
    updateDots(currentDot, prevDot);
  });

  // Dots Nav
  dotsNav.addEventListener('click', e => {
    // what indicator was clicked on?
    const targetDot = e.target.closest('button');

    if (!targetDot) return;

    const currentSlide = track.querySelector('.current-slide');
    const currentDot = dotsNav.querySelector('.current-slide');
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];

    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
  });

  // Auto-loop
  let slideInterval = setInterval(() => {
    nextButton.click();
  }, 5000); // 5 seconds

  // Pause on hover
  track.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
  });

  track.addEventListener('mouseleave', () => {
    slideInterval = setInterval(() => {
      nextButton.click();
    }, 5000);
  });
});

// =======================================================================
// CONTACT FORM HANDLING (AJAX)
// =======================================================================
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default page reload

    const submitBtn = contactForm.querySelector('.form-submit-btn');
    const originalBtnText = submitBtn.innerText;

    // Change button state to indicate loading
    submitBtn.innerText = 'ENVIANDO...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';

    // Collect form data
    const formData = new FormData(contactForm);

    // Send to FormSubmit via AJAX
    fetch(contactForm.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          // Success Feedback
          alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');

          // Clear Form
          contactForm.reset();

          // Scroll to Top
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        } else {
          // Error Feedback
          alert('Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente ou contate-nos pelo WhatsApp.');
        }
      })
      .catch(error => {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.');
      })
      .finally(() => {
        // Reset button state
        submitBtn.innerText = originalBtnText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
      });
  });
}

// =======================================================================
// FAQ ACCORDION
// =======================================================================
const faqCards = document.querySelectorAll('.faq-card');

faqCards.forEach(card => {
  const question = card.querySelector('.faq-question');

  if (question) {
    question.addEventListener('click', () => {
      // Close other cards
      faqCards.forEach(c => {
        if (c !== card) c.classList.remove('active');
      });

      // Toggle current
      card.classList.toggle('active');
    });
  }
});

// =======================================================================
// VIDEO AUTO-PLAY ON SCROLL
// =======================================================================
const videoSection = document.querySelector('.video-section');
const videoElement = document.getElementById('intro-video') || document.querySelector('.video-wrapper video');

// WORKAROUND: Prime audio on first interaction
document.addEventListener('click', () => {
  if (videoElement) {
    videoElement.muted = false;
    // Just touching the muted property is often enough to register intent
  }
}, { once: true });

// Prevent accidental pausing on hover (User Report)
if (videoElement) {
  videoElement.addEventListener('mouseenter', () => {
    if (videoElement.paused) {
      videoElement.play().catch(() => { });
    }
  });
}

if (videoSection && videoElement) {
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {

      // IF VISIBLE: PLAY
      if (entry.isIntersecting) {

        // Ensure sound is active (retry unmuting)
        // Note: Using a flag to avoid spamming the property if already unmuted could be better, 
        // but explicit assignment ensures 'audio on' is the target state.
        if (videoElement.paused) {
          videoElement.muted = false;
          const playPromise = videoElement.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {
              // Fallback if blocked
              videoElement.muted = true;
              videoElement.play();
            });
          }
        }

      }
      // IF NOT VISIBLE: PAUSE
      else {
        if (!videoElement.paused) {
          videoElement.pause();
        }
      }

    });
  }, {
    threshold: 0.4 // Play when 40% visible
  });

  videoObserver.observe(videoSection);
}
