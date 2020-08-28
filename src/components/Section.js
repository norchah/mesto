export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addStartItems(element) {
    this._container.append(element);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItem() {
    //console.log(this._items);
    this._renderer(this._items);
  }

  renderItems() {
    this._items.forEach(item => {
      //console.log(item);
      this._renderer(item);
    })
  }
}
