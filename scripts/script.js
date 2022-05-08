//импорты классов
import * as constants from './constants.js';
import FormValidator from './formValidator.js';
import Card from './card.js'
import Section from './section.js';
import PopupWithImage from './popupWithImage.js';
import PopupWithForm from './popupWithForm.js';
import UserInfo from './usersInfo.js';

//создание экземпляров валидаторов для каждой формы
const addFormValidator = new FormValidator (constants.data, constants.addForm);
addFormValidator.enableValidation();

const editFormValidator = new FormValidator (constants.data, constants.editForm);
editFormValidator.enableValidation();


//создание экземпляра section для карточек
const cardList = new Section ({data: constants.initialCards, renderer: (item) => {
    const card = new Card ({card: item, handleCardClick: (link, name)=>{
        const popupPhoto = new PopupWithImage (link, name, '.popup-photo');
        popupPhoto.open();
      }}, '.card_template');

    const cardElement = card.createCard();
    cardList.addItem(cardElement);
  }}, '.places');


// создание экземпляра класса UserInfo
const user = new UserInfo ('.profile__title', '.profile__subtitle');
user.setUserInfo({name: 'Жак-Ив Кусто', about: 'Исследователь океана'});


//создание экземпляра попапа для формы редактирования профиля
const popupEditForm = new PopupWithForm ((evt)=> {
  evt.preventDefault();
  popupEditForm._getInputValues();
  const newUserInfo = {
  name: popupEditForm._inputsValues[0],
  about: popupEditForm._inputsValues[1]}

  user.setUserInfo(newUserInfo);
}, '.popup-edit');
popupEditForm.setEventListeners();


//обработчик кнопки редактирования профиля
constants.editButton.addEventListener('click', () => {
  const {name, about} = user.getUserInfo();
  constants.inputTitle.value = name;
  constants.inputSubtitle.value = about;

  popupEditForm.open();
})


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

