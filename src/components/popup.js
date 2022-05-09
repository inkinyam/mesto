export default class Popup {
  constructor(popupSelector) {
    this._selector = popupSelector;
    this._popup = document.querySelector(this._selector);
    this._handleEscListener = function (evt) {
      if (evt.key === "Escape") {
        this.close();
        document.removeEventListener('keydown', this.escHandler);
      }
    }
    this._escHandler = this._handleEscListener.bind(this);
  }

//метод описывающий открытие попапа
  open () {
    this._popup.classList.add('popup_opened');
   // навешиваем слушатель на закрытие по esc
    document.addEventListener('keydown', this._escHandler);
  }

//метод описывающий закрытие попапа
  close () {
    this._popup.classList.remove('popup_opened');
  }

//метод навешивающий слушатели
  setEventListeners () {
   // закрытие по клику мышки на темную область или крестик
   this._popup.addEventListener('mousedown', evt => {
      if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__button_type_exit')) {
        this.close();
      }
    });
  }
}
