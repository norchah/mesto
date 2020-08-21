export default class Api {
  constructor({baseUrl, method, headers}, options) {
    this._baseUrl = baseUrl;
    this._method = method;
    this._headers = headers;
    //this.request = this.request.bind(this);

  }

  getItems() {
    return fetch(
      this._baseUrl, {
        method: this._method,
        headers: this._headers
    }).then(res => {
      if (res.ok) {
        return res.json()
      } else {
        Promise.reject('Всё херня, Антон, давай заново');
      }
    });
  }

  addCard() {}

  deleteCard() {}

  changeUserInfo() {}

  changeAvatar() {}

  like() {

  }

  dislike() {}

}
