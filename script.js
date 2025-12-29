// Password Protection
const CORRECT_PASSWORD = 'laithandameera';
const AUTH_TIMEOUT = 1800000; // 30 minutes in milliseconds
const AUTH_KEY = 'memoryTimelineAuth';

// Function to check if authentication is valid
function isAuthValid() {
  const authTimestamp = localStorage.getItem(AUTH_KEY);
  if (!authTimestamp) {
    return false;
  }
  
  const currentTime = Date.now();
  const timeDifference = currentTime - parseInt(authTimestamp, 10);
  
  return timeDifference < AUTH_TIMEOUT;
}

// Function to set authentication timestamp
function setAuthTimestamp() {
  localStorage.setItem(AUTH_KEY, Date.now().toString());
}

// Function to unlock content
function unlockContent(passwordOverlay, mainContent) {
  passwordOverlay.classList.add('hidden');
  setTimeout(() => {
    passwordOverlay.style.display = 'none';
    mainContent.classList.add('visible');
  }, 500);
}

document.addEventListener('DOMContentLoaded', () => {
  const passwordOverlay = document.getElementById('password-overlay');
  const mainContent = document.getElementById('main-content');
  const passwordForm = document.getElementById('password-form');
  const passwordInput = document.getElementById('password-input');
  const errorMessage = document.getElementById('error-message');

  // Check if user is already authenticated
  if (isAuthValid()) {
    // User has valid authentication - unlock content automatically
    unlockContent(passwordOverlay, mainContent);
  } else {
    // No valid authentication - focus on password input
    passwordInput.focus();
  }

  // Handle password form submission
  passwordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const enteredPassword = passwordInput.value;
    
    if (enteredPassword === CORRECT_PASSWORD) {
      // Correct password - store timestamp and unlock content
      setAuthTimestamp();
      unlockContent(passwordOverlay, mainContent);
    } else {
      // Incorrect password - show error
      errorMessage.textContent = '❌ Incorrect password. Please try again.';
      errorMessage.classList.add('show');
      passwordInput.value = '';
      passwordInput.focus();
      
      // Remove error message after 3 seconds
      setTimeout(() => {
        errorMessage.classList.remove('show');
        setTimeout(() => {
          errorMessage.textContent = '';
        }, 300);
      }, 3000);
    }
  });
});

// Smooth scroll behavior
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

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.2,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Apply initial styles and observe timeline items
document.addEventListener('DOMContentLoaded', () => {
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  timelineItems.forEach((item, index) => {
    // Set initial state
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    item.style.transitionDelay = `${index * 0.1}s`;
    
    // Observe for intersection
    observer.observe(item);
  });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  
  if (hero && scrolled < window.innerHeight) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    hero.style.opacity = 1 - (scrolled / window.innerHeight);
  }
});