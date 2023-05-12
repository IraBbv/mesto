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
const cardTemplate = document.querySelector('#card-template');

const photoPopup = document.querySelector('.popup_type_photo');
const photoPopupContainer = photoPopup.querySelector('.popup__container');
const photoCloseBtn = photoPopup.querySelector('.popup__close-icon');
const popupImage = photoPopup.querySelector('.popup__image');
const popupSubtitle = photoPopup.querySelector('.popup__subtitle');


// Первоначальные данные полей формы редактирования
formName.value = profileName.textContent;
formDescription.value = profileDescription.textContent;


// Функция закрытия попап нажатием клавыши ESC
function escapeClosePopup (evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

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

// Функция создания новой карточки  c кнопками "лайк" и "удалить"
function createCardElement(cardData) {
  const cardElement = cardTemplate.content.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardName = cardElement.querySelector('.card__name');
  const likeBtn = cardElement.querySelector('.card__like-button');
  const trashBtn = cardElement.querySelector('.card__trash-button');

  cardName.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  const handleLike = () => {
    likeBtn.classList.toggle('card__like-button_active');
  }
  const handleTrash = () => {
    const cardItem = trashBtn.closest('.card');
    cardItem.remove();
  }

  likeBtn.addEventListener('click', handleLike);
  trashBtn.addEventListener('click', handleTrash);

  //Попап с фото начало
  function openPhoto(item) {
    if (item.target===cardImage) {
      const imageElement = item.target;
      openPopup(photoPopup);
      popupImage.src = imageElement.src;
      popupImage.alt = imageElement.alt;
      popupSubtitle.textContent = imageElement.alt;
    }
  }

  cardElement.addEventListener('click', openPhoto);
  //  Попап с фото конец

  return cardElement;
}


//Добавить изначальные карточки в профиль
initialCards.forEach((item) => {
  const element = createCardElement(item);

  photoGridContainer.appendChild(element);
})


// Функция сохранения введённой информации в окно редактирования
function handleEditFormSubmit () {
  profileName.textContent = formName.value;
  profileDescription.textContent = formDescription.value;

  closePopup(editPopup);
}


// Функция добавления новой карточки
function handleAddFormSubmit () {
  const name = formLocation.value;
  const link = formLink.value;
  const data = {
    name: `${name}`,
    link: `${link}`
  };

  const newCard = createCardElement(data);
  photoGridContainer.prepend(newCard);

  addFormElement.reset();

  closePopup(addPopup);
}


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
  const sbmButton = addFormElement.querySelector('.form__submit-button');
  deactivateButton (sbmButton, {inactiveButtonClass: 'form__submit-button_inactive'});
});
  

popupList.forEach(formElement => {
  overlayClosePopup(formElement);
});
closeBtnList.forEach( button => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});