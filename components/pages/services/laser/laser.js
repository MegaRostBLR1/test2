function initLaser() {
  document.querySelectorAll('.laser-calculator__options').forEach((group) => {
    if (group.dataset.initialized === 'true') return;
    group.dataset.initialized = 'true';
    group.addEventListener('click', (event) => {
      const option = event.target.closest('.laser-calculator__option');
      if (!option || !group.contains(option)) return;
      group.querySelectorAll('.laser-calculator__option').forEach((button) => {
        const isActive = button === option;
        button.classList.toggle('is-active', isActive);
        button.setAttribute('aria-pressed', String(isActive));
      });
    });
  });
  initLaserCalculatorSettings();
}

function initLaserCalculatorSettings() {
  const root = document.querySelector('.laser-calculator');
  if (!root || root.dataset.settingsInitialized === 'true') return;
  root.dataset.settingsInitialized = 'true';
  const toggle = root.querySelector('.laser-calculator__settings-toggle');
  const popup = root.querySelector('.laser-calculator__settings-popup');
  const close = root.querySelector('.laser-calculator__settings-close');
  const apply = root.querySelector('.laser-calculator__settings-apply');
  const widthInput = popup.querySelector('input[name="width"]');
  const heightInput = popup.querySelector('input[name="height"]');
  const value = root.querySelector('.laser-calculator__settings-value');
  const setOpen = (open) => { popup.hidden = !open; toggle.setAttribute('aria-expanded', String(open)); if (open) widthInput.focus(); };
  toggle.addEventListener('click', () => setOpen(popup.hidden));
  close.addEventListener('click', () => { setOpen(false); toggle.focus(); });
  apply.addEventListener('click', () => {
    const width = Number(widthInput.value);
    const height = Number(heightInput.value);
    if (!widthInput.validity.valid || !heightInput.validity.valid || width <= 0 || height <= 0) {
      (widthInput.validity.valid ? heightInput : widthInput).reportValidity();
      return;
    }
    value.textContent = `(Ш: ${widthInput.value}м, В: ${heightInput.value}м)`;
    setOpen(false);
    toggle.focus();
  });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !popup.hidden) { setOpen(false); toggle.focus(); } });
  document.addEventListener('click', (event) => { if (!popup.hidden && !root.querySelector('.laser-calculator__settings').contains(event.target)) setOpen(false); });
}