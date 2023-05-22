class Card {
  constructor(data, templateSelector) {
    this.title = data.name;
    this.image = data.link;
    this.templateSelector = templateSelector;
  }

  createCard() {
    this.element = this._getTemplate();
    this._setEventListeners();

    const cardImage = this.element.querySelector('.card__image');
    cardImage.src = this.image;
    cardImage.alt = this.title;
    this.element.querySelector('.card__name').textContent = this.title;

    return this.element;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this.templateSelector).content.querySelector('.card').cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this.element.querySelector('.card__like-button').addEventListener('click', () => {
      this._handleLike();
    });
    this.element.querySelector('.card__trash-button').addEventListener('click', () => {
      this._handleDelete();
    });
  }

  _handleLike() {
    this.element.querySelector('.card__like-button').classList.toggle('card__like-button_active');
  }

  _handleDelete() {
    const cardItem = this.element.querySelector('.card__trash-button').closest('.card');
    cardItem.remove();
  }
}

export {Card};