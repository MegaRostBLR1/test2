function initBuildingsDirectory() {
  const root = document.querySelector('.buildings-directory');

  if (!root || root.dataset.initialized === 'true') {
    return;
  }

  root.dataset.initialized = 'true';

  const filters = Array.from(root.querySelectorAll('[data-filter]'));
  const cards = Array.from(root.querySelectorAll('[data-category]'));

  filters.forEach((filter) => {
    filter.addEventListener('click', () => {
      const selectedCategory = filter.dataset.filter;

      filters.forEach((item) => {
        const isActive = item === filter;
        item.classList.toggle('is-active', isActive);
        item.setAttribute('aria-pressed', String(isActive));
      });

      cards.forEach((card) => {
        card.hidden = selectedCategory !== 'all' && card.dataset.category !== selectedCategory;
      });
    });
  });
}
