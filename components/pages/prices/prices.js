function initPrices() {
  document.querySelectorAll('.prices__segmented').forEach((group) => {
    const options = Array.from(group.querySelectorAll('.prices__option'));

    options.forEach((option) => {
      option.addEventListener('click', () => {
        options.forEach((item) => {
          const isActive = item === option;
          item.classList.toggle('is-active', isActive);
          item.setAttribute('aria-pressed', String(isActive));
        });
      });
    });
  });
}

function initPricesNotice() {
  const notice = document.querySelector('.prices__notice');
  const toggle = notice?.querySelector('.prices__notice-toggle');

  if (!notice || !toggle) return;

  toggle.addEventListener('click', () => {
    const isExpanded = notice.classList.toggle('is-expanded');
    toggle.setAttribute('aria-expanded', String(isExpanded));
    toggle.querySelector('span').textContent = isExpanded ? 'Скрыть' : 'Показать еще';
  });
}

initPricesNotice();
