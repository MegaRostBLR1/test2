
function initLaser() {
  const calculator = document.querySelector('.laser-calculator');

  if (!calculator || calculator.dataset.initialized === 'true') {
    return;
  }

  calculator.dataset.initialized = 'true';

  const parametersToggle = calculator.querySelector('.laser-calculator__parameters-toggle');
  const filters = calculator.querySelector('.laser-calculator__filters');

  if (parametersToggle && filters) {
    parametersToggle.addEventListener('click', () => {
      const isExpanded = parametersToggle.getAttribute('aria-expanded') === 'true';
      parametersToggle.setAttribute('aria-expanded', String(!isExpanded));
      filters.classList.toggle('is-open', !isExpanded);
    });
  }

  calculator.querySelectorAll('[data-filter]').forEach((button) => {
    button.addEventListener('click', () => {
      const group = button.dataset.filter;

      calculator.querySelectorAll('[data-filter="' + group + '"]').forEach((option) => {
        const active = option === button;
        option.classList.toggle('is-active', active);
        option.setAttribute('aria-pressed', String(active));
      });
    });
  });
}
