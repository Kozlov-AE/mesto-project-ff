import {FormInputError} from "./models/formInputError";

export class ValidationService {
    formSelector;
    inputSelector;
    submitButtonSelector;
    inactiveButtonClass;
    inputErrorClass;
    errorClass;
    
    constructor(formSelector, 
                inputSelector, 
                submitButtonSelector, 
                inactiveButtonClass, 
                inputErrorClass,
                errorClass) {
        this.formSelector = formSelector;
        this.inputSelector = inputSelector;
        this.submitButtonSelector = submitButtonSelector;
        this.inactiveButtonClass = inactiveButtonClass;
        this.inputErrorClass = inputErrorClass;
        this.errorClass = errorClass;
    }
    
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
                this.subscribeInputElement(element, this.textInputValidation);
            })
        })
    }

    textInputValidation(element) {
        console.info("Input validation: " + element);
        if (!element.formInputElement.validity.valid) {
            if (element.formInputElement.validity.patternMismatch) {
                showError(element.errorElement, "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы");
                return;
            }
            this.showError(element.errorElement, element.formInputElement.validationMessage);
        } else {
            this.hideError(element.errorElement);
        }
    }

    showError(element, text) {
        element.textContent = text;
        element.classList.add('popup__input-error-show');
    }

    hideError(element) {
        element.classList.remove('popup__input-error-show');
        element.textContent = '';
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
