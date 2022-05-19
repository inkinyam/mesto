
 //класс карточек
 export default class Card {
  constructor ({card, handleCardClick, handleLikeClick, handleDeleteClick}, templateSelector) {
     this._name              = card.name;
     this._link              = card.link;
     this._likes             = card.likes;
     this._handleCardClick   = handleCardClick;
     this._handleLikeClick   = handleLikeClick;
     this._handleDeleteClick = handleDeleteClick;
     this._templateSelector  = templateSelector;
     this._ownerId           = card.owner._id;
     this.id                 = card._id;
  }

 // метод, который создает карточку
  _getCardElement () {
    const cardElement =  document.querySelector(this._templateSelector).content.querySelector('.place').cloneNode(true);
    this._cardElement = cardElement;
  }

   //метод, который заполняет карточку
  _renderCard (id) {
    this._getCardElement();
    if (this.isLiked(id)) {
      this._cardElement.querySelector('.place__button-like').classList.add('place__button-like_active');
    } 
    const cardImage = this._cardElement.querySelector('.place__image');
    cardImage.src   = this._link;
    cardImage.alt   = this._name;
    this._cardElement.querySelector('.place__text').textContent = this._name;
    this._likeCounter = this._cardElement.querySelector('.place__like-counter');
    this._likeCounter.textContent = this._likes.length;
  }

  // метод, который навешивает все слушатели на карточку
  _setEventListener() {
    // слушатель на кнопку-сердечко
      this._cardElement.querySelector('.place__button-like').addEventListener('click', (evt) => {
        this._handleLikeClick(evt);
    });

    // слушатель на кнопку удаления фото
    this._cardElement.querySelector('.place__button-delete').addEventListener('click', (evt) => {
      this._handleDeleteClick(evt.target);
    });

    //слушатель на открытие увеличенной фото
    this._cardElement.querySelector('.place__image').addEventListener('click', () => {
      this._handleCardClick(this._link, this._name);
    });
  }

  // метод, который проверяет, лайкнута ли карточка
  isLiked (id) { 
    let hasLike = false;    
    this._likes.some(item => { 
      if (item._id === id) {
        return hasLike = true} 
      else return hasLike = false;
      });
    return hasLike;
    }

  renewLikeCounter (counter) {
    this._likes = counter;
    this._likeCounter.textContent =counter.length;
  }

//  метод, который возвращает готовую карточку 
  createCard (id) {
    this._renderCard(id);
    this._setEventListener();
  //проверяем, принадлежит ли карточка пользователю, если нет, убираем с карточки кнопку удаления карточки
    if (id != this._ownerId) {
      this._cardElement.querySelector('.place__button-delete').remove();
    }
    return this._cardElement;
  }

}
