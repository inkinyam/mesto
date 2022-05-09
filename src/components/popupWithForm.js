import Popup from "./popup.js";

export default class PopupWithForm extends Popup {
  constructor (handleSubmitForm, selector) {
    super (selector);
    this._handleSubmitForm = handleSubmitForm;
  }

//метод получающий значения инпутов
  getInputValues () {
    const inputs = Array.from(this._popup.querySelectorAll('.popup__item'));
    this._inputsValues = inputs.map(item => item.value);
  }

//метод закрытия, в котором формы сбрасывают значения инпутов
  close() {
    super.close();
    this._popup.querySelector('.popup__wrapper').reset(); // т.к. форма внутри обертки this._selector, ищем внутри именно форму для ресета.
  }

//метод, переписывающий родительский метод
  setEventListeners() {
    super.setEventListeners();
    // навешивает обработчик сабмита
    this._popup.addEventListener('submit', evt => {
      this._handleSubmitForm(evt);
      this.close();
    })
  }

}
