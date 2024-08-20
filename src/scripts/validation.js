import {FormInputError} from "./models/formInputError";

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
            const formInputs = form.querySelectorAll(this.inputSelector);
            formInputs.forEach(input => {
                const element = this.getErrorElement(input);
                element.button = submit;
                this.subscribeInputElement(element, this.textInputValidation.bind(this));
            })
        })
    }

    textInputValidation(element) {
        console.info("Input validation: " + element);
        if (!element.validity.valid) {
            if (element.validity.patternMismatch) {
                element.setCustomValidity(element.dataset.errorMessage);
            }
            this.showError(element, element.formInputElement.validationMessage);
        } else {
            this.hideError(element);
        }
    }

    showError(element, text) {
        const error = this.getErrorElement(element);
        error.textContent = text;
        error.classList.add('popup__input-error-show');
    }

    hideError(element) {
        element.errorElement.classList.remove('popup__input-error-show');
        element.errorElement.textContent = '';
        element.button.classList.remove(this.inactiveButtonClass)
    }

    subscribeInputElement(element, validationMethod) {
        element.addEventListener('input', () => {
            validationMethod(element);
        });
    }

    getErrorElement(inputElement) {
        return document.querySelector(`.${inputElement.id}-error`);
    }
}
