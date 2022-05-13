// импорт основного css файла
import './index.css';

//импорты классов
import * as constants from '../utils/constants.js';
import FormValidator from '../components/formValidator.js';
import Card from '../components/card.js'
import Section from '../components/section.js';
import PopupWithImage from '../components/popupWithImage.js';
import PopupWithForm from '../components/popupWithForm.js';
import UserInfo from '../components/usersInfo.js';

//создание экземпляров валидаторов для каждой формы
const addFormValidator = new FormValidator (constants.data, constants.addForm);
addFormValidator.enableValidation();

const editFormValidator = new FormValidator (constants.data, constants.editForm);
editFormValidator.enableValidation();

// создание экземпляра класса для формы с увеличенным фото (пустой, заполняется при открытии)
const popupPhoto = new PopupWithImage ('.popup-photo');
popupPhoto.setEventListeners();


//функция создания карточки
function createCard (item) {
  const card = new Card ({card: item, handleCardClick: (link, name)=>{
    popupPhoto.open(link, name);
  }}, '.card_template');

const cardElement = card.createCard();
return cardElement;
}

//создание экземпляра section для карточек
const cardList = new Section ({data: constants.initialCards, renderer: (item) => {
    const cardElement = createCard(item);
    cardList.addItem(cardElement);
  }}, '.places');


// создание экземпляра класса UserInfo
const user = new UserInfo ('.profile__title', '.profile__subtitle');
user.setUserInfo({name: 'Жак-Ив Кусто', about: 'Исследователь океана'});


//создание экземпляра попапа для формы редактирования профиля
const popupEditForm = new PopupWithForm ((evt)=> {
  evt.preventDefault();
  popupEditForm.getInputValues();
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
  popupAddForm.getInputValues();
  const newCardData = {
    name: popupAddForm._inputsValues[0],
    link: popupAddForm._inputsValues[1]}

  const newCard = createCard(newCardData);
  constants.places.prepend(newCard);
 }, '.popup-add');
popupAddForm.setEventListeners();


// обработчик события на нажатие кнопки добавления фото
constants.addButton.addEventListener('click', () => {
  addFormValidator.resetValidation();
  popupAddForm.open();
});


cardList.renderItems();

