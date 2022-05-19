export default class Api {
  constructor (baseUrl, {headers}) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

//метод, который реализует получение карточки с сервера
  getCards () {
    return fetch (`${this.baseUrl}/cards`, {
      headers: this.headers
    })
    .then (res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

 // метод, который реализует получение данные пользователя с сервера
  getUserData () {
    return fetch (`${this.baseUrl}/users/me`, {
      headers: this.headers
    })
    .then (res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

 // метод, который реализует редактирование данных пользователя на сервере
  postUserData (userName, about){
    return fetch (`${this.baseUrl}/users/me`, {
      headers: this.headers,
      method: 'PATCH',
      body: JSON.stringify({name: userName, about: about}),
    })
    .then (res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  //  метод, который реализует редактирование автара пользователя на сервере
  postUserPhoto (link){
    return fetch (`${this.baseUrl}/users/me/avatar`, {
      headers: this.headers,
      method: 'PATCH',
      body: JSON.stringify({avatar: link}),
    })
    .then (res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

// метод, который реализует отправление карточки на сервер
  postCard (cardName, link){
    return fetch (`${this.baseUrl}/cards`, {
      headers: this.headers,
      method: 'POST',
      body: JSON.stringify({name: cardName, link: link}),
    })
    .then (res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

// метод, который реализует установку лайка на карточку
  putLike (cardId){
    return fetch (`${this.baseUrl}/cards/${cardId}/likes`, {
      headers: this.headers,
      method: 'PUT',
    })
    .then (res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

// метод, который реализует удаление лайка с карточки
  deleteLike (cardId){
    return fetch (`${this.baseUrl}/cards/${cardId}/likes`, {
      headers: this.headers,
      method: 'DELETE',
    })
    .then (res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

// метод, который реализует удаление карточки с сервера  
  deleteCard (cardId) {
    return fetch (`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers
    })
    .then (res => {
      if (res.ok) {
        return res.json();
      }
        return Promise.reject(`Ошибка: ${res.status}`)
    })
  }
}
