(() => {
  const portraits = [...document.querySelectorAll('.staff-portrait')];
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!portraits.length || motion.matches || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.querySelector('.staff-portrait').classList.remove('is-pending');
      observer.unobserve(entry.target);
    });
  }, {
    rootMargin: '0px 0px -40px 0px',
    threshold: 0,
  });

  portraits.forEach(portrait => {
    portrait.classList.add('is-pending');
    // Observe the unchanged layout box so scaling cannot move the trigger.
    observer.observe(portrait.parentElement);
  });

  motion.addEventListener('change', () => {
    if (!motion.matches) return;
    portraits.forEach(portrait => portrait.classList.remove('is-pending'));
    observer.disconnect();
  });
})();
