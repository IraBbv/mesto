export const formSelectorsData = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_inactive',
  inputErrorClass: 'form__input_error',
};

export const popupEditSelector = '.popup_type_edit';
export const popupImageSelector = '.popup_type_photo';
export const popupAddSelector = '.popup_type_add';
export const popupChangeAvatarSelector = '.popup_type_change-avatar';
export const popupWithConfirmSelector = '.popup_type_confirm';
export const photoGridContainerSelector = '.photo-grid';

export const profileNameSelector = '.profile__name';
export const profileDescriptionSelector = '.profile__description';
export const profileAvatarSelector = '.profile__avatar';

export const editBtn = document.querySelector('.profile__edit-button');
export const addBtn = document.querySelector('.profile__add-button');
export const changeAvatarBtn = document.querySelector('.profile__change-avatar-button');

export const editPopup = document.querySelector('.popup_type_edit');
export const editFormElement = editPopup.querySelector('.form');
export const addPopup = document.querySelector('.popup_type_add');
export const addFormElement = addPopup.querySelector('.form');
export const popupChangeAvatar = document.querySelector('.popup_type_change-avatar');
export const cahngeAvatarFormElement = popupChangeAvatar.querySelector('.form');