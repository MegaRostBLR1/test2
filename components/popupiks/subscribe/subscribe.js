(() => {
  function initSubscribePopup() {
    const popup = document.querySelector('.subscribe');

    if (!popup) {
      return;
    }

    const form = popup.querySelector('[data-subscribe-form]');
    const closeButton = popup.querySelector('[data-subscribe-close]');
    const message = popup.querySelector('[data-subscribe-message]');

    function closePopup() {
      popup.hidden = true;
    }

    closeButton?.addEventListener('click', closePopup);

    popup.addEventListener('click', (event) => {
      if (event.target === popup) {
        closePopup();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !popup.hidden) {
        closePopup();
      }
    });

    form?.addEventListener('submit', (event) => {
      event.preventDefault();

      if (!form.reportValidity()) {
        return;
      }

      if (message) {
        message.textContent = 'Форма заполнена. Для оформления подписки необходимо подключить API.';
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSubscribePopup, { once: true });
  } else {
    initSubscribePopup();
  }
})();
