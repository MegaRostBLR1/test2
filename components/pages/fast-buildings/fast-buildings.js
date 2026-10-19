function initFastBuildings() {
  const page = document.querySelector('.fast-buildings');

  if (page) {
    page.dataset.initialized = 'true';
  }

  const catalog = document.querySelector('.fast-buildings-catalog');

  if (!catalog || catalog.dataset.carouselInitialized) {
    return;
  }

  const previous = catalog.querySelector('.fast-buildings-catalog__arrow--previous');
  const next = catalog.querySelector('.fast-buildings-catalog__arrow--next');
  const dots = Array.from(catalog.querySelectorAll('.fast-buildings-catalog__dot'));
  const cards = Array.from(catalog.querySelectorAll('.fast-buildings-catalog__card'));
  let activeIndex = 0;

  const updateCarousel = (index) => {
    activeIndex = Math.max(0, Math.min(index, cards.length - 1));

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle('fast-buildings-catalog__dot--active', dotIndex === activeIndex);
    });

    if (window.matchMedia('(max-width: 1300px)').matches && cards[activeIndex]) {
      cards[activeIndex].scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'nearest',
        inline: 'start'
      });
    }
  };

  previous.addEventListener('click', () => updateCarousel(activeIndex - 1));
  next.addEventListener('click', () => updateCarousel(activeIndex + 1));
  catalog.dataset.carouselInitialized = 'true';
}
