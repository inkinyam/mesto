//проверяем наличие неверно заполнненых инпутов

const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement => !inputElement.validity.valid);
}

//функция, которая показывает ошибки
const showError = (formElement, inputElement, errorMessage, {inputErrorClass, spanErrorClass}) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(spanErrorClass);
}

//функция, которая убирает ошибки
const hideError = (formElement, inputElement, {inputErrorClass, spanErrorClass}) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove(spanErrorClass);
  errorElement.textContent = '';
  inputElement.classList.remove(inputErrorClass);
}

//функция проверяющая валидность формы
const checkInputValidity = (formElement, inputElement, parameters) => {
  if (inputElement.validity.valid) {
    hideError(formElement, inputElement, parameters);
  } else {
    showError(formElement, inputElement, inputElement.validationMessage, parameters);
  }
}

//функция переключения доступности кнопки
const toggleButton = (inputList, submitButtonSelector,inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    submitButtonSelector.classList.add(inactiveButtonClass);
    submitButtonSelector.setAttribute('disabled', 'disabled');
  } else {
    submitButtonSelector.classList.remove(inactiveButtonClass);
    submitButtonSelector.removeAttribute('disabled');
  }
}

//функция навешивания слушателей на все инпуты в форме
const setEventListeners = (formElement, {inputElement, submitButtonSelector, inactiveButtonClass, ...parameters}) => {
  const inputList = Array.from(formElement.querySelectorAll(inputElement));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButton(inputList, buttonElement, inactiveButtonClass);

  inputList.forEach(item => {
    item.addEventListener('input', function () {
      checkInputValidity(formElement, item, parameters);
      toggleButton(inputList, buttonElement, inactiveButtonClass);
  });
  });
}

//функция, включающая валидацию на всех формах
const enableValidation  = ({formElement, ...parameters}) => {
  const formList = Array.from(document.querySelectorAll(formElement));
  formList.forEach(form => {
    setEventListeners(form, parameters);
});
}

//вызов функции
enableValidation ({formElement:'.popup__wrapper',
                    inputElement: '.popup__item',
                    submitButtonSelector:'.popup__button_type_save',
                    inactiveButtonClass:'popup__button_type_disabled',
                    inputErrorClass: 'popup__item_type_wrong',
                    spanErrorClass: 'popup__span-error_active'});
