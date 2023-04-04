// Обозначаем элементы
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let editBtn = document.querySelector('.profile__edit-button');

let popup = document.querySelector('.popup');
let formElement = popup.querySelector('.form');
let closeBtn = popup.querySelector('.popup__close-icon');
let formName = popup.querySelector('.form__input_type_name');
let formDescription = popup.querySelector('.form__input_type_description');

// Функция открытия попапа, содержимое профиля будет в форме
function openPopup() {
    popup.classList.add('popup_opened');
    formName.value = profileName.textContent;
    formDescription.value = profileDescription.textContent;
}

//Функция закрытия попапа
function closePopup() {
    popup.classList.remove('popup_opened');
}

// Функция сохранения введённой информации
function handleFormSubmit (evt) {
    evt.preventDefault();
    
    profileName.textContent = formName.value;
    profileDescription.textContent = formDescription.value;
    
    closePopup();
}

// Слушатели событий
editBtn.addEventListener('click', openPopup);
closeBtn.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);