function initFastBuildings() {
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


  const comparison = document.querySelector('.fast-buildings-comparison');
  if (comparison && !comparison.dataset.initialized) {
    const differencesToggle = comparison.querySelector('[data-comparison-differences]');
    const comparisonRows = comparison.querySelector('[data-comparison-rows]');
    const moreButton = comparison.querySelector('[data-comparison-more]');

    differencesToggle?.addEventListener('change', () => {
      const groups = [...comparisonRows.querySelectorAll('.fast-buildings-comparison__group')];
      groups.forEach((group) => {
        const values = [...group.querySelectorAll('[data-comparison-value]')];
        const isDifferent = values.length > 0 && new Set(values.map((value) => value.dataset.comparisonValue)).size > 1;
        group.classList.toggle('is-hidden', differencesToggle.checked && !isDifferent);
      });
    });

    moreButton?.addEventListener('click', () => {
      const shouldExpand = moreButton.dataset.expanded !== 'true';
      comparisonRows.querySelectorAll('.fast-buildings-comparison__group').forEach((group) => {
        group.open = shouldExpand;
      });
      moreButton.dataset.expanded = String(shouldExpand);
      moreButton.textContent = shouldExpand ? 'Скрыть' : 'Показать еще';
      if (!shouldExpand) {
        comparisonRows.querySelectorAll('.fast-buildings-comparison__group').forEach((group, index) => {
          group.open = index === 1 || index === 2;
        });
      }
    });

    comparison.dataset.initialized = 'true';
  }

}
