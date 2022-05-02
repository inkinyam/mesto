export default class Popup {
  constructor(popupSelector) {
    this._selecor = popupSelector;
  }

  //метод описывающий открытие попапа
  open () {
    this.setEventListeners();
    document.querySelector(this._selecor).classList.add('popup_opened');
  }

  //метод описывающий закрытие попапа
  close () {
    document.querySelector(this._selecor).classList.remove('popup_opened');
  }

  //метод навешивающий слушатели
  setEventListeners () {
    document.addEventListener('keydown', evt => {
      if (evt.key === "Escape") {
            this.close();
      }
    });

    document.querySelector(this._selecor).addEventListener('mousedown', evt => {
     if (evt.target.classList.contains('popup_opened') ||evt.target.classList.contains('popup__button_type_exit')) {
            this.close();
      }
    });


  }


}
