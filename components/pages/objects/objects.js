function initObjects() {
  const root = document.querySelector('.objects');

  if (!root || root.dataset.initialized === 'true') {
    return;
  }

  root.dataset.initialized = 'true';

  const searchForm = root.querySelector('.objects__search-group');
  const viewControls = Array.from(root.querySelectorAll('[data-objects-view]'));

  if (searchForm) {
    searchForm.addEventListener('submit', (event) => {
      event.preventDefault();
    });
  }

  const filtersForm = root.querySelector('.objects-map__filters');
  const mobileFiltersToggle = root.querySelector('.objects-map__mobile-toggle');
  const moreFiltersButton = root.querySelector('.objects-map__more');
  const extraFilters = root.querySelector('.objects-map__extra-filters');
  const mapCard = root.querySelector('.objects-map__card');
  const closeCardButton = root.querySelector('.objects-map__card-close');

  if (filtersForm) {
    filtersForm.addEventListener('submit', (event) => {
      event.preventDefault();
    });
  }

  if (mobileFiltersToggle && filtersForm) {
    mobileFiltersToggle.addEventListener('click', () => {
      const expanded = mobileFiltersToggle.getAttribute('aria-expanded') === 'true';
      mobileFiltersToggle.setAttribute('aria-expanded', String(!expanded));
      filtersForm.classList.toggle('is-expanded', !expanded);
      if (extraFilters) {
        extraFilters.hidden = expanded;
      }
    });
  }

  if (moreFiltersButton && extraFilters) {
    moreFiltersButton.addEventListener('click', () => {
      const expanded = moreFiltersButton.getAttribute('aria-expanded') === 'true';
      moreFiltersButton.setAttribute('aria-expanded', String(!expanded));
      extraFilters.hidden = expanded;
    });
  }

  if (closeCardButton && mapCard) {
    closeCardButton.addEventListener('click', () => {
      mapCard.hidden = true;
    });
  }

  viewControls.forEach((control) => {
    control.addEventListener('click', () => {
      const selectedView = control.dataset.objectsView;

      viewControls.forEach((item) => {
        const isActive = item.dataset.objectsView === selectedView;

        item.classList.toggle('is-active', isActive);
        item.setAttribute('aria-pressed', String(isActive));
      });
    });
  });

  const videoSection = root.querySelector('.objects-video');
  if (videoSection) {
    const dots = Array.from(videoSection.querySelectorAll('.objects-video__dot'));
    const previous = videoSection.querySelector('.objects-video__arrow--previous');
    const next = videoSection.querySelector('.objects-video__arrow--next');
    const pagination = videoSection.querySelector('.objects-video__pagination');
    let activeSlide = 0;
    const selectSlide = (index) => {
      activeSlide = Math.max(0, Math.min(dots.length - 1, index));
      dots.forEach((dot, dotIndex) => {
        const active = dotIndex === activeSlide;
        dot.classList.toggle('is-active', active);
        if (active) dot.setAttribute('aria-current', 'true');
        else dot.removeAttribute('aria-current');
      });
      if (pagination) pagination.setAttribute('aria-label', `Слайд ${activeSlide + 1} из ${dots.length}`);
      if (previous) previous.disabled = activeSlide === 0;
      if (next) next.disabled = activeSlide === dots.length - 1;
    };
    dots.forEach((dot, index) => dot.addEventListener('click', () => selectSlide(index)));
    if (previous) previous.addEventListener('click', () => selectSlide(activeSlide - 1));
    if (next) next.addEventListener('click', () => selectSlide(activeSlide + 1));
  }
}
