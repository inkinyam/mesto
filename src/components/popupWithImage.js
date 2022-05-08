import Popup from "./popup.js";

export default class PopupWithImage extends Popup {
  constructor (link, name, selector) {
    super (selector);
    this._link = link;
    this._name = name;
  }

  // метод, который переопределяет родительский, в нем заполняем данные "темплейта" попапа
  open() {
    const photoPopup = document.querySelector(this._selector);
    photoPopup.classList.add('popup_opened');
    photoPopup.querySelector('.popup__image').src = this._link;
    photoPopup.querySelector('.popup__image').alt = this._name;
    photoPopup.querySelector('.popup__caption').textContent = this._name;
  }

}
