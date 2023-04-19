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

const editPopup = document.querySelector('#edit-popup');
const editFormElement = editPopup.querySelector('.form');
const editCloseBtn = editPopup.querySelector('.popup__close-icon');
const formName = editPopup.querySelector('.form__input_type_name');
const formDescription = editPopup.querySelector('.form__input_type_description');

const addPopup = document.querySelector('#add-popup');
const addFormElement = addPopup.querySelector('.form');
const addCloseBtn = addPopup.querySelector('.popup__close-icon');
const formLocation = addPopup.querySelector('.form__input_type_location');
const formLink = addPopup.querySelector('.form__input_type_link');

const photoGridContainer = document.querySelector('.photo-grid');
const cardTemplate = document.querySelector('#card-template');

const photoPopup = document.querySelector('#photo-popup');
const photoCloseBtn = photoPopup.querySelector('.popup__close-icon');
const popupImage = photoPopup.querySelector('.popup__image');
const popupSubtitle = photoPopup.querySelector('.popup__subtitle');

// Функция создания новой карточки  c кнопками "лайк" и "удалить"
const createCardElement = function(cardData) {
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

  return cardElement;
}

// //Попап с фото начало
//   function openPhoto() {
//     photoPopup.classList.add('popup_opened');
//     popupImage.src.value = cardImage.link.textContent;
//     popupSubtitle.value = cardName.textContent;
//   }
//   function closePhoto() {
//     photoPopup.classList.remove('popup_opened');
//   }
//   cardImage.addEventListener('click', openPhoto);
//   photoCloseBtn.addEventListener('click', closePhoto);
//   //Попап с фото конец

//Добавление изначальных карточек в профиль
initialCards.forEach((item) => {
  const element = createCardElement(item);

  photoGridContainer.appendChild(element);
})

// Функция открытия попапа редактирования, содержимое профиля будет в форме
function openEditPopup() {
    editPopup.classList.add('popup_opened');
    formName.value = profileName.textContent;
    formDescription.value = profileDescription.textContent;
}

//Функция закрытия попапа редактирования
function closeEditPopup() {
    editPopup.classList.remove('popup_opened');
}

// Функция сохранения введённой информации в окно редактирования
function handleEditFormSubmit (evt) {
    evt.preventDefault();
    
    profileName.textContent = formName.value;
    profileDescription.textContent = formDescription.value;
    
    closeEditPopup();
}

//Функция открытия попапа добавления
function openAddPopup() {
  addPopup.classList.add('popup_opened');
}

//Функция закрытия попапа добавления
function closeAddPopup() {
  addPopup.classList.remove('popup_opened');
}

// Функция сохранения введённой информации в окно добавления
function handleAddFormSubmit (evt) {
  evt.preventDefault();

  // const newCard = {
  //   name: `${formLocation.textContent}`,
  //   link: `${formLink.textContent}`;
  // };

  createCardElement(newCard);
  closeAddPopup();
}

// Слушатели событий
editBtn.addEventListener('click', openEditPopup);
editCloseBtn.addEventListener('click', closeEditPopup);
editFormElement.addEventListener('submit', handleEditFormSubmit);

addBtn.addEventListener('click', openAddPopup);
addCloseBtn.addEventListener('click', closeAddPopup);
addFormElement.addEventListener('submit', handleAddFormSubmit);