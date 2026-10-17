function initNews() {
  const filterButtons = document.querySelectorAll('.press-news__filter-button[data-filter-type]');
  const mobileButton = document.querySelector('.press-news__mobile-filter-button');
  const overlay = document.querySelector('#press-news-filter-dialog');
  const dialog = overlay?.querySelector('.press-news__filter-dialog');
  const closeButton = overlay?.querySelector('.press-news__filter-dialog-close');
  const resetButton = overlay?.querySelector('.press-news__filter-reset');
  const applyButton = overlay?.querySelector('.press-news__filter-apply');
  const monthSelect = overlay?.querySelector('[name="news-month"]');
  const yearSelect = overlay?.querySelector('[name="news-year"]');
  let previousFocus = null;

  const closeMenus = (exceptButton = null) => {
    filterButtons.forEach((button) => {
      if (button === exceptButton) return;
      button.setAttribute('aria-expanded', 'false');
      const menu = document.getElementById(button.getAttribute('aria-controls'));
      if (menu) menu.hidden = true;
    });
  };

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const menu = document.getElementById(button.getAttribute('aria-controls'));
      const shouldOpen = button.getAttribute('aria-expanded') !== 'true';
      closeMenus(button);
      button.setAttribute('aria-expanded', String(shouldOpen));
      if (menu) menu.hidden = !shouldOpen;
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

  const openDialog = () => {
    if (!overlay || !dialog) return;
    previousFocus = document.activeElement;
    overlay.hidden = false;
    mobileButton?.setAttribute('aria-expanded', 'true');
    document.body.classList.add('press-news-filter-open');
    closeButton?.focus();
  };

  const closeDialog = () => {
    if (!overlay) return;
    overlay.hidden = true;
    mobileButton?.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('press-news-filter-open');
    if (previousFocus instanceof HTMLElement) previousFocus.focus();
  };

  mobileButton?.addEventListener('click', openDialog);
  closeButton?.addEventListener('click', closeDialog);
  overlay?.addEventListener('click', (event) => {
    if (event.target === overlay) closeDialog();
  });

  resetButton?.addEventListener('click', () => {
    if (monthSelect) monthSelect.value = '';
    if (yearSelect) yearSelect.value = '';
  });

  applyButton?.addEventListener('click', () => {
    const month = monthSelect?.value || '';
    const year = yearSelect?.value || '';
    const monthButton = document.querySelector('[data-filter-type="months"] span');
    const yearButton = document.querySelector('[data-filter-type="years"] span');
    if (monthButton) monthButton.textContent = month ? 'По месяцам: ' + month : 'По месяцам:';
    if (yearButton) yearButton.textContent = year ? 'По годам: ' + year : 'По годам:';
    closeDialog();
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.press-news__filter-dropdown')) closeMenus();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenus();
      if (overlay && !overlay.hidden) closeDialog();
    }
    if (event.key === 'Tab' && overlay && !overlay.hidden && dialog) {
      const focusable = dialog.querySelectorAll('button, select, [href], input, textarea, [tabindex]:not([tabindex="-1"])');
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
}