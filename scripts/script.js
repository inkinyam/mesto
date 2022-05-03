//импорт констант и исходных данных
import * as constants from './constants.js';

//импорт класса валидации
import FormValidator from './formValidator.js';

//импорт класса карточки
import Card from './card.js'

//импорт класс section
import Section from './section.js';

//импорт класса popupWithImage
import PopupWithImage from './popupWithImage.js';

//импорт класса popupWithForm
import PopupWithForm from './popupWithForm.js';

//создание экземпляров валидаторов для каждой формы
const addFormValidator = new FormValidator (constants.data, constants.addForm);
addFormValidator.enableValidation();

const editFormValidator = new FormValidator (constants.data, constants.editForm);
editFormValidator.enableValidation();


//создание экземпляр section для карточек
const cardList = new Section ({data: constants.initialCards, renderer: (item) => {
    const card = new Card ({card: item, handleCardClick: (link, name)=>{
        const popupPhoto = new PopupWithImage (link, name, '.popup-photo');
        popupPhoto.open();
      }}, '.card_template');

    const cardElement = card.createCard();
    cardList.addItem(cardElement);
  }}, '.places');

//создание экземпляра попапа для формы добавления фото

const popupAddForm = new PopupWithForm ((evt) => {
  evt.preventDefault();
  popupAddForm._getInputValues();
  const newCardData = {
    name: popupAddForm._inputsValues[0],
    link: popupAddForm._inputsValues[1]}

  const newCard = new Card({card: newCardData,
    handleCardClick: (link, name)=>{
      const popupPhoto = new PopupWithImage (link, name, '.popup-photo');
      popupPhoto.setEventListeners();
      popupPhoto.open();
    }}, '.card_template');

  constants.places.prepend(newCard.createCard());
  disableSubmitter(evt);
}, '.popup-add');
popupAddForm.setEventListeners();


// обработчик события на нажатие кнопки добавления фото
constants.addButton.addEventListener('click', () => {
  popupAddForm.open();
});


//функция отключения кнопки сабмита
const disableSubmitter = (evt) => {
  evt.submitter.classList.add('popup__button_type_disabled');
  evt.submitter.setAttribute('disabled', 'disabled');
}

cardList.renderItems();

