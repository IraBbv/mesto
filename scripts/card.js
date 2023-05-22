class Card {
  constructor(data, templateSelector) {
    this.title = data.name;
    this.image = data.link;
    this.templateSelector = templateSelector;
  }

  createCard() {
    this.element = this.getTemplate();
    this.setEventListeners();

    const cardImage = this.element.querySelector('.card__image');
    cardImage.src = this.image;
    cardImage.alt = this.title;
    this.element.querySelector('.card__name').textContent = this.title;

    return this.element;
  }

  getTemplate() {
    const cardElement = document.querySelector(this.templateSelector).content.querySelector('.card').cloneNode(true);
    return cardElement;
  }

  setEventListeners() {
    this.element.querySelector('.card__like-button').addEventListener('click', () => {
      this.handleLike();
    });
    this.element.querySelector('.card__trash-button').addEventListener('click', () => {
      this.handleDelete();
    });
  }

  handleLike() {
    this.element.querySelector('.card__like-button').classList.toggle('card__like-button_active');
  }

  handleDelete() {
    const cardItem = this.element.querySelector('.card__trash-button').closest('.card');
    cardItem.remove();
  }
}

export {Card};