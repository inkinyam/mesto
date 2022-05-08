
export default class Section {
  constructor ({data, renderer}, containerSelector) {
    this._renderedItems = data;
    this._container     = document.querySelector(containerSelector);
    this._renderer      = renderer;
  }
//метод, который отвечает за добавление 1 элемента в контейнер
  addItem (element) {
    this._container.append(element);
  }


// метод, который отвечает за отрисовку всех элементов
  renderItems() {
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }
}


