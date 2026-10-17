function initNews() {
  const filterButtons = document.querySelectorAll('.press-news__filter-button[data-filter-type]');

  if (!filterButtons.length) {
    return;
  }

  const closeMenus = (exceptButton = null) => {
    filterButtons.forEach((button) => {
      if (button === exceptButton) {
        return;
      }

      button.setAttribute('aria-expanded', 'false');
      const menu = document.getElementById(button.getAttribute('aria-controls'));
      if (menu) {
        menu.hidden = true;
      }
    });
  };

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const menu = document.getElementById(button.getAttribute('aria-controls'));
      const shouldOpen = button.getAttribute('aria-expanded') !== 'true';

      closeMenus(button);
      button.setAttribute('aria-expanded', String(shouldOpen));
      if (menu) {
        menu.hidden = !shouldOpen;
      }
    });

    const menu = document.getElementById(button.getAttribute('aria-controls'));
    menu?.querySelectorAll('.press-news__filter-option').forEach((option) => {
      option.addEventListener('click', () => {
        menu.querySelectorAll('.press-news__filter-option').forEach((item) => {
          const selected = item === option;
          item.classList.toggle('is-selected', selected);
          item.setAttribute('aria-selected', String(selected));
        });

        const label = button.querySelector('span');
        if (label) {
          const prefix = button.dataset.filterType === 'months' ? 'По месяцам: ' : 'По годам: ';
          label.textContent = prefix + option.dataset.filterValue;
        }

        closeMenus();
      });
    });
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.press-news__filter-dropdown')) {
      closeMenus();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenus();
    }
  });
}
