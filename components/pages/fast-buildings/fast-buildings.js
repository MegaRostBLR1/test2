function initFastBuildings() {

  const advantages = document.querySelector('.fast-buildings-advantages');

  if (advantages && advantages.dataset.initialized !== 'true') {
    advantages.dataset.initialized = 'true';

    const items = Array.from(advantages.querySelectorAll('.fast-buildings-advantages__item:not(.fast-buildings-advantages__item--responsive)'));
    const previousButton = advantages.querySelector('.fast-buildings-advantages__arrow--prev');
    const nextButton = advantages.querySelector('.fast-buildings-advantages__arrow--next');
    let activeIndex = 0;

    const setActiveItem = (index) => {
      activeIndex = (index + items.length) % items.length;

      items.forEach((item, itemIndex) => {
        const isActive = itemIndex === activeIndex;
        item.classList.toggle('is-active', isActive);

        if (isActive) {
          item.setAttribute('aria-current', 'step');
        } else {
          item.removeAttribute('aria-current');
        }
      });

      if (previousButton) {
        previousButton.disabled = activeIndex === 0;
      }

      if (nextButton) {
        nextButton.disabled = activeIndex === items.length - 1;
      }
    };

    previousButton?.addEventListener('click', () => {
      if (activeIndex > 0) {
        setActiveItem(activeIndex - 1);
      }
    });

    nextButton?.addEventListener('click', () => {
      if (activeIndex < items.length - 1) {
        setActiveItem(activeIndex + 1);
      }
    });

    setActiveItem(0);
  }


  const characteristics = document.querySelector('.fast-buildings-characteristics');
  const characteristicsMore = characteristics?.querySelector('.fast-buildings-characteristics__more');
  const characteristicsTable = characteristics?.querySelector('.fast-buildings-characteristics__table');

  if (characteristicsMore && characteristicsTable && !characteristicsMore.dataset.initialized) {
    characteristicsMore.addEventListener('click', () => {
      const expanded = characteristicsMore.getAttribute('aria-expanded') === 'true';
      characteristicsMore.setAttribute('aria-expanded', String(!expanded));
      characteristicsTable.classList.toggle('is-expanded', !expanded);
      characteristicsMore.querySelector('span').textContent = expanded ? 'Показать еще' : 'Скрыть';
    });
    characteristicsMore.dataset.initialized = 'true';
  }


  const factors = document.querySelector('.fast-buildings-factors');
  const factorsGrid = factors?.querySelector('.fast-buildings-factors__grid');
  const factorsMore = factors?.querySelector('.fast-buildings-factors__more');

  if (factorsGrid && factorsMore && !factorsMore.dataset.initialized) {
    factorsMore.addEventListener('click', () => {
      const expanded = factorsMore.getAttribute('aria-expanded') === 'true';
      factorsMore.setAttribute('aria-expanded', String(!expanded));
      factorsGrid.classList.toggle('is-expanded', !expanded);
      factorsMore.querySelector('span').textContent = expanded ? 'Показать еще' : 'Скрыть';
    });
    factorsMore.dataset.initialized = 'true';
  }

  const comfort = document.querySelector('.fast-buildings-comfort');

  if (comfort && !comfort.dataset.accordionInitialized) {
    const comfortItems = Array.from(comfort.querySelectorAll('.fast-buildings-comfort__item'));

    comfortItems.forEach((item) => {
      const toggle = item.querySelector('.fast-buildings-comfort__item-heading button');
      const description = item.querySelector('.fast-buildings-comfort__description');

      if (!toggle || !description) {
        return;
      }

      toggle.addEventListener('click', () => {
        const expanded = toggle.getAttribute('aria-expanded') === 'true';

        toggle.setAttribute('aria-expanded', String(!expanded));
        description.hidden = expanded;
        item.classList.toggle('fast-buildings-comfort__item--active', !expanded);
      });
    });

    comfort.dataset.accordionInitialized = 'true';
  }


  const complectation = document.querySelector('.fast-buildings-complectation');
  if (complectation && !complectation.dataset.paginationInitialized) {
    const items = Array.from(complectation.querySelectorAll('.fast-buildings-complectation__item'));
    const previous = complectation.querySelector('.fast-buildings-complectation__arrow--prev');
    const next = complectation.querySelector('.fast-buildings-complectation__arrow--next');
    let activeIndex = 0;
    const updateComplectation = (index) => {
      activeIndex = Math.max(0, Math.min(index, items.length - 1));
      const compact = window.matchMedia('(max-width: 900px)').matches;
      items.forEach((item, itemIndex) => {
        item.hidden = compact && itemIndex !== activeIndex;
        item.classList.toggle('is-active', itemIndex === activeIndex);
        if (itemIndex === activeIndex) item.setAttribute('aria-current', 'true');
        else item.removeAttribute('aria-current');
      });
      if (previous) previous.disabled = activeIndex === 0;
      if (next) next.disabled = activeIndex === items.length - 1;
    };
    previous?.addEventListener('click', () => updateComplectation(activeIndex - 1));
    next?.addEventListener('click', () => updateComplectation(activeIndex + 1));
    window.addEventListener('resize', () => updateComplectation(activeIndex));
    updateComplectation(0);
    complectation.dataset.paginationInitialized = 'true';
  }

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
