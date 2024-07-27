function closeByEsc(event) {
    if (event.key === 'Escape') {
        const window = document.querySelector('popup_is-opened');
        closeModal(window);
    }
}

export function openModal(window){
    window.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeByEsc);
}

export function closeModal(window) {
    document.removeEventListener('keydown', closeByEsc);
    window.classList.remove('popup_is-opened');
}