export {editPopup, addPopup, photoPopup,
        editForm, addForm, editAvatarForm,                  // Попапы и формы
        inputTitle, inputSubtitle,                          // Заполнение попапа editPopup
        editButton, addButton, editAvatarButton,            // Кнопки открытия попапов
        places,                                             // Контейнер для карточек
        data,                                               // Переменная c селекторами
      }

//Попапы и формы
const editPopup  = document.querySelector('.popup-edit');
const addPopup   = document.querySelector('.popup-add');
const photoPopup = document.querySelector('.popup-photo')
const editForm   = document.querySelector('.edit-form');
const addForm    = document.querySelector('.add-form');
const editAvatarForm = document.querySelector('.update-avatar-form');

//Заполнение попапа editPopup
const inputTitle    = document.querySelector('.popup__item_el_title');
const inputSubtitle = document.querySelector('.popup__item_el_subtitle');

//Кнопки открытия попапов
const editButton = document.querySelector('.profile__edit-button');
const addButton  = document.querySelector('.profile__add-button');
const editAvatarButton = document.querySelector('.profile__edit-avatar');


// Контейнер для карточек
const places = document.querySelector('.places');

//переменная в которой хранятся данные с селекторами для создания экз.класса валидации формы
const data =  {inputElement: '.popup__item',
              submitButtonSelector:'.popup__button_type_save',
              inactiveButtonClass:'popup__button_type_disabled',
              inputErrorClass: 'popup__item_type_wrong',
              spanErrorClass: 'popup__span-error_active'}

            