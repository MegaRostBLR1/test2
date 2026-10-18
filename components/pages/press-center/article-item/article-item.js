function initArticleItem() {
  const root = document.querySelector('.article-item');

  if (!root || root.dataset.initialized === 'true') {
    return;
  }

  root.dataset.initialized = 'true';

  const shareButton = root.querySelector('.article-item__share');
  const shareStatus = root.querySelector('.article-item__share-status');

  if (!shareButton || !shareStatus) {
    return;
  }

  shareButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      shareStatus.textContent = 'Ссылка скопирована.';
    } catch {
      shareStatus.textContent = 'Не удалось скопировать ссылку. Скопируйте адрес из строки браузера.';
    }
  });
}
