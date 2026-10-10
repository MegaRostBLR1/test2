function initPrices() {
  const page = document.querySelector('.prices');

  if (!page || page.dataset.initialized === 'true') {
    return;
  }

  page.dataset.initialized = 'true';

  const configForm = page.querySelector('#prices-config');
  const areaOutput = page.querySelector('#prices-area');
  const requestForm = page.querySelector('#prices-request-form');
  const requestStatus = page.querySelector('#prices-request-status');

  const updateArea = () => {
    const formData = new FormData(configForm);
    const length = Number(formData.get('length'));
    const width = Number(formData.get('width'));

    if (!Number.isFinite(length) || !Number.isFinite(width) || length <= 0 || width <= 0) {
      areaOutput.textContent = 'Введите корректные размеры здания.';
      return;
    }

    const area = Math.round(length * width);
    areaOutput.textContent = `Площадь здания: ${new Intl.NumberFormat('ru-RU').format(area)} м²`;
  };

  configForm.addEventListener('input', updateArea);
  configForm.addEventListener('change', updateArea);
  configForm.addEventListener('reset', () => {
    window.requestAnimationFrame(updateArea);
  });

  requestForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!requestForm.reportValidity()) {
      return;
    }

    requestStatus.textContent = 'Форма заполнена. Для отправки заявок подключите обработчик CRM или серверный endpoint.';
  });

  updateArea();
}
