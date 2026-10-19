function initComplexesCharacteristics() {
  const panel = document.querySelector('.complexes-characteristics__technical-panel');
  const toggle = document.querySelector('.complexes-characteristics__show-more');

  if (!panel || !toggle || toggle.dataset.initialized === 'true') {
    return;
  }

  toggle.dataset.initialized = 'true';

  const label = toggle.querySelector('.complexes-characteristics__show-more-label');

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';

    toggle.setAttribute('aria-expanded', String(!expanded));
    panel.classList.toggle('is-expanded', !expanded);

    if (label) {
      label.textContent = expanded ? 'Показать еще' : 'Свернуть';
    }
  });
}
