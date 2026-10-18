function initFaq() {
  const root = document.querySelector('.press-faq');
  if (!root) return;

  const items = Array.from(root.querySelectorAll('.press-faq__item'));
  const lightbox = root.querySelector('.press-faq__lightbox');
  const lightboxClose = root.querySelector('.press-faq__lightbox-close');
  const zoomButton = root.querySelector('.press-faq__zoom');
  const lightboxImage = root.querySelector('.press-faq__lightbox-image');
  let previousFocus = null;

  items.forEach((item) => {
    const button = item.querySelector('.press-faq__question');
    const answer = button ? root.querySelector('#' + CSS.escape(button.getAttribute('aria-controls'))) : null;
    if (!button || !answer) return;

    button.addEventListener('click', () => {
      const isExpanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!isExpanded));
      item.classList.toggle('is-open', !isExpanded);
      answer.hidden = isExpanded;
    });
  });

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.hidden = true;
    document.body.style.overflow = '';
    if (previousFocus instanceof HTMLElement) previousFocus.focus();
  };

  zoomButton?.addEventListener('click', () => {
    if (!lightbox || !lightboxImage) return;
    previousFocus = document.activeElement;
    lightboxImage.src = root.querySelector('.press-faq__answer-media img')?.src || lightboxImage.src;
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    lightboxClose?.focus();
  });

  lightboxClose?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && lightbox && !lightbox.hidden) closeLightbox();
  });
}
