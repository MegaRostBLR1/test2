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
