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
import Api from '../components/api.js'
import PopupWithConfirm from '../components/popupWithConfirm';

//cоздание экземпляра класса Api
const api = new Api ('https://mesto.nomoreparties.co/v1/cohort-41', {
  headers: {
    authorization: '420a86b4-7133-4ca0-90cf-bb2cdda2a90c',
    'Content-Type': 'application/json'
  }
})

// создание экземпляра класса UserInfo
const user = new UserInfo ('.profile__title', '.profile__subtitle', '.profile__avatar');


// функция, которая показывае или прячет элемент загрузки
function renderSpinner(spinnerSelector, isLoading) {
  const spinner = document.querySelector(spinnerSelector);
  if (isLoading) {
    spinner.classList.add('loader_visible');
  }
  else {
    spinner.classList.remove('loader_visible');
  }
}

// функция, которая показывае или прячет контент
function renderContent (contentSelector, isLoading) {
  const content = document.querySelector(contentSelector);
  if (isLoading) {
    content.classList.add('content_visible');
  }
  else {
    content.classList.remove('content_visible');
  }
}

//отрисовываем все карточки
function renderSection (initialCardArr) {
  const cardList = new Section ({data: initialCardArr, renderer: (item) => {
    const cardElement = createCard(item);
    cardList.addItem(cardElement);
  }}, '.places');
 return cardList.renderItems();
}


//получаем данные карточек и пользователя и все отрисовываем
renderSpinner('.content-loader', true);
renderContent('.content', false);
Promise.all([api.getUserData(), api.getCards()])
  .then(([userData, cardData])=>{
    user.setUserInfo({name: userData.name, about: userData.about, id: userData._id});
    user.setUserAvatar(userData.avatar);
    renderSection (cardData);
  })
  .catch((err)=>{console.log(`Что-то не так. ${err}`)})
  .finally(()=>{
    renderSpinner('.content-loader', false);
    renderContent('.content', true);
  })

  
// создание экземпляра попапа для формы подтверждения
const confirmPopup = new PopupWithConfirm (handleSubmitConfirmPopup, '.popup-confirm');
confirmPopup.setEventListeners();

// обработчик нажатия кнопки "ДА" на форме подтверждения
function handleSubmitConfirmPopup (evt, cardId, target) {
  evt.preventDefault();
  renderSpinner('.popup-confirm__loader', true);
  api.deleteCard(cardId)
    .then(() => {target.closest('.place').remove()})
    .catch ((err) =>{console.log(`Что-то не так. ${err}`)})
    .finally(()=>{renderSpinner('.popup-confirm__loader', false)})}

//функция создания карточки
function createCard (item) {
  const card = new Card ({
    card: item, 
    //обработчик клика на карточку
    handleCardClick: (link, name) => {
      popupPhoto.open(link, name);
    },
    //обработчик клика на лайк
    handleLikeClick: (evt) => {
      const buttonLike = evt.target;
      if (!card.isLiked(user.id)) {
        
        api.putLike(card.id)
          .then(res => {
            buttonLike.classList.add('place__button-like_active');
            card.renewLikeCounter(res.likes);
          })
          .catch((err) => console.log(`Что-то не так. ${err}`));
      } else {
        api.deleteLike(card.id)
          .then(res => {
            buttonLike.classList.remove('place__button-like_active');
            card.renewLikeCounter(res.likes);
          })
          .catch((err) => console.log(`Что-то не так. ${err}`));
      }
    },
    //обработчик клика на кнопку удаления
    handleDeleteClick: (target) => {
      confirmPopup.setId(card.id, target);
      confirmPopup.open();
    }
  }, '.card_template');

  const cardElement = card.createCard(user.id);
  return cardElement;
}


//создание экземпляра попапа для формы редактирования профиля
const popupEditForm = new PopupWithForm ((evt)=> {
  evt.preventDefault();
  renderSpinner('.popup-edit__loader', true);
  popupEditForm.getInputValues();
  const newUserInfo = {
  name: popupEditForm._inputsValues[0],
  about: popupEditForm._inputsValues[1]}
  api.postUserData(newUserInfo.name, newUserInfo.about)
    .then(() => {user.setUserInfo(newUserInfo)})
    .catch((err) => console.log(`Что-то не так. ${err}`))
    .finally(()=>{renderSpinner('.popup-edit__loader', false)});
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
  renderSpinner('.popup-add__loader', true)
  popupAddForm.getInputValues();
  const newCardData = {
    name: popupAddForm._inputsValues[0],
    link: popupAddForm._inputsValues[1],
    likes: [],
    owner: {_id: user.id},
    id: ''
  }
  api.postCard(newCardData.name, newCardData.link)
  .then((res)=> {
    const newCard = createCard(res);
    constants.places.prepend(newCard);
    })
  .catch((err) => console.log(`Что-то не так. ${err}`))
  .finally(()=>{renderSpinner('.popup-add__loader', false)});  
}, '.popup-add');

popupAddForm.setEventListeners();


// обработчик события на нажатие кнопки добавления фото
constants.addButton.addEventListener('click', () => {
  addFormValidator.resetValidation();
  popupAddForm.open();
});

//создание экземпляра попапа формы для редактирования аватара профиля
const editAvatarPopup = new PopupWithForm ((evt)=>{
  evt.preventDefault();
  renderSpinner('.loader-profile', true)
  editAvatarPopup.getInputValues();
  const newAvatar = editAvatarPopup._inputsValues[0];

  api.postUserPhoto(newAvatar)
    .then(()=>{
      const avatarPhoto = document.querySelector('.profile__avatar');
      avatarPhoto.src = newAvatar;
      })
    .catch((err) => console.log(`Что-то не так. ${err}`))
    .finally(()=>{renderSpinner('.loader-profile', false)});    
  }, '.popup-update-avatar');

  editAvatarPopup.setEventListeners();

// обработчик события на нажатие кнопки редактирования аватара профиля
constants.editAvatarButton.addEventListener('click', ()=> {
  editAvatarValidator.resetValidation();
  editAvatarPopup.open();
})

// создание экземпляра класса для формы с увеличенным фото (пустой, заполняется при открытии)
const popupPhoto = new PopupWithImage ('.popup-photo');
popupPhoto.setEventListeners();

//создание экземпляров валидаторов для каждой формы
  //добавление фото
const addFormValidator = new FormValidator (constants.data, constants.addForm);
addFormValidator.enableValidation();
  //редактирование профиля
const editFormValidator = new FormValidator (constants.data, constants.editForm);
editFormValidator.enableValidation();
  //редактирование аватара профиля
const editAvatarValidator = new FormValidator (constants.data, constants.editAvatarForm);
editAvatarValidator.enableValidation();
