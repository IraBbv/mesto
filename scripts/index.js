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


// Обозначаем элементы
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-button');

const editPopup = document.querySelector('.popup_type_edit');
const editFormElement = editPopup.querySelector('.form');
const editCloseBtn = editPopup.querySelector('.popup__close-icon');
const formName = editPopup.querySelector('.form__input_type_name');
const formDescription = editPopup.querySelector('.form__input_type_description');

const addPopup = document.querySelector('.popup_type_add');
const addFormElement = addPopup.querySelector('.form');
const addCloseBtn = addPopup.querySelector('.popup__close-icon');
const formLocation = addPopup.querySelector('.form__input_type_location');
const formLink = addPopup.querySelector('.form__input_type_link');

const photoGridContainer = document.querySelector('.photo-grid');
const cardTemplate = document.querySelector('#card-template');

const photoPopup = document.querySelector('.popup_type_photo');
const photoPopupContainer = photoPopup.querySelector('.popup__container');
const photoCloseBtn = photoPopup.querySelector('.popup__close-icon');


// Функция открытия попап
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
}

// Функция закрытия попап
function closePopup(element) {
  element.classList.remove('popup_opened');
}


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
  function openPhoto(cardImage) {
    const popupImage = photoPopup.querySelector('.popup__image');
    const popupSubtitle = photoPopup.querySelector('.popup__subtitle');
    
    if (item.target===cardImage) {
      const imageElement = item.target;
      openPopup(photoPopup);
      popupImage.src = imageElement.src;
      popupSubtitle.textContent = imageElement.alt;
    }
  }

  cardElement.addEventListener('click', openPhoto);
  photoCloseBtn.addEventListener('click', () => closePopup(photoPopup));
  //  Попап с фото конец

  return cardElement;
}


//Добавить изначальные карточки в профиль
initialCards.forEach((item) => {
  const element = createCardElement(item);

  photoGridContainer.appendChild(element);
})


// Попап редактирования функция с введённой информацией
function openEditPopup() {
    openPopup(editPopup);
    formName.value = profileName.textContent;
    formDescription.value = profileDescription.textContent;
}


// Функция сохранения введённой информации в окно редактирования
function handleEditFormSubmit (evt) {
    evt.preventDefault();
    
    profileName.textContent = formName.value;
    profileDescription.textContent = formDescription.value;
    
    closePopup(editPopup);
}


// Функция добавления новой карточки
function handleAddFormSubmit (evt) {
  evt.preventDefault();

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
editBtn.addEventListener('click', openEditPopup);
editCloseBtn.addEventListener('click', () => closePopup(editPopup));
editFormElement.addEventListener('submit', handleEditFormSubmit);

addBtn.addEventListener('click', () => openPopup(addPopup));
addCloseBtn.addEventListener('click', () => closePopup(addPopup));
addFormElement.addEventListener('submit', handleAddFormSubmit);