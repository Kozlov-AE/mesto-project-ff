export class ValidationService {
    formSelector;
    inputSelector;
    submitButtonSelector;
    inactiveButtonClass;
    inputErrorClass;
    errorClass;

    constructor(properties) {
        this.formSelector = properties.formSelector;
        this.inputSelector = properties.inputSelector;
        this.submitButtonSelector = properties.submitButtonSelector;
        this.inactiveButtonClass = properties.inactiveButtonClass;
        this.inputErrorClass = properties.inputErrorClass;
        this.errorClass = properties.errorClass;
    }

    subscribeForms() {
        const forms = document.querySelectorAll(this.formSelector);
        forms.forEach(form => {
            const submit = form.querySelector(this.submitButtonSelector);
            const formInputs = Array.from(form.querySelectorAll(this.inputSelector));
            formInputs.forEach(input => {
                this.subscribeInputElement(input, this.textInputValidation.bind(this), formInputs, submit);
            })
        })
    }

    textInputValidation(element, inputList, button) {
        console.info("Input validation: " + element);
        if (!element.validity.valid) {
            this.setButtonOff(button);
            if (element.validity.patternMismatch) {
                element.setCustomValidity(element.dataset.errorMessage);
            }
            this.showError(element, element.validationMessage);
            element.setCustomValidity('');
        } else {
            this.hideError(element);
            if (inputList.every((x) => {return x.validity.valid;})) {
                this.setButtonOn(button);
            }
        }
    }

    showError(element, text) {
        const error = this.getErrorElement(element);
        error.textContent = text;
        error.classList.add(this.errorClass);
    }

    hideError(element) {
        const error = this.getErrorElement(element);
        error.classList.remove(this.errorClass);
        error.textContent = '';
    }
    
    setButtonOff(button){
        button.classList.add(this.inactiveButtonClass);
    }
    
    setButtonOn(button) {
        button.classList.remove(this.inactiveButtonClass);
    }

    subscribeInputElement(element, validationMethod, inputList, button) {
        element.addEventListener('input', () => {
            validationMethod(element, inputList, button);
        });
    }

    getErrorElement(inputElement) {
        return document.querySelector(`.${inputElement.id}-error`);
    }
    
    clearErrors(form) {
        form.querySelectorAll(this.inputSelector).forEach((x) => {
            this.hideError(x);
        });
    }
}
