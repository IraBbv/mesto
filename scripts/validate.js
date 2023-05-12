// Функции "реакции" на наличие ошибок валидации
function activateError(formElement, inputElement, obj) {
  const errorMessage = formElement.querySelector(`.${inputElement.name}-error`);

  inputElement.classList.add(obj.inputErrorClass);
  errorMessage.textContent = inputElement.validationMessage;
};

function resetError(formElement, inputElement, obj) {
  const errorMessage = formElement.querySelector(`.${inputElement.name}-error`);

  inputElement.classList.remove(obj.inputErrorClass);
  errorMessage.textContent = '';
};


// Функция проверки валидности воля ввода
function isValid(formElement, inputElement, obj) {
  if (!inputElement.validity.valid) {
    activateError(formElement, inputElement, obj);
  } else {
    resetError(formElement, inputElement, obj);
  };
};


// Функция поиска ошибок валидации
function hasInvalidInput(inputList) {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  });
};


// Функция деактивации кнопки
function deactivateButton (buttonElement, obj) {
  buttonElement.classList.add(obj.inactiveButtonClass);
  buttonElement.setAttribute('disabled', true);
};

// Функция активации кнокпи
function activateButton (buttonElement, obj) {
  buttonElement.classList.remove(obj.inactiveButtonClass);
  buttonElement.removeAttribute('disabled');
}

// Функция переключения активности кнопки "сохранить"
function toggleButtonState(inputList, buttonElement, obj) {
  if (hasInvalidInput(inputList)) {
    deactivateButton (buttonElement, obj);
  } else {
    activateButton (buttonElement, obj);
  }
};


// Функция добавления обработчиков на все поля и кнопки формы
function setEventListeners (formElement, obj) {
  const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
  const submitButtonElement = formElement.querySelector(obj.submitButtonSelector);

  toggleButtonState(inputList, submitButtonElement, obj);

  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, obj);
      toggleButtonState(inputList, submitButtonElement, obj);
    });
  });
}


// Вешаем обработчики на все формы проекта
function enableValidation (obj) {
  const formList = Array.from(document.querySelectorAll(obj.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, obj);
  });
};

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_inactive',
  inputErrorClass: 'form__input_error',
});