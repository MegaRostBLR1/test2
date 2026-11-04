function initLaser() {
    document.querySelectorAll('.laser-materials').forEach((root) => {
        if (root.dataset.initialized === 'true') return;
        root.dataset.initialized = 'true';
        root.querySelectorAll('.laser-materials__toggle').forEach((toggle) => {
            toggle.addEventListener('click', () => {
                const wasExpanded = toggle.getAttribute('aria-expanded') === 'true';
                root.querySelectorAll('.laser-materials__toggle').forEach((item) => {
                    item.setAttribute('aria-expanded', 'false');
                    const panel = root.querySelector(`#${item.getAttribute('aria-controls')}`);
                    if (panel) panel.hidden = true;
                    const icon = item.querySelector('.laser-materials__toggle-icon img');
                    if (icon) icon.src = 'https://www.figma.com/api/mcp/asset/529bb6bf-2950-4bc3-a485-eb3e3f21fa62/dcfb2.svg';
                });
                if (!wasExpanded) {
                    toggle.setAttribute('aria-expanded', 'true');
                    const panel = root.querySelector(`#${toggle.getAttribute('aria-controls')}`);
                    if (panel) panel.hidden = false;
                    const icon = toggle.querySelector('.laser-materials__toggle-icon img');
                    if (icon) icon.src = 'https://www.figma.com/api/mcp/asset/529bb6bf-2950-4bc3-a485-eb3e3f21fa62/33e3b.svg';
                }
            });
        });
        root.querySelectorAll('.laser-materials__zoom').forEach((zoom) => {
            const image = zoom.closest('.laser-materials__visual')?.querySelector('.laser-materials__image');
            if (!image) return;
            zoom.addEventListener('click', () => {
                const preview = window.open(image.src, '_blank', 'noopener,noreferrer');
                if (preview) preview.opener = null;
            });
        });
    });
    const calculator = document.querySelector('.laser-calculator');
    const summary = calculator?.querySelector('.laser-calculator__mobile-summary');
    const dialog = calculator?.querySelector('.laser-calculator__mobile-dialog');

    if (summary && dialog && summary.dataset.initialized !== 'true') {
        summary.dataset.initialized = 'true';
        const closeButtons = dialog.querySelectorAll('.laser-calculator__mobile-close, .laser-calculator__mobile-back');
        let previousFocus = null;

        const closeDialog = () => {
            if (dialog.hidden) return;
            dialog.hidden = true;
            document.body.classList.remove('laser-calculator-dialog-open');
            summary.setAttribute('aria-expanded', 'false');
            if (previousFocus) previousFocus.focus();
        };

        const openDialog = () => {
            if (window.matchMedia('(min-width: 681px)').matches) return;
            previousFocus = document.activeElement;
            dialog.hidden = false;
            document.body.classList.add('laser-calculator-dialog-open');
            summary.setAttribute('aria-expanded', 'true');
            dialog.querySelector('.laser-calculator__mobile-close')?.focus();
        };

        summary.setAttribute('aria-expanded', 'false');
        summary.addEventListener('click', openDialog);
        closeButtons.forEach((button) => button.addEventListener('click', closeDialog));

        dialog.addEventListener('click', (event) => {
            if (event.target === dialog) closeDialog();
        });

        dialog.addEventListener('click', (event) => {
            const option = event.target.closest('.laser-calculator__mobile-option');
            if (option) {
                const group = option.closest('.laser-calculator__mobile-options');
                group?.querySelectorAll('.laser-calculator__mobile-option').forEach((item) => {
                    const selected = item === option;
                    item.classList.toggle('is-selected', selected);
                    item.setAttribute('aria-pressed', String(selected));
                });
                return;
            }

            const moreButton = event.target.closest('.laser-calculator__mobile-more');
            if (moreButton) {
                const options = moreButton.previousElementSibling;
                const expanded = moreButton.getAttribute('aria-expanded') === 'true';
                const hiddenOption = options?.querySelector('.laser-calculator__mobile-option[hidden]');
                if (hiddenOption) hiddenOption.hidden = false;
                moreButton.setAttribute('aria-expanded', String(!expanded));
                moreButton.hidden = !hiddenOption;
            }
        });

        document.addEventListener('keydown', (event) => {
            if (dialog.hidden) return;
            if (event.key === 'Escape') {
                closeDialog();
                return;
            }
            if (event.key !== 'Tab') return;

            const focusable = Array.from(dialog.querySelectorAll('button:not([hidden]), [href], input:not([disabled])'))
                .filter((element) => element.getAttribute('aria-hidden') !== 'true');
            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last?.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first?.focus();
            }
        });
    }
}