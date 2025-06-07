// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Toggle mobile menu
  navToggle.addEventListener('click', function() {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('nav-open');
  });

  // Close menu when clicking on a link
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.classList.remove('nav-open');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.classList.remove('nav-open');
    }
  });
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Navbar Background on Scroll
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
  } else {
    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
  }
});

// Scroll Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Apply scroll animations to elements
document.addEventListener('DOMContentLoaded', function() {
  const animatedElements = document.querySelectorAll('.service-card, .offer-card, .trust-card, .benefit-card, .before-after-card');
  
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});

// Form Handling
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      // Add loading state
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      // Reset after form submission (whether success or error)
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 3000);
    });

    // Form validation feedback
    const inputs = contactForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', function() {
        if (this.checkValidity()) {
          this.style.borderColor = '#27ae60';
        } else {
          this.style.borderColor = '#e74c3c';
        }
      });

      input.addEventListener('focus', function() {
        this.style.borderColor = '#4A90E2';
      });
    });
  }
});

// Card Hover Effects
document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.service-card, .offer-card, .trust-card, .benefit-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      if (this.classList.contains('featured')) {
        this.style.transform = 'scale(1.05)';
      } else {
        this.style.transform = 'translateY(0) scale(1)';
      }
    });
  });
});

// WhatsApp Button Click Tracking
document.addEventListener('DOMContentLoaded', function() {
  const whatsappButtons = document.querySelectorAll('.whatsapp-btn');
  
  whatsappButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      // Add click animation
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 150);
      
      // You can add analytics tracking here
      console.log('WhatsApp button clicked:', this.href);
    });
  });
});

// Image Lazy Loading for Better Performance
document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('img');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      }
    });
  });

  images.forEach(img => {
    if (img.dataset.src) {
      imageObserver.observe(img);
    }
  });
});

// Parallax Effect for Hero Background
window.addEventListener('scroll', function() {
  const heroBackground = document.querySelector('.hero-background');
  if (heroBackground) {
    const scrolled = window.pageYOffset;
    const parallax = scrolled * 0.5;
    heroBackground.style.transform = `translateY(${parallax}px)`;
  }
});

// Auto-hide Mobile Menu on Resize
window.addEventListener('resize', function() {
  if (window.innerWidth > 768) {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.classList.remove('nav-open');
  }
});

// Preloader (if needed)
window.addEventListener('load', function() {
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    preloader.style.opacity = '0';
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  }
});

// Back to Top Button
document.addEventListener('DOMContentLoaded', function() {
  // Create back to top button
  const backToTop = document.createElement('button');
  backToTop.innerHTML = '↑';
  backToTop.className = 'back-to-top';
  backToTop.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #4A90E2;
    color: white;
    border: none;
    font-size: 20px;
    cursor: pointer;
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(74, 144, 226, 0.3);
  `;
  
  document.body.appendChild(backToTop);
  
  // Show/hide back to top button
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      backToTop.style.opacity = '1';
      backToTop.style.visibility = 'visible';
    } else {
      backToTop.style.opacity = '0';
      backToTop.style.visibility = 'hidden';
    }
  });
  
  // Scroll to top functionality
  backToTop.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});
