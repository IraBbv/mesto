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
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_inactive',
  inputErrorClass: 'form__input_error',
}


// Функция создания карточки
function createCard(data) {
  const card = new Card(data, '#card-template', handleCardClick);
  const cardElement = card.constructCard();

  return cardElement;
}


// Функция открытия фото в модальном окне
function handleCardClick(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupSubtitle.textContent = name;
  openPopup(photoPopup);
}


// Добавление первоначальных карточек
initialCards.forEach((item) => {
  const cardElem = createCard(item);
  photoGridContainer.append(cardElem);
})


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

  const newCard = createCard(data);
  photoGridContainer.prepend(newCard);

  addFormElement.reset();

  closePopup(addPopup);
}


// Включаем валидацию форм
const editValidator = new FormValidator (formSelectorsData, editFormElement);
const addValidator = new FormValidator (formSelectorsData, addFormElement);

editValidator.enableValidation();
addValidator.enableValidation();


// Слушатели событий
editBtn.addEventListener('click', () => {
  openPopup(editPopup);
  formName.value = profileName.textContent;
  formDescription.value = profileDescription.textContent;
  editValidator.resetValidation();
});
editFormElement.addEventListener('submit', handleEditFormSubmit);

addBtn.addEventListener('click', () => {
  openPopup(addPopup);
  addValidator.resetValidation();
});
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