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

  setUserInfo(name, about) {
    this._modal.querySelector(this._name).textContent = name.value;
    this._modal.querySelector(this._info).textContent = about.value;
  }
}
