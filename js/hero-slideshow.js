(() => {
  const slideshow = document.querySelector('.hero-slideshow');
  if (!slideshow) return;

  const button = slideshow.querySelector('.hero-slideshow-toggle');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let slides = [];
  let current = 0;
  let paused = motion.matches;
  let timer;

  function schedule() {
    window.clearInterval(timer);
    if (paused || document.hidden || slides.length < 2) return;
    timer = window.setInterval(() => {
      slides[current].classList.remove('is-active');
      slides[current].setAttribute('aria-hidden', 'true');
      current = (current + 1) % slides.length;
      slides[current].classList.add('is-active');
      slides[current].removeAttribute('aria-hidden');
    }, 6000);
  }

  function updateButton() {
    button.textContent = paused ? '再生' : '一時停止';
    button.setAttribute('aria-label', paused
      ? 'TOP画像のスライドショーを再生'
      : 'TOP画像のスライドショーを一時停止');
  }

  button.addEventListener('click', () => {
    paused = !paused;
    updateButton();
    schedule();
  });
  document.addEventListener('visibilitychange', schedule);
  motion.addEventListener('change', () => {
    paused = motion.matches;
    updateButton();
    schedule();
  });

  Promise.all([...slideshow.querySelectorAll('.hero-slide')].map(async slide => {
    try {
      await slide.decode();
      return slide;
    } catch {
      return null;
    }
  })).then(loaded => {
    slides = loaded.filter(Boolean);
    if (!slides.length) return;
    slideshow.querySelectorAll('.hero-slide').forEach(slide => {
      slide.classList.remove('is-active');
      slide.setAttribute('aria-hidden', 'true');
    });
    slides[0].classList.add('is-active');
    slides[0].removeAttribute('aria-hidden');
    button.hidden = slides.length < 2;
    updateButton();
    schedule();
  });
})();
