function initObjectParameters() {
  const root = document.querySelector('.object-parameters');

  if (!root || root.dataset.initialized === 'true') {
    return;
  }

  root.dataset.initialized = 'true';
}
