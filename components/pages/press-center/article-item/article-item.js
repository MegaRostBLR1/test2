function initArticleItem() {
  const root = document.querySelector('.article-item');

  if (!root || root.dataset.initialized === 'true') return;
  root.dataset.initialized = 'true';

  root.querySelectorAll('.article-item__contents-item a').forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      if (targetId && !document.querySelector(targetId)) event.preventDefault();
    });
  });
}