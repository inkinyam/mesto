

//функция закрытия форм по нажатию на esc
const closePopupByEsc = evt => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

//функция открытия попапа
const openPopup = popup => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
}

//функция закрытия попапа
const closePopup = popup => {
  document.removeEventListener('keydown', closePopupByEsc);
  popup.classList.remove('popup_opened');
}


//вызовы функций открытия попапов
constants.editButton.addEventListener('click', () => {
  openPopup(constants.editPopup);
  fillEditPopup();
});

constants.addButton.addEventListener('click', () => {
  openPopup(constants.addPopup);
});

//открытие попапа с увеличенным фото, экспортируем в Card.js, тк там вызывается
export const openPhotoPopup = (link, name) => {
  constants.photoPopupImage.src = link;
  constants.photoPopupImage.alt = name;
  constants.photoPopupCaption.textContent = name;

  openPopup(constants.photoPopup);
 }


 //функция закрытия попапов (на оверлей или крестик)
constants.popupOverlays.forEach(item => {
  item.addEventListener('mousedown', evt => {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__button_type_exit')){
      closePopup(item);
    }
  });
})