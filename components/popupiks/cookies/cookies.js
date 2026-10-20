(() => {
  const STORAGE_KEY = 'cookie-consent';

  function initCookiesPopup() {
    const popup = document.querySelector('.cookies');

    if (!popup || popup.dataset.initialized === 'true') {
      return;
    }

    popup.dataset.initialized = 'true';

    let savedConsent = null;

    try {
      savedConsent = window.localStorage.getItem(STORAGE_KEY);
    } catch (error) {
      // Storage may be unavailable; keep the consent controls usable for this visit.
    }

    if (!savedConsent) {
      popup.hidden = false;
    }

    const acceptButton = popup.querySelector('[data-cookies-accept]');
    const rejectButton = popup.querySelector('[data-cookies-reject]');
    const closeButton = popup.querySelector('[data-cookies-close]');
    const settingsButton = popup.querySelector('[data-cookies-settings]');

    function saveConsent(value) {
      try {
        window.localStorage.setItem(STORAGE_KEY, value);
      } catch (error) {
        // Do not block the UI if storage is unavailable.
      }

      popup.hidden = true;
    }

    acceptButton?.addEventListener('click', () => saveConsent('accepted'));
    rejectButton?.addEventListener('click', () => saveConsent('rejected'));

    closeButton?.addEventListener('click', () => {
      popup.hidden = true;
    });

    settingsButton?.addEventListener('click', () => {
      popup.dispatchEvent(new CustomEvent('cookies:settings', { bubbles: true }));
    });

    popup.querySelectorAll('[data-cookies-policy]').forEach((link) => {
      link.addEventListener('click', (event) => event.preventDefault());
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCookiesPopup, { once: true });
  } else {
    initCookiesPopup();
  }
})();
