(() => {
  const STORAGE_KEY = 'cookie-consent';

  function initCookiesPopup() {
    const popup = document.querySelector('.cookies');

    if (!popup) {
      return;
    }

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
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCookiesPopup, { once: true });
  } else {
    initCookiesPopup();
  }
})();
