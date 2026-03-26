// script.js - Minimal interactivity for SWIT site

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Smooth scrolling for nav links
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    targetSection.scrollIntoView({ behavior: 'smooth' });
  });
});

// Mobile menu toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// Close mobile menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
  });
});

// Animated counters
function animateCounters() {
  const counters = document.querySelectorAll('.counter');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
          if (current < target) {
            current += increment;
            counter.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target;
          }
        };
        updateCounter();
        observer.unobserve(counter);
      }
    });
  });

  counters.forEach(counter => observer.observe(counter));
}

// Progress bars animation
function animateProgressBars() {
  const progressFills = document.querySelectorAll('.progress-fill');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = '85%'; // Animate to 85%
        observer.unobserve(entry.target);
      }
    });
  });

  progressFills.forEach(fill => observer.observe(fill));
}

// Fade in animations on scroll
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.card, .impact-item, .testimonial, .startup-card');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.animationDelay = `${index * 0.1}s`;
          entry.target.classList.add('animate');
        }, 100);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => observer.observe(el));
}

// IntersectionObserver for hero animations (already handled by CSS, but enhance)
document.addEventListener('DOMContentLoaded', () => {
  animateCounters();
  animateProgressBars();
  initScrollAnimations();
  
  // Close mobile menu on resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      navMenu.classList.remove('active');
    }
  });
});

// Add mobile menu CSS via JS (dynamic)
const mobileMenuStyles = `
  .nav-menu.active {
    display: flex !important;
    flex-direction: column;
    position: fixed;
    top: 70px;
    left: 0;
    width: 100%;
    background: rgba(30, 58, 138, 0.98);
    padding: 2rem;
    gap: 1rem;
    box-shadow: var(--shadow);
  }

  .nav-menu.active li{
    width: 100%;
  }

  .nav-menu.active a{
    display: flex;
    width: 100%;
  }
    .nav-link:hover::after{
    width: 0;
    }
  
  .nav-toggle.active span:nth-child(1) {
    transform: rotate(-45deg) translate(-7px, 6px);
  }
  
  .nav-toggle.active span:nth-child(2) {
    opacity: 0;
  }
  
  .nav-toggle.active span:nth-child(3) {
    transform: rotate(45deg) translate(-7px, -6px);
  }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = mobileMenuStyles;
document.head.appendChild(styleSheet);

// Navbar toggle animation
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
});

