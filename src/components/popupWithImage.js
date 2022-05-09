import Popup from "./popup.js";

export default class PopupWithImage extends Popup {
  constructor (selector) {
    super (selector);
    this._imageLink   = this._popup.querySelector('.popup__image');
    this._altText = this._popup.querySelector('.popup__image');
    this._caprion = this._popup.querySelector('.popup__caption');
  }

  // метод, который переопределяет родительский, в нем заполняем данные "темплейта" попапа
  open(link, name) {
    super.open();
    this._imageLink.src = link;
    this._altText.alt = name;
    this._caprion.textContent = name;
  }

}
