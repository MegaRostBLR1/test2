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
}
