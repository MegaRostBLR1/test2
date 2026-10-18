function initFaq() {
  const categories = document.querySelectorAll('.press-faq__category');

  categories.forEach((category) => {
    category.addEventListener('click', () => {
      categories.forEach((item) => {
        const isActive = item === category;
        item.classList.toggle('is-active', isActive);
        item.setAttribute('aria-pressed', String(isActive));
      });
    });
  });
}
