function initBuildings() {
  const tabs = document.querySelector('.buildings__agro-tabs');
  const toggle = tabs?.querySelector('.buildings__agro-tabs-toggle');

  if (tabs && toggle && tabs.dataset.initialized !== 'true') {
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

  const description = document.querySelector('.buildings-description');

  if (!description || description.dataset.initialized === 'true') {
    return;
  }

  description.dataset.initialized = 'true';

  const accordionItems = Array.from(
    description.querySelectorAll('.buildings-description__item')
  );

  accordionItems.forEach((item) => {
    const trigger = item.querySelector('.buildings-description__trigger');
    const panel = item.querySelector('.buildings-description__panel');
    const icon = trigger?.querySelector('.buildings-description__icon img');

    if (!trigger || !panel || !icon) {
      return;
    }

    trigger.addEventListener('click', () => {
      const shouldExpand = trigger.getAttribute('aria-expanded') !== 'true';

      accordionItems.forEach((accordionItem) => {
        const accordionTrigger = accordionItem.querySelector('.buildings-description__trigger');
        const accordionPanel = accordionItem.querySelector('.buildings-description__panel');
        const accordionIcon = accordionTrigger?.querySelector('.buildings-description__icon img');

        if (!accordionTrigger || !accordionPanel || !accordionIcon) {
          return;
        }

        const isExpanded = accordionItem === item && shouldExpand;

        accordionTrigger.setAttribute('aria-expanded', String(isExpanded));
        accordionPanel.hidden = !isExpanded;
        accordionIcon.src = isExpanded
          ? 'https://www.figma.com/api/mcp/asset/b4ec6f0c-4a5e-43d7-a0da-6bd0b72e7ff1/33e3b.svg'
          : 'https://www.figma.com/api/mcp/asset/b4ec6f0c-4a5e-43d7-a0da-6bd0b72e7ff1/5d936.svg';
      });
    });
  });

  const zoomButton = description.querySelector('.buildings-description__zoom');
  const lightbox = description.querySelector('.buildings-description__lightbox');

  if (zoomButton && lightbox) {
    zoomButton.addEventListener('click', () => {
      if (typeof lightbox.showModal === 'function') {
        lightbox.showModal();
      }
    });

    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) {
        lightbox.close();
      }
    });
  }
}
