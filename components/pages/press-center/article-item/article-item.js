function initArticleItem() {
  const root = document.querySelector('.article-item');

  if (!root || root.dataset.initialized === 'true') return;
  root.dataset.initialized = 'true';
}