import { Popup } from "./popup.js";

class PopupWithForm extends Popup {
    constructor(popupSelector, formSubmit) {
        super(popupSelector);
        this._form = this._popup.querySelector('.form');
        this._inputList = Array.from(this._form.querySelectorAll('.form__input'))
        this.formSubmit = formSubmit;
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
        this._popup.addEventListener('submit', this.formSubmit);
        super.setEventListeners();
    }

    close() {
        this._form.reset();
        super.close();
    }
};

export { PopupWithForm };