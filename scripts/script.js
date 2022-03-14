//Попапы
const editPopup        = document.querySelector('.popup-edit');
const addPopup         = document.querySelector('.popup-add');
const photoPopup       = document.querySelector('.popup-photo')
const popupForm        = document.querySelector('.popup__wrapper');

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

function formSubmitHandler (event) {
  event.preventDefault();
  title.textContent = inputTitle.value;
  subtitle.textContent =  inputSubtitle.value;
  closePopup(editPopup);
}

popupForm.addEventListener('submit', formSubmitHandler);

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
