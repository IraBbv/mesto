class UserInfo {
    constructor({ nameElementSelector, descriptionElementSelector, avatarElementSelector }) {
        this._nameElement = document.querySelector(nameElementSelector);
        this._descriptionElement = document.querySelector(descriptionElementSelector);
        this._avatarElement = document.querySelector(avatarElementSelector);
    }

    getUserInfo() {
        return {name: this._nameElement.textContent,
                description: this._descriptionElement.textContent,
                avatar: this._avatarElement.src};
    }

    setUserInfo({ name, description, avatar}) {
        this._nameElement.textContent = name;
        this._descriptionElement.textContent = description;
        this._avatarElement.src = avatar;
    }
};

export { UserInfo };