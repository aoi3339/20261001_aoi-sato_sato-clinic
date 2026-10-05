(() => {
  const images = [...document.querySelectorAll(
    '.greeting-grid > img, .service-card > img, .service-detail-card > img, .about-banner'
  )];
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!images.length || motion.matches || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.remove('image-reveal-pending');
      observer.unobserve(entry.target);
    });
  }, {
    rootMargin: '0px 0px -40px 0px',
    threshold: 0,
  });

  images.forEach((image) => {
    image.classList.add('image-reveal', 'image-reveal-pending');
    if (image.matches('.greeting-grid > img')) {
      image.classList.add('image-reveal-from-left');
    }
    if (image.matches('.about-banner')) {
      image.classList.add('image-reveal-zoom');
      image.addEventListener('focus', () => {
        image.classList.remove('image-reveal-pending');
        observer.unobserve(image);
      }, { once: true });
    }
    observer.observe(image);
  });

  motion.addEventListener('change', () => {
    if (!motion.matches) return;
    images.forEach((image) => image.classList.remove('image-reveal-pending'));
    observer.disconnect();
  });
})();
