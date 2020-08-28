export default class Api {
  constructor({
    baseUrl,
    cardsUrl,
    userUrl,
    method,
    authorization,
    contentType,
    name,
    about,
    headers,
    body,
    id
  })
  {
    this._baseUrl = baseUrl;
    this._cardsUrl = cardsUrl;
    this._userUrl = userUrl;
    this._method = method;
    this._authorization = authorization;
    this._contentType = contentType;
    this._name = name;
    this._about = about;
    this._headers = headers;
    this._body = body;
    this._id = id;
  }

  _getCurrentUser() {
    return fetch(
      this._userUrl,
      {
        method: this._method,
        headers: {
          authorization: this._authorization,
        }
      }
    ).then(res => {
      if (res.ok) {
        return res.json()
      } else {
        return Promise.reject(`Всё херня, Антон, давай заново: ${res.status}`);
      }
    });
  }

  _getDataCards() {
    return fetch(
      this._cardsUrl,
      {
        method: this._method,
        headers: {
          authorization: this._authorization,
        }
      }
    ).then(res => {
      if (res.ok) {
        return res.json()
      } else {
        return Promise.reject(`Всё херня, Антон, давай заново: ${res.status}`);
      }
    });
  }

  getStartData() {
    return Promise.all([ this._getCurrentUser(), this._getDataCards()]);
  }

  addCard() {
    return fetch(
      this._baseUrl,
      {
        method: this._method,
        headers: {
          authorization: this._authorization,
          'Content-Type': this._contentType
        },
        body: JSON.stringify({
          name: this._name,
          link: this._about
        })
      }
    ).then(res => {
      if (res.ok) {
        return res.json()
      } else {
        return Promise.reject(`Всё херня, Антон, давай заново: ${res.status}`);
      }
    });
  }

  deleteCard(id) {
    return fetch(
      `${this._baseUrl}${id}`,
      {
        method: this._method,
        headers: {
          authorization: this._authorization,
        }
      }
    ).then(res => {
      if (res.ok) {
        return res.json()
      } else {
        return Promise.reject(`Всё херня, Антон, давай заново: ${res.status}`);
      }
    });
  }

  changeUserInfo() {
    return fetch(
      this._baseUrl,
      {
        method: this._method,
        headers: {
          authorization: this._authorization,
          'Content-Type': this._contentType
        },
        body: JSON.stringify({
          name: this._name,
          about: this._about
        })
      }
    ).then(res => {
      if (res.ok) {
        return res.json()
      } else {
        return Promise.reject(`Всё херня, Антон, давай заново: ${res.status}`);
      }
    });
  }

  changeAvatar() {
    return fetch(
      this._baseUrl,
      {
        method: this._method,
        headers: {
          authorization: this._authorization,
          'Content-Type': this._contentType
        },
        body: JSON.stringify({
          avatar: this._about
        })
      }
    ).then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Всё херня, Антон, давай заново: ${res.status}`);
      }
    })
  }

  like(id) {
    return fetch(
      `${this._baseUrl}${id}`,
      {
        method: this._method,
        headers: {
          authorization: this._authorization,
        }
      }
    ).then(res => {
      if (res.ok) {
        return res.json()
      } else {
        return Promise.reject(`Всё херня, Антон, давай заново: ${res.status}`);
      }
    });
  }

  dislike(id) {
    return fetch(
     `${this._baseUrl}${id}`,
      {
        method: this._method,
        headers: {
          authorization: this._authorization,
        }
      }
    ).then(res => {
      if (res.ok) {
        return res.json()
      } else {
        return Promise.reject(`Всё херня, Антон, давай заново: ${res.status}`);
      }
    });
  }
}
