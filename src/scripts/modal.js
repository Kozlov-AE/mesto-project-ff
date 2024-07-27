let closeByEscCallback;
function closeByEsc(event, window) {
    console.log(event);
    if (event.key === 'Escape') {
        closeModal(window);
    }
}

export function openModal(window){
    closeByEscCallback = (event) => {
        closeByEsc(event, window);
    }
    document.addEventListener('keydown', closeByEscCallback);
    window.classList.add('popup_is-opened');
}

export function closeModal(window) {
    document.removeEventListener('keydown', closeByEscCallback);
    window.classList.remove('popup_is-opened');
}