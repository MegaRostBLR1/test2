function initComplexes() {
  const advantages = document.querySelector('.complexes-advantages');

  if (advantages && advantages.dataset.initialized !== 'true') {
    advantages.dataset.initialized = 'true';

    const items = Array.from(advantages.querySelectorAll('.complexes-advantages__item:not(.complexes-advantages__item--responsive)'));
    const previousButton = advantages.querySelector('.complexes-advantages__arrow--prev');
    const nextButton = advantages.querySelector('.complexes-advantages__arrow--next');
    let activeIndex = 0;

    const setActiveItem = (index) => {
      activeIndex = (index + items.length) % items.length;

      items.forEach((item, itemIndex) => {
        const isActive = itemIndex === activeIndex;
        item.classList.toggle('is-active', isActive);

        if (isActive) {
          item.setAttribute('aria-current', 'step');
        } else {
          item.removeAttribute('aria-current');
        }
      });

      if (previousButton) {
        previousButton.disabled = activeIndex === 0;
      }

      if (nextButton) {
        nextButton.disabled = activeIndex === items.length - 1;
      }
    };

    previousButton?.addEventListener('click', () => {
      if (activeIndex > 0) {
        setActiveItem(activeIndex - 1);
      }
    });

    nextButton?.addEventListener('click', () => {
      if (activeIndex < items.length - 1) {
        setActiveItem(activeIndex + 1);
      }
    });

    setActiveItem(0);
  }


  const tabs = document.querySelector('.complexes__agro-tabs');
  const toggle = tabs?.querySelector('.complexes__agro-tabs-toggle');

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

      const link = event.target.closest('.complexes__agro-tab');
      const isExpanded = tabs.classList.contains('is-open');

      if (link) {
        if (link.getAttribute('href')?.startsWith('#/')) {
          setExpanded(false);
          return;
        }

        if (!isExpanded) {
          event.preventDefault();
          setExpanded(true);
        }

        return;
      }

      setExpanded(!isExpanded);
    });
  }

  const description = document.querySelector('.complexes-description');

  if (!description) {
    return;
  }

  const industries = description.querySelector('.complexes-description__industries');
  const industriesToggle = description.querySelector('.complexes-description__industries-toggle');

  if (industries && industriesToggle && industries.dataset.toggleInitialized !== 'true') {
    industries.dataset.toggleInitialized = 'true';
    industriesToggle.addEventListener('click', () => {
      const expanded = industriesToggle.getAttribute('aria-expanded') !== 'true';
      industries.classList.toggle('is-expanded', expanded);
      industriesToggle.setAttribute('aria-expanded', String(expanded));
      industriesToggle.querySelector('span').textContent = expanded ? 'Скрыть' : 'Показать еще';
    });
  }

  if (description.dataset.initialized === 'true') {
    return;
  }

  description.dataset.initialized = 'true';

  const accordionItems = Array.from(
      description.querySelectorAll('.complexes-description__item')
  );

  accordionItems.forEach((item) => {
    const trigger = item.querySelector('.complexes-description__trigger');
    const panel = item.querySelector('.complexes-description__panel');
    const icon = trigger?.querySelector('.complexes-description__icon img');

    if (!trigger || !panel || !icon || !panel.textContent.trim()) {
      return;
    }

    trigger.addEventListener('click', () => {
      const shouldExpand = trigger.getAttribute('aria-expanded') !== 'true';

      accordionItems.forEach((accordionItem) => {
        const accordionTrigger = accordionItem.querySelector('.complexes-description__trigger');
        const accordionPanel = accordionItem.querySelector('.complexes-description__panel');
        const accordionIcon = accordionTrigger?.querySelector('.complexes-description__icon img');

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

  const zoomButtons = description.querySelectorAll('.complexes-description__zoom');
  const lightbox = description.querySelector('.complexes-description__lightbox');

  if (lightbox) {
    zoomButtons.forEach((zoomButton) => {
      zoomButton.addEventListener('click', () => {
        if (typeof lightbox.showModal === 'function') {
          lightbox.showModal();
        }
      });
    });

    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) {
        lightbox.close();
      }
    });
  }
  const gallery = document.querySelector('.complexes-gallery');

  if (gallery && gallery.dataset.initialized !== 'true') {
    gallery.dataset.initialized = 'true';

    const slides = Array.from(gallery.querySelectorAll('[data-gallery-slide]'));
    const dots = Array.from(gallery.querySelectorAll('.complexes-gallery__dot'));
    const previous = gallery.querySelector('[data-gallery-prev]');
    const next = gallery.querySelector('[data-gallery-next]');
    const lightbox = gallery.querySelector('.complexes-gallery__lightbox');
    const lightboxImage = gallery.querySelector('.complexes-gallery__lightbox-image');
    const zoom = gallery.querySelector('.complexes-gallery__zoom');
    const galleryImages = [
      'https://www.figma.com/api/mcp/asset/5648ade9-e8a3-4d99-bbab-194096e7b33b/45237.png',
      'https://www.figma.com/api/mcp/asset/5648ade9-e8a3-4d99-bbab-194096e7b33b/fa91b.png'
    ];
    let activeIndex = 0;

    const renderGallery = () => {
      slides.forEach((slide, index) => {
        const isCenter = index === 1;
        slide.classList.toggle('complexes-gallery__slide--active', isCenter);
        slide.classList.toggle('complexes-gallery__slide--side', !isCenter);
      });

      const centerImage = slides[1]?.querySelector('img');
      if (centerImage) {
        centerImage.src = galleryImages[activeIndex % galleryImages.length];
      }

      dots.forEach((dot, index) => {
        const isActive = index === activeIndex;
        dot.classList.toggle('is-active', isActive);
        if (isActive) dot.setAttribute('aria-current', 'true');
        else dot.removeAttribute('aria-current');
      });

      if (centerImage && lightboxImage) {
        lightboxImage.src = centerImage.src;
        lightboxImage.alt = centerImage.alt;
      }
    };

    const move = (direction) => {
      activeIndex = (activeIndex + direction + dots.length) % dots.length;
      renderGallery();
    };

    previous?.addEventListener('click', () => move(-1));
    next?.addEventListener('click', () => move(1));
    zoom?.addEventListener('click', () => {
      if (lightbox && typeof lightbox.showModal === 'function') lightbox.showModal();
    });
    lightbox?.addEventListener('click', (event) => {
      if (event.target === lightbox) lightbox.close();
    });
    renderGallery();
  }
}
