import { Popup } from "./popup.js";

class PopupWithForm extends Popup {
    constructor(popupSelector, formSubmit) {
        super(popupSelector);
        this._form = this._popup.querySelector('.form');
        this._inputList = Array.from(this._form.querySelectorAll('.form__input'))
        this.formSubmit = formSubmit;
        this._submitButton = this._form.querySelector('.form__submit-button');
        this._defaultSubmitBtnText = this._submitButton.textContent;
    }

    getInputValues() {
        const inputValues = {}
        this._inputList.forEach(input => {
            inputValues[input.name] = input.value;
        });
        return inputValues;
    }

    setInputValues(data) {
        this._inputList.forEach(input => {
            input.value = data[input.name];
        })
    }

    setEventListeners() {
        this._popup.addEventListener('submit', () => {
            this.formSubmit()
            this._submitButton.textContent = this._defaultSubmitBtnText + '...';
        });
        super.setEventListeners();
    }

    setDefaultText() {
        this._submitButton.textContent = this._defaultSubmitBtnText;
    }

    close() {
        this._form.reset();
        super.close();
    }
};

export { PopupWithForm };