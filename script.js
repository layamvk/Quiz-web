document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('.snap-section');
  const navLinks = document.querySelectorAll('.nav-btn');
  
  sections[0].classList.add('active');
  navLinks[0].classList.add('active');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      const correspondingNavLink = document.querySelector(`.nav-btn[href="#${id}"]`);
      
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        if (correspondingNavLink) {
          navLinks.forEach(link => link.classList.remove('active'));
          correspondingNavLink.classList.add('active');
        }
      } else {
        entry.target.classList.remove('active');
      }
    });
  }, {
    threshold: 0.5,
    rootMargin: '0px 0px -50% 0px' 
  });
  
  sections.forEach(section => {
    observer.observe(section);
  });
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
  
  window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const indicators = document.querySelectorAll('.scroll-indicator');
    
    indicators.forEach((indicator, index) => {
      if (index === sections.length - 1 && 
          scrollPosition + window.innerHeight >= document.documentElement.scrollHeight - 100) {
        indicator.style.opacity = '0.3';
        indicator.textContent = 'Scroll to top';
      } else {
        indicator.style.opacity = '1';
        indicator.textContent = 'Scroll to explore';
      }
    });
  });
});