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

  initLaserCalculator();
}

function initLaserCalculator() {
  document.querySelectorAll('.laser-calculator').forEach((root) => {
    if (root.dataset.initialized === 'true') return;
    root.dataset.initialized = 'true';

    const toggle = root.querySelector('.laser-calculator__parameters-toggle');
    const backdrop = root.querySelector('.laser-calculator__dialog-backdrop');
    const dialog = root.querySelector('.laser-calculator__dialog');
    const closeButton = root.querySelector('.laser-calculator__dialog-close');
    const applyButton = root.querySelector('.laser-calculator__dialog-apply');
    const summaryWidth = root.querySelector('[data-parameter-width]');
    const summaryHeight = root.querySelector('[data-parameter-height]');
    let previousFocus = null;

    const closeDialog = () => {
      if (!backdrop || !toggle) return;
      backdrop.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.removeProperty('overflow');
      if (previousFocus) previousFocus.focus();
    };

    const openDialog = () => {
      if (!backdrop || !dialog || !toggle) return;
      previousFocus = document.activeElement;
      backdrop.hidden = false;
      toggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      dialog.focus();
    };

    toggle?.addEventListener('click', openDialog);
    closeButton?.addEventListener('click', closeDialog);
    backdrop?.addEventListener('click', (event) => {
      if (event.target === backdrop) closeDialog();
    });

    dialog?.querySelectorAll('input[type="radio"]').forEach((input) => {
      input.addEventListener('change', () => {
        const group = input.closest('.laser-calculator__parameter-group');
        group?.querySelectorAll('.laser-calculator__parameter-option').forEach((label) => {
          label.classList.toggle('is-selected', label.querySelector('input') === input);
        });
      });
    });

    applyButton?.addEventListener('click', () => {
      const width = dialog?.querySelector('input[name="laser-width"]:checked')?.value || '15';
      const height = dialog?.querySelector('input[name="laser-height"]:checked')?.value || '10';
      if (summaryWidth) summaryWidth.textContent = width + 'м';
      if (summaryHeight) summaryHeight.textContent = height + 'м';
      closeDialog();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && backdrop && !backdrop.hidden) closeDialog();
    });

    root.querySelectorAll('.laser-calculator__options').forEach((group) => {
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
  });
}
