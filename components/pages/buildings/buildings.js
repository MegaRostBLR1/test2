function initBuildings() {
  const tabs = document.querySelector('.buildings__agro-tabs');
  const toggle = tabs?.querySelector('.buildings__agro-tabs-toggle');

  if (!tabs || !toggle || tabs.dataset.initialized === 'true') {
    return;
  }

  tabs.dataset.initialized = 'true';

  const setExpanded = (isExpanded) => {
    tabs.classList.toggle('is-open', isExpanded);
    toggle.setAttribute('aria-expanded', String(isExpanded));
    toggle.setAttribute(
      'aria-label',
      isExpanded ? 'Закрыть разделы агрокомплекса' : 'Открыть разделы агрокомплекса'
    );
  };

  tabs.addEventListener('click', (event) => {
    if (!window.matchMedia('(max-width: 680px)').matches) {
      return;
    }

    const link = event.target.closest('.buildings__agro-tab');
    const isExpanded = tabs.classList.contains('is-open');

    if (link) {
      if (!isExpanded) {
        event.preventDefault();
        setExpanded(true);
      }

      return;
    }

    setExpanded(!isExpanded);
  });
}
