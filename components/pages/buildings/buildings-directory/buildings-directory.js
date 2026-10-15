function initBuildingsDirectory() {
  const root = document.querySelector('.buildings-directory');

  if (!root || root.dataset.initialized === 'true') {
    return;
  }

  root.dataset.initialized = 'true';

  const filters = Array.from(root.querySelectorAll('[data-filter]'));
  const cards = Array.from(root.querySelectorAll('[data-category]'));
  const showMoreButton = root.querySelector('.buildings-directory__show-more');
  const initialVisibleCount = 3;
  const batchSize = 3;
  let selectedCategory = 'all';
  let visibleCount = initialVisibleCount;

  function renderCards() {
    const matchingCards = cards.filter((card) => (
      selectedCategory === 'all' || card.dataset.category === selectedCategory
    ));

    cards.forEach((card) => {
      card.hidden = true;
    });

    matchingCards.slice(0, visibleCount).forEach((card) => {
      card.hidden = false;
    });

    if (showMoreButton) {
      const hasMoreCards = matchingCards.length > visibleCount;
      showMoreButton.hidden = !hasMoreCards;
      showMoreButton.setAttribute('aria-expanded', String(!hasMoreCards));
    }
  }

  filters.forEach((filter) => {
    filter.addEventListener('click', () => {
      selectedCategory = filter.dataset.filter;
      visibleCount = initialVisibleCount;

      filters.forEach((item) => {
        const isActive = item === filter;
        item.classList.toggle('is-active', isActive);
        item.setAttribute('aria-pressed', String(isActive));
      });

      renderCards();
    });
  });

  if (showMoreButton) {
    showMoreButton.addEventListener('click', () => {
      visibleCount += batchSize;
      renderCards();
    });
  }

  renderCards();
}
