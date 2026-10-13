function initLaser() {
  const calculator = document.querySelector('.laser-calculator');

  if (!calculator || calculator.dataset.initialized === 'true') {
    return;
  }

  calculator.dataset.initialized = 'true';

  const parametersToggle = calculator.querySelector('.laser-calculator__parameters-toggle');
  const popup = calculator.querySelector('.laser-calculator__popup');
  const popupPanel = calculator.querySelector('.laser-calculator__popup-panel');
  const closeButtons = calculator.querySelectorAll('[data-popup-close]');
  let previouslyFocused = null;

  const setPopupOpen = (isOpen) => {
    if (!popup || !parametersToggle) return;

    popup.classList.toggle('is-open', isOpen);
    popup.setAttribute('aria-hidden', String(!isOpen));
    parametersToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('laser-calculator-popup-open', isOpen);

    if (isOpen) {
      previouslyFocused = document.activeElement;
      popupPanel?.focus();
    } else {
      previouslyFocused?.focus?.();
    }
  };

  parametersToggle?.addEventListener('click', () => {
    setPopupOpen(popup?.classList.contains('is-open') !== true);
  });

  closeButtons.forEach((button) => {
    button.addEventListener('click', () => setPopupOpen(false));
  });

  popup?.addEventListener('click', (event) => {
    if (event.target === popup) setPopupOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && popup?.classList.contains('is-open')) {
      setPopupOpen(false);
    }
  });

  calculator.querySelectorAll('[data-filter]').forEach((button) => {
    button.addEventListener('click', () => {
      const group = button.dataset.filter;

      calculator.querySelectorAll('[data-filter="' + group + '"]').forEach((option) => {
        const active = option === button;
        option.classList.toggle('is-active', active);
        option.setAttribute('aria-pressed', String(active));
      });

      const values = {};
      calculator.querySelectorAll('[data-filter].is-active').forEach((option) => {
        values[option.dataset.filter] = option.dataset.value;
      });
      const width = values.width || '15';
      const height = values.height || '10';
      const value = calculator.querySelector('.laser-calculator__parameters-value');
      if (value) value.textContent = '(Ш: ' + width + 'м, В: ' + height + 'м)';
    });
  });

  calculator.querySelectorAll('[data-expand-options]').forEach((button) => {
    button.addEventListener('click', () => {
      const group = button.dataset.expandOptions;
      const extra = calculator.querySelector('[data-extra-options="' + group + '"]');
      if (!extra) return;
      const expanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!expanded));
      extra.hidden = expanded;
      button.querySelector('span')?.classList.toggle('is-rotated', !expanded);
    });
  });
}
