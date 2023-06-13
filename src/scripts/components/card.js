class Card {
  constructor({ name, link }, templateSelector, handleCardClick) {
    this.title = name;
    this.image = link;
    this.templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  constructCard() {
    this.element = this._getTemplate();
    this._setEventListeners();

    this._cardImage.src = this.image;
    this._cardImage.alt = this.title;
    this.element.querySelector('.card__name').textContent = this.title;

    return this.element;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this.templateSelector).content.querySelector('.card').cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this.likeButton = this.element.querySelector('.card__like-button');
    this.trashButton = this.element.querySelector('.card__trash-button');
    this._cardImage = this.element.querySelector('.card__image');

    this.likeButton.addEventListener('click', () => {
      this._handleLike();
    });
    this.trashButton.addEventListener('click', () => {
      this._handleDelete();
    });

    this._cardImage.addEventListener('click', () => {
      this._handleOpenImagePopup();
    });
  }

  _handleLike() {
    this.likeButton.classList.toggle('card__like-button_active');
  }

  _handleDelete() {
    const cardItem = this.trashButton.closest('.card');
    cardItem.remove();
  }

  _handleOpenImagePopup() {
    this._handleCardClick({ name: this.title, link: this.image});
  }
}

export { Card };