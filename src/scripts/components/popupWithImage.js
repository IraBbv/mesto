import { Popup } from "./popup.js";

class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = this._popup.querySelector('.popup__image');
        this._popupImageSubtitle = this._popup.querySelector('.popup__subtitle');
    }

    open = (cardData) => {
        this._popupImage.src = cardData.link;
        this._popupImage.alt = cardData.name;
        this._popupImageSubtitle.textContent = cardData.name;
        super.open();
    }
};

export { PopupWithImage };