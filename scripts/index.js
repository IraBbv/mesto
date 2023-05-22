import {Card} from './card.js';
import {FormValidator} from './formValidator.js'


// Массив первоначальных карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


// Объявляем переменные
const popupList = Array.from(document.querySelectorAll('.popup'));
const closeBtnList = Array.from(document.querySelectorAll('.popup__close-icon'));

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-button');

const editPopup = document.querySelector('.popup_type_edit');
const editFormElement = editPopup.querySelector('.form');
const formName = editPopup.querySelector('.form__input_type_name');
const formDescription = editPopup.querySelector('.form__input_type_description');

const addPopup = document.querySelector('.popup_type_add');
const addFormElement = addPopup.querySelector('.form');
const formLocation = addPopup.querySelector('.form__input_type_location');
const formLink = addPopup.querySelector('.form__input_type_link');

const photoGridContainer = document.querySelector('.photo-grid');

const photoPopup = document.querySelector('.popup_type_photo');
const popupImage = photoPopup.querySelector('.popup__image');
const popupSubtitle = photoPopup.querySelector('.popup__subtitle');

const formSelectorsData = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_inactive',
  inputErrorClass: 'form__input_error',
}


// Создаём классы валидации для форм
class EditFormValidator extends FormValidator {
  constructor(obj, formElement) {
    super (obj, formElement)
  }
}

class AddFormValidator extends FormValidator {
  constructor(obj, formElement) {
    super (obj, formElement)
  }

  _setEventListeners() {
    super._setEventListeners();

    this.formElement.addEventListener('submit', () => {
      const sbmButton = this.formElement.querySelector('.form__submit-button');
      this._deactivateButton(sbmButton);
    });
  }
}

// Функция добавления карточки
function addCard(data) {
  const card = new Card(data, '#card-template');
  const cardElement = card.createCard();
  photoGridContainer.prepend(cardElement);
  
  cardElement.addEventListener('click', openPhoto);
}


// Функция открытия фото в модальном окне
function openPhoto(item) {
  if (item.target.hasAttribute('alt')) {
    const imageElement = item.target;
    openPopup(photoPopup);
    popupImage.src = imageElement.src;
    popupImage.alt = imageElement.alt;
    popupSubtitle.textContent = imageElement.alt;
  }
}


// Добавление первоначальных карточек
initialCards.slice().reverse().forEach((item) => {
  addCard(item);
})

// Первоначальные данные полей формы редактирования
formName.value = profileName.textContent;
formDescription.value = profileDescription.textContent;


// Функция открытия попап
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', escapeClosePopup);
}

// Функция закрытия попап
function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', escapeClosePopup);
}

// Функция закрытия попап нажатием клавыши ESC
function escapeClosePopup (evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

// Функция закрытия попап кликом на оверлей
function overlayClosePopup(popupElement) {
  popupElement.addEventListener('mousedown', (event) => {
    const isOverlay = event.target.classList.contains('popup');
    if (isOverlay) {
      closePopup(popupElement);
    }
    event.stopPropagation();
  });
};


// Функция сохранения введённой информации в окно редактирования
function handleEditFormSubmit () {
  profileName.textContent = formName.value;
  profileDescription.textContent = formDescription.value;

  closePopup(editPopup);
}


// Функция добавления новой карточки через форму
function handleAddFormSubmit () {
  const name = formLocation.value;
  const link = formLink.value;
  const data = {
    name: `${name}`,
    link: `${link}`
  };

  addCard(data);

  addFormElement.reset();

  closePopup(addPopup);
}


// Включаем валидацию форм
const editValidator = new EditFormValidator (formSelectorsData, editFormElement);
const addValidator = new AddFormValidator (formSelectorsData, addFormElement);

editValidator.enableValidation();
addValidator.enableValidation();


// Слушатели событий
editBtn.addEventListener('click', () => {
  openPopup(editPopup);
  formName.value = profileName.textContent;
  formDescription.value = profileDescription.textContent;
});
editFormElement.addEventListener('submit', handleEditFormSubmit);

addBtn.addEventListener('click', () => openPopup(addPopup));
addFormElement.addEventListener('submit', () => {
  handleAddFormSubmit();
});
  

popupList.forEach(formElement => {
  overlayClosePopup(formElement);
});
closeBtnList.forEach( button => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});