export default class Popup {
  constructor(popupSelector) {
    this._selector = popupSelector;
  }

//метод описывающий открытие попапа
  open () {
    document.querySelector(this._selector).classList.add('popup_opened');
  }

//метод описывающий закрытие попапа
  close () {
    document.querySelector(this._selector).classList.remove('popup_opened');
  }

//метод навешивающий слушатели
  setEventListeners () {
    // закрытие по esc
    document.addEventListener('keydown', evt => {
      if (evt.key === "Escape") {
            this.close();
      }
    });

   // закрытие по клику мышки на темную область или крестик
    document.querySelector(this._selector).addEventListener('mousedown', evt => {
     if (evt.target.classList.contains('popup_opened') ||evt.target.classList.contains('popup__button_type_exit')) {
            this.close();
      }
    });
  }
}
