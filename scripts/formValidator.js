class FormValidator {
  constructor(obj, formElement) {
    this.formElement = formElement;
    this.obj = obj;
  }

  
  activateError(inputElement) {
    const errorMessage = this.formElement.querySelector(`.${inputElement.name}-error`);

    inputElement.classList.add(this.obj.inputErrorClass);
    errorMessage.textContent = inputElement.validationMessage;
  }

  resetError(inputElement) {
    const errorMessage = this.formElement.querySelector(`.${inputElement.name}-error`);

    inputElement.classList.remove(this.obj.inputErrorClass);
    errorMessage.textContent = '';
  }


  isValid(inputElement) {
    if (!inputElement.validity.valid) {
        this.activateError(inputElement);
      } else {
        this.resetError(inputElement);
      };
  }

  hasInvalidInput(inputList) {
    return inputList.some(inputElement => {
      return !inputElement.validity.valid;
    });
  }

  deactivateButton (buttonElement) {
    buttonElement.classList.add(this.obj.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  }

  activateButton (buttonElement) {
    buttonElement.classList.remove(this.obj.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }

  toggleButtonState(inputList, buttonElement) {
    if (this.hasInvalidInput(inputList)) {
      this.deactivateButton (buttonElement);
    } else {
      this.activateButton (buttonElement);
    }
  }

  setEventListeners () {
    const inputList = Array.from(this.formElement.querySelectorAll(this.obj.inputSelector));
    const submitButtonElement = this.formElement.querySelector(this.obj.submitButtonSelector);
  
    this.toggleButtonState(inputList, submitButtonElement);
  
    this.formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this.isValid(inputElement);
        this.toggleButtonState(inputList, submitButtonElement);
      });
    });
  }

  enableValidation() {
    this.setEventListeners();
  }
}

export {FormValidator};