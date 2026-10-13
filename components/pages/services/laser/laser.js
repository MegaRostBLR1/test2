function initLaser() {

  document.querySelectorAll('.laser-materials').forEach((root) => {
    if (root.dataset.initialized === 'true') return;
    root.dataset.initialized = 'true';
    root.querySelectorAll('.laser-materials__toggle').forEach((toggle) => {
      toggle.addEventListener('click', () => {
        const wasExpanded = toggle.getAttribute('aria-expanded') === 'true';
        root.querySelectorAll('.laser-materials__toggle').forEach((item) => {
          item.setAttribute('aria-expanded', 'false');
          const panel = root.querySelector(`#${item.getAttribute('aria-controls')}`);
          if (panel) panel.hidden = true;
          const icon = item.querySelector('.laser-materials__toggle-icon img');
          if (icon) icon.src = 'https://www.figma.com/api/mcp/asset/529bb6bf-2950-4bc3-a485-eb3e3f21fa62/dcfb2.svg';
        });
        if (!wasExpanded) {
          toggle.setAttribute('aria-expanded', 'true');
          const panel = root.querySelector(`#${toggle.getAttribute('aria-controls')}`);
          if (panel) panel.hidden = false;
          const icon = toggle.querySelector('.laser-materials__toggle-icon img');
          if (icon) icon.src = 'https://www.figma.com/api/mcp/asset/529bb6bf-2950-4bc3-a485-eb3e3f21fa62/33e3b.svg';
        }
      });
    });
    root.querySelectorAll('.laser-materials__zoom').forEach((zoom) => {
      const image = zoom.closest('.laser-materials__visual')?.querySelector('.laser-materials__image');
      if (!image) return;
      zoom.addEventListener('click', () => {
        const preview = window.open(image.src, '_blank', 'noopener,noreferrer');
        if (preview) preview.opener = null;
      });
    });
  });

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