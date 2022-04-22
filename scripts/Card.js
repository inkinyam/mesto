//импортируем функцию открытия попапа с увеличенной фото из script.js
import {openPhotoPopup} from './script.js';

 //класс карточек
 export default class Card {
  constructor (card, template) {
     this._name     = card.name;
     this._link     = card.link;
     this._template = template;
  }

   //метод, который заполняет карточку
  _renderCard () {
    const cardElement = this._template.querySelector('.place').cloneNode(true);
    const cardImage   = cardElement.querySelector('.place__image');

    cardImage.src                                         = this._link;
    cardImage.alt                                         = this._name;
    cardElement.querySelector('.place__text').textContent = this._name;
    this._cardElement = cardElement;
  }

   //метод, который навешивает слушатель на кнопку-сердечко
  _setLikeListener (cardElement) {
    cardElement.querySelector('.place__button-like').addEventListener('click', (evt) => {
      evt.target.classList.toggle('place__button-like_active');
    });
   }

   //метод, который навешивает слушатель на кнопку удаления фото
  _setDeleteListener (cardElement) {
    cardElement.querySelector('.place__button-delete').addEventListener('click', (evt) => {
      evt.target.closest('.place').remove();
    });
  }

  //метод, который вызывает открытие функции увеличенной фото
  _setPhotoClickListener () {
    const cardImage   = this._cardElement.querySelector('.place__image');
    cardImage.addEventListener('click', (evt) => {
      const elementLink = this._link;
      const elementName = this._name;
      openPhotoPopup(elementLink, elementName);
      })
    }

  // публичный метод, который возвращает готовую карточку
    createCard () {
      this._renderCard();
      this._setLikeListener(this._cardElement);
      this._setDeleteListener(this._cardElement);
      this._setPhotoClickListener(this._cardElement);

      return this._cardElement;
     }

}
