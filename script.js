let popup         = document.querySelector('.popup');
let title         = document.querySelector('.profile__title');
let subtitle      = document.querySelector('.profile__subtitle');
let inputTitle    = document.querySelector('.popup__item_el_title');
let inputSubtitle = document.querySelector('.popup__item_el_subtitle');

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
  popup.classList.remove('popup_opened');
}

document.querySelector('.profile__edit-button').addEventListener('click', openPopup);
document.querySelector('.popup__button_type_exit').addEventListener('click', closePopup);
document.querySelector('.popup__wrapper').addEventListener('submit', formSubmitHandler);
