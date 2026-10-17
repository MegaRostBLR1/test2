function initObjectCharacteristics() {
  const root = document.querySelector('.object-characteristics');

  if (!root || root.dataset.initialized === 'true') {
    return;
  }

  root.dataset.initialized = 'true';
}
