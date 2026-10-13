function initBuildings() {
  const tabs = document.querySelector('.buildings__agro-tabs');
  const toggle = tabs?.querySelector('.buildings__agro-tabs-toggle');

  if (!tabs || !toggle || toggle.dataset.initialized === 'true') {
    return;
  }

  toggle.dataset.initialized = 'true';

  toggle.addEventListener('click', () => {
    const isExpanded = toggle.getAttribute('aria-expanded') === 'true';

    toggle.setAttribute('aria-expanded', String(!isExpanded));
    toggle.setAttribute(
      'aria-label',
      isExpanded ? 'Открыть разделы агрокомплекса' : 'Закрыть разделы агрокомплекса'
    );
    tabs.classList.toggle('is-open', !isExpanded);
  });
}
