function initHome() {
  const hero = document.querySelector('.home-hero');

  if (!hero) {
    return;
  }

  // Навигация слайдера остаётся неактивной, пока в проект не добавлены остальные слайды.

  const agroAccordion = document.querySelector('.home-agro__accordion');

  if (agroAccordion && !agroAccordion.dataset.initialized) {
    agroAccordion.dataset.initialized = 'true';

    agroAccordion.addEventListener('click', (event) => {
      const toggle = event.target.closest('.home-agro__toggle');

      if (!toggle || !agroAccordion.contains(toggle)) {
        return;
      }

      const item = toggle.closest('.home-agro__item');
      const content = item.querySelector('.home-agro__item-content');
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';

      toggle.setAttribute('aria-expanded', String(!isExpanded));
      item.classList.toggle('is-open', !isExpanded);
      content.hidden = isExpanded;

      const icon = toggle.querySelector('.home-agro__toggle-icon svg');
      icon.innerHTML = isExpanded
        ? '<path d="M12 5v14M5 12h14"></path>'
        : '<path d="M5 12h14"></path>';
    });

    document.querySelectorAll('.home-agro__zoom').forEach((zoomButton) => {
      const visual = zoomButton.closest('.home-agro__visual, .home-agro__tablet-visual');

      if (!visual) {
        return;
      }

      zoomButton.addEventListener('click', () => {
        const isExpanded = zoomButton.getAttribute('aria-expanded') === 'true';
        zoomButton.setAttribute('aria-expanded', String(!isExpanded));
        zoomButton.setAttribute('aria-label', isExpanded ? 'Увеличить изображение' : 'Уменьшить изображение');
        visual.classList.toggle('is-zoomed', !isExpanded);
      });
    });
  }
}

const industriesStylesheet = './components/pages/home/home-industries.css';
if (!document.querySelector('link[data-page-style="' + industriesStylesheet + '"]')) {
  const stylesheet = document.createElement('link');
  stylesheet.rel = 'stylesheet';
  stylesheet.href = industriesStylesheet;
  stylesheet.dataset.pageStyle = industriesStylesheet;
  document.head.append(stylesheet);
}
