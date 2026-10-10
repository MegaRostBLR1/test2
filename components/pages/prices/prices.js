function initPrices() {
  const notice = document.querySelector('.prices__notice');
  const noticeToggle = notice?.querySelector('.prices__notice-toggle');

  if (notice && noticeToggle) {
    noticeToggle.addEventListener('click', () => {
      const isExpanded = notice.classList.toggle('is-expanded');
      noticeToggle.setAttribute('aria-expanded', String(isExpanded));
      noticeToggle.querySelector('span').textContent = isExpanded ? 'Скрыть' : 'Показать еще';
    });
  }


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