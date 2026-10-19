function initFastBuildings() {
  const page = document.querySelector('.fast-buildings');

  if (!page) {
    return;
  }

  page.dataset.initialized = 'true';
}
