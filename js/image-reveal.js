(() => {
  const images = [...document.querySelectorAll(
    '.greeting-grid > .image-crop, .service-card > .image-crop, .service-detail-card > .image-crop, .about-banner, .contact-box, .page-about .plain-card, .page-about .about-feature-card, .page-about .policy-card'
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
    if (image.matches('.greeting-grid > .image-crop')) {
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
