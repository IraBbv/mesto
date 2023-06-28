class Card {
  constructor(element, templateSelector, handleCardClick, handleTrashClick, handleLikeClick) {
    this.title = element.name;
    this.image = element.link;
    this._ownerId = element.owner._id;
    this._myId = element.myId;
    this._cardId = element._id;
    this.likes = element.likes;
    this.templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleTrashClick = handleTrashClick;
    this._handleLikeClick = handleLikeClick;
  }

  constructCard() {
    this.element = this._getTemplate();
    this._setEventListeners();

    this._cardImage.src = this.image;
    this._cardImage.alt = this.title;
    this.element.querySelector('.card__name').textContent = this.title;
    this._handleTrashVisability();
    this._checkLikes();

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
    this._likeQuantity = this.element.querySelector('.card__like-quantity');

    this.likeButton.addEventListener('click', () => {
      this._handleLikeClick(this.likeButton, this._cardId);
    });
    this.trashButton.addEventListener('click', () => {
      this._handleDelete();
    });

    this._cardImage.addEventListener('click', () => {
      this._handleOpenImagePopup();
    });
  }

  _handleDelete() {
    this._handleTrashClick({ card: this, cardId: this._cardId });
  }

  removeCard() {
    this.element.remove();
    this.element = null;
  }

  _handleTrashVisability() {
    if (this._ownerId !== this._myId) {
      this.trashButton.remove();
    }
  }

  _checkLikes() {
    this.likes.forEach(element => {
      if (element._id === this._myId) {
        this.likeButton.classList.add('card__like-button_active');
        return
      }
    });
    this._likeQuantity.textContent = this.likes.length;
  }

  toggleLike(likes) {
    this.likeButton.classList.toggle('card__like-button_active');
    this._likeQuantity.textContent = likes.length;
  }

  _handleOpenImagePopup() {
    this._handleCardClick({ name: this.title, link: this.image});
  }
}

export { Card };