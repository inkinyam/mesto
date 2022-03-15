//Попапы
const editPopup        = document.querySelector('.popup-edit');
const addPopup         = document.querySelector('.popup-add');
const photoPopup       = document.querySelector('.popup-photo')
const editForm         = document.querySelector('.popup-edit__wrapper');
const addForm          = document.querySelector('.popup-add__wrapper');


//Заполнение попапа editPopup
const title            = document.querySelector('.profile__title');
const subtitle         = document.querySelector('.profile__subtitle');
const inputTitle       = document.querySelector('.popup__item_el_title');
const inputSubtitle    = document.querySelector('.popup__item_el_subtitle');

//Кнопки открытия попапов
const editButton       = document.querySelector('.profile__edit-button');
const addButton        = document.querySelector('.profile__add-button');

// Кпнопки закрытия попапов
const editExitButton   = document.querySelector('.popup-edit__exit');
const addExitButton    = document.querySelector('.popup-add__exit');
const photoExitButton  = document.querySelector('.popup-photo__exit');

// Кнопки сохранения попапов
const addCardButton    = document.querySelector('.popup-add__save');

// Контейнер для карточек
const places            = document.querySelector('.places');

// Начальный массив карточек
const initialCards     = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

function openPopup(popup){
  popup.classList.add('popup_opened');
}

function fillEditPopup() {
  inputTitle.value = title.textContent;
  inputSubtitle.value = subtitle.textContent;
}

function closePopup(popup){
  popup.classList.remove('popup_opened');
}

function editFormSubmitHandler (event) {
  event.preventDefault();
  title.textContent = inputTitle.value;
  subtitle.textContent =  inputSubtitle.value;
  closePopup(editPopup);
}

editForm.addEventListener('submit', editFormSubmitHandler);


function addFormSubmitHandler (event) {
  event.preventDefault();
  const newCard = {
      name: '',
      link: ''}
  let cardName = document.querySelector('.popup__item_el_name');
  let cardLink = document.querySelector('.popup__item_el_link');
  newCard.name = cardName.value;
  newCard.link = cardLink.value;

  if (places.children.length === 6) {

    places.lastElementChild.remove();
  }

  renderCard (newCard);
  closePopup(addPopup);
  cardName.value='';
  cardLink.value='';
}

addForm.addEventListener('submit', addFormSubmitHandler);


//Вызовы функций открытия попапов
editButton.addEventListener('click', function () {
  openPopup(editPopup);
  fillEditPopup();
});

addButton.addEventListener('click', function () {
  openPopup(addPopup);
});


// Вызовы функций закрытия попапов
editExitButton.addEventListener('click', function () {
  closePopup(editPopup);
});

addExitButton.addEventListener('click', function () {
  closePopup(addPopup);
});

photoExitButton.addEventListener('click', function () {
  closePopup(photoPopup);
});


//создаем заполненную карточку
function createCard (data) {
  const cardTemplate     = document.querySelector('#card').content;
  const cardElement      = cardTemplate.querySelector('.place').cloneNode(true);

  cardElement.querySelector('.place__image').src=data.link;
  cardElement.querySelector('.place__text').textContent=data.name;
  cardElement.querySelector('.place__image').alt=data.name;


  cardElement.querySelector('.place__button-like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('place__button-like_active');
  });

  cardElement.querySelector('.place__button-delete').addEventListener('click', function (evt) {
    evt.target.parentElement.remove();
  });

  cardElement.querySelector('.place__image').addEventListener('click', function(evt) {
    //вызвать функцию открытия попапа большой фотки
  })

  return cardElement;
}

function renderCard (card) {
  const cardElement = createCard(card);
  places.prepend(cardElement);
}


function initialRendeCards () {
  initialCards.forEach(function(card) {
   renderCard(card);
  })
}


initialRendeCards();

