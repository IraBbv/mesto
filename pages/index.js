let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let editBtn = document.querySelector('.profile__edit-button');

let popup = document.querySelector('.popup');
let formElement = popup.querySelector('.form');
let formName = popup.querySelector('.form__name');
let formDescription = popup.querySelector('.form__description');
let closeBtn = popup.querySelector('.form__close-icon');
let submitBtn = popup.querySelector('.form__submit-button');

formName.value = profileName.textContent;
formDescription.value = profileDescription.textContent;

function openPopup() {
    popup.classList.remove('popup_hidden');
}
editBtn.addEventListener('click', openPopup);

function closePopup(event) {
    const isCloseBtn = event.target.classList.contains('popup');
    const isOverlay = event.target.classList.contains('form__close-icon');
    if (isCloseBtn || isOverlay) {
        popup.classList.add('popup_hidden');
    }
}
popup.addEventListener('click', closePopup);

function handleFormSubmit (evt) {
    evt.preventDefault();
    
    profileName.innerHTML = formName.value;
    profileDescription.innerHTML = formDescription.value;
    
    popup.classList.add('popup_hidden');
}

submitBtn.addEventListener('click', handleFormSubmit);