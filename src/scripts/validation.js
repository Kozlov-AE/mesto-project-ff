export function editProfileValidation (form) {
    const name = form.name;
    const description = form.description;
    
}

export function textInputValidation(element) {
    console.info("Input validation: " + element );
    const regExp = /^[^0-9\wа-яё\s\-]+$/gi;
    if (!element.formInputElement.validity.valid) {
        showError(element.errorElement, element.formInputElement.validationMessage);
        return;
    }
    else if (!regExp.test(element.formInputElement.value)) {
        showError(element.errorElement, "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы");
    } else {
        hideError(element.errorElement);
    }
}

function showError(element, text) {
    element.textContent = text;
    element.classList.add('popup__input-error-show');
}

function hideError(element) {
    element.classList.remove('popup__input-error-show');
    element.textContent = '';
}

export function subscribeInputElement(element, validationMethod) {
    element.formInputElement.addEventListener('input', () => {
        validationMethod(element);
    });
}

function unSubscribeInputElement(element, validationMethod) {
    element.formInputElement.removeListener('input', () => validationMethod(element));
}