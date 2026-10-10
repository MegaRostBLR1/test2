function initHome() {
  const hero = document.querySelector('.home-hero');

  if (!hero) {
    return;
  }

  // Навигация слайдера остаётся неактивной, пока в проект не добавлены остальные слайды.
}

  const industriesStylesheet = './components/pages/home/home-industries.css';
  if (!document.querySelector('link[data-page-style="' + industriesStylesheet + '"]')) {
    const stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = industriesStylesheet;
    stylesheet.dataset.pageStyle = industriesStylesheet;
    document.head.append(stylesheet);
  }
