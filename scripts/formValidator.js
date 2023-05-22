class FormValidator {
  constructor(obj, formElement) {
    this.formElement = formElement;
    this.obj = obj;
  }

  enableValidation() {
    this._setEventListeners();
  }
  
  _setEventListeners () {
    const inputList = Array.from(this.formElement.querySelectorAll(this.obj.inputSelector));
    const submitButtonElement = this.formElement.querySelector(this.obj.submitButtonSelector);
  
    this._toggleButtonState(inputList, submitButtonElement);
  
    this.formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState(inputList, submitButtonElement);
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
    
    inputElement.classList.add(this.obj.inputErrorClass);
    errorMessage.textContent = inputElement.validationMessage;
  }
  
  _resetError(inputElement) {
    const errorMessage = this.formElement.querySelector(`.${inputElement.name}-error`);

    inputElement.classList.remove(this.obj.inputErrorClass);
    errorMessage.textContent = '';
  }
  
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      this._deactivateButton (buttonElement);
    } else {
      this._activateButton (buttonElement);
    }
  }
  
  _hasInvalidInput(inputList) {
    return inputList.some(inputElement => {
      return !inputElement.validity.valid;
    });
  }
  
  _deactivateButton (buttonElement) {
    buttonElement.classList.add(this.obj.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  }

  _activateButton (buttonElement) {
    buttonElement.classList.remove(this.obj.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
}

export {FormValidator};