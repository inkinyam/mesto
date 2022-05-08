export {initialCards,                                       // Начальный массив карточек
        editPopup, addPopup, photoPopup, editForm, addForm, // Попапы и формы
        inputTitle, inputSubtitle,                          // Заполнение попапа editPopup
        editButton, addButton,                              // Кнопки открытия попапов
        addCardButton,                                      // Кнопки сохранения попапов
        places,                                             // Контейнер для карточек
        cardName, cardLink,                                 // Переменные для заполнения карточки из попапа
        popupOverlays,                                      // Переменная с массивом попапов
        data                                                // Переменная c селекторами
      }

// Начальный массив карточек
const initialCards = [
  {
    name: 'Крым',
    link: 'https://images.unsplash.com/photo-1597181227326-0742677fe67c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
  },
  {
    name: 'Рим',
    link: 'https://images.unsplash.com/photo-1638707743406-3e2a940252b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80'
  },
  {
    name: 'Каппадокия',
    link: 'https://fregataero.ru/images/turkey/Cappadocia/cappadocia-805624_960_720.jpg'
  },
  {
    name: 'Москва',
    link: 'https://images.unsplash.com/photo-1598516443513-109b9e3f5294?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
  },
  {
    name: 'Стокгольм',
    link: 'https://images.unsplash.com/photo-1553538435-cb923cf2d82a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80'
  },
  {
    name: 'Байкал',
    link: 'https://images.unsplash.com/photo-1614093576028-920b30d65326?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80'
  }
];

//Попапы и формы
const editPopup  = document.querySelector('.popup-edit');
const addPopup   = document.querySelector('.popup-add');
const photoPopup = document.querySelector('.popup-photo')
const editForm   = document.querySelector('.edit-form');
const addForm    = document.querySelector('.add-form');

//Заполнение попапа editPopup
const inputTitle    = document.querySelector('.popup__item_el_title');
const inputSubtitle = document.querySelector('.popup__item_el_subtitle');

//Кнопки открытия попапов
const editButton = document.querySelector('.profile__edit-button');
const addButton  = document.querySelector('.profile__add-button');

// Кнопки сохранения попапов
const addCardButton = document.querySelector('.popup-add__save');

// Контейнер для карточек
const places = document.querySelector('.places');

// Переменные для заполнения карточки из попапа
const cardName = document.querySelector('.popup__item_el_name');
const cardLink = document.querySelector('.popup__item_el_link');

// Переменная с массивом попапов
const popupOverlays = Array.from(document.querySelectorAll('.popup'));


//переменная в которой хранятся данные с селекторами для создания экз.класса валидации формы
const data =  {inputElement: '.popup__item',
              submitButtonSelector:'.popup__button_type_save',
              inactiveButtonClass:'popup__button_type_disabled',
              inputErrorClass: 'popup__item_type_wrong',
              spanErrorClass: 'popup__span-error_active'}
