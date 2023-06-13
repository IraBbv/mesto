class FormValidator {
  constructor(obj, formElement) {
    this.formElement = formElement;
    this.obj = obj;
    this.inputSelector = obj.inputSelector;
    this.submitButtonSelector = obj.submitButtonSelector;
    this.inactiveButtonClass = obj.inactiveButtonClass;
    this.inputErrorClass = obj.inputErrorClass;
  }

  enableValidation() {
    this._setEventListeners();
  }
  
  _setEventListeners () {
    this._inputList = Array.from(this.formElement.querySelectorAll(this.inputSelector));
    this._submitButton = this.formElement.querySelector(this.submitButtonSelector);
  
    this._toggleButtonState();
  
    this.formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
  
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  }
  
  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
        this._activateError(inputElement);
      } else {
        this._resetError(inputElement);
      };
  }
  
  _activateError(inputElement) {
    const errorMessage = this.formElement.querySelector(`.${inputElement.name}-error`);
    
    inputElement.classList.add(this.inputErrorClass);
    errorMessage.textContent = inputElement.validationMessage;
  }
  
  _resetError(inputElement) {
    const errorMessage = this.formElement.querySelector(`.${inputElement.name}-error`);

    inputElement.classList.remove(this.inputErrorClass);
    errorMessage.textContent = '';
  }
  
  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._deactivateButton();
    } else {
      this._activateButton();
    }
  }
  
  _hasInvalidInput() {
    return this._inputList.some(inputElement => {
      return !inputElement.validity.valid;
    });
  }
  
  _deactivateButton() {
    this._submitButton.classList.add(this.inactiveButtonClass);
    this._submitButton.setAttribute('disabled', true);
  }
  
  _activateButton() {
    this._submitButton.classList.remove(this.inactiveButtonClass);
    this._submitButton.removeAttribute('disabled');
  }
  
  resetValidation() {
    this._toggleButtonState();
  
    this._inputList.forEach((inputElement) => {
      this._resetError(inputElement)
    });
  }
}

export {FormValidator};