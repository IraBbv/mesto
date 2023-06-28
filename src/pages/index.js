// Подключение css файлов для вебпака
import './index.css';

// Импорты js
import { formSelectorsData, 
  popupEditSelector, 
  popupAddSelector, 
  popupImageSelector, 
  popupChangeAvatarSelector,
  popupWithConfirmSelector,
  photoGridContainerSelector,
  profileNameSelector,
  profileDescriptionSelector, 
  profileAvatarSelector,
  editBtn, addBtn, changeAvatarBtn,
  editFormElement, addFormElement, cahngeAvatarFormElement} from '../scripts/utils/constants.js';
import { Card } from '../scripts/components/card.js';
import { FormValidator } from '../scripts/components/formValidator.js';
import { Section } from '../scripts/components/section.js';
import { PopupWithImage } from '../scripts/components/popupWithImage.js';
import { PopupWithForm } from '../scripts/components/popupWithForm.js';
import { PopupDeleteCard } from '../scripts/components/popupDeleteCard.js';
import { UserInfo } from '../scripts/components/userInfo.js';
import { Api } from '../scripts/components/api.js';

// Апи для запросов на сервер
const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/cohort-69',
  headers: {
    authorization: '1ad2f0fc-ee12-44f1-ab7e-0e660f2bfb6a',
    'Content-Type': 'application/json'
  }
});

// Попап с картинкой
const popupImage = new PopupWithImage(popupImageSelector);
popupImage.setEventListeners();

// Попапы с формами
const userInfo = new UserInfo(
  {nameElementSelector: profileNameSelector, 
   descriptionElementSelector: profileDescriptionSelector,
   avatarElementSelector: profileAvatarSelector});
const popupEditProfile = new PopupWithForm(popupEditSelector, handleEditFormSubmit);
popupEditProfile.setEventListeners();
const popupAddCard = new PopupWithForm(popupAddSelector, handleAddFormSubmit);
popupAddCard.setEventListeners();
const popupChangeAvatar = new PopupWithForm(popupChangeAvatarSelector, handleChangeAvatarFormSubmit);
popupChangeAvatar.setEventListeners();
const popupDeleteCardConfirm = new PopupDeleteCard(popupWithConfirmSelector, ({card, cardId}) => {
  api.deleteCard(cardId)
    .then(() => {
      card.removeCard();
      popupDeleteCardConfirm.close();
    })
    .catch(err => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {popupDeleteCardConfirm.setDefaultText()})
});
popupDeleteCardConfirm.setEventListeners();

// Секция для карточек
const cardSection = new Section(
  { renderer: createCard }, 
    photoGridContainerSelector);

// Функция создания карточки
function createCard(element) {
  const card = new Card(element, '#card-template', popupImage.open, popupDeleteCardConfirm.open, (likeElement, cardId) => {
    if (likeElement.classList.contains('card__like-button_active')) {
      api.removeLike(cardId)
        .then(res => {
          card.toggleLike(res.likes)
        })
        .catch(err => {
          return Promise.reject(`Ошибка: ${err}`);
        })
    } else {
      api.likeCard(cardId)
        .then (res => {
          card.toggleLike(res.likes)
        })
        .catch(err => {
          return Promise.reject(`Ошибка: ${err}`);
        })
    }
  });
  const cardElement = card.constructCard();
  return cardElement;
}

// Функция сохранения введённой информации в окно редактирования
function handleEditFormSubmit () {
  const info = popupEditProfile.getInputValues();
  api.editProfileInfo(info)
    .then (res => {
      userInfo.setUserInfo({name: res.name, description: res.about, avatar: res.avatar});
      popupEditProfile.close();
    })
    .catch(err => {
      return Promise.reject(`Ошибка: ${err}`);
    })
    .finally(() => {popupEditProfile.setDefaultText()})
}

// Функция обновления фото аватара
function handleChangeAvatarFormSubmit() {
  const avatarData = popupChangeAvatar.getInputValues();
  api.changeAvatar(avatarData)
    .then(res => {
      userInfo.setUserInfo({name: res.name, description: res.about, avatar: res.avatar});
      popupChangeAvatar.close();
    })
    .catch(err => {
      return Promise.reject(`Ошибка: ${err}`);
    })
    .finally(() => {popupChangeAvatar.setDefaultText()})
}

// Функция добавления новой карточки через форму
function handleAddFormSubmit () {
  const data = popupAddCard.getInputValues();
  Promise.all([api.addCard(data), api.getUserInfo()])
    .then(([cardData, userData]) => {
      cardData.myId = userData._id;
      cardSection.addItem(createCard(cardData));
      popupAddCard.close();
    })
    .catch(err => {
      return Promise.reject(`Ошибка: ${err}`);
    })
    .finally(() => {popupAddCard.setDefaultText()});
}

// Добавляем первоначальную информацию с сервера(карточки и информация о юзере)
Promise.all([api.getUserInfo(), api.getInitialCards()])
.then(([userData, cardsData]) => {
  cardsData.forEach(element => {
    element.myId = userData._id
  });
  userInfo.setUserInfo({name: userData.name, description: userData.about, avatar: userData.avatar});
  cardSection.renderItems(cardsData.reverse());
})
.catch(err => {
  return Promise.reject(`Ошибка: ${err}`);
});

// Включаем валидацию форм
const editValidator = new FormValidator (formSelectorsData, editFormElement);
editValidator.enableValidation();
const addValidator = new FormValidator (formSelectorsData, addFormElement);
addValidator.enableValidation();
const changeAvatarValidator = new FormValidator (formSelectorsData, cahngeAvatarFormElement);
changeAvatarValidator.enableValidation();

// Слушатели событий для открытия попапов с формами
editBtn.addEventListener('click', () => {
  popupEditProfile.open();
  popupEditProfile.setInputValues(userInfo.getUserInfo());
  editValidator.resetValidation();
});
addBtn.addEventListener('click', () => {
  popupAddCard.open();
  addValidator.resetValidation();
});
changeAvatarBtn.addEventListener('click', () => {
  popupChangeAvatar.open();
  changeAvatarValidator.resetValidation();
});