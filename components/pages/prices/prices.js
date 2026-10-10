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