function initArticleItem() {
  const root = document.querySelector('.article-item');

  if (!root || root.dataset.initialized === 'true') return;
  root.dataset.initialized = 'true';

  const contentsList = root.querySelector('.article-item__contents-list');
  const popup = root.querySelector('.article-item__contents-popup');
  const closeControls = root.querySelectorAll('[data-article-item-popup-close]');
  const closeButton = root.querySelector('.article-item__contents-popup-close');
  const dialog = root.querySelector('.article-item__contents-dialog');
  const popupLinks = root.querySelectorAll('.article-item__contents-popup-item a');
  let previousFocus = null;

  if (!contentsList || !popup || !dialog) return;

  const isCompactLayout = () => window.matchMedia('(max-width: 1300px)').matches;

  function openPopup() {
    if (!isCompactLayout()) return;
    previousFocus = document.activeElement;
    popup.hidden = false;
    document.body.style.overflow = 'hidden';
    closeButton.focus();
  }

  function closePopup() {
    if (popup.hidden) return;
    popup.hidden = true;
    document.body.style.overflow = '';
    if (previousFocus && typeof previousFocus.focus === 'function') previousFocus.focus();
  }

  contentsList.addEventListener('click', (event) => {
    if (!isCompactLayout()) return;
    event.preventDefault();
    openPopup();
  });

  closeControls.forEach((control) => {
    control.addEventListener('click', closePopup);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !popup.hidden) closePopup();
  });

  popupLinks.forEach((link) => {
    link.addEventListener('click', closePopup);
  });
}
