// Объявление переменных
const formList = document.querySelectorAll('.form');


// Функции "реакции" на наличие ошибок валидации
function activateError(formElement, inputElement) {
  const errorMessage = formElement.querySelector(`.${inputElement.name}-error`)

  inputElement.classList.add('.form__input_error');
  errorMessage.textContent = inputElement.validationMessage;
};

function resetError(formElement, inputElement) {
  const errorMessage = formElement.querySelector(`.${inputElement.name}-error`)

  inputElement.classList.remove('.form__input_error');
  errorMessage.textContent = '';
};


// Функция проверки валидности воля ввода
function isValid(formElement, inputElement) {
  if (!inputElement.validity.valuid) {
    activateError(formElement, inputElement);
  } else {
    resetError(formElement, inputElement);
  };
};


// Функция поиска ошибок валидации
function hasInvalidInput(inputList) {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  });
};


// Функция переключения активности кнопки "сохранить"
function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('form__submit-button_inactive');
    buttonElement.setAttribute('disabled', 'true');
  } else {
    buttonElement.classList.remove('form__submit-button_inactive');
    buttonElement.removeAttribute('disabled');
  }
};


// Функция добавления обработчиков на все поля и кнопки формы
function setEventListeners (formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  const submitButtonElement = formElement.querySelector('.form__submit-button');

  toggleButtonState(inputList, submitButtonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, submitButtonElement);
    });
  });
}


// Вешаем обработчики на все формы проекта
function enableValidation (formList) {
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};

enableValidation(formList);