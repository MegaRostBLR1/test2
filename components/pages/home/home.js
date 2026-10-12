function initHome() {
  const hero = document.querySelector('.home-hero');

  if (!hero) {
    return;
  }

  // Навигация слайдера остаётся неактивной, пока в проект не добавлены остальные слайды.

  const agroAccordion = document.querySelector('.home-agro__accordion');

  if (agroAccordion && !agroAccordion.dataset.initialized) {
    agroAccordion.dataset.initialized = 'true';

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const contentAnimations = new WeakMap();

    const setContentExpanded = (content, expanded) => {
      const currentHeight = content.getBoundingClientRect().height;
      contentAnimations.get(content)?.cancel();

      if (expanded) {
        content.hidden = false;
      }

      if (reducedMotion.matches) {
        content.hidden = !expanded;
        content.style.removeProperty('height');
        content.style.removeProperty('overflow');
        content.style.removeProperty('opacity');
        contentAnimations.delete(content);
        return;
      }

      const targetHeight = expanded ? content.scrollHeight : 0;
      const animation = content.animate(
        [
          { height: `${currentHeight}px`, opacity: expanded ? 0.7 : 1 },
          { height: `${targetHeight}px`, opacity: expanded ? 1 : 0.7 }
        ],
        {
          duration: 300,
          easing: 'ease-in-out'
        }
      );

      contentAnimations.set(content, animation);
      animation.addEventListener('finish', () => {
        if (contentAnimations.get(content) !== animation) {
          return;
        }

        contentAnimations.delete(content);
        content.hidden = !expanded;
        content.style.removeProperty('height');
        content.style.removeProperty('overflow');
        content.style.removeProperty('opacity');
      }, { once: true });
    };

    agroAccordion.addEventListener('click', (event) => {
      const toggle = event.target.closest('.home-agro__toggle');

      if (!toggle || !agroAccordion.contains(toggle)) {
        return;
      }

      const item = toggle.closest('.home-agro__item');
      const content = item?.querySelector('.home-agro__item-content');

      if (!item || !content) {
        return;
      }

      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      const expanded = !isExpanded;

      if (expanded) {
        agroAccordion.querySelectorAll('.home-agro__toggle[aria-expanded="true"]').forEach((openToggle) => {
          if (openToggle === toggle) {
            return;
          }

          const openItem = openToggle.closest('.home-agro__item');
          const openContent = openItem?.querySelector('.home-agro__item-content');

          openToggle.setAttribute('aria-expanded', 'false');
          openItem?.classList.remove('is-open');

          if (openContent) {
            setContentExpanded(openContent, false);
          }

          const openIcon = openToggle.querySelector('.home-agro__toggle-icon svg');
          if (openIcon) {
            openIcon.innerHTML = '<path d="M12 5v14M5 12h14"></path>';
          }
        });
      }

      toggle.setAttribute('aria-expanded', String(expanded));
      item.classList.toggle('is-open', expanded);
      setContentExpanded(content, expanded);

      const icon = toggle.querySelector('.home-agro__toggle-icon svg');
      icon.innerHTML = expanded
        ? '<path d="M5 12h14"></path>'
        : '<path d="M12 5v14M5 12h14"></path>';
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
