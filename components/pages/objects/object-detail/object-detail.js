function initObjectDetail() {
  const root = document.querySelector('.object-detail');

  if (!root || root.dataset.initialized === 'true') {
    return;
  }

  root.dataset.initialized = 'true';
}
