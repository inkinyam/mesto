//импортируем функцию открытия попапа с увеличенной фото из script.js
import {openPhotoPopup} from './script.js';

 //класс карточек
 export default class Card {
  constructor (card, templateSelector) {
     this._name = card.name;
     this._link = card.link;
     this._templateSelector = templateSelector;
  }

 // метод, который создает карточку
  _getCardElement () {
    const cardElement =  document.querySelector(this._templateSelector).content.querySelector('.place').cloneNode(true);
    this._cardElement = cardElement;
  }

   //метод, который заполняет карточку
  _renderCard () {
    this._getCardElement();
    const cardImage = this._cardElement.querySelector('.place__image');

    cardImage.src = this._link;
    cardImage.alt  = this._name;
    this._cardElement.querySelector('.place__text').textContent = this._name;
  }

  // метод, который навешивает все слушатели на карточку
  _setEventListener() {
    // слушатель на кнопку-сердечко
      this._cardElement.querySelector('.place__button-like').addEventListener('click', (evt) => {
      evt.target.classList.toggle('place__button-like_active');
    });

    // слушатель на кнопку удаления фото
    this._cardElement.querySelector('.place__button-delete').addEventListener('click', (evt) => {
      evt.target.closest('.place').remove();
    });

    //слушатель на открытие увеличенной фото
    const cardImage = this._cardElement.querySelector('.place__image');
    cardImage.addEventListener('click', (evt) => {
      const elementLink = this._link;
      const elementName = this._name;
      openPhotoPopup(elementLink, elementName);
    });

  }

  // публичный метод, который возвращает готовую карточку
    createCard () {
      this._renderCard();
      this._setEventListener();

      return this._cardElement;
     }

}
