import Popup from './Popup.js';

export default class UserInfo extends Popup {
  constructor({name, info}, modal) {
    super(modal);
    this._name = name;
    this._info = info;
  }

  getUserInfo() {
    const userInfo = {};
    userInfo.name = this._modal.querySelector(this._name).textContent;
    userInfo.info = this._modal.querySelector(this._info).textContent;
    return userInfo;
  }

  setUserInfo() {
    this._modal.querySelector('.profile__title').textContent = this._name;
    this._modal.querySelector('.profile__subtitle').textContent = this._info;
  }
}
