export function editProfileValidation (form) {
    const name = form.name;
    const description = form.description;
    
}

function textInputValidation(text) {
    const regExp = /[a-zа-яё\-\s]/gi;
    if (!regExp.test(text)) {
        showInputError(editProfileForm, evt.target, "Поддерживаются только буквы, знак тире и пробелы");
    }
}

function showError(element, text) {
    element.classList.add('')
}