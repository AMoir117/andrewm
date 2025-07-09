// Smooth scrolling for nav links
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId.startsWith('#')) {
      e.preventDefault();
      document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Scroll-to-top button
const scrollToTopBtn = document.getElementById('scrollToTopBtn');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollToTopBtn.style.display = 'block';
  } else {
    scrollToTopBtn.style.display = 'none';
  }
});
scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Project card image click opens project link
// (Remove previous projectCards declaration)

// Helper: get all images for a project/tool by filename pattern
function getProjectImages(project) {
  const images = [];
  for (let i = 1; i <= 10; i++) {
    const imgPath = `images/${project}-img${i}.png`;
    try {
      const req = new XMLHttpRequest();
      req.open('HEAD', imgPath, false); // synchronous
      req.send();
      if (req.status >= 200 && req.status < 400) {
        images.push(imgPath);
        continue;
      }
    } catch (e) {}
    // If the first numbered image doesn't exist, fall back to default
    if (i === 1) {
      const fallback = `images/${project}.png`;
      try {
        const req2 = new XMLHttpRequest();
        req2.open('HEAD', fallback, false);
        req2.send();
        if (req2.status >= 200 && req2.status < 400) {
          images.push(fallback);
        }
      } catch (e) {}
    }
    break;
  }
  return images;
}

// Carousel setup
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
  const project = card.getAttribute('data-project');
  let images = getProjectImages(project);
  let currentIndex = 0;

  // Set initial background
  if (images.length > 0) {
    card.style.backgroundImage = `url('${images[0]}')`;
  }

  const leftBtn = card.querySelector('.carousel-arrow.left');
  const rightBtn = card.querySelector('.carousel-arrow.right');
  const indexDisplay = card.querySelector('.carousel-index');

  function updateCarousel() {
    card.style.backgroundImage = `url('${images[currentIndex]}')`;
    indexDisplay.textContent = `${currentIndex + 1}/${images.length}`;
  }

  leftBtn.addEventListener('click', e => {
    e.stopPropagation();
    if (images.length > 1) {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateCarousel();
    }
  });
  rightBtn.addEventListener('click', e => {
    e.stopPropagation();
    if (images.length > 1) {
      currentIndex = (currentIndex + 1) % images.length;
      updateCarousel();
    }
  });

  // Only the button opens the project link now
  // (No card click handler)

  // Update index on load
  updateCarousel();
});

// Clean, minimal zoom/pan effect
function enableCardZoomPan(card, scale = 2) {
  function setZoomedPosition(e) {
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const x = px * 100;
    const y = py * 100;
    card.style.setProperty('--bg-x', `${x}%`);
    card.style.setProperty('--bg-y', `${y}%`);
    card.style.setProperty('--bg-scale', scale);
  }
  function resetZoom() {
    card.style.setProperty('--bg-x', '50%');
    card.style.setProperty('--bg-y', '50%');
    card.style.setProperty('--bg-scale', '1');
  }
  card.addEventListener('mouseenter', setZoomedPosition);
  card.addEventListener('mousemove', setZoomedPosition);
  card.addEventListener('mouseleave', resetZoom);
}

document.querySelectorAll('.project-card').forEach(card => enableCardZoomPan(card, 2)); 