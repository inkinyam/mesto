let popup         = document.querySelector('.popup');
let title         = document.querySelector('.profile__title');
let subtitle      = document.querySelector('.profile__subtitle');
let inputTitle    = document.querySelector('.popup__item_el_title');
let inputSubtitle = document.querySelector('.popup__item_el_subtitle');

let editButton    = document.querySelector('.profile__edit-button');
let closeButton   = document.querySelector('.popup__button_type_exit');
let popupForm     = document.querySelector('.popup__wrapper');

function openPopup(){
  popup.classList.add('popup_opened');
  inputTitle.value = title.textContent;
  inputSubtitle.value = subtitle.textContent;
}

function closePopup(){
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (event) {
  event.preventDefault();
  title.textContent = inputTitle.value;
  subtitle.textContent =  inputSubtitle.value;
  closePopup();
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
popupForm.addEventListener('submit', formSubmitHandler);
