export function openModal(window) {
    window.classList.add('popup_is-opened');
    const closeButton = window.querySelector('.popup__close');
    closeButton.addEventListener('click', x=> closeModal(window));
    closeButton.removeEventListener('click', x => closeModal(window));
}

function closeModal(window) {
    window.classList.remove('popup_is-opened');
}