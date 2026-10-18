function initContacts() {
  const downloadLink = document.querySelector('.contacts__download');

  if (!downloadLink) {
    return;
  }

  // Replace the temporary Figma reference with the official requisites PDF URL when it is available.
  downloadLink.addEventListener('click', (event) => {
    if (downloadLink.href.includes('figma.com/design/')) {
      event.preventDefault();
    }
  });
}
