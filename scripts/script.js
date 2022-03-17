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
const editPopupExitButton   = document.querySelector('.popup-edit__exit');
const addPopupExitButton    = document.querySelector('.popup-add__exit');

// Кнопки сохранения попапов
const addCardButton    = document.querySelector('.popup-add__save');

// Контейнер для карточек
const places            = document.querySelector('.places');

// Переменные для заполнения карточки из попапа
const cardName = document.querySelector('.popup__item_el_name');
const cardLink = document.querySelector('.popup__item_el_link');


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

// Функция сохранения на форму редактирования профиля
function editFormSubmitHandler (event) {
  event.preventDefault();
  title.textContent = inputTitle.value;
  subtitle.textContent =  inputSubtitle.value;
  closePopup(editPopup);
}

editForm.addEventListener('submit', editFormSubmitHandler);

// Функция сохранения на форму добавления
function addFormSubmitHandler (event) {
  event.preventDefault();
  const newCard = {
                    name: '',
                    link: ''}
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
editPopupExitButton.addEventListener('click', function () {
  closePopup(editPopup);
});

addPopupExitButton.addEventListener('click', function () {
  closePopup(addPopup);
});

//Создаем и открываем заполненный попап с фоткой
function createPopup (link, name) {
  const popupTemplate  = document.querySelector('#popup-photo').content;
  const popupElement   = popupTemplate.querySelector('.popup__figure').cloneNode(true);

  popupElement.querySelector('.popup__image').src = link;
  popupElement.querySelector('.popup__image').alt = name;
  popupElement.querySelector('.popup__caption').textContent = name;
  popupElement.querySelector('.popup-photo__exit').addEventListener ('click', function (evt) {
    closePopup(photoPopup);
    evt.target.parentElement.remove();
  });

  photoPopup.prepend(popupElement);
  openPopup(photoPopup);
}

//создаем заполненную карточку
function createCard (data) {
  const cardTemplate     = document.querySelector('#card').content;
  const cardElement      = cardTemplate.querySelector('.place').cloneNode(true);

  cardElement.querySelector('.place__image').src = data.link;
  cardElement.querySelector('.place__text').textContent = data.name;
  cardElement.querySelector('.place__image').alt = data.name;


  cardElement.querySelector('.place__button-like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('place__button-like_active');
  });

  cardElement.querySelector('.place__button-delete').addEventListener('click', function (evt) {
    evt.target.closest('.place').remove();
  });

  cardElement.querySelector('.place__image').addEventListener('click', function(evt) {
    const elementLink = data.link;
    const elementName = data.name;
    createPopup(elementLink, elementName);
  })

  return cardElement;
}

function renderCard (card) {
  const cardElement = createCard(card);
  places.prepend(cardElement);
}

function initialRendeCards () {
  initialCards.forEach(renderCard);
}

initialRendeCards();






