import Popup from "./popup.js";

export default class PopupWithConfirm extends Popup{
  constructor(handleSubmitForm, selector) {
    super(selector);
    this._handleSubmitForm = handleSubmitForm;
    this.button = document.querySelector('.popup-confirm__save');
  }

  // исправим текст кнопки на нужный
  open () {
    this.button.textContent = 'Да';
    super.open();
  }

  //переопределяем родительский метод
  setEventListeners () {
    super.setEventListeners();
    this._popup.addEventListener('submit', evt => {
        this._handleSubmitForm(evt, this._id, this._target);
    })
  }

  //устанавливаем с какой именно карточкой будем работать
  setId (card) {
    this._id = card.id;
    this.currentCard = card;
    
  }
}
