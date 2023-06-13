class UserInfo {
    constructor({ nameElementSelector, descriptionElementSelector }) {
        this._nameElement = document.querySelector(nameElementSelector);
        this._descriptionElement = document.querySelector(descriptionElementSelector);
    }

    getUserInfo() {
        return {name: this._nameElement.textContent,
                description: this._descriptionElement.textContent};
    }

    setUserInfo(data) {
        this._nameElement.textContent = data.name;
        this._descriptionElement.textContent = data.description;
    }
};

export { UserInfo };