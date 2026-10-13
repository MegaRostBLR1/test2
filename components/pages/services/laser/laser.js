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
}
