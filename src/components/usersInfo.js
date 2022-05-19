
export default class UserInfo {
  constructor (nameSelector, aboutSelector, avatarSelector) {
    this._name  = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
    this._avatar = document.querySelector(avatarSelector);

  }

  //метод, получающий данные и создающий объект с данными пользователя
  getUserInfo () {
    this._user = {name:  this._name.textContent,
                  about: this._about.textContent};
    return this._user;
  }

  // метод, который принимает новые данные и добавляет их на страницу
  setUserInfo ({ name, about, id}) {
    this._name.textContent  = name;
    this._about.textContent = about;
    this.id = id;
  }

  //метод, который устанавливает новую фотку на аватар
  setUserAvatar (src) {
    this._avatar.src = src;
  }
}
