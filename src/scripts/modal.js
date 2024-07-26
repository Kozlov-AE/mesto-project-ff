export function openModal(window) {
    window.classList.add('popup_is-opened');
    const closeButton = window.querySelector('.popup__close');
    closeButton.addEventListener('click', x=> closeModal(window));
    window.addEventListener('click', e => overlayClick(e, window));
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            closeModal(window)
        }
    });
}

export function closeModal(window) {
    window.classList.remove('popup_is-opened');
}

function overlayClick(e, window){
    if (e.target.classList.contains('popup')) {
        closeModal(window)
    }
}