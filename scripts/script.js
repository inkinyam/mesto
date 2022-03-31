//Попапы
const editPopup             = document.querySelector('.popup-edit');
const addPopup              = document.querySelector('.popup-add');
const photoPopup            = document.querySelector('.popup-photo')
const editForm              = document.querySelector('.edit-form');
const addForm               = document.querySelector('.add-form');

//Заполнение попапа editPopup
const title                 = document.querySelector('.profile__title');
const subtitle              = document.querySelector('.profile__subtitle');
const inputTitle            = document.querySelector('.popup__item_el_title');
const inputSubtitle         = document.querySelector('.popup__item_el_subtitle');

//Заполнение попапа addPopup
const inputName             = document.querySelector('.popup__item_el_name');
const inputLink             = document.querySelector('.popup__item_el_link');

//Кнопки открытия попапов
const editButton            = document.querySelector('.profile__edit-button');
const addButton             = document.querySelector('.profile__add-button');

// Кпнопки закрытия попапов
const editPopupExitButton   = document.querySelector('.popup-edit__exit');
const addPopupExitButton    = document.querySelector('.popup-add__exit');
const photoPopupExitButton  = document.querySelector('.popup-photo__exit');

// Кнопки сохранения попапов
const addCardButton         = document.querySelector('.popup-add__save');

// Контейнер для карточек
const places                = document.querySelector('.places');

// Переменные для заполнения карточки из попапа
const cardName              = document.querySelector('.popup__item_el_name');
const cardLink              = document.querySelector('.popup__item_el_link');

// Переменная с массивом попапов
const popupOverlays         = Array.from(document.querySelectorAll('.popup'));

// Переменные для открытия увеличенного фото
const photoPopupImage       = document.querySelector('.popup__image');
const photoPopupCaption     = document.querySelector('.popup__caption');


const openPopup = popup => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', (evt)=>{
    if (evt.key === "Escape") {
      closePopup(popup);
      if (popup.classList.contains('popup-add')) {
        addForm.reset();
      }
    }
  })
}

const fillEditPopup = () => {
  inputTitle.value = title.textContent;
  inputSubtitle.value = subtitle.textContent;
}

const closePopup = popup => {
  document.removeEventListener('keydown',closePopup);
  popup.classList.remove('popup_opened');
}

// Функция сохранения на форму редактирования профиля
const editFormSubmitHandler = event => {
  event.preventDefault();
  title.textContent = inputTitle.value;
  subtitle.textContent =  inputSubtitle.value;
  closePopup(editPopup);
}

editForm.addEventListener('submit', editFormSubmitHandler);

// Функция сохранения на форму добавления
const addFormSubmitHandler = event => {
  event.preventDefault();
    const newCard = {
                    name: cardName.value,
                    link: cardLink.value}

  if (places.children.length === 6) {
      places.lastElementChild.remove();
  }
  renderCard (newCard);
  closePopup(addPopup);
  addForm.reset();
}

addForm.addEventListener('submit', addFormSubmitHandler);

//Вызовы функций открытия попапов
editButton.addEventListener('click', () => {
  openPopup(editPopup);
  fillEditPopup();
});

addButton.addEventListener('click', () => {
  openPopup(addPopup);
});


// Вызовы функций закрытия попапов
editPopupExitButton.addEventListener('click', () => {
  closePopup(editPopup);
});

addPopupExitButton.addEventListener('click', () => {
  closePopup(addPopup);
  addForm.reset();
});

photoPopupExitButton.addEventListener('click', () =>{
  closePopup(photoPopup);
})

// Закрытие попапов кликом мыши на оверлей

popupOverlays.forEach(item => {
  item.addEventListener('click', evt => {
    if (evt.target.classList.contains('popup_opened')){
      closePopup(evt.target);
      addForm.reset();
    }
});
})

// Открытие попапа с увеличенным фото
const openPhotoPopup = (link, name) => {
  photoPopupImage.src = link;
  photoPopupImage.alt = name;
  photoPopupCaption.textContent = name;

  openPopup(photoPopup);
 }


//создаем заполненную карточку
const createCard = (data) => {
  const cardTemplate     = document.querySelector('#card').content;
  const cardElement      = cardTemplate.querySelector('.place').cloneNode(true);

  cardElement.querySelector('.place__image').src        = data.link;
  cardElement.querySelector('.place__text').textContent = data.name;
  cardElement.querySelector('.place__image').alt        = data.name;

  cardElement.querySelector('.place__button-like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('place__button-like_active');
  });

  cardElement.querySelector('.place__button-delete').addEventListener('click', (evt) => {
    evt.target.closest('.place').remove();
  });

  cardElement.querySelector('.place__image').addEventListener('click', (evt) => {
    const elementLink = data.link;
    const elementName = data.name;
    openPhotoPopup(elementLink, elementName);
  })

  return cardElement;
}

const renderCard = (card) => {
  const cardElement = createCard(card);
  places.prepend(cardElement);
}

const initialRendeCards = () => {
  initialCards.forEach(renderCard);
}

initialRendeCards();






