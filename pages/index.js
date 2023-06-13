import { initialCards, formSelectorsData, 
  popupEditSelector, 
  popupAddSelector, 
  popupImageSelector, 
  photoGridContainerSelector,
  profileNameSelector,
  profileDescriptionSelector, 
  editBtn, addBtn,
  editFormElement, addFormElement} from '../scripts/utils/constants.js';
import { Card } from '../scripts/components/card.js';
import { FormValidator } from '../scripts/components/formValidator.js';
import { Section } from '../scripts/components/section.js';
import { PopupWithImage } from '../scripts/components/popupWithImage.js';
import { PopupWithForm } from '../scripts/components/popupWithForm.js';
import { UserInfo } from '../scripts/components/userInfo.js';


// Попап с картинкой
const popupImage = new PopupWithImage(popupImageSelector);
popupImage.setEventListeners();


// Попапы с формами
const userInfo = new UserInfo(
  {nameElementSelector: profileNameSelector, 
   descriptionElementSelector: profileDescriptionSelector});

const popupEdit = new PopupWithForm(popupEditSelector, handleEditFormSubmit);
popupEdit.setEventListeners();

const popupAdd = new PopupWithForm(popupAddSelector, handleAddFormSubmit);
popupAdd.setEventListeners();


// Функция создания карточки
function createCard({ name, link }) {
  const card = new Card({ name, link }, '#card-template', popupImage.open);
  const cardElement = card.constructCard();
  return cardElement;
}

// Создание секции с карточками
const cardSection = new Section(
  {items: initialCards.reverse(),
  renderer: createCard}, 
  photoGridContainerSelector);
cardSection.renderItem();


// Функция сохранения введённой информации в окно редактирования
function handleEditFormSubmit () {
  userInfo.setUserInfo(popupEdit.getInputValues());
  popupEdit.close();
}


// Функция добавления новой карточки через форму
function handleAddFormSubmit () {
  const data = popupAdd.getInputValues();
  const newCard = createCard({name: data.location, link: data.link});
  cardSection.addItem(newCard);
  popupAdd.close();
}


// Включаем валидацию форм
const editValidator = new FormValidator (formSelectorsData, editFormElement);
const addValidator = new FormValidator (formSelectorsData, addFormElement);

editValidator.enableValidation();
addValidator.enableValidation();


// Слушатели событий для открытия попапов с формами
editBtn.addEventListener('click', () => {
  popupEdit.open();
  popupEdit.setInputValues(userInfo.getUserInfo());
  editValidator.resetValidation();
});

addBtn.addEventListener('click', () => {
  popupAdd.open();
  addValidator.resetValidation();
});