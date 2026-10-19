function initHeaderLocationChoices() {
    const header = document.querySelector('.app-header');

    if (!header) {
        return;
    }

    header.addEventListener('click', (event) => {
        if (window.matchMedia('(max-width: 1300px)').matches) {
            const bounds = header.getBoundingClientRect();
            const clickedTopBar = event.target === header
                && event.clientY >= bounds.top
                && event.clientY <= bounds.top + 38
                && event.clientX >= bounds.left
                && event.clientX <= bounds.right;

            if (clickedTopBar) {
                const isOpen = header.classList.toggle('app-header--top-open');
                header.setAttribute('data-top-open', String(isOpen));
            }
        }
        const item = event.target.closest('.header__location-choice-item');

        if (!item || !header.contains(item)) {
            return;
        }

        const choice = item.closest('.header__location-choice');

        if (!choice) {
            return;
        }

        choice.querySelector('.header__location-choice-item--selected')
            ?.classList.remove('header__location-choice-item--selected');

        item.classList.add('header__location-choice-item--selected');

        const trigger = choice.parentElement;
        const current = trigger?.querySelector('.header__location-current');

        if (current) {
            current.textContent = getHeaderChoiceLabel(item);
        }
    });
}

function getHeaderChoiceLabel(item) {
    return item.querySelector('.header__location-choice-name')?.textContent.trim()
        || item.querySelector('.header__location-choice-code')?.textContent.trim()
        || item.querySelector('.header__location-choice-country')?.textContent.trim()
        || item.textContent.trim();
}

initHeaderLocationChoices();
