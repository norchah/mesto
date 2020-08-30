import Popup from "./Popup.js";

export default class UserInfo extends Popup {
  constructor({ name, info, avatar }, modal) {
    super(modal);
    this._name = this._modal.querySelector(name);
    this._info = this._modal.querySelector(info);
    this._avatar = avatar;
  }

  getUserInfo() {
    const userInfo = {};
    userInfo.name = this._name.textContent;
    userInfo.info = this._info.textContent;
    return userInfo;
  }

  setUserInfo(items) {
    this._name.textContent = items.name;
    this._info.textContent = items.about;
    this._info.src = items.avatar;
  }
}
