
export default class UserInfo {
  constructor (nameSelector, aboutSelector) {
    this._nameSelector  = nameSelector;
    this._aboutSelector = aboutSelector;
  }

  //метод, получающий данные и создающий объект с данными пользователя
  getUserInfo () {
    this._user = {name:  document.querySelector(this._nameSelector).textContent,
                  about: document.querySelector(this._aboutSelector).textContent};
    return this._user;
  }

  // метод, который принимает новые данные и добавляет их на страницу
  setUserInfo ({ name, about }) {
    document.querySelector(this._nameSelector).textContent  = name;
    document.querySelector(this._aboutSelector).textContent = about;
  }
}
