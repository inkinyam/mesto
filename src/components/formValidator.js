export default class FormValidator {
  constructor (data, formElement) {
    this._formElement          = formElement;
    this._inputList            = Array.from(this._formElement.querySelectorAll(data.inputElement));
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass  = data.inactiveButtonClass;
    this._inputErrorClass      = data.inputErrorClass;
    this._spanErrorClass       = data.spanErrorClass;
  }

   //проверяем наличие неверно заполнненых инпутов
  _hasInvalidInput () {
    return this._inputList.some(function (item) {
        return !item.validity.valid;
    });
  }


   //метод, который показывает ошибки в формах
  _showError (inputElement)  {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._spanErrorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  //метод, который убирает ошибки в формах
  _hideError (inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._spanErrorClass);
    errorElement.textContent = '';

  }

  //метод проверяющий валидность формы
  _checkInputValidity (inputElement) {
    if (inputElement.validity.valid) {
      this._hideError(inputElement);
    } else {
      this._showError(inputElement);
    }
  }

  //метод переключения доступности кнопки
  _toggleButton () {
     const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    if (this._hasInvalidInput()) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.setAttribute('disabled', 'disabled');
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  }

  //метод навешивания слушателей на все инпуты в форме
  _setEventListeners () {
     this._inputList.forEach(item => {
      item.addEventListener('input', (evt) => {
        this._checkInputValidity(evt.target);
        this._toggleButton(evt.target);
    });
    });
  }

  //метод, включающая валидацию на форме
  enableValidation () {
    this._setEventListeners();
  }

  resetValidation () {
    this._toggleButton ();
    this._inputList.forEach (item => {
      this._hideError(item);
    })
  }
}


