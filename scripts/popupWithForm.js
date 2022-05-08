import Popup from "./popup.js";

export default class PopupWithForm extends Popup {
  constructor (handleSubmitForm, selector) {
    super (selector);
    this._handleSubmitForm = handleSubmitForm;
  }

//метод получающий значения инпутов
  _getInputValues () {
    const form = document.querySelector(this._selector);
    const inputs = Array.from(form.querySelectorAll('.popup__item'));
    this._inputsValues = inputs.map(item => item.value);
  }

//метод закрытия, в котором формы сбрасывают значения инпутов
  close() {
    const form = document.querySelector(this._selector);
    form.classList.remove('popup_opened');
    form.querySelector('.popup__wrapper').reset(); // т.к. форма внутри обертки this._selector, ищем внутри именно форму для ресета.
  }

//метод, переписывающий родительский метод
  setEventListeners() {
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

  // навешивает обработчик сабмита
    document.querySelector(this._selector).addEventListener('submit', evt => {
      this._handleSubmitForm(evt);
      this.close();
    })
  }

}
