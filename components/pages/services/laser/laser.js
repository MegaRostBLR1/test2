
function initLaser() {
  const calculator = document.querySelector('.laser-calculator');

  if (!calculator || calculator.dataset.initialized === 'true') {
    return;
  }

  calculator.dataset.initialized = 'true';

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
