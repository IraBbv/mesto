class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._popupCloseBtn = this._popup.querySelector('.popup__close-icon')
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }
    
    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose = (evt) => {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    _handleCloseButton = () => {
        this.close();
    }

    _handleOverlayClose = (event) => {
        if (event.target === this._popup) {
            this.close();
        }
    }

    setEventListeners() {
        this._popup.addEventListener('mousedown', this._handleOverlayClose);
        this._popupCloseBtn.addEventListener('click', this._handleCloseButton);
    }
};

export { Popup };