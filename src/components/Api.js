export default class Api {
  constructor({ baseUrl, cardsUrl, userUrl, authorization, name, about, id }) {
    this._baseUrl = baseUrl;
    this._cardsUrl = cardsUrl;
    this._userUrl = userUrl;
    this._authorization = authorization;
    this._name = name;
    this._about = about;
    this._id = id;
    this._renderResult = this._renderResult.bind(this);
  }

  _renderResult(res) {
    if (!res.ok) {
      return Promise.reject(`Всё херня, Антон, давай заново: ${res.status}`);
    }
    return res.json();
  }

  _getCurrentUser() {
    return fetch(`${this._baseUrl}users/me`, {
      method: "GET",
      headers: {
        authorization: this._authorization,
      },
    }).then(this._renderResult);
  }

  _getDataCards() {
    return fetch(`${this._baseUrl}cards`, {
      method: "GET",
      headers: {
        authorization: this._authorization,
      },
    }).then(this._renderResult);
  }

  getStartData() {
    return Promise.all([this._getCurrentUser(), this._getDataCards()]);
  }

  addCard(name, link) {
    return fetch(`${this._baseUrl}cards`, {
      method: "POST",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._renderResult);
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: this._authorization,
      },
    }).then(this._renderResult);
  }

  changeUserInfo(name, about) {
    return fetch(`${this._baseUrl}users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._renderResult);
  }

  changeAvatar(avatar) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then(this._renderResult);
  }

  like(id) {
    return fetch(`${this._baseUrl}cards/likes/${id}`, {
      method: "PUT",
      headers: {
        authorization: this._authorization,
      },
    }).then(this._renderResult);
  }

  dislike(id) {
    return fetch(`${this._baseUrl}cards/likes/${id}`, {
      method: "DELETE",
      headers: {
        authorization: this._authorization,
      },
    }).then(this._renderResult);
  }
}
