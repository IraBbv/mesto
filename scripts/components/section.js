class Section {
    constructor({ items, renderer }, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItem() {
        this._items.forEach(item => {
            this.addItem(this._renderer(item));
        })
    }

    addItem(domElement) {
        this._container.prepend(domElement);
    }
};

export { Section };