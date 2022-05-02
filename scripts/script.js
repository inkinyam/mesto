//импорт констант и исходных данных
import * as constants from './constants.js';

//импорт и создание экземпляров класса Валидации для каждой формы.
import FormValidator from './formValidator.js';

const addFormValidator = new FormValidator (constants.data, constants.addForm);
addFormValidator.enableValidation();

const editFormValidator = new FormValidator (constants.data, constants.editForm);
editFormValidator.enableValidation();

//импорт класса карточки
import Card from './card.js'

//импорт класс section
import Section from './section.js';

//импорт класса popup
import Popup from './popup.js';

//импорт класса popupWithImage
import PopupWithImage from './popupWithImage.js';

//создаем экземпляр section для карточек
const cardList = new Section ({data: constants.initialCards, renderer: (item) => {
    const card = new Card ({card: item, handleCardClick: (link, name)=>{
        const popupPhoto = new PopupWithImage (link, name, '.popup-photo');
        popupPhoto.open();
      }}, '.card_template');

    const cardElement = card.createCard();
    cardList.addItem(cardElement);
  }}, '.places');




//функция заполнения EDIT попапа
const fillEditPopup = () => {
  constants.inputTitle.value    = constants.title.textContent;
  constants.inputSubtitle.value = constants.subtitle.textContent;
}


//функция сохранения на форму редактирования профиля
const handleEditFormSubmit = event => {
  event.preventDefault();
  constants.title.textContent    = constants.inputTitle.value;
  constants.subtitle.textContent = constants.inputSubtitle.value;
  closePopup(constants.editPopup);
}

constants.editForm.addEventListener('submit', handleEditFormSubmit);


//функция отключения кнопки сабмита
const disableSubmitter = (evt) => {
  evt.submitter.classList.add('popup__button_type_disabled');
  evt.submitter.setAttribute('disabled', 'disabled');
}

//функция сохранения на форму добавления
const handleAddFormSubmit = evt => {
  evt.preventDefault();
    const newCardData = {
            name: constants.cardName.value,
            link: constants.cardLink.value}

  const newCard = new Card(newCardData, '.card_template');
  constants.places.prepend(newCard.createCard());

  closePopup(constants.addPopup);
  constants.addForm.reset();
  disableSubmitter(evt);
}

constants.addForm.addEventListener('submit', handleAddFormSubmit);





cardList.renderItems();

