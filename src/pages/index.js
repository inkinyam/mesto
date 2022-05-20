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


//функция, которая меняет текст кнопки, когда происходит загрузка
function renderLoadProgress (buttonSelector, isLoading) {
  const button = document.querySelector(buttonSelector);
  if (isLoading) {
    button.textContent = `Сохранение...`;
  }
  else {
    button.textContent = `Сохранить`;
  }
}

// функция, которая показывае или прячет элемент загрузки
function renderSpinner(spinnerSelector, isLoading) {
  const spinner = document.querySelector(spinnerSelector);
  if (isLoading) {
    spinner.classList.add('content-loader_visible');
  }
  else {
    spinner.classList.remove('content-loader_visible');
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

// cозжаем экземпляр класса Section
const cardList = new Section ((item) => {
  const cardElement = createCard(item);
  cardList.addItem(cardElement);
}, '.places');

//получаем данные карточек и пользователя и все отрисовываем
renderSpinner('.content-loader', true);
renderContent('.content', false);
Promise.all([api.getUserData(), api.getCards()])
  .then(([userData, cardData])=>{
    user.setUserInfo({name: userData.name, about: userData.about, id: userData._id});
    user.setUserAvatar(userData.avatar);
    cardList.renderItems(cardData);
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
function handleSubmitConfirmPopup (evt, cardId) {
  evt.preventDefault();
  renderLoadProgress('.popup-confirm__save', true);

  api.deleteCard(cardId)
    .then(() => {
      confirmPopup.currentCard.deleteCard();
      confirmPopup.close()}) 
    .catch ((err) =>{console.log(`Что-то не так. ${err}`)})
    .finally(()=>{renderLoadProgress('.popup-confirm__save', false)})
  }

//функция создания карточки
function createCard (item) {
  const card = new Card ({
    card: item, 
    //обработчик клика на карточку
    handleCardClick: (link, name) => {
      popupPhoto.open(link, name);
    },
    //обработчик клика на лайк
    handleLikeClick: () => {
      if (!card.isLiked(user.id)) {
        
        api.putLike(card.id)
          .then(res => {
            card.setLike();
            card.renewLikeCounter(res.likes);
          })
          .catch((err) => console.log(`Что-то не так. ${err}`));
      } else {
        api.deleteLike(card.id)
          .then(res => {
            card.removeLike();
            card.renewLikeCounter(res.likes);
          })
          .catch((err) => console.log(`Что-то не так. ${err}`));
      }
    },
    //обработчик клика на кнопку удаления
    handleDeleteClick: () => {
      confirmPopup.setId(card);
      confirmPopup.open();
    }
  }, '.card_template');

  return card.createCard(user.id);

}


//создание экземпляра попапа для формы редактирования профиля
const popupEditForm = new PopupWithForm ((evt, data)=> {
  evt.preventDefault();
  renderLoadProgress('.popup-edit__save', true);
  const newUserInfo = {
    name: data.popup_title,
    about: data.popup_sutitle}
  api.postUserData(newUserInfo.name, newUserInfo.about)
    .then(() => {
      user.setUserInfo(newUserInfo)
      popupEditForm.close();
    })
    .catch((err) => console.log(`Что-то не так. ${err}`))
    .finally(()=>{renderSpinner('.popup-edit__save', false)});
}, '.popup-edit');
popupEditForm.setEventListeners();


//обработчик кнопки редактирования профиля
constants.editButton.addEventListener('click', () => {
  const {name, about} = user.getUserInfo();
  constants.inputTitle.value = name;
  constants.inputSubtitle.value = about;
  renderLoadProgress('.popup-edit__save', false);
  popupEditForm.open();
})


//создание экземпляра попапа для формы добавления фото
const popupAddForm = new PopupWithForm ((evt, data) => {
  evt.preventDefault();
  renderLoadProgress('.popup-add__save', true)
  
  const newCardData = {
    name: data.popup_title,
    link: data.popup_sutitle,
    likes: [],
    owner: {_id: user.id},
    id: ''
  }
  api.postCard(newCardData.name, newCardData.link)
  .then((res)=> {
    const newCard = createCard(res);
    cardList.renderNewElement(newCard);
    popupAddForm.close();
    })
  .catch((err) => console.log(`Что-то не так. ${err}`))
  .finally(()=>{ renderLoadProgress('.popup-add__save', false) });  
}, '.popup-add');

popupAddForm.setEventListeners();


// обработчик события на нажатие кнопки добавления фото
constants.addButton.addEventListener('click', () => {
  addFormValidator.resetValidation();
  popupAddForm.open();
});

//создание экземпляра попапа формы для редактирования аватара профиля
const editAvatarPopup = new PopupWithForm ((evt, data)=>{
  evt.preventDefault();
  renderLoadProgress('.update-avatar-form__save', true)
  const newAvatar = data.inputAvatarLink;

  api.postUserPhoto(newAvatar)
    .then(()=>{
      const avatarPhoto = document.querySelector('.profile__avatar');
      avatarPhoto.src = newAvatar;
      editAvatarPopup.close();
      })
    .catch((err) => console.log(`Что-то не так. ${err}`))
    .finally(()=>{ renderLoadProgress('.update-avatar-form__save', false) });    
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
