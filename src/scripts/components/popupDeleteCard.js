import { Popup } from "./popup.js";

class PopupDeleteCard extends Popup {
  constructor(popupSelector, formSubmit) {
    super(popupSelector);
    this._form = this._popup.querySelector('.form');
    this.formSubmit = formSubmit;
    this._submitButton = this._form.querySelector('.form__submit-button');
    this._defaultSubmitBtnText = this._submitButton.textContent;
  }

  open = ({ card, cardId }) => {
    super.open();
    this._element = card;
    this._cardId = cardId;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.formSubmit({ card: this._element, cardId: this._cardId });
      this._submitButton.textContent = this._defaultSubmitBtnText + '...';
    });
  }

  setDefaultText() {
    this._submitButton.textContent = this._defaultSubmitBtnText;
}
};

export { PopupDeleteCard };