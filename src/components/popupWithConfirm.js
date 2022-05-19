import Popup from "./popup.js";

export default class PopupWithConfirm extends Popup{
  constructor(handleSubmitForm, selector) {
    super(selector);
    this._handleSubmitForm = handleSubmitForm;
  }

  //переопределяем родительский метод
  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', evt => {
        this._handleSubmitForm(evt, this._id, this._target);
        this.close()
    })
  }

  //устанавливаем с какой именно карточкой будем работать
  setId(id, target) {
    this._id = id;
    this._target = target;
  }
}
