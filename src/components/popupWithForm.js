import Popup from "./popup.js";

export default class PopupWithForm extends Popup {
  constructor (handleSubmitForm, selector) {
    super (selector);
    this._handleSubmitForm = handleSubmitForm;
    this._inputs = Array.from(this._popup.querySelectorAll('.popup__item'));
    this._form = this._popup.querySelector('.popup__wrapper'); // т.к. форма внутри обертки popup, ищем внутри именно форму для ресета.
  }

//метод получающий значения инпутов
  getInputValues () {
    this._inputsValues = this._inputs.map(item => item.value);
  }

//метод закрытия, в котором формы сбрасывают значения инпутов
  close() {
    super.close();
    this._form.reset();
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
