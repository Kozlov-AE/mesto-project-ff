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
        if (!element.formInputElement.validity.valid) {
            if (element.formInputElement.validity.patternMismatch) {
                this.showError(element, "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы");
                return;
            }
            this.showError(element, element.formInputElement.validationMessage);
        } else {
            this.hideError(element);
        }
    }

    showError(element, text) {
        element.button.classList.add(this.inactiveButtonClass)
        element.errorElement.textContent = text;
        element.errorElement.classList.add('popup__input-error-show');
    }

    hideError(element) {
        element.errorElement.classList.remove('popup__input-error-show');
        element.errorElement.textContent = '';
        element.button.classList.remove(this.inactiveButtonClass)
    }

    subscribeInputElement(element, validationMethod) {
        element.formInputElement.addEventListener('input', () => {
            validationMethod(element);
        });
    }

    getErrorElement(inputElement) {
        const errorElement = document.querySelector(`.${inputElement.id}-error`);
        return new FormInputError(inputElement, errorElement);
    }

    disableSubmitButton(form) {

    }
}
