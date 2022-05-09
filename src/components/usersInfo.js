
export default class UserInfo {
  constructor (nameSelector, aboutSelector) {
    this._name  = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);

  }

  //метод, получающий данные и создающий объект с данными пользователя
  getUserInfo () {
    this._user = {name:  this._name.textContent,
                  about: this._about.textContent};
    return this._user;
  }

  // метод, который принимает новые данные и добавляет их на страницу
  setUserInfo ({ name, about }) {
    this._name.textContent  = name;
    this._about.textContent = about;
  }
}
